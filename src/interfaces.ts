/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree. *
 */
import { NormalizedCacheObject } from '@apollo/client';
import { BreadcrumbItemProps } from '@ndla/ui';
import { History } from 'history';
import { ConfigType } from './config';
import { LocaleValues } from './constants';

export type InitialProps = {
  articleId?: string;
  taxonomyId?: string;
  isOembed?: string;
  isTopicArticle?: boolean;
  status?: 'success' | 'error';
  loading?: boolean;
  resCookie?: string;
  basename?: string;
  locale?: LocaleType;
  ltiData?: LtiData;
};

export interface WindowData {
  apolloState: NormalizedCacheObject;
  config: ConfigType;
  resCookie?: string;
  initialProps: InitialProps;
  ltiData?: LtiData;
  serverPath?: string;
  serverQuery?: {
    [key: string]: string | number | boolean | undefined | null;
  };
}

export interface NDLAWindow {
  DATA: WindowData;
  errorReporter: any;
  hasHydrated?: boolean;
  browserHistory: History;
}

export interface License {
  license: string;
  description: string;
  url?: string;
}

export interface Author {
  name: string;
  type: string;
}

export type LocaleType = typeof LocaleValues[number];

export type BreadcrumbItem = BreadcrumbItemProps & { index?: number };

export type Breadcrumb = { to: string; name: string };

export type ResourceType = 'image' | 'other' | 'video';

export type CompetenceGoalsType = 'LK06' | 'LK20';

interface ProgrammeMeta {
  description: Partial<Record<LocaleType, string>>;
}
export interface ProgrammeType {
  name: Record<LocaleType, string>;
  url: Record<LocaleType, string>;
  meta?: ProgrammeMeta;
  image: { url: string };
  grades: ProgrammeGrade[];
}

export interface ProgrammeGrade {
  name: string;
  categories: GradeCategory[];
  missingProgrammeSubjects?: boolean;
}

export interface GradeCategory {
  name?: Partial<Record<LocaleType, string>>;
  subjects: { id: string }[];
}

export type SubjectCategory = {
  name: Record<LocaleType, string>;
  subjects: SubjectType[];
  visible?: boolean;
};

export type SubjectType = {
  name: Record<LocaleType, string>;
  longName: Record<LocaleType, string>;
  id: string;
  topicId?: string;
  hideOnFrontpage?: boolean;
};

export type LtiData = {
  content_item_return_url?: string;
  launch_presentation_return_url?: string;
  launch_presentation_document_target?: string;
  launch_presentation_width?: string;
  launch_presentation_height?: string;
  ext_content_return_types?: string;
  lti_message_type?: string;
  oauth_callback?: string;
  oauth_consumer_key?: string;
  oauth_signature?: string;
  oauth_signature_method?: string;
  oauth_timestamp?: string;
  oauth_version?: string;
  oauth_nonce?: string;
  data?: string;
};

export type LtiItem = {
  id: string | number;
  title?: string;
  url: string | { href: string };
};
