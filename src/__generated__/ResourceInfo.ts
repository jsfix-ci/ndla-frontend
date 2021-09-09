/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ResourceInfo
// ====================================================

export interface ResourceInfo_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface ResourceInfo {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  paths: string[] | null;
  relevanceId: string | null;
  rank: number | null;
  resourceTypes: ResourceInfo_resourceTypes[] | null;
}
