/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MovieInfo
// ====================================================

export interface MovieInfo_metaImage {
  __typename: "MetaImage";
  alt: string | null;
  url: string | null;
}

export interface MovieInfo_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface MovieInfo {
  __typename: "Movie";
  id: string;
  title: string | null;
  metaImage: MovieInfo_metaImage | null;
  metaDescription: string | null;
  resourceTypes: MovieInfo_resourceTypes[] | null;
  path: string | null;
}
