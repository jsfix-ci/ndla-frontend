/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TopicInfo
// ====================================================

export interface TopicInfo_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface TopicInfo_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
  metaImage: TopicInfo_meta_metaImage | null;
}

export interface TopicInfo {
  __typename: "Topic";
  id: string;
  name: string;
  parent: string | null;
  contentUri: string | null;
  path: string | null;
  meta: TopicInfo_meta | null;
}
