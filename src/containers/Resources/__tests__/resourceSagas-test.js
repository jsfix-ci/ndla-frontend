/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import * as sagas from '../resourceSagas';
import { actions } from '../resource';
import * as api from '../resourceApi';
import { resources } from './mockResources';

test('resourceSagas watchFetchTopicResources', () => {
  const saga = testSaga(sagas.watchFetchTopicResources);
  saga
    .next()
    .take(actions.fetchTopicResources)
    .next({ payload: { topicId: 2 } })
    .next([])
    .all([call(sagas.fetchTopicResources, 2), call(sagas.fetchResourceTypes)])
    .finish()
    .next()
    .isDone();
});

test('topicSagas fetchResourceTypes', () => {
  const topicId = 'urn:topic:1234';
  const saga = testSaga(sagas.fetchResourceTypes, topicId);
  saga
    .next()
    .next('nb')
    .call(api.fetchResourceTypes, 'nb')
    .next([])
    .put({ type: actions.setResourceTypes.toString(), payload: [] })
    .next()
    .isDone();
});

test('topicSagas fetchTopicResources', () => {
  const topicId = 'urn:topic:1234';
  const saga = testSaga(sagas.fetchTopicResources, topicId);
  saga
    .next()
    .next('nb')
    .call(api.fetchTopicResources, topicId, 'nb')
    .next(resources)
    .put({
      type: actions.setTopicResources.toString(),
      payload: { topicId, resources },
    })
    .next()
    .next()
    .isDone();
});
