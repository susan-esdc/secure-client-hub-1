/// <reference types="cypress" />

describe('Validate Contact Us Landing page', () => {
  beforeEach(() => {
    cy.visit('/contact-us')
  })

  it('Contact us has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Validate Contact us URL and header in EN and FR', () => {
    cy.url().should('contains', '/contact-us')
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Contact us')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/contactez-nous')
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Contactez-nous')
  })

  it('Validate the links on Contact us page', () => {
    cy.get('[data-cy = "contact-task-list"]')
    .find('a')
    .should('be.visible')
    .and('have.length', '3')
    .and('not.have.length', 0)
    .and('not.have.attr', 'href', '#undefined')
  })

  it('validate the breadcrumbs are present on Contact us page EN and FR', () => {
    cy.get('[data-cy="breadcrumb-My dashboard"]')
      .should('be.visible')
      .and('have.text', 'My dashboard')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/contactez-nous')
    cy.get('[data-cy="breadcrumb-Mon tableau de bord"]')
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
  })

  it('Validate menu navigates to Contact us page', () => {
    cy.visit('/my-dashboard')
    cy.get('[data-testid="menuButton"]').click()
    cy.get(':nth-child(4) > .border-t-2').click()
    cy.location('pathname', { timeout: 10000 })
    .should('equal', '/en/contact-us')
  })
})
