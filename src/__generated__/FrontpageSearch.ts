/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrontpageSearch
// ====================================================

export interface FrontpageSearch_frontpageSearch_topicResources_results_resourceTypes {
  __typename: "SearchContextResourceTypes";
  name: string | null;
}

export interface FrontpageSearch_frontpageSearch_topicResources_results {
  __typename: "FrontpageSearchResult";
  id: string;
  name: string | null;
  path: string | null;
  resourceTypes: FrontpageSearch_frontpageSearch_topicResources_results_resourceTypes[] | null;
  subject: string | null;
}

export interface FrontpageSearch_frontpageSearch_topicResources_suggestions_suggestions_options {
  __typename: "SuggestOption";
  text: string | null;
  score: number | null;
}

export interface FrontpageSearch_frontpageSearch_topicResources_suggestions_suggestions {
  __typename: "SearchSuggestion";
  options: FrontpageSearch_frontpageSearch_topicResources_suggestions_suggestions_options[] | null;
}

export interface FrontpageSearch_frontpageSearch_topicResources_suggestions {
  __typename: "SuggestionResult";
  suggestions: FrontpageSearch_frontpageSearch_topicResources_suggestions_suggestions[] | null;
}

export interface FrontpageSearch_frontpageSearch_topicResources {
  __typename: "FrontPageResources";
  results: FrontpageSearch_frontpageSearch_topicResources_results[] | null;
  totalCount: number | null;
  suggestions: FrontpageSearch_frontpageSearch_topicResources_suggestions[] | null;
}

export interface FrontpageSearch_frontpageSearch_learningResources_results_resourceTypes {
  __typename: "SearchContextResourceTypes";
  name: string | null;
}

export interface FrontpageSearch_frontpageSearch_learningResources_results {
  __typename: "FrontpageSearchResult";
  id: string;
  name: string | null;
  path: string | null;
  resourceTypes: FrontpageSearch_frontpageSearch_learningResources_results_resourceTypes[] | null;
  subject: string | null;
}

export interface FrontpageSearch_frontpageSearch_learningResources_suggestions_suggestions_options {
  __typename: "SuggestOption";
  text: string | null;
  score: number | null;
}

export interface FrontpageSearch_frontpageSearch_learningResources_suggestions_suggestions {
  __typename: "SearchSuggestion";
  options: FrontpageSearch_frontpageSearch_learningResources_suggestions_suggestions_options[] | null;
}

export interface FrontpageSearch_frontpageSearch_learningResources_suggestions {
  __typename: "SuggestionResult";
  suggestions: FrontpageSearch_frontpageSearch_learningResources_suggestions_suggestions[] | null;
}

export interface FrontpageSearch_frontpageSearch_learningResources {
  __typename: "FrontPageResources";
  results: FrontpageSearch_frontpageSearch_learningResources_results[] | null;
  totalCount: number | null;
  suggestions: FrontpageSearch_frontpageSearch_learningResources_suggestions[] | null;
}

export interface FrontpageSearch_frontpageSearch {
  __typename: "FrontpageSearch";
  topicResources: FrontpageSearch_frontpageSearch_topicResources | null;
  learningResources: FrontpageSearch_frontpageSearch_learningResources | null;
}

export interface FrontpageSearch {
  frontpageSearch: FrontpageSearch_frontpageSearch | null;
}

export interface FrontpageSearchVariables {
  query?: string | null;
}
