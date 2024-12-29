import * as model from './model/model';
import recipeView from './views/RecipeView';

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

const controllRecipes = async function (): Promise<void> {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    if (!model.state.recipe) return;
    recipeView.render(model.state.recipe);
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
  window.addEventListener(ev, controllRecipes)
);
