/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree. *
 */

import React, { useMemo } from 'react';
import {
  func,
  arrayOf,
  objectOf,
  object,
  string,
  shape,
  bool,
} from 'prop-types';
import { Remarkable } from 'remarkable';
import {
  SearchSubjectResult,
  SearchNotionsResult,
  FilterButtons,
} from '@ndla/ui';
import { injectT } from '@ndla/i18n';

import {
  SearchItemShape,
  ConceptShape,
  TypeFilterShape,
  SearchGroupShape,
} from '../../shapes';
import SearchHeader from './components/SearchHeader';
import SearchResults from './components/SearchResults';

const SearchContainer = ({
  t,
  handleSearchParamsChange,
  handleFilterClick,
  handleFilterToggle,
  handleFilterReset,
  handleShowMore,
  query,
  subjects,
  allSubjects,
  subjectItems,
  concepts,
  suggestion,
  typeFilter,
  searchGroups,
  showConcepts,
  setShowConcepts,
  showAll,
}) => {
  const markdown = useMemo(() => {
    const md = new Remarkable({ breaks: true });
    md.inline.ruler.enable(['sub', 'sup']);
    return md;
  }, []);
  const renderMarkdown = text => markdown.render(text);

  const filterButtonItems = [];
  for (const [type, values] of Object.entries(typeFilter)) {
    filterButtonItems.push({
      value: type,
      label: t(`contentTypes.${type}`),
      selected: values.selected,
    });
  }

  return (
    <>
      <SearchHeader
        query={query}
        suggestion={suggestion}
        subjects={subjects}
        allSubjects={allSubjects}
        handleSearchParamsChange={handleSearchParamsChange}
      />
      {showConcepts && concepts?.length > 0 && (
        <SearchNotionsResult
          items={concepts}
          totalCount={concepts.length}
          onRemove={() => {
            setShowConcepts(false);
          }}
          renderMarkdown={renderMarkdown}
        />
      )}
      {subjectItems.length > 0 && <SearchSubjectResult items={subjectItems} />}
      {searchGroups.length > 0 && (
        <>
          <FilterButtons
            heading={t(
              'searchPage.searchFilterMessages.resourceTypeFilter.heading',
            )}
            items={filterButtonItems}
            onFilterToggle={handleFilterToggle}
            onRemoveAllFilters={handleFilterReset}
            labels={{
              openFilter: t(
                'searchPage.searchFilterMessages.resourceTypeFilter.button',
              ),
            }}
          />
          <SearchResults
            showAll={showAll}
            searchGroups={searchGroups}
            typeFilter={typeFilter}
            handleFilterClick={handleFilterClick}
            handleShowMore={handleShowMore}
          />
        </>
      )}
    </>
  );
};

SearchContainer.propTypes = {
  error: arrayOf(object),
  handleSearchParamsChange: func,
  handleFilterClick: func,
  handleFilterToggle: func,
  handleFilterReset: func,
  handleShowMore: func,
  query: string,
  subjects: arrayOf(string),
  allSubjects: arrayOf(
    shape({
      title: string,
      value: string,
    }),
  ),
  subjectItems: arrayOf(SearchItemShape),
  concepts: arrayOf(ConceptShape),
  suggestion: string,
  typeFilter: objectOf(TypeFilterShape),
  searchGroups: arrayOf(SearchGroupShape),
  showConcepts: bool,
  setShowConcepts: func,
  showAll: bool,
};

export default injectT(SearchContainer);
