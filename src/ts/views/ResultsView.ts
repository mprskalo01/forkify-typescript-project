import { SearchRecipe } from '../interfaces/Interfaces';
import previewView from './PreviewView';
import View from './View';

class ResultsView extends View<SearchRecipe[]> {
  protected parentElement = document.querySelector('.results') as Element;
  protected errorMessage: string =
    'No recipes found for your query! Please try again.';

  protected generateMarkup(): string {
    return this.data
      .map((recipe) => previewView.render(recipe, false))
      .join('');
  }
}

export default new ResultsView();
