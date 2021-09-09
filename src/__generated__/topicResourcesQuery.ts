/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: topicResourcesQuery
// ====================================================

export interface topicResourcesQuery_topic_coreResources_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface topicResourcesQuery_topic_coreResources {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  paths: string[] | null;
  relevanceId: string | null;
  rank: number | null;
  resourceTypes: topicResourcesQuery_topic_coreResources_resourceTypes[] | null;
}

export interface topicResourcesQuery_topic_supplementaryResources_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface topicResourcesQuery_topic_supplementaryResources {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  paths: string[] | null;
  relevanceId: string | null;
  rank: number | null;
  resourceTypes: topicResourcesQuery_topic_supplementaryResources_resourceTypes[] | null;
}

export interface topicResourcesQuery_topic {
  __typename: "Topic";
  id: string;
  coreResources: topicResourcesQuery_topic_coreResources[] | null;
  supplementaryResources: topicResourcesQuery_topic_supplementaryResources[] | null;
}

export interface topicResourcesQuery {
  topic: topicResourcesQuery_topic | null;
}

export interface topicResourcesQueryVariables {
  topicId: string;
  subjectId?: string | null;
}
