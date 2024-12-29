import {
  State,
  ApiRecipe,
  ApiResponse,
  Ingredient,
  Recipe,
} from './Interfaces';

export const state: Partial<State> = {};

export const loadRecipe = async function (id: string): Promise<void> {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    const data: ApiResponse = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
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
    console.log(error);
  }
};
