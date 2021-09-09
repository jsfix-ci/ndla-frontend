/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SubjectPageInfo
// ====================================================

export interface SubjectPageInfo_topical_Topic_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface SubjectPageInfo_topical_Topic_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: SubjectPageInfo_topical_Topic_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface SubjectPageInfo_topical_Topic {
  __typename: "Topic";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: SubjectPageInfo_topical_Topic_meta | null;
}

export interface SubjectPageInfo_topical_Resource_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface SubjectPageInfo_topical_Resource_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: SubjectPageInfo_topical_Resource_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface SubjectPageInfo_topical_Resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface SubjectPageInfo_topical_Resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: SubjectPageInfo_topical_Resource_meta | null;
  resourceTypes: SubjectPageInfo_topical_Resource_resourceTypes[] | null;
}

export type SubjectPageInfo_topical = SubjectPageInfo_topical_Topic | SubjectPageInfo_topical_Resource;

export interface SubjectPageInfo_banner {
  __typename: "SubjectPageBanner";
  desktopUrl: string | null;
}

export interface SubjectPageInfo_about_visualElement {
  __typename: "SubjectPageVisualElement";
  type: string | null;
  url: string | null;
  alt: string | null;
}

export interface SubjectPageInfo_about {
  __typename: "SubjectPageAbout";
  title: string | null;
  description: string | null;
  visualElement: SubjectPageInfo_about_visualElement | null;
}

export interface SubjectPageInfo_editorsChoices_Topic_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface SubjectPageInfo_editorsChoices_Topic_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: SubjectPageInfo_editorsChoices_Topic_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface SubjectPageInfo_editorsChoices_Topic {
  __typename: "Topic";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: SubjectPageInfo_editorsChoices_Topic_meta | null;
}

export interface SubjectPageInfo_editorsChoices_Resource_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface SubjectPageInfo_editorsChoices_Resource_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: SubjectPageInfo_editorsChoices_Resource_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface SubjectPageInfo_editorsChoices_Resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface SubjectPageInfo_editorsChoices_Resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: SubjectPageInfo_editorsChoices_Resource_meta | null;
  resourceTypes: SubjectPageInfo_editorsChoices_Resource_resourceTypes[] | null;
}

export type SubjectPageInfo_editorsChoices = SubjectPageInfo_editorsChoices_Topic | SubjectPageInfo_editorsChoices_Resource;

export interface SubjectPageInfo {
  __typename: "SubjectPage";
  id: number;
  topical: SubjectPageInfo_topical | null;
  banner: SubjectPageInfo_banner | null;
  about: SubjectPageInfo_about | null;
  metaDescription: string | null;
  editorsChoices: SubjectPageInfo_editorsChoices[] | null;
}
