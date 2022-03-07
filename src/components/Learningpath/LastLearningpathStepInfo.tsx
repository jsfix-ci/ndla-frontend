/*
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LearningPathLastStepNavigation } from '@ndla/ui';
import Resources from '../../containers/Resources/Resources';
import { GQLResourcePageQuery, GQLTopic } from '../../graphqlTypes';

interface Props {
  topic?: Required<GQLResourcePageQuery>['topic'];
  subject?: Required<GQLResourcePageQuery>['subject'];
  topicPath?: Omit<GQLTopic, 'paths' | 'metadata'>[];
  resourceTypes?: Required<GQLResourcePageQuery>['resourceTypes'];
  seqNo: number;
  numberOfLearningSteps: number;
  title: string;
  ndlaFilm?: boolean;
}
const LastLearningpathStepInfo = ({
  topic,
  subject,
  topicPath,
  resourceTypes,
  seqNo,
  numberOfLearningSteps,
  title,
  ndlaFilm,
}: Props) => {
  const isLastStep = seqNo === numberOfLearningSteps;

  if (!isLastStep) {
    return null;
  }
  const topicWithPath =
    topicPath && topic
      ? topicPath.find(path => path.id === topic.id)
      : undefined;

  const showResources =
    topic &&
    resourceTypes &&
    ((topic.coreResources && topic.coreResources.length > 0) ||
      (topic.supplementaryResources &&
        topic.supplementaryResources.length > 0));

  return (
    <LearningPathLastStepNavigation
      learningPathName={title}
      subject={
        subject && {
          url: subject.path,
          name: subject.name,
        }
      }
      topic={
        topicWithPath && {
          url: topicWithPath.path,
          name: topicWithPath.name,
        }
      }>
      {showResources && topic && (
        <Resources
          key="resources"
          resourceTypes={resourceTypes}
          topic={topic}
          ndlaFilm={ndlaFilm}
          {...topic}
        />
      )}
    </LearningPathLastStepNavigation>
  );
};

export default LastLearningpathStepInfo;
