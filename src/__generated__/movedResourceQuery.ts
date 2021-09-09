/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: movedResourceQuery
// ====================================================

export interface movedResourceQuery_resource {
  __typename: "Resource";
  breadcrumbs: string[][] | null;
}

export interface movedResourceQuery {
  resource: movedResourceQuery_resource | null;
}

export interface movedResourceQueryVariables {
  resourceId: string;
}
