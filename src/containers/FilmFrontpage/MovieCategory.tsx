/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { CarouselAutosize } from '@ndla/carousel';
//@ts-ignore
import { CalculatedCarouselProps, FilmMovieList, MovieGrid } from '@ndla/ui';
import { gql } from '@apollo/client';
import { WithTranslation, withTranslation } from 'react-i18next';
import { breakpoints, findName } from './filmHelper';
import { GQLMovieCategoryThemeFragment } from '../../graphqlTypes';
import { MoviesByType } from './NdlaFilmFrontpage';
import { movieFragment } from '../../queries';

interface Props {
  fetchingMoviesByType?: boolean;
  resourceTypeName?: { name: string; id: string };
  themes: GQLMovieCategoryThemeFragment[];
  resourceTypes: { name: string; id: string }[];
  moviesByType?: MoviesByType[];
  resourceTypeSelected?: string;
  loadingPlaceholderHeight?: string;
}

const MovieCategory = ({
  resourceTypeName,
  themes,
  resourceTypes,
  moviesByType,
  fetchingMoviesByType,
  resourceTypeSelected,
  loadingPlaceholderHeight,
  t,
  i18n,
}: Props & WithTranslation) => (
  <CarouselAutosize breakpoints={breakpoints} itemsLength={themes.length}>
    {(autoSizedProps: CalculatedCarouselProps) =>
      resourceTypeSelected ? (
        <MovieGrid
          autoSizedProps={autoSizedProps}
          resourceTypeName={resourceTypeName}
          fetchingMoviesByType={!!fetchingMoviesByType}
          moviesByType={moviesByType ?? []}
          resourceTypes={resourceTypes}
          loadingPlaceholderHeight={loadingPlaceholderHeight}
        />
      ) : (
        themes.map(theme => (
          <FilmMovieList
            key={theme.name[0]?.name}
            name={findName(theme.name ?? [], i18n.language)}
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
);

export default withTranslation()(MovieCategory);

export const movieCategoryThemeFragment = gql`
  fragment MovieCategoryTheme on MovieTheme {
    name {
      name
      language
    }
    movies {
      ...MovieInfo
    }
  }
  ${movieFragment}
`;
