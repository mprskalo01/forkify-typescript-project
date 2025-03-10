import View from './View';
import icons from 'url:../../img/icons.svg';
import { Ingredient, Recipe } from '../interfaces/Interfaces';
import Fraction from 'fraction.js';

class RecipeView extends View<Recipe> {
  protected parentElement = document.querySelector('.recipe') as Element;

  protected errorMessage: string =
    'We could not find that recipe. Please try another one!';
  protected successMessage: string = `It's ok!`;

  addHandlerRender(handler: () => Promise<void>): void {
    ['hashchange', 'load'].forEach((event: string): void =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerUpdateServings(handler: (newServings: number) => void): void {
    this.parentElement.addEventListener('click', function (event) {
      const btn = (event.target as HTMLElement).closest(
        '.btn--update'
      ) as HTMLElement;
      if (!btn || !btn.dataset.updateTo) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler: () => void) {
    this.parentElement.addEventListener('click', function (event: Event) {
      const btn = (event.target as HTMLElement).closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  protected generateMarkup(): string {
    const recipe = this.data;
    return `<figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update" data-update-to="${
                recipe.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update" data-update-to="${
                recipe.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this.data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      recipe.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(this.generateIngredients).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  private generateIngredients(ingredient: Ingredient): string {
    return `<li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ingredient.quantity
              ? new Fraction(ingredient.quantity).toFraction()
              : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.description}
          </div>
        </li>`;
  }
}

export default new RecipeView();
