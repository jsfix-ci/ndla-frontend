/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

describe('Multidiciplinary page', () => {
  beforeEach(() => {
    cy.fixCypressSpec('/e2e/integration/multidisciplinary.spec.ts');
    cy.gqlIntercept({
      alias: 'alerts',
      operations: ['alerts'],
    });
    cy.visit('/?disableSSR=true');
    cy.gqlWait('@alerts');

    cy.gqlIntercept({
      alias: 'multidisciplinary',
      operations: ['mastHead', 'multidisciplinarySubjectPage'],
    });
    cy.get('a:contains("Se caser for tverrfaglige temaer")').click({
      force: true,
    });
    cy.gqlWait('@multidisciplinary');
  });

  it('should include a list of valid topic links', () => {
    cy.get('[data-testid="nav-box-item"] span').contains(/\w+/);

    cy.get('[data-testid="nav-box-list"] li a').each(el => {
      cy.wrap(el).should('have.attr', 'href');
      cy.wrap(el).contains(/\w+/);
    });
  });

  it('should show header', () => {
    cy.get('h1:contains("Tverrfaglige temaer")');
  });
});
