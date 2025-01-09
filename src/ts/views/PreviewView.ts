import { SearchRecipe } from '../interfaces/Interfaces';
import View from './View';
const icons = '/public/img/icons.svg';

class PreviewView extends View<SearchRecipe> {
  protected parentElement = document.querySelector('.d') as HTMLElement;

  protected generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
                  <li class="preview">
                    <a class="preview__link ${
                      this.data.id === id ? 'preview__link--active' : ''
                    }" href="#${this.data.id}">
                      <figure class="preview__fig">
                        <img src="${this.data.image}" alt="${
      this.data.title
    }" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          ${this.data.title}
                        </h4>
                        <p class="preview__publisher">${this.data.publisher}</p>
                         <div class="recipe__user-generated ${
                           this.data.key ? '' : 'hidden'
                         }">
                          <svg>
                            <use href="${icons}#icon-user"></use>
                          </svg>
                        </div>
                      </div>
                    </a>
                  </li>              

    `;
  }
}

export default new PreviewView();
