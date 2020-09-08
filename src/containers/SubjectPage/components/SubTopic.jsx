/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavigationTopicAbout, NavigationBox } from '@ndla/ui';
import Spinner from '@ndla/ui/lib/Spinner';

import { topicQuery } from '../../../queries';
import { useGraphQuery } from '../../../util/runQueries';
import ArticleContents from '../../../components/Article/ArticleContents';
import Resources from '../../Resources/Resources';
import { toTopic } from '../../../routeHelpers';

const SubTopic = ({
  topicId,
  subjectId,
  filterIds,
  setSelectedSubTopic,
  locale,
  ndlaFilm,
  subSubTopicId,
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(false);
  }, [topicId]);

  const { data, loading } = useGraphQuery(topicQuery, {
    variables: { topicId, subjectId, filterIds },
    onCompleted: data =>
      setSelectedSubTopic({
        id: data.topic.id,
        label: data.topic.name,
        url: data.topic.path,
      }),
  });

  if (loading) {
    return <Spinner />;
  }

  const topic = data.topic;
  const subTopics = topic.subtopics.map(item => ({
    id: item.id,
    label: item.name,
    selected: item.id === subSubTopicId,
    url: toTopic(subjectId, filterIds, topicId, topic.id, item.id)
  }));
  const resourceTypes = data.resourceTypes;

  return (
    <>
      <NavigationTopicAbout
        heading={topic.name}
        invertedStyle={ndlaFilm}
        ingress={topic.article?.introduction}
        showContent={showContent}
        onToggleShowContent={() => setShowContent(!showContent)}>
        <ArticleContents
          article={topic.article}
          locale={locale}
          modifier="in-topic"
        />
      </NavigationTopicAbout>
      {subTopics.length !== 0 && (
        <NavigationBox
          colorMode="light"
          heading="emner"
          items={subTopics}
          listDirection="horizontal"
          invertedStyle={ndlaFilm}
        />
      )}
      <Resources
        topic={topic}
        resourceTypes={resourceTypes}
        locale={locale}
        ndlaFilm={ndlaFilm}
      />
    </>
  );
};

SubTopic.propTypes = {
  topicId: PropTypes.string.isRequired,
  subjectId: PropTypes.string,
  filterIds: PropTypes.string,
  setSelectedSubTopic: PropTypes.func,
  locale: PropTypes.string,
  ndlaFilm: PropTypes.bool,
  subSubTopicId: PropTypes.string,
};

export default SubTopic;
