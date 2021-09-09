/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: resourceTypesQuery
// ====================================================

export interface resourceTypesQuery_resourceTypes {
  __typename: "ResourceTypeDefinition";
  id: string;
  name: string;
}

export interface resourceTypesQuery {
  resourceTypes: resourceTypesQuery_resourceTypes[] | null;
}
