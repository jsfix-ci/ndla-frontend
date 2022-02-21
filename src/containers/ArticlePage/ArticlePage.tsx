/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { OneColumn, LayoutItem } from '@ndla/ui';
import { withTracker } from '@ndla/tracker';
import { TFunction, WithTranslation, withTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';
import Article from '../../components/Article';
import ArticleHero from './components/ArticleHero';
import ArticleErrorMessage from './components/ArticleErrorMessage';
import { getContentType, isHeroContentType } from '../../util/getContentType';
import { getArticleScripts, Scripts } from '../../util/getArticleScripts';
import getStructuredDataFromArticle from '../../util/getStructuredDataFromArticle';
import { htmlTitle } from '../../util/titleHelper';
import { getArticleProps } from '../../util/getArticleProps';
import { getAllDimensions } from '../../util/trackingUtil';
import { transformArticle } from '../../util/transformArticle';
import Resources from '../Resources/Resources';
import {
  isLearningPathResource,
  getLearningPathUrlFromResource,
} from '../Resources/resourceHelpers';
import { RedirectExternal, Status } from '../../components';
import SocialMediaMetadata from '../../components/SocialMediaMetadata';
import { toBreadcrumbItems } from '../../routeHelpers';
import { getSubjectLongName } from '../../data/subjects';
import config from '../../config';
import {
  GQLResource,
  GQLResourcePageQuery,
  GQLResourceTypeDefinition,
  GQLTopic,
} from '../../graphqlTypes';
import { LocaleType } from '../../interfaces';
import { FeideUserWithGroups } from '../../util/feideApi';

interface Props extends WithTranslation {
  resource?: Required<GQLResourcePageQuery>['resource'];
  topic?: GQLResourcePageQuery['topic'];
  topicPath: Omit<GQLTopic, 'metadata' | 'paths'>[];
  relevance: string;
  subject?: GQLResourcePageQuery['subject'];
  resourceTypes?: GQLResourceTypeDefinition[];
  errors?: readonly GraphQLError[];
  ndlaFilm: boolean;
  loading?: boolean;
  user?: FeideUserWithGroups;
  skipToContentId?: string;
}

const ArticlePage = ({
  resource,
  topic,
  resourceTypes,
  subject,
  topicPath,
  errors,
  ndlaFilm,
  i18n,
  t,
  skipToContentId,
}: Props) => {
  const [scripts, setScripts] = useState<Scripts[]>([]);
  const locale = i18n.language as LocaleType;
  const subjectPageUrl = config.ndlaFrontendDomain;
  useEffect(() => {
    if (!resource?.article) return;
    const article = transformArticle(resource.article, locale);
    const scripts = getArticleScripts(article);
    setScripts(scripts);
  }, [locale, resource]);

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typeset === 'function') {
      window.MathJax.typeset();
    }
  });

  if (resource && isLearningPathResource(resource)) {
    const url = getLearningPathUrlFromResource(resource);
    return (
      <Status code={307}>
        <RedirectExternal to={url} />
      </Status>
    );
  }
  if (!resource?.article) {
    const error = errors?.find(e => e.path?.includes('resource'));
    return (
      <div>
        <ArticleErrorMessage
          //@ts-ignore
          status={error?.status}>
          {topic && (
            <Resources
              topic={topic}
              resourceTypes={resourceTypes}
              locale={locale}
              ndlaFilm={ndlaFilm}
            />
          )}
        </ArticleErrorMessage>
      </div>
    );
  }

  const article = transformArticle(resource.article, locale)!;
  const contentType = resource ? getContentType(resource) : undefined;
  const resourceType =
    contentType && isHeroContentType(contentType) ? contentType : undefined;

  const copyPageUrlLink = topic
    ? `${subjectPageUrl}${topic.path}/${resource.id.replace('urn:', '')}`
    : undefined;
  const printUrl = `${subjectPageUrl}/article-iframe/${locale}/article/${resource.article.id}`;

  const breadcrumbItems = toBreadcrumbItems(
    t('breadcrumb.toFrontpage'),
    [subject, ...topicPath, resource],
    locale,
  );

  return (
    <div>
      <ArticleHero
        ndlaFilm={ndlaFilm}
        subject={subject}
        resourceType={resourceType}
        metaImage={article.metaImage}
        breadcrumbItems={breadcrumbItems}
      />
      <Helmet>
        <title>{`${getDocumentTitle(t, resource, subject)}`}</title>
        {article?.metaDescription && (
          <meta name="description" content={article.metaDescription} />
        )}
        {scripts.map(script => (
          <script
            key={script.src}
            src={script.src}
            type={script.type}
            async={script.async}
            defer={script.defer}
          />
        ))}

        <script type="application/ld+json">
          {JSON.stringify(
            getStructuredDataFromArticle(resource.article, breadcrumbItems),
          )}
        </script>
      </Helmet>
      <SocialMediaMetadata
        title={htmlTitle(article.title, [subject?.name])}
        trackableContent={article}
        description={article.metaDescription}
        locale={locale}
        image={article.metaImage}
      />
      <OneColumn>
        <Article
          id={skipToContentId}
          article={article}
          locale={locale}
          resourceType={contentType}
          isResourceArticle
          copyPageUrlLink={copyPageUrlLink}
          printUrl={printUrl}
          subjectId={subject?.id}
          {...getArticleProps(resource, topic)}
        />
        {topic && (
          <LayoutItem layout="extend">
            <Resources
              topic={topic}
              resourceTypes={resourceTypes}
              locale={locale}
              ndlaFilm={ndlaFilm}
            />
          </LayoutItem>
        )}
      </OneColumn>
    </div>
  );
};

ArticlePage.willTrackPageView = (
  trackPageView: (item: Props) => void,
  currentProps: Props,
) => {
  if (currentProps.loading) {
    return;
  }
  trackPageView(currentProps);
};

ArticlePage.getDimensions = (props: Props) => {
  const articleProps = getArticleProps(props.resource);
  const { subject, topicPath, relevance, user } = props;
  const article = props.resource?.article;
  const longName = getSubjectLongName(
    subject?.id,
    props.i18n.language as LocaleType,
  );

  return getAllDimensions(
    { article, relevance, subject, topicPath, filter: longName, user },
    articleProps.label,
    true,
  );
};

const getDocumentTitle = (
  t: TFunction,
  resource?: Pick<GQLResource, 'article'>,
  subject?: GQLResourcePageQuery['subject'],
) =>
  htmlTitle(resource?.article?.title, [
    subject?.name,
    t('htmlTitles.titleTemplate'),
  ]);

ArticlePage.getDocumentTitle = ({ t, resource, subject }: Props) =>
  getDocumentTitle(t, resource, subject);

export default withTranslation()(withTracker(ArticlePage));
