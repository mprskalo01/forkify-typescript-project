import * as model from './model/model';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import resultsView from './views/ResultsView';
import paginationView from './views/PaginationView';

if (module.hot) module.hot.accept;

const controlRecipes = async function (): Promise<void> {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function (event: Event) {
  event.preventDefault();
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    model.state.search.page = 1;
    resultsView.render(model.getSearchResultsPage());

    // 4) Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage: number) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings: number): void {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe in view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function (): void {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
