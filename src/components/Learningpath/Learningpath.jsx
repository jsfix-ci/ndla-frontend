/*
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectT } from '@ndla/i18n';
import {
  LearningPathWrapper,
  LearningPathMenu,
  LearningPathContent,
  LearningPathInformation,
  LearningPathSticky,
  LearningPathStickySibling,
  Breadcrumb,
} from '@ndla/ui';
import { getCookie, setCookie } from '@ndla/util';
import { toLocalLearningPath, toBreadcrumbItems } from '../../routeHelpers';
import LastLearningpathStepInfo from './LastLearningpathStepInfo';
import {
  TopicShape,
  SubjectShape,
  LearningpathShape,
  ResourceTypeShape,
  ResourceShape,
  LearningpathStepShape,
} from '../../shapes';
import LearningpathEmbed from './LearningpathEmbed';
import config from '../../config';
import { compose } from 'react-apollo';
import withRouter from 'react-router-dom/withRouter';

const LEARNING_PATHS_COOKIES_KEY = 'LEARNING_PATHS_COOKIES_KEY';

const Learningpath = ({
  learningpath,
  learningpathStep,
  resource,
  topic,
  subject,
  topicPath,
  resourceTypes,
  skipToContentId,
  locale,
  history,
  t,
}) => {
  const {
    id,
    learningsteps,
    duration,
    lastUpdated,
    copyright,
    title,
  } = learningpath;

  const lastUpdatedDate = new Date(lastUpdated);
  const stepId = learningpathStep.id;

  const lastUpdatedString = `${lastUpdatedDate.getDate()}.${
    lastUpdatedDate.getMonth() < 10 ? '0' : ''
  }${lastUpdatedDate.getMonth()}.${lastUpdatedDate.getFullYear()}`;

  const cookieKey = `${LEARNING_PATHS_COOKIES_KEY}_${id}`;

  const [useCookies, setUseCookies] = useState({});

  const updateCookies = () => {
    if (
      learningpath &&
      learningpathStep &&
      learningpathStep.seqNo !== undefined
    ) {
      const currentCookie = getCookie(cookieKey, document.cookie);
      const updatedCookie = currentCookie ? JSON.parse(currentCookie) : {};
      setUseCookies(updatedCookie);
      updatedCookie[learningpathStep.id] = true;
      setCookie(cookieKey, JSON.stringify(updatedCookie));
    }
  };
  const onKeyUpEvent = evt => {
    if (evt.code === 'ArrowRight' || evt.code === 'ArrowLeft') {
      const directionValue = evt.code === 'ArrowRight' ? 1 : -1;
      const newSeqNo = learningpathStep.seqNo + directionValue;
      console.log(newSeqNo);
      const newLearningpathStep = learningsteps.find(
        step => step.seqNo === newSeqNo,
      );
      if (newLearningpathStep) {
        history.push(
          toLocalLearningPath(
            learningpath.id,
            newLearningpathStep.id,
            resource,
          ),
        );
      }
    }
  };

  useEffect(() => {}, []);
  useEffect(() => updateCookies(), [learningpathStep.id]);
  useEffect(() => {
    window.addEventListener('keyup', onKeyUpEvent);
    updateCookies();
    return () => {
      window.removeEventListener('keyup', onKeyUpEvent);
    };
  }, []);

  return (
    <LearningPathWrapper>
      <div className="c-hero__content">
        <section>
          {subject && topicPath ? (
            <Breadcrumb
              items={toBreadcrumbItems(
                t('breadcrumb.toFrontpage'),
                [subject, ...topicPath, { name: learningpath.title, url: '' }],
                undefined,
              )}
            />
          ) : (
            <Breadcrumb
              items={toBreadcrumbItems(
                t('breadcrumb.toFrontpage'),
                [{ name: learningpath.title, url: '' }],
                undefined,
              )}
            />
          )}
        </section>
      </div>
      <LearningPathContent>
        <LearningPathMenu
          learningPathId={id}
          learningsteps={learningsteps}
          duration={duration}
          toLearningPathUrl={(pathId, stepId) =>
            toLocalLearningPath(pathId, stepId, resource)
          }
          lastUpdated={lastUpdatedString}
          copyright={copyright}
          stepId={stepId}
          currentIndex={learningpathStep.seqNo}
          name={title}
          cookies={useCookies}
          learningPathURL={config.learningPathDomain}
        />
        {learningpathStep && (
          <div>
            {learningpathStep.showTitle && (
              <LearningPathInformation
                title={learningpathStep.title}
                description={learningpathStep.description}
                license={learningpathStep.license}
              />
            )}
            <LearningpathEmbed
              skipToContentId={skipToContentId}
              locale={locale}
              resource={resource}
              topic={topic}
              learningpathStep={learningpathStep}
            />
            <LastLearningpathStepInfo
              topic={topic}
              topicPath={topicPath}
              resourceTypes={resourceTypes}
              seqNo={learningpathStep.seqNo}
              numberOfLearningSteps={learningsteps.length - 1}
              title={title}
              subject={subject}
            />
          </div>
        )}
      </LearningPathContent>
      <LearningPathSticky>
        {learningpathStep.seqNo > 0 ? (
          <LearningPathStickySibling
            arrow="left"
            pathId={learningpath.id}
            stepId={learningsteps[learningpathStep.seqNo - 1].id}
            toLearningPathUrl={(pathId, stepId) =>
              toLocalLearningPath(pathId, stepId, resource)
            }
            label={t('learningPath.previousArrow')}
            title={learningsteps[learningpathStep.seqNo - 1].title}
          />
        ) : (
          <div />
        )}
        {learningpathStep.seqNo < learningsteps.length - 1 && (
          <LearningPathStickySibling
            arrow="right"
            label={t('learningPath.nextArrow')}
            pathId={learningpath.id}
            stepId={learningsteps[learningpathStep.seqNo + 1].id}
            toLearningPathUrl={(pathId, stepId) =>
              toLocalLearningPath(pathId, stepId, resource)
            }
            title={learningsteps[learningpathStep.seqNo + 1].title}
          />
        )}
      </LearningPathSticky>
    </LearningPathWrapper>
  );
};

Learningpath.propTypes = {
  learningpath: LearningpathShape,
  learningpathStep: LearningpathStepShape,
  topic: TopicShape,
  topicPath: PropTypes.arrayOf(TopicShape),
  resourceTypes: PropTypes.arrayOf(ResourceTypeShape),
  subject: SubjectShape,
  resource: ResourceShape,
  skipToContentId: PropTypes.string,
  locale: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  injectT,
  withRouter,
)(Learningpath);
