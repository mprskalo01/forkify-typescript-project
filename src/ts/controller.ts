import * as model from './model/model';
import recipeView from './views/RecipeView';

const recipeContainer = document.querySelector('.recipe');

if (!recipeContainer) {
  throw new Error('Recipe container not found');
}

const controlRecipes = async function (): Promise<void> {
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

const init = function (): void {
  recipeView.addHandlerRender(controlRecipes);
};

init();
