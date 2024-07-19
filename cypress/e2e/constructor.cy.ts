describe('Тесты на конструктор', () => {
  beforeEach('перехват запроса на эндпоинт', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    cy.visit('');
  });

  it('Добавление булки в конструктор', () => {
    const button = cy.get('[data-cy=AddBuns]');
    button.contains('Добавить');
    button.click();

    cy.get('[data-cy=ConstructorItemsBun]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('Добавление начинки в конструктор', () => {
    const button = cy.get('[data-cy=AddMains]');
    button.contains('Добавить');
    button.click();

    cy.get('[data-cy=ConstructorItemsIngredients]').should( //'[data-cy=ConstructorItemsBun]'
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Добавление соуса в конструктор', () => {
    const button = cy.get('[data-cy=AddSauces]');
    button.contains('Добавить');
    button.click();

    cy.get('[data-cy=ConstructorItemsIngredients]').should(
      'contain',
      'Соус Spicy-X'
    );
  });
});
