/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useState } from 'react';
// @ts-ignore
import { OneColumn, ToolboxInfo, Topic } from '@ndla/ui';
// @ts-ignore
import { getUrnIdsFromProps, toTopic } from '../../routeHelpers';
import { useGraphQuery } from '../../util/runQueries';
import { subjectPageQuery } from '../../queries';
import { DefaultErrorMessage } from '../../components/DefaultErrorMessage';
import { GQLTopic } from '../../graphqlTypes';

type Props = {
  match: any;
};

// TODO: fikse alle typer!

const ToolboxSubjectPage = ({ match }: Props) => {
  const { subjectId, topicList: selectedTopics } = getUrnIdsFromProps({
    ndlaFilm: false,
    match,
  });
  const refs = selectedTopics.map((_: unknown) => React.createRef()); // TODO: type, lodash??
  const [topics, setTopics] = useState<unknown[]>([]);



  useEffect(() => {
    if (selectedTopics.length) {
      const ref = refs[selectedTopics.lenght - 1];
      const positionFromTop =
        ref.current?.getBoundingClientRect().top +
        document.documentElement.scrollTop;
      window.scrollTo({
        top: positionFromTop - 100,
        behavior: 'smooth',
      });
    }
  }, [selectedTopics, refs]);

  const { loading, data } = useGraphQuery(subjectPageQuery, {
    variables: {
      subjectId,
    },
  });

  if (loading) {
    return null;
  }

  if (!data) {
    return <DefaultErrorMessage />;
  }

  const { subject = {} } = data;

  const mainTopics = subject.topics.map((topic: GQLTopic) => {
    console.log('hvordan ser topoc ut?', topic);
    return {
      ...topic,
      label: topic.name,
      selected: topic.id === selectedTopics[0],
      url: toTopic(subject.id, [], topic.id),
    };
  });

  const selectionLimit = 2;
  const isNotLastTopic = selectedTopics.length < selectionLimit;
  const selectedSubject =
    isNotLastTopic ||
    subject.topics.find((topic: GQLTopic) => topic.id === selectedTopics[0]);

  const cards = isNotLastTopic
    ? []
    : subject.allTopics
        .filter((topic: GQLTopic) => {
          const selectedId = selectedTopics[selectedTopics.length - 1];
          return topic.parent === selectedId;
        })
        .map((topic: GQLTopic) => ({
          title: topic.name,
          topicId: topic.id,
          introduction: topic.meta?.metaDescription,
          image: topic.meta?.metaImage?.url,
          imageAlt: topic.meta?.metaImage?.alt,
          subjects: [selectedSubject.name],
          url: topic.path,
          ...topic,
        }));


  // const onTopicSelected = (index: number, id?: string) => {
  //   if (id && (!selectedTopics[index] || selectedTopics[index] !== id)) {
  //     const updatedSelectedTopics = selectedTopics.slice(0, index + 1); // When a new topic is selected on a level, all sub-levels are inconsistent -> remove
  //     updatedSelectedTopics[index] = id;
  //     setSelectedTopics(updatedSelectedTopics);
  //     if (index === 0) {
  //       scrollToTopic(topicContentRef);
  //     } else {
  //       scrollToTopic(topicRefs[index - 1]);
  //     }
  //   }
  // };
  
  console.log('Topics??', subject.topics)

  const TopicBoxes = () => {};
    // selectedTopics.map((topicId, index) => {
    //   return (
    //     <div key={index} ref={refs[index]}>
    //       <MultidisciplinaryTopicWrapper
    //         disableNav={index >= selectionLimit - 1}
    //         topicId={topicId}
    //         filterIds=""
    //         subjectId={subject.id}
    //         subTopicId={selectedTopics[index + 1]}
    //         locale={locale}
    //         index={index}
    //         subject={subject}
    //       />
    //     </div>
    //   );



  return (
    <OneColumn>
      <ToolboxInfo
        topics={[]}
        onSelectTopic={() => {}}
        title="Verktøykassa"
        introduction="Hva vil det si å arbeide utforskende? Hvordan kan du lære bedre? Hva skal til for å få gruppearbeid til å fungere? I Verktøykassa finner både elever og lærere ressurser som er aktuelle for alle fag, og som støtter opp under læringsarbeid og utvikling av kunnskap, ferdigheter og forståelse."
      />
      {subject.topics.map((topic : any, index : any) => (
        <div key={index} ref={refs[index]}>
          <Topic
            frame={!topic.subTopics} // Only leafs should have frame
            isLoading={topic.loading}
            subTopics={topic.subTopics}
            onSubTopicSelected={(e, id) => {console.log(id)}} // onTopicSelected(index + 1, id)}
            topic={topic.content}
          />
        </div>
      ))}
    </OneColumn>
  );
};

export default ToolboxSubjectPage;
