/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import debounce from 'lodash/debounce';
import { spacing } from '@ndla/core';
import { uuid } from '@ndla/util';
import { CarouselAutosize } from '@ndla/carousel';

import { getCurrentBreakpoint, breakpoints } from '@ndla/util';
import { injectT } from '@ndla/i18n';
import {
  FilmSlideshow,
  MovieGrid,
  AboutNdlaFilm,
  FilmMovieSearch,
  FilmMovieList,
} from '@ndla/ui';

const ARIA_FILMCATEGORY_ID = 'movieCategoriesId';

class FilmFrontpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceTypeSelected: null,
      columnWidth: 260,
      columnsPrSlide: 1,
      margin: 26,
    };
    this.onChangeResourceType = this.onChangeResourceType.bind(this);
    this.setScreenSize = this.setScreenSize.bind(this);
    this.setScreenSizeDebounced = debounce(() => this.setScreenSize(false), 50);
    this.movieListRef = React.createRef();
  }

  componentDidMount() {
    this.setScreenSize();
    window.addEventListener('resize', this.setScreenSizeDebounced);
  }

  componentWillUnmount() {
    this.setScreenSizeDebounced.cancel();
    window.removeEventListener('resize', this.setScreenSizeDebounced);
  }

  onChangeResourceType(resourceTypeSelected) {
    const loadingPlaceholderHeight = `${
      this.movieListRef.current.getBoundingClientRect().height
    }px`;

    if (resourceTypeSelected) {
      this.props.onSelectedMovieByType(resourceTypeSelected);
    }

    this.setState({
      resourceTypeSelected,
      loadingPlaceholderHeight,
    });
  }

  setScreenSize() {
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth;

    const currentBreakpoint = getCurrentBreakpoint();
    let margin;
    let itemSize;
    if (screenWidth < 385) {
      margin = 26;
      itemSize = 130;
    } else if (screenWidth < 450) {
      margin = 26;
      itemSize = 160;
    } else if (currentBreakpoint === breakpoints.mobile) {
      margin = 26;
      itemSize = 200;
    } else if (currentBreakpoint === breakpoints.tablet) {
      margin = 52;
      itemSize = 220;
    } else if (currentBreakpoint === breakpoints.desktop) {
      margin = 78;
      itemSize = 240;
    } else if (screenWidth < 1600) {
      margin = 104;
      itemSize = 260;
    } else {
      margin = 104;
      itemSize = 300;
    }

    const columnsPrSlide = Math.floor((screenWidth - margin * 2) / itemSize);

    /* eslint react/no-did-mount-set-state: 0 */
    this.setState({
      columnWidth: (screenWidth - margin * 2) / columnsPrSlide,
      columnsPrSlide,
      margin,
    });
    /* eslint react/no-did-mount-set-state: 1 */
  }

  render() {
    const {
      highlighted,
      themes,
      resourceTypes,
      topics,
      aboutNDLAVideo,
      moviesByType,
      fetchingMoviesByType,
      moreAboutNdlaFilm,
      language,
      t,
    } = this.props;
    const { resourceTypeSelected, loadingPlaceholderHeight } = this.state;

    const resourceTypeName =
      resourceTypeSelected &&
      resourceTypes.find(
        resourceType => resourceType.id === resourceTypeSelected,
      );

    return (
      <div>
        <FilmSlideshow slideshow={highlighted} />
        <FilmMovieSearch
          ariaControlId={ARIA_FILMCATEGORY_ID}
          topics={topics}
          resourceTypes={resourceTypes}
          resourceTypeSelected={resourceTypeName}
          onChangeResourceType={this.onChangeResourceType}
        />
        <div id={ARIA_FILMCATEGORY_ID} ref={this.movieListRef}>
          <CarouselAutosize
            breakpoints={[
              {
                until: 'mobile',
                columnsPrSlide: 1,
                distanceBetweenItems: spacing.spacingUnit / 2,
                margin: spacing.spacingUnit,
              },
              {
                until: 'mobileWide',
                columnsPrSlide: 2,
                distanceBetweenItems: spacing.spacingUnit / 2,
                margin: spacing.spacingUnit,
              },
              {
                until: 'tabletWide',
                columnsPrSlide: 3,
                distanceBetweenItems: spacing.spacingUnit / 2,
                margin: spacing.spacingUnit,
              },
              {
                until: 'desktop',
                columnsPrSlide: 4,
                distanceBetweenItems: spacing.spacingUnit,
                margin: spacing.spacingUnit * 2,
              },
              {
                until: 'wide',
                columnsPrSlide: 4,
                distanceBetweenItems: spacing.spacingUnit,
                margin: spacing.spacingUnit * 2,
              },
              {
                until: 'ultraWide',
                columnsPrSlide: 4,
                distanceBetweenItems: spacing.spacingUnit,
                margin: spacing.spacingUnit * 3.5,
              },
              {
                columnsPrSlide: 6,
                distanceBetweenItems: spacing.spacingUnit,
                margin: spacing.spacingUnit * 3.5,
              },
            ]}>
            {autoSizedProps =>
              resourceTypeSelected ? (
                <MovieGrid
                  autoSizedProps={autoSizedProps}
                  {...{
                    resourceTypeName,
                    fetchingMoviesByType,
                    moviesByType,
                    resourceTypes,
                    loadingPlaceholderHeight,
                  }}
                />
              ) : (
                themes.map(theme => (
                  <FilmMovieList
                    key={theme.name}
                    name={theme.name.find(n => n.language === language).name}
                    movies={theme.movies}
                    autoSizedProps={autoSizedProps}
                    slideForwardsLabel={t('ndlaFilm.slideForwardsLabel')}
                    slideBackwardsLabel={t('ndlaFilm.slideBackwardsLabel')}
                    resourceTypes={resourceTypes}
                  />
                ))
              )
            }
          </CarouselAutosize>
        </div>
        <AboutNdlaFilm
          aboutNDLAVideo={aboutNDLAVideo}
          moreAboutNdlaFilm={moreAboutNdlaFilm}
        />
      </div>
    );
  }
}

FilmFrontpage.propTypes = {
  fetchingMoviesByType: PropTypes.bool,
  moviesByType: PropTypes.arrayOf(PropTypes.object),
  highlighted: PropTypes.arrayOf(PropTypes.object),
  themes: PropTypes.arrayOf(PropTypes.object),
  topics: PropTypes.arrayOf(PropTypes.object),
  resourceTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.id,
    }),
  ),
  onSelectedMovieByType: PropTypes.func.isRequired,
  aboutNDLAVideo: PropTypes.node.isRequired,
  language: PropTypes.oneOf(['nb', 'nn', 'en']).isRequired,
  moreAboutNdlaFilm: PropTypes.any,
  t: PropTypes.func.isRequired,
  client: PropTypes.shape({ query: PropTypes.func.isRequired }).isRequired,
};

FilmFrontpage.defaultProps = {
  moviesByType: [],
  themes: [],
  movieThemes: [],
  resourceTypes: [],
  topics: [],
};

export default injectT(FilmFrontpage);
