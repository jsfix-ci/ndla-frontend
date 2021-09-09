/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TaxonomyEntityInfo
// ====================================================

export interface TaxonomyEntityInfo_Topic_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface TaxonomyEntityInfo_Topic_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: TaxonomyEntityInfo_Topic_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface TaxonomyEntityInfo_Topic {
  __typename: "Topic";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: TaxonomyEntityInfo_Topic_meta | null;
}

export interface TaxonomyEntityInfo_Resource_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface TaxonomyEntityInfo_Resource_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: TaxonomyEntityInfo_Resource_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface TaxonomyEntityInfo_Resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface TaxonomyEntityInfo_Resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: TaxonomyEntityInfo_Resource_meta | null;
  resourceTypes: TaxonomyEntityInfo_Resource_resourceTypes[] | null;
}

export type TaxonomyEntityInfo = TaxonomyEntityInfo_Topic | TaxonomyEntityInfo_Resource;
