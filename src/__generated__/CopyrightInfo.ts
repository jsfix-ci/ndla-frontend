/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CopyrightInfo
// ====================================================

export interface CopyrightInfo_license {
  __typename: "License";
  license: string;
  url: string | null;
}

export interface CopyrightInfo_creators {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface CopyrightInfo_processors {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface CopyrightInfo_rightsholders {
  __typename: "Contributor";
  name: string;
  type: string;
}

export interface CopyrightInfo {
  __typename: "Copyright";
  license: CopyrightInfo_license | null;
  creators: CopyrightInfo_creators[] | null;
  processors: CopyrightInfo_processors[] | null;
  rightsholders: CopyrightInfo_rightsholders[] | null;
  origin: string | null;
}
