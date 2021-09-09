/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchPageQuery
// ====================================================

export interface searchPageQuery_subjects {
  __typename: "Subject";
  id: string;
  name: string;
  path: string;
}

export interface searchPageQuery_resourceTypes_subtypes {
  __typename: "ResourceTypeDefinition";
  id: string;
  name: string;
}

export interface searchPageQuery_resourceTypes {
  __typename: "ResourceTypeDefinition";
  id: string;
  name: string;
  subtypes: searchPageQuery_resourceTypes_subtypes[] | null;
}

export interface searchPageQuery {
  subjects: searchPageQuery_subjects[] | null;
  resourceTypes: searchPageQuery_resourceTypes[] | null;
}
