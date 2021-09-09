/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: filmFrontPageQuery
// ====================================================

export interface filmFrontPageQuery_filmfrontpage_about_visualElement {
  __typename: "SubjectPageVisualElement";
  type: string | null;
  alt: string | null;
  url: string | null;
}

export interface filmFrontPageQuery_filmfrontpage_about {
  __typename: "FilmPageAbout";
  title: string | null;
  description: string | null;
  language: string | null;
  visualElement: filmFrontPageQuery_filmfrontpage_about_visualElement | null;
}

export interface filmFrontPageQuery_filmfrontpage_movieThemes_name {
  __typename: "Name";
  name: string | null;
  language: string | null;
}

export interface filmFrontPageQuery_filmfrontpage_movieThemes_movies_metaImage {
  __typename: "MetaImage";
  alt: string | null;
  url: string | null;
}

export interface filmFrontPageQuery_filmfrontpage_movieThemes_movies_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface filmFrontPageQuery_filmfrontpage_movieThemes_movies {
  __typename: "Movie";
  id: string;
  title: string | null;
  metaImage: filmFrontPageQuery_filmfrontpage_movieThemes_movies_metaImage | null;
  metaDescription: string | null;
  resourceTypes: filmFrontPageQuery_filmfrontpage_movieThemes_movies_resourceTypes[] | null;
  path: string | null;
}

export interface filmFrontPageQuery_filmfrontpage_movieThemes {
  __typename: "MovieTheme";
  name: filmFrontPageQuery_filmfrontpage_movieThemes_name[] | null;
  movies: filmFrontPageQuery_filmfrontpage_movieThemes_movies[] | null;
}

export interface filmFrontPageQuery_filmfrontpage_slideShow_metaImage {
  __typename: "MetaImage";
  alt: string | null;
  url: string | null;
}

export interface filmFrontPageQuery_filmfrontpage_slideShow_resourceTypes {
  __typename: "ResourceType";
  id: string;
  name: string;
}

export interface filmFrontPageQuery_filmfrontpage_slideShow {
  __typename: "Movie";
  id: string;
  title: string | null;
  metaImage: filmFrontPageQuery_filmfrontpage_slideShow_metaImage | null;
  metaDescription: string | null;
  resourceTypes: filmFrontPageQuery_filmfrontpage_slideShow_resourceTypes[] | null;
  path: string | null;
}

export interface filmFrontPageQuery_filmfrontpage {
  __typename: "FilmFrontpage";
  name: string | null;
  about: filmFrontPageQuery_filmfrontpage_about[] | null;
  movieThemes: filmFrontPageQuery_filmfrontpage_movieThemes[] | null;
  slideShow: filmFrontPageQuery_filmfrontpage_slideShow[] | null;
}

export interface filmFrontPageQuery {
  filmfrontpage: filmFrontPageQuery_filmfrontpage | null;
}
