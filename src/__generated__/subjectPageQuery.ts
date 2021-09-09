/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectPageQuery
// ====================================================

export interface subjectPageQuery_subject_topics_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQuery_subject_topics_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
  metaImage: subjectPageQuery_subject_topics_meta_metaImage | null;
}

export interface subjectPageQuery_subject_topics {
  __typename: "Topic";
  id: string;
  name: string;
  parent: string | null;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQuery_subject_topics_meta | null;
}

export interface subjectPageQuery_subject_allTopics_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQuery_subject_allTopics_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
  metaImage: subjectPageQuery_subject_allTopics_meta_metaImage | null;
}

export interface subjectPageQuery_subject_allTopics {
  __typename: "Topic";
  id: string;
  name: string;
  parent: string | null;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQuery_subject_allTopics_meta | null;
}

export interface subjectPageQuery_subject_subjectpage_topical_Topic_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQuery_subject_subjectpage_topical_Topic_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQuery_subject_subjectpage_topical_Topic_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQuery_subject_subjectpage_topical_Topic {
  __typename: "Topic";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQuery_subject_subjectpage_topical_Topic_meta | null;
}

export interface subjectPageQuery_subject_subjectpage_topical_Resource_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQuery_subject_subjectpage_topical_Resource_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQuery_subject_subjectpage_topical_Resource_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQuery_subject_subjectpage_topical_Resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface subjectPageQuery_subject_subjectpage_topical_Resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQuery_subject_subjectpage_topical_Resource_meta | null;
  resourceTypes: subjectPageQuery_subject_subjectpage_topical_Resource_resourceTypes[] | null;
}

export type subjectPageQuery_subject_subjectpage_topical = subjectPageQuery_subject_subjectpage_topical_Topic | subjectPageQuery_subject_subjectpage_topical_Resource;

export interface subjectPageQuery_subject_subjectpage_banner {
  __typename: "SubjectPageBanner";
  desktopUrl: string | null;
}

export interface subjectPageQuery_subject_subjectpage_about_visualElement {
  __typename: "SubjectPageVisualElement";
  type: string | null;
  url: string | null;
  alt: string | null;
}

export interface subjectPageQuery_subject_subjectpage_about {
  __typename: "SubjectPageAbout";
  title: string | null;
  description: string | null;
  visualElement: subjectPageQuery_subject_subjectpage_about_visualElement | null;
}

export interface subjectPageQuery_subject_subjectpage_editorsChoices_Topic_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQuery_subject_subjectpage_editorsChoices_Topic_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQuery_subject_subjectpage_editorsChoices_Topic_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQuery_subject_subjectpage_editorsChoices_Topic {
  __typename: "Topic";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQuery_subject_subjectpage_editorsChoices_Topic_meta | null;
}

export interface subjectPageQuery_subject_subjectpage_editorsChoices_Resource_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQuery_subject_subjectpage_editorsChoices_Resource_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQuery_subject_subjectpage_editorsChoices_Resource_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQuery_subject_subjectpage_editorsChoices_Resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface subjectPageQuery_subject_subjectpage_editorsChoices_Resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQuery_subject_subjectpage_editorsChoices_Resource_meta | null;
  resourceTypes: subjectPageQuery_subject_subjectpage_editorsChoices_Resource_resourceTypes[] | null;
}

export type subjectPageQuery_subject_subjectpage_editorsChoices = subjectPageQuery_subject_subjectpage_editorsChoices_Topic | subjectPageQuery_subject_subjectpage_editorsChoices_Resource;

export interface subjectPageQuery_subject_subjectpage {
  __typename: "SubjectPage";
  id: number;
  topical: subjectPageQuery_subject_subjectpage_topical | null;
  banner: subjectPageQuery_subject_subjectpage_banner | null;
  about: subjectPageQuery_subject_subjectpage_about | null;
  metaDescription: string | null;
  editorsChoices: subjectPageQuery_subject_subjectpage_editorsChoices[] | null;
}

export interface subjectPageQuery_subject {
  __typename: "Subject";
  id: string;
  name: string;
  path: string;
  topics: subjectPageQuery_subject_topics[] | null;
  allTopics: subjectPageQuery_subject_allTopics[] | null;
  subjectpage: subjectPageQuery_subject_subjectpage | null;
}

export interface subjectPageQuery {
  subject: subjectPageQuery_subject | null;
}

export interface subjectPageQueryVariables {
  subjectId: string;
}
