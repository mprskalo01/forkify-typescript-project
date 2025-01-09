interface State {
  recipe: Recipe;
  search: Search;
  bookmarks: Recipe[];
}

interface Search {
  query: string;
  results: SearchRecipe[];
  page: number;
  resultsPerPage: number;
}
interface SearchRecipe {
  id: string;
  title: string;
  publisher: string;
  image: string;
  key?: string;
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
  key?: string;
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
  bookmarked?: boolean;
  key?: string;
}

interface POSTRecipe {
  title: FormDataEntryValue;
  source_url: FormDataEntryValue;
  image_url: FormDataEntryValue;
  publisher: FormDataEntryValue;
  cooking_time: number;
  servings: number;
}

export {
  State,
  SearchRecipe,
  Search,
  ApiRecipe,
  ApiResponse,
  Ingredient,
  Recipe,
  POSTRecipe,
};
