/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_results_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface Search_search_results_contexts_resourceTypes {
  __typename: "SearchContextResourceTypes";
  id: string | null;
  name: string | null;
  language: string | null;
}

export interface Search_search_results_contexts {
  __typename: "SearchContext";
  id: string | null;
  breadcrumbs: string[] | null;
  relevance: string | null;
  language: string | null;
  learningResourceType: string | null;
  path: string | null;
  resourceTypes: Search_search_results_contexts_resourceTypes[] | null;
  subject: string | null;
  subjectId: string | null;
}

export interface Search_search_results {
  __typename: "ArticleSearchResult" | "LearningpathSearchResult";
  id: number;
  url: string | null;
  metaDescription: string | null;
  metaImage: Search_search_results_metaImage | null;
  title: string | null;
  contexts: Search_search_results_contexts[] | null;
  supportedLanguages: string[] | null;
  traits: string[] | null;
}

export interface Search_search_suggestions_suggestions_options {
  __typename: "SuggestOption";
  text: string | null;
  score: number | null;
}

export interface Search_search_suggestions_suggestions {
  __typename: "SearchSuggestion";
  text: string | null;
  offset: number | null;
  length: number | null;
  options: Search_search_suggestions_suggestions_options[] | null;
}

export interface Search_search_suggestions {
  __typename: "SuggestionResult";
  name: string | null;
  suggestions: Search_search_suggestions_suggestions[] | null;
}

export interface Search_search {
  __typename: "Search";
  language: string | null;
  page: number | null;
  pageSize: number | null;
  results: Search_search_results[] | null;
  suggestions: Search_search_suggestions[] | null;
  totalCount: number | null;
}

export interface Search {
  search: Search_search | null;
}

export interface SearchVariables {
  query?: string | null;
  page?: string | null;
  pageSize?: string | null;
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
  grepCodes?: string | null;
}
