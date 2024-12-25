interface Ingredients {
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
  ingredients: Ingredients;
}

const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.jonas.io/
if (!recipeContainer) {
  throw new Error('Recipe container not found');
}

const timeout = function (s: number): Promise<never> {
  return new Promise(function (
    _: (value: never) => void,
    reject: (reason?: Error) => void
  ) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} second${
            s !== 1 ? 's' : ''
          }`
        )
      );
    }, s * 1000);
  });
};

///////////////////////////////////////
const ShowRecipe = async function (): Promise<void> {
  try {
    const res = await fetch(
      'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    console.log(res, data);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(error);
  }
};

ShowRecipe();
