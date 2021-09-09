/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectPageQueryWithTopics
// ====================================================

export interface subjectPageQueryWithTopics_subject_topics_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_subject_topics_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
  metaImage: subjectPageQueryWithTopics_subject_topics_meta_metaImage | null;
}

export interface subjectPageQueryWithTopics_subject_topics {
  __typename: "Topic";
  id: string;
  name: string;
  parent: string | null;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQueryWithTopics_subject_topics_meta | null;
}

export interface subjectPageQueryWithTopics_subject_allTopics_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_subject_allTopics_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
  metaImage: subjectPageQueryWithTopics_subject_allTopics_meta_metaImage | null;
}

export interface subjectPageQueryWithTopics_subject_allTopics {
  __typename: "Topic";
  id: string;
  name: string;
  parent: string | null;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQueryWithTopics_subject_allTopics_meta | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_topical_Topic_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_topical_Topic_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQueryWithTopics_subject_subjectpage_topical_Topic_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_topical_Topic {
  __typename: "Topic";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQueryWithTopics_subject_subjectpage_topical_Topic_meta | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_topical_Resource_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_topical_Resource_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQueryWithTopics_subject_subjectpage_topical_Resource_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_topical_Resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_topical_Resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQueryWithTopics_subject_subjectpage_topical_Resource_meta | null;
  resourceTypes: subjectPageQueryWithTopics_subject_subjectpage_topical_Resource_resourceTypes[] | null;
}

export type subjectPageQueryWithTopics_subject_subjectpage_topical = subjectPageQueryWithTopics_subject_subjectpage_topical_Topic | subjectPageQueryWithTopics_subject_subjectpage_topical_Resource;

export interface subjectPageQueryWithTopics_subject_subjectpage_banner {
  __typename: "SubjectPageBanner";
  desktopUrl: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_about_visualElement {
  __typename: "SubjectPageVisualElement";
  type: string | null;
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_about {
  __typename: "SubjectPageAbout";
  title: string | null;
  description: string | null;
  visualElement: subjectPageQueryWithTopics_subject_subjectpage_about_visualElement | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Topic_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Topic_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Topic_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Topic {
  __typename: "Topic";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Topic_meta | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource_meta {
  __typename: "Meta";
  id: number;
  title: string;
  introduction: string | null;
  metaDescription: string | null;
  metaImage: subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource_meta_metaImage | null;
  lastUpdated: string | null;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  meta: subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource_meta | null;
  resourceTypes: subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource_resourceTypes[] | null;
}

export type subjectPageQueryWithTopics_subject_subjectpage_editorsChoices = subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Topic | subjectPageQueryWithTopics_subject_subjectpage_editorsChoices_Resource;

export interface subjectPageQueryWithTopics_subject_subjectpage {
  __typename: "SubjectPage";
  id: number;
  topical: subjectPageQueryWithTopics_subject_subjectpage_topical | null;
  banner: subjectPageQueryWithTopics_subject_subjectpage_banner | null;
  about: subjectPageQueryWithTopics_subject_subjectpage_about | null;
  metaDescription: string | null;
  editorsChoices: subjectPageQueryWithTopics_subject_subjectpage_editorsChoices[] | null;
}

export interface subjectPageQueryWithTopics_subject {
  __typename: "Subject";
  id: string;
  name: string;
  path: string;
  topics: subjectPageQueryWithTopics_subject_topics[] | null;
  allTopics: subjectPageQueryWithTopics_subject_allTopics[] | null;
  subjectpage: subjectPageQueryWithTopics_subject_subjectpage | null;
}

export interface subjectPageQueryWithTopics_topic_alternateTopics_meta_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface subjectPageQueryWithTopics_topic_alternateTopics_meta {
  __typename: "Meta";
  id: number;
  metaDescription: string | null;
  metaImage: subjectPageQueryWithTopics_topic_alternateTopics_meta_metaImage | null;
}

export interface subjectPageQueryWithTopics_topic_alternateTopics {
  __typename: "Topic";
  id: string;
  name: string;
  path: string | null;
  breadcrumbs: string[][] | null;
  meta: subjectPageQueryWithTopics_topic_alternateTopics_meta | null;
}

export interface subjectPageQueryWithTopics_topic {
  __typename: "Topic";
  id: string;
  name: string;
  path: string | null;
  contentUri: string | null;
  alternateTopics: subjectPageQueryWithTopics_topic_alternateTopics[] | null;
}

export interface subjectPageQueryWithTopics_subjects_metadata {
  __typename: "TaxonomyMetadata";
  customFields: any | null;
}

export interface subjectPageQueryWithTopics_subjects {
  __typename: "Subject";
  id: string;
  name: string;
  path: string;
  metadata: subjectPageQueryWithTopics_subjects_metadata | null;
}

export interface subjectPageQueryWithTopics {
  subject: subjectPageQueryWithTopics_subject | null;
  topic: subjectPageQueryWithTopics_topic | null;
  subjects: subjectPageQueryWithTopics_subjects[] | null;
}

export interface subjectPageQueryWithTopicsVariables {
  subjectId: string;
  filterIds?: string | null;
  topicId: string;
  includeTopic: boolean;
}
