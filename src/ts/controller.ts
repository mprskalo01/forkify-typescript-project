import * as model from './model/model';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import resultsView from './views/ResultsView';
import paginationView from './views/PaginationView';
import bookmarksView from './views/BookmarksView';
import addRecipeView from './views/AddRecipeView';
import { MODAL_CLOSE_SEC } from './config';

if (module.hot) module.hot.accept;

document
  .querySelector('.header__logo')!
  .addEventListener('click', (event): void => {
    event.preventDefault();
    window.location.href = '/';
  });

const controlRecipes = async function (): Promise<void> {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

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

const controlAddBookmark = function (): void {
  // 1) Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function (): void {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe: {
  [k: string]: FormDataEntryValue;
}) {
  try {
    // ShowLoadingSpinner
    addRecipeView.renderSpinner();

    // Upload new Recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Render succes message
    addRecipeView.renderSuccessMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError((error as Error).message);
  }
};

const init = function (): void {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerShowWindow();
  addRecipeView.addHandlerCloseWindow();
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
