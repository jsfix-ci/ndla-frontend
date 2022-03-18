/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from '@apollo/client';
import { useContext } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';
import { ContentPlaceholder } from '@ndla/ui';

import DefaultErrorMessage from '../../components/DefaultErrorMessage';
import { getUrnIdsFromProps } from '../../routeHelpers';
import { getTopicPath } from '../../util/getTopicPath';
import { isLearningPathResource } from '../Resources/resourceHelpers';
import LearningpathPage, {
  learningpathPageFragments,
} from '../LearningpathPage/LearningpathPage';
import ArticlePage, { articlePageFragments } from '../ArticlePage/ArticlePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MovedResourcePage from '../MovedResourcePage/MovedResourcePage';
import { useGraphQuery } from '../../util/runQueries';
import { RELEVANCE_SUPPLEMENTARY } from '../../constants';
import { isAccessDeniedError } from '../../util/handleError';
import AccessDeniedPage from '../AccessDeniedPage/AccessDeniedPage';
import { GQLResource, GQLResourcePageQuery } from '../../graphqlTypes';
import { RootComponentProps } from '../../routes';
import { AuthContext } from '../../components/AuthenticationContext';

interface MatchParams {
  subjectId: string;
  stepId?: string;
  topicId?: string;
  topicPath: string;
  resourceId: string;
}

const urlInPaths = (
  location: Location,
  resource: Pick<GQLResource, 'paths'>,
) => {
  return resource.paths?.find(p => location.pathname.includes(p));
};

type Props = RootComponentProps & RouteComponentProps<MatchParams>;

const resourcePageQuery = gql`
  query resourcePage(
    $topicId: String!
    $subjectId: String!
    $resourceId: String!
  ) {
    subject(id: $subjectId) {
      topics(all: true) {
        ...LearningpathPage_TopicPath
        ...ArticlePage_TopicPath
      }
      ...LearningpathPage_Subject
      ...ArticlePage_Subject
    }
    resourceTypes {
      ...ArticlePage_ResourceType
      ...LearningpathPage_ResourceTypeDefinition
    }
    topic(id: $topicId, subjectId: $subjectId) {
      ...LearningpathPage_Topic
      ...ArticlePage_Topic
    }
    resource(id: $resourceId, subjectId: $subjectId, topicId: $topicId) {
      relevanceId
      paths
      ...MovedResourcePage_Resource
      ...ArticlePage_Resource
      ...LearningpathPage_Resource
    }
  }
  ${articlePageFragments.topic}
  ${MovedResourcePage.fragments.resource}
  ${articlePageFragments.resource}
  ${articlePageFragments.resourceType}
  ${articlePageFragments.subject}
  ${articlePageFragments.topicPath}
  ${learningpathPageFragments.topic}
  ${learningpathPageFragments.resourceType}
  ${learningpathPageFragments.resource}
  ${learningpathPageFragments.subject}
  ${learningpathPageFragments.topicPath}
`;
const ResourcePage = (props: Props) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const { subjectId, resourceId, topicId } = getUrnIdsFromProps(props);
  const { error, loading, data } = useGraphQuery<GQLResourcePageQuery>(
    resourcePageQuery,
    {
      variables: {
        subjectId,
        topicId,
        resourceId,
      },
    },
  );

  if (loading) {
    return <ContentPlaceholder />;
  }

  if (isAccessDeniedError(error)) {
    return <AccessDeniedPage />;
  }

  if (!data) {
    return <DefaultErrorMessage />;
  }

  if (!data.resource || !data.resource.path) {
    return <NotFoundPage />;
  }

  if (data.resource && !urlInPaths(props.location, data.resource)) {
    if (data.resource.paths?.length === 1) {
      return <Redirect to={data.resource.paths[0]!} />;
    } else {
      return <MovedResourcePage resource={data.resource} />;
    }
  }

  const { subject, resource, topic } = data;
  const relevanceId = resource.relevanceId;
  const relevance =
    relevanceId === RELEVANCE_SUPPLEMENTARY
      ? t('searchPage.searchFilterMessages.supplementaryRelevance')
      : t('searchPage.searchFilterMessages.coreRelevance');
  const topicPath =
    subject && topic ? getTopicPath(subject.id, topic.id, subject.topics) : [];
  if (isLearningPathResource(resource)) {
    return (
      <LearningpathPage
        locale={props.locale}
        ndlaFilm={props.ndlaFilm}
        skipToContentId={props.skipToContentId}
        stepId={props.match.params.stepId}
        user={user}
        data={{ ...data, relevance, topicPath }}
        loading={loading}
      />
    );
  }
  return (
    <ArticlePage
      skipToContentId={props.skipToContentId}
      resource={data.resource}
      topic={data.topic}
      topicPath={topicPath}
      relevance={relevance}
      subject={data.subject}
      resourceTypes={data.resourceTypes}
      errors={error?.graphQLErrors}
      ndlaFilm={!!props.ndlaFilm}
      loading={loading}
      user={user}
    />
  );
};

export default withRouter(ResourcePage);
