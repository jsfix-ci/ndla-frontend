/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

describe('Topic menu', () => {
  beforeEach(() => {
    cy.fixCypressSpec('/e2e/integration/topic_menu.spec.ts');
    cy.gqlIntercept({ alias: 'alerts', operations: ['alerts'] });
    cy.visit('/?disableSSR=true');
    cy.gqlWait('@alerts');
    cy.gqlIntercept({
      alias: 'subjectpageTopicMenu',
      operations: ['mastHead', 'subjectPageTest'],
    });

    cy.get('[data-testid="category-list"]  button:contains("Alle fag"):visible')
      .click()
      .get('a:contains("Markedsføring og ledelse 1")')
      .last()
      .click({ force: true });
    cy.gqlWait('@subjectpageTopicMenu');

    cy.get('[data-testid=masthead-menu-button]').click();
  });

  it('Menu is displayed', () => {
    cy.get('a').contains('Til forsiden');
  });
});
