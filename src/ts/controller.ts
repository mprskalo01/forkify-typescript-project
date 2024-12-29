import icons from 'url:../img/icons.svg';

interface ApiResponse {
  status: string;
  message: string;
  data: {
    recipe: ApiRecipe;
  };
}

interface ApiRecipe {
  id: string;
  title: string;
  publisher: string;
  source_url: string;
  image_url: string;
  servings: number;
  cooking_time: number;
  ingredients: Ingredient[];
}

interface Ingredient {
  quantity: number;
  unit: string;
  description: string;
}

interface Recipe {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
}

const recipeContainer = document.querySelector('.recipe');

if (!recipeContainer) {
  throw new Error('Recipe container not found');
}

const timeout = function (s: number): Promise<never> {
  return new Promise(function (
    _: (value: never) => void,
    reject: (reason?: Error) => void
  ) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} second${
            s !== 1 ? 's' : ''
          }`
        )
      );
    }, s * 1000);
  });
};

const renderSpinner = function (parentEl: Element): void {
  const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function (): Promise<void> {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    // 1) Loading Recipe
    renderSpinner(recipeContainer);
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    const data: ApiResponse = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    // const apiRecipe = data.data.recipe;
    // Destructuring with new name
    const { recipe: apiRecipe } = data.data;

    const recipe: Recipe = {
      id: apiRecipe.id,
      title: apiRecipe.title,
      publisher: apiRecipe.publisher,
      sourceUrl: apiRecipe.source_url,
      image: apiRecipe.image_url,
      servings: apiRecipe.servings,
      cookingTime: apiRecipe.cooking_time,
      ingredients: apiRecipe.ingredients,
    };

    // 2) Rendering recipe
    const markup = `<figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }</" class="recipe__img" />
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
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map((ingredient: Ingredient): string => {
              return `<li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${
                    ingredient.quantity || ''
                  }</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.description}
                  </div>
                </li>`;
            })
            .join('')}
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">1000</div>
              <div class="recipe__description">
                <span class="recipe__unit">g</span>
                pasta
              </div>
            </li>

            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">0.5</div>
              <div class="recipe__description">
                <span class="recipe__unit">cup</span>
                ricotta cheese
              </div>
            </li>
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

    recipeContainer.innerHTML = '';

    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

// Listening for hash change

['hashchange', 'load'].forEach((ev): void =>
  window.addEventListener(ev, showRecipe)
);
