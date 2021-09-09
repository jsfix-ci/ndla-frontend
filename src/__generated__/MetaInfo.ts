/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MetaInfo
// ====================================================

export interface MetaInfo_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface MetaInfo {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: MetaInfo_metaImage | null;
  lastUpdated: string | null;
}
