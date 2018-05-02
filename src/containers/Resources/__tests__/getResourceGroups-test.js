/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getResourceGroups, sortResourceTypes } from '../getResourceGroups';

import { resourceData1, resourceData2, resourceTypes } from './mockResources';

test('get core resources grouped by types', () => {
  const groups = getResourceGroups(resourceTypes, [], resourceData1);

  expect(groups).toMatchSnapshot();
});

test('get core and supplementary resources grouped by types', () => {
  const groups = getResourceGroups(resourceTypes, resourceData2, resourceData1);

  expect(groups).toMatchSnapshot();
});

test('resources types sort order', () => {
  const types = sortResourceTypes(resourceTypes);

  expect(types.length).toBe(7);
  expect(types[0].id).toBe('urn:resourcetype:learningPath');
  expect(types[1].id).toBe('urn:resourcetype:subjectMaterial');
  expect(types[2].id).toBe('urn:resourcetype:tasksAndActivities');
  expect(types[3].id).toBe('urn:resourcetype:reviewResource');
  expect(types[4].id).toBe('urn:resourcetype:SourceMaterial');
  expect(types[5].id).toBe('urn:resourcetype:externalResource');
  expect(types[6].id).toBe('urn:resourcetype:concept');

  expect(types).toMatchSnapshot();
});
