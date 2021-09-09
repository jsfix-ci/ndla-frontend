/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: competenceGoalsQuery
// ====================================================

export interface competenceGoalsQuery_competenceGoals_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface competenceGoalsQuery_competenceGoals_competenceGoalSet {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface competenceGoalsQuery_competenceGoals {
  __typename: "CompetenceGoal";
  id: string;
  name: string;
  type: string;
  curriculum: competenceGoalsQuery_competenceGoals_curriculum | null;
  competenceGoalSet: competenceGoalsQuery_competenceGoals_competenceGoalSet | null;
}

export interface competenceGoalsQuery_coreElements_curriculum {
  __typename: "Reference";
  id: string;
  title: string;
}

export interface competenceGoalsQuery_coreElements {
  __typename: "CoreElement";
  id: string;
  name: string;
  text: string | null;
  curriculum: competenceGoalsQuery_coreElements_curriculum | null;
}

export interface competenceGoalsQuery {
  competenceGoals: competenceGoalsQuery_competenceGoals[] | null;
  coreElements: competenceGoalsQuery_coreElements[] | null;
}

export interface competenceGoalsQueryVariables {
  codes?: string[] | null;
  nodeId?: string | null;
  language?: string | null;
}
