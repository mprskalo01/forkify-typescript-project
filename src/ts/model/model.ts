import {
  ApiRecipe,
  Recipe,
  SearchRecipe,
  State,
} from '../interfaces/Interfaces';
import { API_URL } from '../config';
import { getJSON } from '../helpers';

export const state: Partial<State> = {
  search: {
    query: '',
    results: [],
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
    if (!state.search?.results) return;

    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data?.data.recipes?.map(
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
