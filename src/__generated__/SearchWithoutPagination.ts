/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchWithoutPagination
// ====================================================

export interface SearchWithoutPagination_searchWithoutPagination_results_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface SearchWithoutPagination_searchWithoutPagination_results_contexts_resourceTypes {
  __typename: "SearchContextResourceTypes";
  id: string | null;
  name: string | null;
  language: string | null;
}

export interface SearchWithoutPagination_searchWithoutPagination_results_contexts {
  __typename: "SearchContext";
  breadcrumbs: string[] | null;
  relevance: string | null;
  language: string | null;
  learningResourceType: string | null;
  path: string | null;
  resourceTypes: SearchWithoutPagination_searchWithoutPagination_results_contexts_resourceTypes[] | null;
  subject: string | null;
}

export interface SearchWithoutPagination_searchWithoutPagination_results {
  __typename: "ArticleSearchResult" | "LearningpathSearchResult";
  id: number;
  url: string | null;
  metaDescription: string | null;
  metaImage: SearchWithoutPagination_searchWithoutPagination_results_metaImage | null;
  title: string | null;
  contexts: SearchWithoutPagination_searchWithoutPagination_results_contexts[] | null;
  supportedLanguages: string[] | null;
  traits: string[] | null;
}

export interface SearchWithoutPagination_searchWithoutPagination {
  __typename: "Search";
  language: string | null;
  page: number | null;
  pageSize: number | null;
  results: SearchWithoutPagination_searchWithoutPagination_results[] | null;
  totalCount: number | null;
}

export interface SearchWithoutPagination {
  searchWithoutPagination: SearchWithoutPagination_searchWithoutPagination | null;
}

export interface SearchWithoutPaginationVariables {
  query?: string | null;
  contextTypes?: string | null;
  language?: string | null;
  ids?: string | null;
  resourceTypes?: string | null;
  contextFilters?: string | null;
  levels?: string | null;
  sort?: string | null;
  fallback?: string | null;
  subjects?: string | null;
  languageFilter?: string | null;
  relevance?: string | null;
}
