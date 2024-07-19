describe('Тесты на конструктор', () => {
  beforeEach('перехват запроса на эндпоинт', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    cy.visit('');
  });

  it('Добавление булки в конструктор', () => {
    const button = cy.get(`[data-cy=AddBuns]`);
    button.contains('Добавить');
    button.click();

    cy.get('.constructor-element__row').should('contain', 'булка');
  });
});
