/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectsQuery
// ====================================================

export interface subjectsQuery_subjects {
  __typename: "Subject";
  id: string;
  name: string;
  path: string;
}

export interface subjectsQuery {
  subjects: subjectsQuery_subjects[] | null;
}
