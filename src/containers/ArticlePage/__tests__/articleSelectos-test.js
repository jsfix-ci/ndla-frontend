/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'ava';

import { getArticle } from '../articleSelectors';

const state = {
  locale: 'nb',
  articles: {
    1: {
      id: 1,
      created: '2014-12-24T10:44:06Z',
      title: [
            { title: 'Tester', language: 'nb' },
            { title: 'Testing', language: 'en' },
      ],
    },
    2: {
      id: 2,
      created: '2014-11-24T10:44:06Z',
      title: [
          { title: 'Tester', language: 'nb' },
          { title: 'Testing', language: 'en' },
      ],
    },
  },
};

test('articleSelectors getArticle with id', (t) => {
  t.is(getArticle(1)(state).id, 1);
  t.is(getArticle(2)(state).id, 2);
});

test('articleSelectors getArticle nb locale', (t) => {
  const getArticleSelector = getArticle(1);
  t.is(getArticleSelector(state).id, 1);
  t.is(getArticleSelector(state).title, 'Tester');
  t.is(getArticleSelector(state).created, '24.12.2014');
});

test('articleSelectors getArticle en locale', (t) => {
  const getArticleSelector = getArticle(1);
  const stateWithEnLocale = { ...state, locale: 'en' };
  t.is(getArticleSelector(stateWithEnLocale).id, 1);
  t.is(getArticleSelector(stateWithEnLocale).title, 'Testing');
  t.is(getArticleSelector(stateWithEnLocale).created, '12/24/2014');
});

test('articleSelectors getArticle returns empty object if article is not in state', (t) => {
  const getArticleSelector = getArticle(3);
  t.deepEqual(getArticleSelector(state), {});
});
