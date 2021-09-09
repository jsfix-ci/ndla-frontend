/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupSearch
// ====================================================

export interface GroupSearch_groupSearch_resources_contexts_resourceTypes {
  __typename: "SearchContextResourceTypes";
  id: string | null;
  name: string | null;
}

export interface GroupSearch_groupSearch_resources_contexts {
  __typename: "SearchContext";
  language: string | null;
  path: string | null;
  breadcrumbs: string[] | null;
  subjectId: string | null;
  subject: string | null;
  relevance: string | null;
  resourceTypes: GroupSearch_groupSearch_resources_contexts_resourceTypes[] | null;
}

export interface GroupSearch_groupSearch_resources_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface GroupSearch_groupSearch_resources {
  __typename: "GroupSearchResult";
  id: number;
  path: string;
  name: string;
  ingress: string | null;
  traits: string[] | null;
  contexts: GroupSearch_groupSearch_resources_contexts[] | null;
  metaImage: GroupSearch_groupSearch_resources_metaImage | null;
}

export interface GroupSearch_groupSearch_aggregations_values {
  __typename: "BucketResult";
  value: string | null;
}

export interface GroupSearch_groupSearch_aggregations {
  __typename: "AggregationResult";
  values: GroupSearch_groupSearch_aggregations_values[] | null;
}

export interface GroupSearch_groupSearch_suggestions_suggestions_options {
  __typename: "SuggestOption";
  text: string | null;
}

export interface GroupSearch_groupSearch_suggestions_suggestions {
  __typename: "SearchSuggestion";
  options: GroupSearch_groupSearch_suggestions_suggestions_options[] | null;
}

export interface GroupSearch_groupSearch_suggestions {
  __typename: "SuggestionResult";
  suggestions: GroupSearch_groupSearch_suggestions_suggestions[] | null;
}

export interface GroupSearch_groupSearch {
  __typename: "GroupSearch";
  resources: GroupSearch_groupSearch_resources[] | null;
  aggregations: GroupSearch_groupSearch_aggregations[] | null;
  suggestions: GroupSearch_groupSearch_suggestions[] | null;
  resourceType: string | null;
  totalCount: number | null;
  language: string | null;
}

export interface GroupSearch {
  groupSearch: GroupSearch_groupSearch[] | null;
}

export interface GroupSearchVariables {
  resourceTypes?: string | null;
  contextTypes?: string | null;
  subjects?: string | null;
  levels?: string | null;
  query?: string | null;
  page?: string | null;
  pageSize?: string | null;
  language?: string | null;
  fallback?: string | null;
  aggregatePaths?: string[] | null;
}
