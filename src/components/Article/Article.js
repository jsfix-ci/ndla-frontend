/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Remarkable } from 'remarkable';

import { Article as UIArticle, ContentTypeBadge } from '@ndla/ui';
import config from '../../config';
import LicenseBox from '../license/LicenseBox';
import { ArticleShape, SubjectShape } from '../../shapes';
import CompetenceGoals from './CompetenceGoals';
import VisualElementWrapper from '../VisualElement/VisualElementWrapper';

function renderCompetenceGoals(article, locale, isTopicArticle, subject) {
  // Don't show competence goals for topics or articles without grepCodes
  if (
    !isTopicArticle &&
    (article.competenceGoals?.length || article.coreElements?.length)
  ) {
    // eslint-disable-next-line react/prop-types
    return ({ Dialog, dialogProps }) => (
      <CompetenceGoals
        article={article}
        language={locale}
        subject={subject}
        wrapperComponent={Dialog}
        wrapperComponentProps={dialogProps}
      />
    );
  }
  return null;
}

const renderNotions = (article, locale) => {
  const notions = article.concepts?.map(concept => {
    const { content: text, copyright, subjectNames, visualElement } = concept;
    const { creators: authors, license } = copyright;
    return {
      ...concept,
      text,
      locale,
      labels: subjectNames,
      authors,
      license: license?.license,
      media: visualElement && (
        <VisualElementWrapper visualElement={visualElement} locale={locale} />
      ),
    };
  });
  const related = article.relatedContent?.map(rc => {
    return {
      ...rc,
      label: rc.title,
    };
  });
  if (
    config.ndlaEnvironment === 'test' &&
    (notions?.length > 0 || related?.length > 0)
  ) {
    return {
      list: notions,
      related,
    };
  }
  return undefined;
};

const Article = ({
  article,
  resourceType,
  isTopicArticle,
  children,
  contentType,
  label,
  subject,
  locale,
  isResourceArticle,
  copyPageUrlLink,
  printUrl,
  ...rest
}) => {
  const { i18n } = useTranslation();
  const markdown = useMemo(() => {
    const md = new Remarkable({ breaks: true });
    md.inline.ruler.enable(['sub', 'sup']);
    md.block.ruler.disable(['list']);
    return md;
  }, []);

  if (!article) {
    return children || null;
  }

  const renderMarkdown = text => {
    return markdown.render(text);
  };

  const icon = contentType ? (
    <ContentTypeBadge type={contentType} background size="large" />
  ) : null;

  const competenceGoalTypes = [
    ...new Set(article.competenceGoals?.map(goal => goal.type)),
  ];

  return (
    <UIArticle
      article={article}
      icon={icon}
      locale={locale}
      licenseBox={<LicenseBox article={article} locale={locale} />}
      messages={{
        label,
      }}
      competenceGoals={renderCompetenceGoals(
        article,
        locale,
        isTopicArticle,
        subject,
      )}
      competenceGoalTypes={competenceGoalTypes}
      notions={renderNotions(article, i18n.language)}
      renderMarkdown={renderMarkdown}
      modifier={isResourceArticle ? resourceType : 'clean'}
      copyPageUrlLink={copyPageUrlLink}
      printUrl={printUrl}
      {...rest}>
      {children}
    </UIArticle>
  );
};

Article.propTypes = {
  article: ArticleShape,
  resourceType: PropTypes.string,
  children: PropTypes.node,
  contentType: PropTypes.string,
  isTopicArticle: PropTypes.bool,
  label: PropTypes.string.isRequired,
  subject: SubjectShape,
  locale: PropTypes.string.isRequired,
  isResourceArticle: PropTypes.bool,
  copyPageUrlLink: PropTypes.string,
  printUrl: PropTypes.string,
};

Article.defaultProps = {
  isTopicArticle: false,
  isResourceArticle: false,
};

export default Article;
