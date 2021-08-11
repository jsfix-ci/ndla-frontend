import { i18n } from 'i18next';
import { ApolloClient } from '@apollo/client';
import { History } from 'history';
//@ts-ignore
import { createApolloLinks } from './util/apiHelpers';
import nb from './messages/messagesNB';
import nn from './messages/messagesNN';
import en from './messages/messagesEN';
import { STORED_LANGUAGE_KEY } from './constants';

export const initializeI18n = (
  i18n: i18n,
  client: ApolloClient<object>,
  history: History,
): void => {
  i18n.options.supportedLngs = ['nb', 'nn'];
  i18n.addResourceBundle('en', 'translation', en, false, false);
  i18n.addResourceBundle('nb', 'translation', nb, false, false);
  i18n.addResourceBundle('nn', 'translation', nn, false, false);

  i18n.on('languageChanged', function(language) {
    if (typeof document != 'undefined') {
      document.documentElement.lang = language;
    }
    if (typeof window != 'undefined') {
      client.resetStore();
      client.setLink(createApolloLinks(language));
      const supportedLngs = i18n.options.supportedLngs as string[];
      const paths = window.location.pathname.split('/');
      const basename = supportedLngs.includes(paths[1] ?? '')
        ? `${paths[1]}`
        : '';
      // const { search, pathname } = window.location;
      // console.log('search', search);
      // history.replace({ pathname: `${language}` });
      const p = paths.slice(2).join('/');
      // console.log('location i18n', history.location);
      // console.log('paths', paths);
      // console.log('pppp', p);
      // history.replace('/t');
      // history.replace(`/${language}/${p}${search}`);
      window.localStorage.setItem(STORED_LANGUAGE_KEY, language);
    }
  });
};
