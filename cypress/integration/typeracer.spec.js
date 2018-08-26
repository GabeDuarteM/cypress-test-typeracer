// https://play.typeracer.com
let runs = 0

const startRun = (isPractice) => {
  cy.get(".themeHeader").scrollIntoView()
  cy.contains(".lightLabel", "Go!", {timeout: 30000})
  cy.get(".gameView > tbody > tr:nth-child(2n) table table tr").first().then(domText => {

    const text = domText.get(0).innerText.trim()
    
    cy.get(".txtInput").type(text, {delay: 120, force: true})
    
    cy.contains(isPractice ? "New Race »" : "Race Again »").click().then(() => {
      runs++
      if (runs === 2) {
        cy.get(".xButton").click().then(() => {
          startRun(isPractice)
        })
      } else {
        startRun(isPractice)
      }
    })
  })
}

describe('Typeracer', () => {
  beforeEach(() => {
    cy.visit('https://play.typeracer.com')
  })

  it("should start various races on typeracer", () => {
    const isPractice = false
    
    cy.contains(isPractice ? "Practice" : "Enter a typing race").click().then(() => {
      startRun(isPractice)
    })
  })
});