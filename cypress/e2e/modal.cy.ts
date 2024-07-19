describe('Тесты на конструктор', () => {
  beforeEach('перехват запроса на эндпоинт', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    cy.visit('');
  });

  it('Открытие и закрытие модального окна', () => {
    const button = cy.get(`[data-cy=AddBuns]`);
    button.contains('Добавить');
    button.click();

    // cy.get(modalInfo).should('not.exist');

    cy.get('div[data-info="ingredient-modal"]').should('be.visible');
    cy.get('button[data-info="modal-close"]').click();
    cy.get('div[data-info="ingredient-modal"]').should('not.exist');
  });
});
