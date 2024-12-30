interface State {
  recipe?: Recipe;
  search: {
    query: string;
    results: SearchRecipe[];
    page: number;
    resultsPerPage: number;
  };
}

interface SearchRecipe {
  id: string;
  title: string;
  publisher: string;
  image: string;
}
interface SearchResponse {
  status: string;
  data: ApiRecipe[];
  results: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data: {
    recipe: ApiRecipe;
    recipes: ApiRecipe[];
  };
  results?: number;
}

interface Ingredient {
  quantity: number;
  unit: string;
  description: string;
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

export {
  State,
  SearchRecipe,
  SearchResponse,
  ApiRecipe,
  ApiResponse,
  Ingredient,
  Recipe,
};
