/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: topicQueryWithBreadcrumbs
// ====================================================

export interface topicQueryWithBreadcrumbs_topics_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface topicQueryWithBreadcrumbs_topics_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
  metaImage: topicQueryWithBreadcrumbs_topics_meta_metaImage | null;
}

export interface topicQueryWithBreadcrumbs_topics {
  __typename: "Topic";
  id: string;
  name: string;
  parent: string | null;
  contentUri: string | null;
  path: string | null;
  meta: topicQueryWithBreadcrumbs_topics_meta | null;
  breadcrumbs: string[][] | null;
}

export interface topicQueryWithBreadcrumbs {
  topics: topicQueryWithBreadcrumbs_topics[] | null;
}

export interface topicQueryWithBreadcrumbsVariables {
  contentUri?: string | null;
  filterVisible?: boolean | null;
}
