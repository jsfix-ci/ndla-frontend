/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConceptSearch
// ====================================================

export interface ConceptSearch_conceptSearch_concepts_image {
  __typename: "MetaImage";
  url: string | null;
  alt: string | null;
}

export interface ConceptSearch_conceptSearch_concepts {
  __typename: "Concept";
  id: number | null;
  title: string | null;
  text: string | null;
  image: ConceptSearch_conceptSearch_concepts_image | null;
}

export interface ConceptSearch_conceptSearch {
  __typename: "ConceptResult";
  concepts: ConceptSearch_conceptSearch_concepts[] | null;
}

export interface ConceptSearch {
  conceptSearch: ConceptSearch_conceptSearch | null;
}

export interface ConceptSearchVariables {
  query?: string | null;
  subjects?: string | null;
  exactMatch?: boolean | null;
  language?: string | null;
}
