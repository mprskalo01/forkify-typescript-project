import { ApiRecipe, SearchRecipe, State } from '../interfaces/Interfaces';
import { API_URL, RESULTS_PER_PAGE } from '../config';
import { getJSON } from '../helpers';

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
  },
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

export const loadRecipe = async function (id: string): Promise<void> {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    if (!data) return;

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
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query: string) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(
      (recipe: ApiRecipe): SearchRecipe => {
        return {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          image: recipe.image_url,
        };
      }
    );
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
