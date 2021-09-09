/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: resourceQuery
// ====================================================

export interface resourceQuery_resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface resourceQuery_resource_article_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface resourceQuery_resource_article_requiredLibraries {
  __typename: "ArticleRequiredLibrary";
  name: string;
  url: string;
  mediaType: string;
}

export interface resourceQuery_resource_article_metaData_footnotes {
  __typename: "FootNote";
  ref: number;
  title: string;
  year: string;
  authors: string[];
  edition: string | null;
  publisher: string | null;
  url: string | null;
}

export interface resourceQuery_resource_article_metaData_images_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_article_metaData_images_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_images_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_images_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_images_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_article_metaData_images_copyright_license | null;
  creators: resourceQuery_resource_article_metaData_images_copyright_creators[] | null;
  processors: resourceQuery_resource_article_metaData_images_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_article_metaData_images_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_article_metaData_images {
  __typename: "ImageLicense";
  title: string;
  altText: string;
  src: string;
  copyright: resourceQuery_resource_article_metaData_images_copyright;
  copyText: string | null;
}

export interface resourceQuery_resource_article_metaData_h5ps_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_article_metaData_h5ps_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_h5ps_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_h5ps_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_h5ps_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_article_metaData_h5ps_copyright_license | null;
  creators: resourceQuery_resource_article_metaData_h5ps_copyright_creators[] | null;
  processors: resourceQuery_resource_article_metaData_h5ps_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_article_metaData_h5ps_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_article_metaData_h5ps {
  __typename: "H5pLicense";
  title: string;
  src: string | null;
  copyright: resourceQuery_resource_article_metaData_h5ps_copyright;
  copyText: string | null;
}

export interface resourceQuery_resource_article_metaData_audios_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_article_metaData_audios_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_audios_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_audios_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_audios_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_article_metaData_audios_copyright_license | null;
  creators: resourceQuery_resource_article_metaData_audios_copyright_creators[] | null;
  processors: resourceQuery_resource_article_metaData_audios_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_article_metaData_audios_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_article_metaData_audios {
  __typename: "AudioLicense";
  title: string;
  src: string;
  copyright: resourceQuery_resource_article_metaData_audios_copyright;
  copyText: string | null;
}

export interface resourceQuery_resource_article_metaData_brightcoves_iframe {
  __typename: "BrightcoveIframe";
  height: number;
  src: string;
  width: number;
}

export interface resourceQuery_resource_article_metaData_brightcoves_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_article_metaData_brightcoves_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_brightcoves_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_brightcoves_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_brightcoves_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_article_metaData_brightcoves_copyright_license | null;
  creators: resourceQuery_resource_article_metaData_brightcoves_copyright_creators[] | null;
  processors: resourceQuery_resource_article_metaData_brightcoves_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_article_metaData_brightcoves_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_article_metaData_brightcoves {
  __typename: "BrightcoveLicense";
  title: string;
  description: string | null;
  cover: string | null;
  src: string | null;
  download: string | null;
  iframe: resourceQuery_resource_article_metaData_brightcoves_iframe | null;
  copyright: resourceQuery_resource_article_metaData_brightcoves_copyright;
  uploadDate: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_article_metaData_concepts_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_article_metaData_concepts_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_concepts_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_concepts_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_metaData_concepts_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_article_metaData_concepts_copyright_license | null;
  creators: resourceQuery_resource_article_metaData_concepts_copyright_creators[] | null;
  processors: resourceQuery_resource_article_metaData_concepts_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_article_metaData_concepts_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_article_metaData_concepts {
  __typename: "ConceptLicense";
  title: string;
  src: string | null;
  copyright: resourceQuery_resource_article_metaData_concepts_copyright | null;
  copyText: string | null;
}

export interface resourceQuery_resource_article_metaData {
  __typename: "ArticleMetaData";
  copyText: string | null;
  footnotes: resourceQuery_resource_article_metaData_footnotes[] | null;
  images: resourceQuery_resource_article_metaData_images[] | null;
  h5ps: resourceQuery_resource_article_metaData_h5ps[] | null;
  audios: resourceQuery_resource_article_metaData_audios[] | null;
  brightcoves: resourceQuery_resource_article_metaData_brightcoves[] | null;
  concepts: resourceQuery_resource_article_metaData_concepts[] | null;
}

export interface resourceQuery_resource_article_competenceGoals_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface resourceQuery_resource_article_competenceGoals_competenceGoalSet {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface resourceQuery_resource_article_competenceGoals {
  __typename: "CompetenceGoal";
  id: string;
  title: string;
  type: string;
  curriculum: resourceQuery_resource_article_competenceGoals_curriculum | null;
  competenceGoalSet: resourceQuery_resource_article_competenceGoals_competenceGoalSet | null;
}

export interface resourceQuery_resource_article_coreElements_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface resourceQuery_resource_article_coreElements {
  __typename: "CoreElement";
  id: string;
  title: string;
  description: string | null;
  curriculum: resourceQuery_resource_article_coreElements_curriculum | null;
}

export interface resourceQuery_resource_article_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_article_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_article_copyright_license | null;
  creators: resourceQuery_resource_article_copyright_creators[] | null;
  processors: resourceQuery_resource_article_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_article_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_article_visualElement_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_article_visualElement_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_visualElement_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_visualElement_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_article_visualElement_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_article_visualElement_copyright_license | null;
  creators: resourceQuery_resource_article_visualElement_copyright_creators[] | null;
  processors: resourceQuery_resource_article_visualElement_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_article_visualElement_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_article_visualElement_brightcove_iframe {
  __typename: "BrightcoveIframe";
  src: string;
  height: number;
  width: number;
}

export interface resourceQuery_resource_article_visualElement_brightcove {
  __typename: "BrightcoveElement";
  videoid: string | null;
  player: string | null;
  account: string | null;
  caption: string | null;
  description: string | null;
  cover: string | null;
  src: string | null;
  download: string | null;
  iframe: resourceQuery_resource_article_visualElement_brightcove_iframe | null;
  uploadDate: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_article_visualElement_h5p {
  __typename: "H5pElement";
  src: string | null;
  thumbnail: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_article_visualElement_oembed {
  __typename: "VisualElementOembed";
  title: string | null;
  html: string | null;
  fullscreen: boolean | null;
}

export interface resourceQuery_resource_article_visualElement_image {
  __typename: "ImageElement";
  resourceid: string | null;
  alt: string | null;
  caption: string | null;
  lowerRightX: number | null;
  lowerRightY: number | null;
  upperLeftX: number | null;
  upperLeftY: number | null;
  focalX: number | null;
  focalY: number | null;
  src: string;
  altText: string;
  contentType: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_article_visualElement {
  __typename: "VisualElement";
  title: string | null;
  resource: string | null;
  url: string | null;
  copyright: resourceQuery_resource_article_visualElement_copyright | null;
  language: string | null;
  embed: string | null;
  brightcove: resourceQuery_resource_article_visualElement_brightcove | null;
  h5p: resourceQuery_resource_article_visualElement_h5p | null;
  oembed: resourceQuery_resource_article_visualElement_oembed | null;
  image: resourceQuery_resource_article_visualElement_image | null;
}

export interface resourceQuery_resource_article {
  __typename: "Article";
  id: number;
  title: string;
  introduction: string | null;
  content: string;
  metaDescription: string;
  metaImage: resourceQuery_resource_article_metaImage | null;
  supportedLanguages: string[] | null;
  tags: string[] | null;
  created: string;
  updated: string;
  published: string;
  oldNdlaUrl: string | null;
  grepCodes: string[] | null;
  requiredLibraries: resourceQuery_resource_article_requiredLibraries[] | null;
  metaData: resourceQuery_resource_article_metaData | null;
  competenceGoals: resourceQuery_resource_article_competenceGoals[] | null;
  coreElements: resourceQuery_resource_article_coreElements[] | null;
  oembed: string | null;
  copyright: resourceQuery_resource_article_copyright;
  visualElement: resourceQuery_resource_article_visualElement | null;
}

export interface resourceQuery_resource_learningpath_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
  description: string | null;
}

export interface resourceQuery_resource_learningpath_copyright_contributors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_copyright {
  __typename: "LearningpathCopyright";
  license: resourceQuery_resource_learningpath_copyright_license | null;
  contributors: resourceQuery_resource_learningpath_copyright_contributors[] | null;
}

export interface resourceQuery_resource_learningpath_coverphoto {
  __typename: "LearningpathCoverphoto";
  url: string | null;
  metaUrl: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_oembed {
  __typename: "LearningpathStepOembed";
  type: string;
  version: string;
  height: number;
  html: string;
  width: number;
}

export interface resourceQuery_resource_learningpath_learningsteps_embedUrl {
  __typename: "LearningpathStepEmbedUrl";
  url: string | null;
  embedType: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_requiredLibraries {
  __typename: "ArticleRequiredLibrary";
  name: string;
  url: string;
  mediaType: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_footnotes {
  __typename: "FootNote";
  ref: number;
  title: string;
  year: string;
  authors: string[];
  edition: string | null;
  publisher: string | null;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_license | null;
  creators: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_creators[] | null;
  processors: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images {
  __typename: "ImageLicense";
  title: string;
  altText: string;
  src: string;
  copyright: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images_copyright;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_license | null;
  creators: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_creators[] | null;
  processors: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps {
  __typename: "H5pLicense";
  title: string;
  src: string | null;
  copyright: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps_copyright;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_license | null;
  creators: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_creators[] | null;
  processors: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios {
  __typename: "AudioLicense";
  title: string;
  src: string;
  copyright: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios_copyright;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_iframe {
  __typename: "BrightcoveIframe";
  height: number;
  src: string;
  width: number;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_license | null;
  creators: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_creators[] | null;
  processors: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves {
  __typename: "BrightcoveLicense";
  title: string;
  description: string | null;
  cover: string | null;
  src: string | null;
  download: string | null;
  iframe: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_iframe | null;
  copyright: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves_copyright;
  uploadDate: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_license | null;
  creators: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_creators[] | null;
  processors: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts {
  __typename: "ConceptLicense";
  title: string;
  src: string | null;
  copyright: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts_copyright | null;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_metaData {
  __typename: "ArticleMetaData";
  copyText: string | null;
  footnotes: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_footnotes[] | null;
  images: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_images[] | null;
  h5ps: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_h5ps[] | null;
  audios: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_audios[] | null;
  brightcoves: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_brightcoves[] | null;
  concepts: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData_concepts[] | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_competenceGoals_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_competenceGoals_competenceGoalSet {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_competenceGoals {
  __typename: "CompetenceGoal";
  id: string;
  title: string;
  type: string;
  curriculum: resourceQuery_resource_learningpath_learningsteps_resource_article_competenceGoals_curriculum | null;
  competenceGoalSet: resourceQuery_resource_learningpath_learningsteps_resource_article_competenceGoals_competenceGoalSet | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_coreElements_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_coreElements {
  __typename: "CoreElement";
  id: string;
  title: string;
  description: string | null;
  curriculum: resourceQuery_resource_learningpath_learningsteps_resource_article_coreElements_curriculum | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_license | null;
  creators: resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_creators[] | null;
  processors: resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_learningpath_learningsteps_resource_article_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright {
  __typename: "Copyright";
  license: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_license | null;
  creators: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_creators[] | null;
  processors: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_processors[] | null;
  rightsholders: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_brightcove_iframe {
  __typename: "BrightcoveIframe";
  src: string;
  height: number;
  width: number;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_brightcove {
  __typename: "BrightcoveElement";
  videoid: string | null;
  player: string | null;
  account: string | null;
  caption: string | null;
  description: string | null;
  cover: string | null;
  src: string | null;
  download: string | null;
  iframe: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_brightcove_iframe | null;
  uploadDate: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_h5p {
  __typename: "H5pElement";
  src: string | null;
  thumbnail: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_oembed {
  __typename: "VisualElementOembed";
  title: string | null;
  html: string | null;
  fullscreen: boolean | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_image {
  __typename: "ImageElement";
  resourceid: string | null;
  alt: string | null;
  caption: string | null;
  lowerRightX: number | null;
  lowerRightY: number | null;
  upperLeftX: number | null;
  upperLeftY: number | null;
  focalX: number | null;
  focalY: number | null;
  src: string;
  altText: string;
  contentType: string | null;
  copyText: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement {
  __typename: "VisualElement";
  title: string | null;
  resource: string | null;
  url: string | null;
  copyright: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_copyright | null;
  language: string | null;
  embed: string | null;
  brightcove: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_brightcove | null;
  h5p: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_h5p | null;
  oembed: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_oembed | null;
  image: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement_image | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource_article {
  __typename: "Article";
  id: number;
  title: string;
  introduction: string | null;
  content: string;
  metaDescription: string;
  metaImage: resourceQuery_resource_learningpath_learningsteps_resource_article_metaImage | null;
  supportedLanguages: string[] | null;
  tags: string[] | null;
  created: string;
  updated: string;
  published: string;
  oldNdlaUrl: string | null;
  grepCodes: string[] | null;
  requiredLibraries: resourceQuery_resource_learningpath_learningsteps_resource_article_requiredLibraries[] | null;
  metaData: resourceQuery_resource_learningpath_learningsteps_resource_article_metaData | null;
  competenceGoals: resourceQuery_resource_learningpath_learningsteps_resource_article_competenceGoals[] | null;
  coreElements: resourceQuery_resource_learningpath_learningsteps_resource_article_coreElements[] | null;
  oembed: string | null;
  copyright: resourceQuery_resource_learningpath_learningsteps_resource_article_copyright;
  visualElement: resourceQuery_resource_learningpath_learningsteps_resource_article_visualElement | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  paths: string[] | null;
  relevanceId: string | null;
  rank: number | null;
  resourceTypes: resourceQuery_resource_learningpath_learningsteps_resource_resourceTypes[] | null;
  article: resourceQuery_resource_learningpath_learningsteps_resource_article | null;
}

export interface resourceQuery_resource_learningpath_learningsteps_license {
  __typename: "License";
  license: string;
  url: string | null;
  description: string | null;
}

export interface resourceQuery_resource_learningpath_learningsteps {
  __typename: "LearningpathStep";
  id: number;
  title: string;
  description: string | null;
  seqNo: number;
  oembed: resourceQuery_resource_learningpath_learningsteps_oembed | null;
  embedUrl: resourceQuery_resource_learningpath_learningsteps_embedUrl | null;
  resource: resourceQuery_resource_learningpath_learningsteps_resource | null;
  license: resourceQuery_resource_learningpath_learningsteps_license | null;
  type: string | null;
  showTitle: boolean | null;
}

export interface resourceQuery_resource_learningpath {
  __typename: "Learningpath";
  id: number;
  title: string;
  description: string | null;
  duration: number | null;
  lastUpdated: string | null;
  supportedLanguages: string[] | null;
  tags: string[] | null;
  copyright: resourceQuery_resource_learningpath_copyright | null;
  coverphoto: resourceQuery_resource_learningpath_coverphoto | null;
  learningsteps: resourceQuery_resource_learningpath_learningsteps[] | null;
}

export interface resourceQuery_resource {
  __typename: "Resource";
  id: string;
  name: string;
  contentUri: string | null;
  path: string | null;
  paths: string[] | null;
  relevanceId: string | null;
  rank: number | null;
  resourceTypes: resourceQuery_resource_resourceTypes[] | null;
  article: resourceQuery_resource_article | null;
  learningpath: resourceQuery_resource_learningpath | null;
}

export interface resourceQuery {
  resource: resourceQuery_resource | null;
}

export interface resourceQueryVariables {
  resourceId: string;
  subjectId?: string | null;
}
