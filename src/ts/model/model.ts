import {
  ApiRecipe,
  ApiResponse,
  Recipe,
  SearchRecipe,
  State,
} from '../interfaces/Interfaces';
import { API_URL, API_KEY, RESULTS_PER_PAGE } from '../config';
import { AJAX } from '../helpers';

export const state: State = {
  recipe: {
    id: 'id',
    title: 'title',
    publisher: 'publisher',
    sourceUrl: 'source_url',
    image: 'image_url',
    servings: 2,
    cookingTime: 0,
    ingredients: [],
    bookmarked: false,
  },
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data: ApiResponse): Recipe {
  const { recipe: apiRecipe } = data.data;
  state.recipe = {
    id: apiRecipe.id,
    title: apiRecipe.title,
    publisher: apiRecipe.publisher,
    sourceUrl: apiRecipe.source_url,
    image: apiRecipe.image_url,
    servings: apiRecipe.servings,
    cookingTime: apiRecipe.cooking_time,
    ingredients: apiRecipe.ingredients,
    ...(apiRecipe.key && { key: apiRecipe.key }),
  };
  return state.recipe;
};

export const loadRecipe = async function (id: string): Promise<void> {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    if (!data) return;

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query: string) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map(
      (recipe: ApiRecipe): SearchRecipe => {
        return {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          image: recipe.image_url,
          ...(recipe.key && { key: recipe.key }),
        };
      }
    );
    // state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (
  page: number = state.search.page
): SearchRecipe[] {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //  0;
  const end = page * state.search.resultsPerPage; // 9;

  return state.search.results.slice(start, end);
};

// with side effect, could use map for no side effect
export const updateServings = function (newServings: number) {
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function (): void {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe: Recipe): void {
  // Add bookmark

  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id: string): void {
  // Delete bookmark
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function (): void {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const uploadRecipe = async function (newRecipe: {
  [k: string]: FormDataEntryValue;
}) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map((ingredient) => {
        const value = String(ingredient[1]);

        const ingredientsArray = value
          .split(',')
          .map((element) => element.trim());
        if (ingredientsArray.length !== 3)
          throw new Error(
            'Wrong ingredient input! Please use the correct format.'
          );
        const [quantity, unit, description] = ingredientsArray;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

// const clearBookmarks = function (): void {
//   localStorage.clear();
// };
// clearBookmarks();
