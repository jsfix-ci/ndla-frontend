/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';

const getSubjectsFromState = state => state.subjects;

export const getSubjects = createSelector(
    [getSubjectsFromState],
    subjects => subjects.all
);

export const getSubjectById = id => createSelector(
  [getSubjects],
  subjects => subjects.find(s => s.id === id)
);

export const hasFetched = createSelector(
    [getSubjectsFromState],
    subjects => subjects.hasFetched
);

export const getTopicsBySubjectId = subjectId => createSelector(
  [getSubjectsFromState],
  subjects => defined(subjects.topics[subjectId], [])
);
