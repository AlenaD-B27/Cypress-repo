/// <reference types="cypress" />

describe('Context: my first tests', () => {
  before(() => {
    // runs ONCE before ALL test cases, like BeforeClass in TestNG
  });
  beforeEach(() => {
    // runs before EACH test case, like beforeMethod in testNG
    cy.clearCookies(); // so the test starts with the fresh browser
  });
  after(() => {
    // runs ONCE after ALL
  });
  afterEach(() => {
    // runs after EACH test (AdterMethod in TestNG)
  });
  it('opening a web application', () => {
    cy.visit('/registration_form');
  });
  it('Test 2', () => {
    expect(false).to.equal(false);
  });
  it('Test 3', () => {
    expect(false).not.to.equal(true);
  });
  it('Test 4', () => {
    expect(5).to.equal(5);
  });
  it('Test 5', () => {
    expect(true).to.equal('5' == 5);
  });
});
