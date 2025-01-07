import { SearchRecipe } from '../interfaces/Interfaces';
import View from './View';

class ResultsView extends View<SearchRecipe[]> {
  protected parentElement = document.querySelector('.results') as Element;
  protected errorMessage: string =
    'No recipes found for your query! Please try again.';
  // protected successMessage: string = `It's ok!`;

  protected generateMarkup(): string {
    return this.data.map(this.generateMarkupPreview).join('');
  }

  protected generateMarkupPreview(recipe: SearchRecipe) {
    const id = window.location.hash.slice(1);
    return `
                  <li class="preview">
                    <a class="preview__link ${
                      recipe.id === id ? 'preview__link--active' : ''
                    }" href="#${recipe.id}">
                      <figure class="preview__fig">
                        <img src="${recipe.image}" alt="${recipe.title}" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          ${recipe.title}
                        </h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                      </div>
                    </a>
                  </li>              

    `;
  }
}

export default new ResultsView();
