/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useRef } from 'react';
import {
  ArticleSideBar,
  Breadcrumblist,
  MultidisciplinarySubjectHeader,
  OneColumn,
} from '@ndla/ui';
import { withTracker } from '@ndla/tracker';

import { WithTranslation, withTranslation } from 'react-i18next';
import { getAllDimensions } from '../../../util/trackingUtil';
import { htmlTitle } from '../../../util/titleHelper';
import { getSubjectLongName } from '../../../data/subjects';
import Article from '../../../components/Article';
import SocialMediaMetadata from '../../../components/SocialMediaMetadata';
import { scrollToRef } from '../../SubjectPage/subjectPageHelpers';
import Resources from '../../Resources/Resources';
import {
  GQLResourceTypeDefinition,
  GQLSubject,
  GQLTopic,
} from '../../../graphqlTypes';
import { LocaleType } from '../../../interfaces';

const filterCodes: Record<string, 'publicHealth' | 'democracy' | 'climate'> = {
  TT1: 'publicHealth',
  TT2: 'democracy',
  TT3: 'climate',
};

interface Props extends WithTranslation {
  copyPageUrlLink?: string;
  topic: GQLTopic;
  subject: GQLSubject;
  locale: LocaleType;
  resourceTypes?: GQLResourceTypeDefinition[];
}

const MultidisciplinarySubjectArticle = ({
  copyPageUrlLink,
  topic,
  subject,
  locale,
  resourceTypes,
}: Props) => {
  const resourcesRef = useRef(null);
  const onLinkToResourcesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToRef(resourcesRef, 0);
  };

  if (!topic.article) {
    return null;
  }

  const subjectLinks = topic.article.crossSubjectTopics?.map(
    crossSubjectTopic => ({
      label: crossSubjectTopic.title,
      url: crossSubjectTopic.path || subject.path,
    }),
  );
  const subjects = topic.article?.grepCodes
    ?.filter(grepCode => grepCode.startsWith('TT'))
    .map(code => filterCodes[code]!);

  return (
    <>
      <Breadcrumblist hideOnNarrow items={[]} startOffset={268}>
        <ArticleSideBar
          copyPageUrlLink={copyPageUrlLink}
          onLinkToResourcesClick={onLinkToResourcesClick}
          linkToResources="#"
        />
      </Breadcrumblist>
      <MultidisciplinarySubjectHeader
        subjects={subjects}
        subjectsLinks={subjectLinks}
      />
      <SocialMediaMetadata
        title={htmlTitle(topic.article.title, [subject?.name])}
        trackableContent={topic.article}
        description={topic.article.metaDescription}
        locale={locale}
        image={topic.article.metaImage}
      />
      <OneColumn>
        <Article article={topic.article} label="" locale={locale} />
        <div ref={resourcesRef}>
          <Resources
            topic={topic}
            resourceTypes={resourceTypes}
            locale={locale}
          />
        </div>
      </OneColumn>
    </>
  );
};

MultidisciplinarySubjectArticle.getDocumentTitle = ({ t, topic }: Props) => {
  return htmlTitle(topic.name || '', [t('htmlTitles.titleTemplate')]);
};

MultidisciplinarySubjectArticle.willTrackPageView = (
  trackPageView: (item: Props) => void,
  currentProps: Props,
) => {
  const { topic } = currentProps;
  if (topic?.article) {
    trackPageView(currentProps);
  }
};

MultidisciplinarySubjectArticle.getDimensions = (props: Props) => {
  const { topic, locale, subject } = props;
  const topicPath = topic.path
    ?.split('/')
    .slice(2)
    .map(t =>
      subject.allTopics?.find(topic => topic.id.replace('urn:', '') === t),
    );

  const longName = getSubjectLongName(subject?.id, locale);

  return getAllDimensions(
    {
      subject,
      topicPath,
      article: topic?.article,
      filter: longName,
    },
    undefined,
    true,
  );
};

export default withTranslation()(withTracker(MultidisciplinarySubjectArticle));
