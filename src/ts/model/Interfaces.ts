interface State {
  recipe: Recipe;
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

interface ApiResponse {
  status: string;
  message: string;
  data: {
    recipe: ApiRecipe;
  };
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

export { State, ApiRecipe, ApiResponse, Ingredient, Recipe };
