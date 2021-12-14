import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';
import Spinner from '@ndla/ui/lib/Spinner';
import Topic from './Topic';
import { topicQuery } from '../../../queries';
import { useGraphQuery } from '../../../util/runQueries';
import handleError, { getErrorStatuses } from '../../../util/handleError';
import { BreadcrumbItem, LocaleType } from '../../../interfaces';
import {
  GQLSubject,
  GQLTopicQuery,
  GQLTopicQueryVariables,
} from '../../../graphqlTypes';
import AccessDeniedPage from '../../AccessDeniedPage/AccessDeniedPage';

type Props = {
  topicId: string;
  subjectId: string;
  subTopicId?: string;
  locale: LocaleType;
  ndlaFilm?: boolean;
  onClickTopics: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  setBreadCrumb: (item: BreadcrumbItem) => void;
  index: number;
  showResources: boolean;
  subject: GQLSubject;
  history: RouteComponentProps['history'];
} & WithTranslation;

const TopicWrapper = ({
  subTopicId,
  topicId,
  subjectId,
  locale,
  ndlaFilm,
  onClickTopics,
  setBreadCrumb,
  showResources,
  subject,
  index,
  history,
}: Props) => {
  const { data, loading, error } = useGraphQuery<
    GQLTopicQuery,
    GQLTopicQueryVariables
  >(topicQuery, {
    variables: { topicId, subjectId },
    onCompleted: data => {
      if (data.topic) {
        setBreadCrumb({
          id: data.topic.id,
          label: data.topic.name,
          index: index,
          url: '',
        });
      }
    },
  });

  if (error) {
    handleError(error);
    const errorStatuses = getErrorStatuses(error);
    if (errorStatuses.includes(401) || errorStatuses.includes(403)) {
      history.replace('/403');
    } else {
      history.replace('/404');
    }
  }

  if (loading || !data?.topic?.article) {
    return <Spinner />;
  }

  return (
    <Topic
      topic={data.topic}
      resourceTypes={data.resourceTypes}
      topicId={topicId}
      subjectId={subjectId}
      subTopicId={subTopicId}
      locale={locale}
      ndlaFilm={ndlaFilm}
      onClickTopics={onClickTopics}
      showResources={showResources}
      subject={subject}
      loading={loading}
    />
  );
};
export default withTranslation()(TopicWrapper);
