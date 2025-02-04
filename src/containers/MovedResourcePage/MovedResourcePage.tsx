/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { SearchResultList, OneColumn } from '@ndla/ui';
import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { HelmetWithTracker } from '@ndla/tracker';
import { movedResourceQuery } from '../../queries';
import { useGraphQuery } from '../../util/runQueries';
import handleError from '../../util/handleError';
import { contentTypeMapping } from '../../util/getContentType';
import { resultsWithContentTypeBadgeAndImage } from '../SearchPage/searchHelpers';
import DefaultErrorMessage from '../../components/DefaultErrorMessage';
import {
  GQLMovedResourcePage_ResourceFragment,
  GQLMovedResourceQuery,
} from '../../graphqlTypes';

interface Props {
  resource: GQLMovedResourcePage_ResourceFragment;
}

const MovedResourcePage = ({ resource }: Props) => {
  const { t } = useTranslation();
  const isLearningpath = !!resource.learningpath;

  const { error, loading, data } = useGraphQuery<GQLMovedResourceQuery>(
    movedResourceQuery,
    {
      variables: { resourceId: resource.id },
    },
  );

  const convertResourceToResult = (
    resource: GQLMovedResourcePage_ResourceFragment,
  ) => {
    const resultId = isLearningpath
      ? resource.learningpath?.id
      : resource.article?.id;
    if (!resultId) return [];
    return [
      {
        title: resource.name,
        url: resource.path ?? '',
        contentType: resource.resourceTypes
          ?.map(type => contentTypeMapping[type.id])
          .find(t => t),
        type: resource.resourceTypes?.find(type => !contentTypeMapping[type.id])
          ?.name,
        subjects: data?.resource?.breadcrumbs?.map((crumb, index) => ({
          url: resource.paths?.[index],
          title: crumb[0] ?? '',
          breadcrumb: crumb,
        })),
        ...(isLearningpath
          ? {
              id: resultId,
              ingress: resource?.learningpath?.description ?? '',
              metaImage: {
                url: resource.learningpath?.coverphoto?.url,
                alt: '',
              },
            }
          : {
              id: resultId,
              ingress: resource?.article?.metaDescription ?? '',
              metaImage: {
                url: resource.article?.metaImage?.url,
                alt: resource.article?.metaImage?.alt,
              },
            }),
      },
    ];
  };

  if (loading) {
    return null;
  }

  if (error) {
    handleError(error);
    return <DefaultErrorMessage />;
  }

  const results = resultsWithContentTypeBadgeAndImage(
    convertResourceToResult(resource),
    t,
  );

  return (
    <>
      <HelmetWithTracker title={t('htmlTitles.movedResourcePage')} />
      <OneColumn>
        <h1>{t('movedResourcePage.title')}</h1>
        <div className="c-search-result">
          <SearchResultList results={results} />
        </div>
      </OneColumn>
    </>
  );
};

MovedResourcePage.fragments = {
  resource: gql`
    fragment MovedResourcePage_Resource on Resource {
      id
      name
      path
      paths
      breadcrumbs
      article(subjectId: $subjectId) {
        id
        metaDescription
        metaImage {
          url
          alt
        }
      }
      learningpath {
        id
        description
        coverphoto {
          url
        }
      }
      resourceTypes {
        id
        name
      }
    }
  `,
};

export default MovedResourcePage;
