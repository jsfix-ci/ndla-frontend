/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

describe('Front page', () => {
  beforeEach(() => {
    cy.fixCypressSpec('/e2e/integration/frontpage.spec.ts');
    cy.gqlIntercept({
      alias: 'alerts',
      operations: ['alerts'],
    });
    cy.visit('/?disableSSR=true');
    cy.gqlWait('@alerts');
  });
  it('should have a list of valid links on front page', () => {
    cy.get('[data-testid="category-list"] nav a').each(el => {
      cy.wrap(el).should('have.attr', 'href');
      cy.wrap(el).contains(/\w+/);
    });
  });

  it('should have a functioning change language box', () => {
    cy.get('[class*="StyledLanguageWrapper"] button')
      .contains('Bokmål')
      .first()
      .click();
    cy.get('button')
      .contains('Nynorsk')
      .first()
      .click();
    cy.url().should('include', '/nn/');
    cy.wait(500); // wait for page to reload
  });
});
