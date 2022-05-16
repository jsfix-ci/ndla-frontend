/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-unfetch';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import ErrorReporter from '@ndla/error-reporter';
import { MissingRouterContext } from '@ndla/safelink';
import { i18nInstance } from '@ndla/ui';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '../util/apiHelpers';
import LtiProvider from './LtiProvider';
import '../style/index.css';

const {
  DATA: { initialProps, config },
} = window;

const { logglyApiKey, logEnvironment: environment, componentName } = config;

window.errorReporter = ErrorReporter.getInstance({
  logglyApiKey,
  environment,
  componentName,
  ignoreUrls: [/https:\/\/.*hotjar\.com.*/],
});

const client = createApolloClient(i18nInstance.language, document.cookie);

ReactDOM.render(
  <HelmetProvider>
    <I18nextProvider i18n={i18nInstance}>
      <ApolloProvider client={client}>
        <MissingRouterContext.Provider value={true}>
          <LtiProvider {...initialProps} />
        </MissingRouterContext.Provider>
      </ApolloProvider>
    </I18nextProvider>
  </HelmetProvider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
