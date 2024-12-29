import * as model from './model/model';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import resultsView from './views/ResultsView';

if (module.hot) module.hot.accept;

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
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    if (!model.state.search?.results) return;
    resultsView.render(model.state.search?.results);
  } catch (error) {
    console.error(error);
  }
};

const init = function (): void {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
