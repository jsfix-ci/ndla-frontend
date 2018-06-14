/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { visitOptions } from '../support';

describe('Topic menu', () => {
  beforeEach(() => {
    cy.server();
    cy.apiroute('POST', '**/graphql', 'frontpageGraphQL');
    cy.visit('/', visitOptions);
    cy.apiwait('@frontpageGraphQL');

    cy.apiroute('POST', '**/graphql', 'subjectpageGraphQL');
    cy.get('[data-cy="subject-list"] li a:contains("Medieuttrykk")').click();
    cy.apiwait('@subjectpageGraphQL');

    cy
      .get('.c-topic-menu-container button')
      .contains('Meny')
      .click();
  });

  it('Menu is displayed', () => {
    cy.get('a').contains('Fagoversikt');
  });
});
