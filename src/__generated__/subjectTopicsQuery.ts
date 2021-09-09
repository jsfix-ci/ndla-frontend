/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectTopicsQuery
// ====================================================

export interface subjectTopicsQuery_subject_topics_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
}

export interface subjectTopicsQuery_subject_topics {
  __typename: "Topic";
  id: string;
  name: string;
  parent: string | null;
  path: string | null;
  meta: subjectTopicsQuery_subject_topics_meta | null;
}

export interface subjectTopicsQuery_subject {
  __typename: "Subject";
  id: string;
  name: string;
  path: string;
  topics: subjectTopicsQuery_subject_topics[] | null;
}

export interface subjectTopicsQuery {
  subject: subjectTopicsQuery_subject | null;
}

export interface subjectTopicsQueryVariables {
  subjectId: string;
}
