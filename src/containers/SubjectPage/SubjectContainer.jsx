/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {
  OneColumn,
  NavigationHeading,
  Breadcrumblist,
  SubjectBanner,
  LayoutItem,
} from '@ndla/ui';
import { injectT } from '@ndla/i18n';
import { withTracker } from '@ndla/tracker';
import { useIntersectionObserver } from '@ndla/hooks';

import { LocationShape } from '../../shapes';
import SubjectPageContent from './components/SubjectPageContent';
import SubjectEditorChoices from './components/SubjectEditorChoices';
import { getFiltersFromUrl } from '../../util/filterHelper';
import SocialMediaMetadata from '../../components/SocialMediaMetadata';
import { scrollToRef } from './subjectPageHelpers';
import SubjectPageInformation from './components/SubjectPageInformation';
import { getSubjectBySubjectIdFilters } from '../../data/subjects';
import { GraphQLSubjectShape } from '../../graphqlShapes';
import { parseAndMatchUrl } from '../../util/urlHelper';

const getDocumentTitle = ({ t, data }) => {
  return `${data?.subject?.name || ''}${t('htmlTitles.titleTemplate')}`;
};

const SubjectPage = ({
  history,
  location,
  locale,
  skipToContentId,
  t,
  subjectId,
  urlTopicId,
  urlSubTopicId,
  urlSubSubTopicId,
  data,
  ndlaFilm,
}) => {
  const { subject = {} } = data;
  const { name: subjectName } = subject;
  const subjectpage = subject.subjectpage || {};

  const { editorsChoices, layout, about, metaDescription } = subjectpage;

  const activeFilterId = getFiltersFromUrl(location);
  const filter = subject.filters.filter(filter =>
    activeFilterId.split(',').includes(filter.id),
  );

  const [topic, setTopic] = useState(null);
  const [subTopic, setSubTopic] = useState(null);
  const [subSubTopic, setSubSubTopic] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('Subject');

  useEffect(() => {
    if (!urlTopicId) setTopic(undefined);
    if (!urlSubTopicId) setSubTopic(undefined);
    if (!urlSubSubTopicId) setSubSubTopic(undefined);
  });

  /* const [programme] = useState(() => {
    const programmeData = {
      name: data?.subject?.name,
      url: '',
    };
    const programme = getProgrammeByPath(location.pathname, locale);
    if (programme) {
      programmeData.name = programme.name[locale];
      programmeData.url = toProgramme(programme.url[locale]);
    }
    return programmeData;
  }); */
  const [subjectNames] = useState(() => {
    const subjectData = getSubjectBySubjectIdFilters(
      subject.id,
      activeFilterId.split(','),
    );
    if (subjectData) {
      return {
        name: subjectData.name[locale],
        longName: subjectData.longName[locale],
      };
    }
    // Fallback if subject and filters are missing in static constants
    const filterString =
      filter.length > 0
        ? filter.map(f => f.name).reduce((a, b) => a + ', ' + b)
        : '';
    return {
      name: subjectName,
      longName: `${subjectName} ${filterString}`,
    };
  });

  const breadCrumbs = [
    /*{
      id: subject.id,
      label: programme.name,
      typename: 'Subjecttype',
      url: programme.url,
    },*/
    ...(filter.length > 0
      ? [
          {
            id: filter.id,
            label: subjectNames.name,
            typename: 'Subject',
            url: '#',
            isCurrent: currentLevel === 'Subject',
          },
        ]
      : []),
    ...(topic ? [{ ...topic, isCurrent: currentLevel === 'Topic' }] : []),
    ...(subTopic
      ? [{ ...subTopic, isCurrent: currentLevel === 'Subtopic' }]
      : []),
    ...(subSubTopic
      ? [{ ...subSubTopic, isCurrent: currentLevel === 'SubSubtopic' }]
      : []),
  ];

  const setTopicBreadCrumb = topic => {
    setCurrentLevel('Topic');
    setTopic(
      topic
        ? {
            ...topic,
            typename: 'Topic',
            url: '#',
          }
        : null,
    );
  };

  const setSubTopicBreadCrumb = topic => {
    setCurrentLevel('Subtopic');
    setSubTopic(
      topic
        ? {
            ...topic,
            typename: 'Subtopic',
            url: '#',
          }
        : null,
    );
  };

  const setSubSubTopicBreadCrumb = topic => {
    setCurrentLevel('SubSubtopic');
    setSubSubTopic(
      topic
        ? {
            ...topic,
            typename: 'SubSubtopic',
            url: '#',
          }
        : null,
    );
  };

  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const subRef = useRef(null);
  const subSubRef = useRef(null);

  const handleNav = (e, item) => {
    e.preventDefault();
    const { typename } = item;
    setCurrentLevel(typename);
    if (typename === 'Subjecttype' || typename === 'Subject') {
      scrollToRef(headerRef);
    } else if (typename === 'Topic') {
      scrollToRef(mainRef);
    } else if (typename === 'Subtopic') {
      scrollToRef(subRef);
    } else if (typename === 'SubSubtopic') {
      scrollToRef(subSubRef);
    }
  };

  const onClickTopics = e => {
    e.preventDefault();
    const path = parseAndMatchUrl(e.currentTarget.href);
    history.replace(`${path.url}?filters=${activeFilterId}`);
  };

  // show/hide breadcrumb based on intersection
  const [containerRef, { entry }] = useIntersectionObserver({
    root: null,
    rootMargin: '-275px',
  });
  const showBreadCrumb = entry && entry.isIntersecting;
  const moveBannerUp = !topic;
  return (
    <>
      <Helmet>
        <title>{`${getDocumentTitle({ t, data })}`}</title>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
      </Helmet>
      <div ref={containerRef}>
        <OneColumn>
          <LayoutItem layout="extend">
            {about && (
              <SocialMediaMetadata
                title={about.title}
                description={metaDescription}
                locale={locale}
                image={
                  about.visualElement && {
                    src: about.visualElement.url,
                    altText: about.visualElement.alt,
                  }
                }
              />
            )}
            <div ref={headerRef}>
              <NavigationHeading invertedStyle={ndlaFilm}>
                {subjectNames.longName}
              </NavigationHeading>
            </div>
            <SubjectPageContent
              skipToContentId={skipToContentId}
              layout={layout}
              locale={locale}
              subjectId={subjectId}
              subjectpage={subjectpage}
              subject={subject}
              filterIds={activeFilterId}
              topicId={urlTopicId}
              subTopicId={urlSubTopicId}
              setSelectedTopic={setTopicBreadCrumb}
              setSubTopic={setSubTopic}
              setSelectedSubTopic={setSubTopicBreadCrumb}
              ndlaFilm={ndlaFilm}
              mainRef={mainRef}
              subRef={subRef}
              subSubRef={subSubRef}
              subSubTopicId={urlSubSubTopicId}
              setSelectedSubSubTopic={setSubSubTopicBreadCrumb}
              onClickTopics={onClickTopics}
            />
          </LayoutItem>
        </OneColumn>
      </div>
      {subjectpage.banner && (
        <SubjectBanner
          image={subjectpage.banner.desktopUrl}
          negativeTopMargin={moveBannerUp}
        />
      )}
      {false && subjectpage.about && (
        <OneColumn wide>
          <SubjectPageInformation subjectpage={subjectpage} wide />
        </OneColumn>
      )}
      {false && editorsChoices && (
        <SubjectEditorChoices
          wideScreen
          editorsChoices={editorsChoices}
          locale={locale}
        />
      )}
      <OneColumn wide>
        <Breadcrumblist
          items={breadCrumbs}
          onNav={handleNav}
          invertedStyle={ndlaFilm}
          isVisible={showBreadCrumb}
        />
      </OneColumn>
    </>
  );
};

SubjectPage.getDocumentTitle = getDocumentTitle;

SubjectPage.willTrackPageView = (trackPageView, currentProps) => {
  const { data } = currentProps;
  if (data?.subject?.topics?.length > 0) {
    trackPageView(currentProps);
  }
};

SubjectPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: LocationShape,
  match: PropTypes.shape({
    params: PropTypes.shape({
      subjectId: PropTypes.string.isRequired,
      topicId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  locale: PropTypes.string.isRequired,
  ndlaFilm: PropTypes.bool,
  skipToContentId: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    subject: GraphQLSubjectShape,
  }),
  urlTopicId: PropTypes.string,
  urlSubTopicId: PropTypes.string,
  urlSubSubTopicId: PropTypes.string,
};

export default injectT(withTracker(SubjectPage));
