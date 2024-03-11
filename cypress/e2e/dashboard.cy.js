/// <reference types="cypress" />

describe('Validate dashboard page', () => {
  beforeEach(() => {
    cy.visit('/my-dashboard')
  })

  it('Dashboard has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })
  it('Validate dashboard URL and Header in EN and FR', () => {
    cy.url().should('contains', '/my-dashboard')
    cy.get('#my-dashboard-heading')
      .should('be.visible')
      .and('have.text', 'My dashboard')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/mon-tableau-de-bord')
    cy.get('#my-dashboard-heading')
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
  })

  it('Validate Beta Version Banner is present on Dashboard EN', () => {
    cy.get('[data-cy="topBanner"]').should('be.visible')
    cy.get('[data-cy="learnMoreAbtBeta"]').should('be.visible')
    cy.get('[data-testid="bannerButton"]').should('be.visible')
  })

  it('Validate Beta Version Banner is present on Dashboard FR', () => {
    cy.changeLang().should('have.text', 'English')
    cy.location('pathname').should('include', '/fr/mon-tableau-de-bord')
    cy.get('[data-cy="topBanner"]').should('be.visible')
    cy.get('[data-cy="learnMoreAbtBeta"]').should('be.visible')
    cy.get('[data-testid="bannerButton"]').should('be.visible')
  })

  it('Validate 5 Cards (EI,CPP,OAS,SIN,CAL) and Card titles are Visible', () => {
    cy.get('[data-testid="myDashboardContent-test"]')
      .children('[data-cy="cards"]')
      .should('be.visible')
      .and('have.length', 5)
    cy.get('[data-cy="cardtitle"]').should('be.visible').and('have.length', 5)
  })

  it('validate the "My dashboard" page doesnt have breadcrumbs', () => {
    cy.get("[class='sch-container'] >nav>ul>li>a").should('not.exist')
  })

  // EN This tests all of the most requested items and links.
  it('should iterate through cards, verfiying Most Requested section and links EN', () => {
    const cardTitles = [
      'Employment Insurance',
      'Canada Pension Plan',
      'Old Age Security',
      'Social Insurance Number',
      'Canada Apprentice Loan',
    ]
    // Iterate through each card title
    cy.wrap(cardTitles).each((cardTitle) => {
      // Find the card with the specific title
      cy.contains('[data-cy="cards"]', cardTitle).as('currentCard')
      // Check the card title
      cy.get('@currentCard').should('contain', cardTitle)
      // Check the most requested section within each card type
      cy.get('@currentCard').within(($card) => {
        cy.get('[data-cy="viewMoreLessButton"]').click()
        cy.get('[data-cy="most-requested"]').should('be.visible')
        cy.get('[data-cy="most-req-links"]')
          .children('[data-cy="most-req-tasklink"]')
          .each(($link) => {
            cy.wrap($link)
              .should('be.visible')
              .and('have.length.gt', 0)
              .and('not.have.attr', 'href', '#undefined')
          })
      })
    })
  })

  // FR This tests all of the most requested items and links.
  it('should iterate through cards, verfiying Most Requested section and links FR', () => {
    const cardTitles = [
      'Assurance-emploi',
      'Régime de pensions du Canada',
      'Sécurité de la vieillesse',
      'Numéro d’assurance sociale',
      'Prêt canadien aux apprentis',
    ]
    cy.changeLang().should('have.text', 'English')
    cy.location('pathname').should('include', '/fr/mon-tableau-de-bord')
    // Iterate through each card title
    cy.wrap(cardTitles).each((cardTitle) => {
      // Find the card with the specific title
      cy.contains('[data-cy="cards"]', cardTitle).as('currentCard')
      // Check the card title
      cy.get('@currentCard').should('contain', cardTitle)
      // Check the most requested section within each card type
      cy.get('@currentCard').within(($card) => {
        cy.get('[data-cy="viewMoreLessButton"]').click()
        cy.get('[data-cy="most-requested"]').should('be.visible')
        cy.get('[data-cy="most-req-links"]')
          .children('[data-cy="most-req-tasklink"]')
          .each(($link) => {
            cy.wrap($link)
              .should('be.visible')
              .and('have.length.gt', 0)
              .and('not.have.attr', 'href', '#undefined')
          })
      })
    })
  })

  // EN Tests the task group title and links for EI, CPP and OAS but not SIN and Cal
  it('Iterates through EI, CPP and OAS task lists for title and links for EN', () => {
    // 2 = EI, 3 = CPP and 4 = OAS
    const EICPPOAS = [2, 3, 4]

    cy.wrap(EICPPOAS).each((index) => {
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
      cy.get('[data-cy="most-requested"]').should('be.visible')
      // iterate through the task list for title and task links
      cy.get(`:nth-child(${index}) [data-cy="task-list"]`)
        .children()
        .each(($item) => {
          cy.wrap($item).within(() => {
            cy.get('[data-cy="task-group-list"]')
              .invoke('text')
              .then((title) => {
                expect(title.trim()).to.not.be.empty
                // check for the sublist of tasks
                cy.get('[data-cy="taskList"]')
                  .children('[data-cy="task-link"]')
                  .should('have.length.gt', 0)
                cy.get('[data-cy="taskList"]')
                  .children('[data-cy="task-link"]')
                  .each(($link) => {
                    cy.wrap($link).should('not.have.attr', 'href', '#undefined')
                  })
              })
          })
        })
    })
  })

  // FR Tests the task group title and links for EI, CPP and OAS but not SIN and Cal
  it('Iterates through EI, CPP and OAS task lists for title and links for FR', () => {
    // 2 = EI, 3 = CPP and 4 = OAS
    const EICPPOAS = [2, 3, 4]
    cy.changeLang().should('have.text', 'English')
    cy.location('pathname').should('include', '/fr/mon-tableau-de-bord')
    cy.wrap(EICPPOAS).each((index) => {
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
      cy.get('[data-cy="most-requested"]').should('be.visible')
      // iterate through the task list for title and task links
      cy.get(`:nth-child(${index}) [data-cy="task-list"]`)
        .children()
        .each(($item) => {
          cy.wrap($item).within(() => {
            cy.get('[data-cy="task-group-list"]')
              .invoke('text')
              .then((title) => {
                expect(title.trim()).to.not.be.empty
                // check for the sublist of tasks
                cy.get('[data-cy="taskList"]')
                  .children('[data-cy="task-link"]')
                  .should('have.length.gt', 0)
                cy.get('[data-cy="taskList"]')
                  .children('[data-cy="task-link"]')
                  .each(($link) => {
                    cy.wrap($link).should('not.have.attr', 'href', '#undefined')
                  })
              })
          })
        })
    })
  })

  // EN Tests the Links for Profile page in EI, CPP and OAS but not SIN and Cal
  it('Iterates through EI, CPP and OAS task lists for Profile page EN', () => {
    // 2 = EI, 3 = CPP and 4 = OAS
    const EICPPOAS = [2, 3, 4]
    cy.wrap(EICPPOAS).each((index) => {
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
      cy.get('[data-cy="most-requested"]').should('be.visible')
      cy.get(` [data-cy="task-list"]`)
      cy.get('[data-cy="Task"]')
      cy.get('[data-cy="task-group-list"]')
        .parents('[data-cy="Task"]')
        .find('[data-cy="task-link"] a[href="/en/profile"]')
        .click({ force: true })
      cy.location('pathname', { timeout: 10000 }).should('equal', '/en/profile')
      cy.get('#back-to-dashboard-button').should('exist').click()
      cy.location('pathname').should('equal', '/en/my-dashboard')
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
      // cy.url().should('contains', '/en/my-dashboard')
    })
  })

  // FR Tests the Links for Profile page in EI, CPP and OAS but not SIN and Cal
  it('Iterates through EI, CPP and OAS task lists for Profile page FR', () => {
    // 2 = EI, 3 = CPP and 4 = OAS
    const EICPPOAS = [2, 3, 4]

    cy.changeLang().should('have.text', 'English')
    cy.location('pathname').should('include', '/fr/mon-tableau-de-bord')

    cy.wrap(EICPPOAS).each((index) => {
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
      cy.get('[data-cy="most-requested"]').should('be.visible')
      cy.get(` [data-cy="task-list"]`)
      cy.get('[data-cy="Task"]')
      cy.get('[data-cy="task-group-list"]')
        .parents('[data-cy="Task"]')
        .find('[data-cy="task-link"] a[href="/fr/profil"]')
        .click({ force: true })
      cy.location('pathname', { timeout: 10000 }).should('equal', '/fr/profil')

      cy.url().should('contains', '/fr/profil')
      cy.get('#back-to-dashboard-button').should('exist').click()
      cy.location('pathname').should('equal', '/fr/mon-tableau-de-bord')
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
    })
  })

  // EN Tests the Links for Decision Review page in CPP and OAS
  it('Iterates through CPP and OAS tasks for Decision Review page EN', () => {
    // 2 = EI, 3 = CPP and 4 = OAS
    const EICPPOAS = [3, 4]
    cy.wrap(EICPPOAS).each((index) => {
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
      cy.get('[data-cy="most-requested"]').should('be.visible')
      cy.get(` [data-cy="task-list"]`)
      cy.get('[data-cy="Task"]')
      cy.get('[data-cy="task-group-list"]')
        .parents('[data-cy="Task"]')
        .find('[data-cy="task-link"] a[href="/en/decision-reviews"]')
        .click()
      cy.location('pathname', { timeout: 10000 }).should(
        'include',
        '/decision-reviews'
      )
      cy.get('[data-cy="breadcrumb-My dashboard"]').should('exist').click()
      cy.location('pathname').should('include', '/en/my-dashboard')
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
    })
  })

  // FR Tests the Links for Decision Review page in CPP and OAS
  it('Iterates through CPP and OAS tasks for Decision Review page FR', () => {
    // 2 = EI, 3 = CPP and 4 = OAS
    const EICPPOAS = [3, 4]
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/mon-tableau-de-bord')
    cy.wrap(EICPPOAS).each((index) => {
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
      cy.get('[data-cy="most-requested"]').should('be.visible')
      cy.get(` [data-cy="task-list"]`)
      cy.get('[data-cy="Task"]')
      cy.get('[data-cy="task-group-list"]')
        .parents('[data-cy="Task"]')
        .find('[data-cy="task-link"] a[href="/fr/demande-revision"]')
        .click({ force: true })
      cy.location('pathname', { timeout: 10000 }).should(
        'include',
        '/fr/demande-revision'
      )
      cy.get('[data-cy="breadcrumb-Mon tableau de bord"]')
        .should('exist')
        .click()
      cy.location('pathname').should('include', '/fr/mon-tableau-de-bord')
      cy.get(`:nth-child(${index}) > [data-cy="viewMoreLessButton"]`).click()
    })
  })

  it('Validate that the clicking Contact Us naviagtes to Contact US landing Page EN', () => {
    cy.get('[data-cy="footerContactUsLink"]').should('be.visible').click()
    cy.location('pathname', { timeout: 10000 }).should(
      'contains',
      '/en/contact-us'
    )
  })

  it('Validate that the clicking Contact Us naviagtes to Contact US landing Page FR', () => {
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/mon-tableau-de-bord')
    cy.get('[data-cy="footerContactUsLink"]').should('be.visible').click()
    cy.location('pathname', { timeout: 10000 }).should(
      'contains',
      '/fr/contactez-nous'
    )
  })
})
