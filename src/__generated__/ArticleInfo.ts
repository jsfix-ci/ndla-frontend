/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArticleInfo
// ====================================================

export interface ArticleInfo_metaImage {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface ArticleInfo_requiredLibraries {
  __typename: "ArticleRequiredLibrary";
  name: string;
  url: string;
  mediaType: string;
}

export interface ArticleInfo_metaData_footnotes {
  __typename: "FootNote";
  ref: number;
  title: string;
  year: string;
  authors: string[];
  edition: string | null;
  publisher: string | null;
  url: string | null;
}

export interface ArticleInfo_metaData_images_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface ArticleInfo_metaData_images_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_images_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_images_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_images_copyright {
  __typename: "Copyright";
  license: ArticleInfo_metaData_images_copyright_license | null;
  creators: ArticleInfo_metaData_images_copyright_creators[] | null;
  processors: ArticleInfo_metaData_images_copyright_processors[] | null;
  rightsholders: ArticleInfo_metaData_images_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface ArticleInfo_metaData_images {
  __typename: "ImageLicense";
  title: string;
  altText: string;
  src: string;
  copyright: ArticleInfo_metaData_images_copyright;
  copyText: string | null;
}

export interface ArticleInfo_metaData_h5ps_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface ArticleInfo_metaData_h5ps_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_h5ps_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_h5ps_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_h5ps_copyright {
  __typename: "Copyright";
  license: ArticleInfo_metaData_h5ps_copyright_license | null;
  creators: ArticleInfo_metaData_h5ps_copyright_creators[] | null;
  processors: ArticleInfo_metaData_h5ps_copyright_processors[] | null;
  rightsholders: ArticleInfo_metaData_h5ps_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface ArticleInfo_metaData_h5ps {
  __typename: "H5pLicense";
  title: string;
  src: string | null;
  copyright: ArticleInfo_metaData_h5ps_copyright;
  copyText: string | null;
}

export interface ArticleInfo_metaData_audios_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface ArticleInfo_metaData_audios_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_audios_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_audios_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_audios_copyright {
  __typename: "Copyright";
  license: ArticleInfo_metaData_audios_copyright_license | null;
  creators: ArticleInfo_metaData_audios_copyright_creators[] | null;
  processors: ArticleInfo_metaData_audios_copyright_processors[] | null;
  rightsholders: ArticleInfo_metaData_audios_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface ArticleInfo_metaData_audios {
  __typename: "AudioLicense";
  title: string;
  src: string;
  copyright: ArticleInfo_metaData_audios_copyright;
  copyText: string | null;
}

export interface ArticleInfo_metaData_brightcoves_iframe {
  __typename: "BrightcoveIframe";
  height: number;
  src: string;
  width: number;
}

export interface ArticleInfo_metaData_brightcoves_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface ArticleInfo_metaData_brightcoves_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_brightcoves_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_brightcoves_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_brightcoves_copyright {
  __typename: "Copyright";
  license: ArticleInfo_metaData_brightcoves_copyright_license | null;
  creators: ArticleInfo_metaData_brightcoves_copyright_creators[] | null;
  processors: ArticleInfo_metaData_brightcoves_copyright_processors[] | null;
  rightsholders: ArticleInfo_metaData_brightcoves_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface ArticleInfo_metaData_brightcoves {
  __typename: "BrightcoveLicense";
  title: string;
  description: string | null;
  cover: string | null;
  src: string | null;
  download: string | null;
  iframe: ArticleInfo_metaData_brightcoves_iframe | null;
  copyright: ArticleInfo_metaData_brightcoves_copyright;
  uploadDate: string | null;
  copyText: string | null;
}

export interface ArticleInfo_metaData_concepts_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface ArticleInfo_metaData_concepts_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_concepts_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_concepts_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_metaData_concepts_copyright {
  __typename: "Copyright";
  license: ArticleInfo_metaData_concepts_copyright_license | null;
  creators: ArticleInfo_metaData_concepts_copyright_creators[] | null;
  processors: ArticleInfo_metaData_concepts_copyright_processors[] | null;
  rightsholders: ArticleInfo_metaData_concepts_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface ArticleInfo_metaData_concepts {
  __typename: "ConceptLicense";
  title: string;
  src: string | null;
  copyright: ArticleInfo_metaData_concepts_copyright | null;
  copyText: string | null;
}

export interface ArticleInfo_metaData {
  __typename: "ArticleMetaData";
  copyText: string | null;
  footnotes: ArticleInfo_metaData_footnotes[] | null;
  images: ArticleInfo_metaData_images[] | null;
  h5ps: ArticleInfo_metaData_h5ps[] | null;
  audios: ArticleInfo_metaData_audios[] | null;
  brightcoves: ArticleInfo_metaData_brightcoves[] | null;
  concepts: ArticleInfo_metaData_concepts[] | null;
}

export interface ArticleInfo_competenceGoals_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface ArticleInfo_competenceGoals_competenceGoalSet {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface ArticleInfo_competenceGoals {
  __typename: "CompetenceGoal";
  id: string;
  title: string;
  type: string;
  curriculum: ArticleInfo_competenceGoals_curriculum | null;
  competenceGoalSet: ArticleInfo_competenceGoals_competenceGoalSet | null;
}

export interface ArticleInfo_coreElements_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface ArticleInfo_coreElements {
  __typename: "CoreElement";
  id: string;
  title: string;
  description: string | null;
  curriculum: ArticleInfo_coreElements_curriculum | null;
}

export interface ArticleInfo_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface ArticleInfo_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_copyright {
  __typename: "Copyright";
  license: ArticleInfo_copyright_license | null;
  creators: ArticleInfo_copyright_creators[] | null;
  processors: ArticleInfo_copyright_processors[] | null;
  rightsholders: ArticleInfo_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface ArticleInfo_visualElement_copyright_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface ArticleInfo_visualElement_copyright_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_visualElement_copyright_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_visualElement_copyright_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface ArticleInfo_visualElement_copyright {
  __typename: "Copyright";
  license: ArticleInfo_visualElement_copyright_license | null;
  creators: ArticleInfo_visualElement_copyright_creators[] | null;
  processors: ArticleInfo_visualElement_copyright_processors[] | null;
  rightsholders: ArticleInfo_visualElement_copyright_rightsholders[] | null;
  origin: string | null;
}

export interface ArticleInfo_visualElement_brightcove_iframe {
  __typename: "BrightcoveIframe";
  src: string;
  height: number;
  width: number;
}

export interface ArticleInfo_visualElement_brightcove {
  __typename: "BrightcoveElement";
  videoid: string | null;
  player: string | null;
  account: string | null;
  caption: string | null;
  description: string | null;
  cover: string | null;
  src: string | null;
  download: string | null;
  iframe: ArticleInfo_visualElement_brightcove_iframe | null;
  uploadDate: string | null;
  copyText: string | null;
}

export interface ArticleInfo_visualElement_h5p {
  __typename: "H5pElement";
  src: string | null;
  thumbnail: string | null;
  copyText: string | null;
}

export interface ArticleInfo_visualElement_oembed {
  __typename: "VisualElementOembed";
  title: string | null;
  html: string | null;
  fullscreen: boolean | null;
}

export interface ArticleInfo_visualElement_image {
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

export interface ArticleInfo_visualElement {
  __typename: "VisualElement";
  title: string | null;
  resource: string | null;
  url: string | null;
  copyright: ArticleInfo_visualElement_copyright | null;
  language: string | null;
  embed: string | null;
  brightcove: ArticleInfo_visualElement_brightcove | null;
  h5p: ArticleInfo_visualElement_h5p | null;
  oembed: ArticleInfo_visualElement_oembed | null;
  image: ArticleInfo_visualElement_image | null;
}

export interface ArticleInfo {
  __typename: "Article";
  id: number;
  title: string;
  introduction: string | null;
  content: string;
  metaDescription: string;
  metaImage: ArticleInfo_metaImage | null;
  supportedLanguages: string[] | null;
  tags: string[] | null;
  created: string;
  updated: string;
  published: string;
  oldNdlaUrl: string | null;
  grepCodes: string[] | null;
  requiredLibraries: ArticleInfo_requiredLibraries[] | null;
  metaData: ArticleInfo_metaData | null;
  competenceGoals: ArticleInfo_competenceGoals[] | null;
  coreElements: ArticleInfo_coreElements[] | null;
  oembed: string | null;
  copyright: ArticleInfo_copyright;
  visualElement: ArticleInfo_visualElement | null;
}
