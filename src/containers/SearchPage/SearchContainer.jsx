/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree. *
 */

import React, { Component } from 'react';
import PropTypes, { func, number, string, arrayOf, shape } from 'prop-types';
import Pager from '@ndla/pager';
import { SearchPage } from '@ndla/ui';
import { injectT } from '@ndla/i18n';
import { Query } from 'react-apollo';
import { SubjectShape, FilterShape } from '../../shapes';
import {
  GraphqlResourceTypeWithsubtypesShape,
  GraphQLSubjectShape,
} from '../../graphqlShapes';
import { resourceToLinkProps } from '../Resources/resourceHelpers';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import {
  convertSearchParam,
  convertResult,
  getResultMetadata,
} from './searchHelpers';
import { searchQuery } from '../../queries';
import handleError from '../../util/handleError';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    const { searchObject } = props;
    this.state = {
      query: searchObject.query || '',
    };
  }

  onQuerySubmit = evt => {
    evt.preventDefault();
    this.updateFilter({ query: this.state.query });
  };

  onFilterChange = (newValues, value, type) => {
    const { searchObject } = this.props;
    const { subjects } = searchObject;
    if (type === 'subjects' && newValues.length < subjects.length) {
      this.onRemoveSubject({ subjects: newValues }, value);
    } else {
      this.updateFilter({ [type]: newValues });
    }
  };

  onRemoveSubject = (subjectsSearchParam, subjectId) => {
    const { searchObject, data, handleSearchParamsChange } = this.props;
    const { levels } = searchObject;
    const subject = data.subjects.find(s => s.id === subjectId);

    const removedFilters = subject.filters
      ? subject.filters.map(level => level.name)
      : [];

    handleSearchParamsChange({
      ...subjectsSearchParam,
      levels: levels.filter(level => !removedFilters.includes(level)),
    });
  };

  onSearchFieldFilterRemove = removedSubject => {
    const { searchObject } = this.props;
    const { subjects: subjectsInUrl } = searchObject;

    const subjects = subjectsInUrl.filter(
      subject => subject !== removedSubject,
    );
    this.onRemoveSubject({ subjects }, removedSubject);
  };

  onUpdateContextFilters = values => {
    const { handleSearchParamsChange } = this.props;
    handleSearchParamsChange({
      contextFilters: values,
    });
  };

  updateFilter = searchParam => {
    const { handleSearchParamsChange } = this.props;
    const page = searchParam.page || 1;
    handleSearchParamsChange({
      ...searchParam,
      page,
    });
  };

  updateTab = (value, enabledTabs) => {
    const { handleSearchParamsChange, allTabValue } = this.props;
    const enabledTab = enabledTabs.find(tab => value === tab.value);
    const searchParams =
      !enabledTab || enabledTab.value === allTabValue
        ? {}
        : { [enabledTab.type]: enabledTab.value };

    handleSearchParamsChange({
      contextTypes: undefined,
      resourceTypes: undefined,
      contextFilters: [],
      ...searchParams,
      page: 1,
    });
  };

  updateQuery = query => {
    this.setState({ query });
  };

  render() {
    const {
      t,
      data,
      loading,
      locale,
      searchObject,
      customResultList,
      enabledTabs,
      allTabValue,
    } = this.props;
    if (loading) {
      return null;
    }
    const { subjects } = data;
    const { query } = this.state;

    const stateSearchParams = {};
    Object.keys(searchObject).forEach(key => {
      stateSearchParams[key] = convertSearchParam(searchObject[key]);
    });

    const activeSubjectsMapped =
      subjects && subjects.length > 0
        ? searchObject.subjects
            .map(it => {
              const subject = subjects.find(s => s.id === it);
              return subject
                ? {
                    ...subject,
                    value: subject.id,
                    title: subject.name,
                    filterName: subject.name,
                  }
                : undefined;
            })
            .filter(subject => !!subject)
        : [];

    const searchFilters = (
      <SearchFilters
        onChange={this.onFilterChange}
        filterState={searchObject}
        subjects={subjects}
        activeSubjects={activeSubjectsMapped}
        enabledTabs={enabledTabs}
        onContentTypeChange={this.onTabChange}
      />
    );
    const searchPageMessages = totalCount => ({
      filterHeading: t('searchPage.searchPageMessages.filterHeading'),
      dropdownBtnLabel: t('searchPage.searchPageMessages.dropdownBtnLabel'),
      closeButton: t('searchPage.close'),
      narrowScreenFilterHeading: t(
        'searchPage.searchPageMessages.narrowScreenFilterHeading',
        {
          totalCount,
          query,
        },
      ),
      searchFieldTitle: t('searchPage.search'),
    });
    const enabledTab =
      stateSearchParams.resourceTypes || stateSearchParams.contextTypes;
    return (
      <Query
        asyncMode
        query={searchQuery}
        variables={stateSearchParams}
        fetchPolicy="no-cache"
        ssr={false}>
        {queryResult => {
          const { error, data: searchData } = queryResult;
          if (error) {
            handleError(error);
            return `Error: ${error.message}`;
          }
          const { search } = searchData || {};
          const resultMetadata = search ? getResultMetadata(search) : {};

          const isReadyToShow = queryResult && !queryResult.loading && search;
          const searchResults = isReadyToShow
            ? convertResult(
                search.results,
                searchObject.subjects,
                enabledTab,
                locale,
              )
            : [];
          return (
            <SearchPage
              closeUrl="/#"
              searchString={query || ''}
              onSearchFieldChange={e => this.updateQuery(e.target.value)}
              onSearch={this.onQuerySubmit}
              onSearchFieldFilterRemove={this.onSearchFieldFilterRemove}
              searchFieldFilters={activeSubjectsMapped}
              activeFilters={activeSubjectsMapped}
              messages={searchPageMessages(resultMetadata.totalCount)}
              resourceToLinkProps={resourceToLinkProps}
              filters={searchFilters}>
              <SearchResults
                results={searchResults}
                resourceTypes={
                  data && data.resourceTypes ? data.resourceTypes : []
                }
                resultMetadata={resultMetadata}
                filterState={stateSearchParams}
                enabledTabs={enabledTabs}
                allTabValue={allTabValue}
                onTabChange={this.updateTab}
                query={searchObject.query}
                onUpdateContextFilters={this.onUpdateContextFilters}
                customResultList={customResultList}
              />
              {isReadyToShow && (
                <Pager
                  page={searchObject.page ? parseInt(searchObject.page, 10) : 1}
                  lastPage={resultMetadata.lastPage}
                  query={searchObject}
                  pathname=""
                  onClick={this.updateFilter}
                  pageItemComponentClass="button"
                />
              )}
            </SearchPage>
          );
        }}
      </Query>
    );
  }
}

SearchContainer.propTypes = {
  subjects: arrayOf(SubjectShape),
  resultMetadata: shape({
    totalCount: number,
    lastPage: number,
  }),
  filters: arrayOf(FilterShape),
  match: shape({
    params: shape({
      subjectId: string,
    }),
  }),
  data: shape({
    resourceTypes: arrayOf(GraphqlResourceTypeWithsubtypesShape),
    subjects: arrayOf(GraphQLSubjectShape),
  }),
  loading: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  searchObject: shape({
    contextFilters: arrayOf(string),
    languageFilter: arrayOf(string),
    levels: arrayOf(string),
    page: string,
    resourceTypes: arrayOf(string),
    subjects: arrayOf(string),
  }),
  handleSearchParamsChange: func,
  customResultList: func,
  enabledTabs: arrayOf(
    shape({
      name: string,
      value: string,
      type: string,
    }),
  ),
  allTabValue: string,
};

SearchContainer.defaultProps = {
  filters: [],
  subjects: [],
  searchObject: {},
  data: {},
  handleSearchParamsChange: () => {},
  allTabValue: 'all',
};

export default injectT(SearchContainer);
