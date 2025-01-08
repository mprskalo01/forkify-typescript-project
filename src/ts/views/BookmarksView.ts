import { SearchRecipe } from '../interfaces/Interfaces';
import previewView from './PreviewView';
import View from './View';

class BookmarksView extends View<SearchRecipe[]> {
  protected parentElement = document.querySelector(
    '.bookmarks__list'
  ) as Element;
  protected errorMessage: string =
    'No bookmarks yet. Find a good recipe to bookmark!';
  // protected successMessage: string = `It's ok!`;

  protected generateMarkup(): string {
    return this.data
      .map((bookmark) => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();

// <li class="preview">
//                     <a class="preview__link" href="#23456">
//                       <figure class="preview__fig">
//                         <img src="src/img/test-1.jpg" alt="Test" />
//                       </figure>
//                       <div class="preview__data">
//                         <h4 class="preview__name">
//                           Pasta with Tomato Cream ...
//                         </h4>
//                         <p class="preview__publisher">The Pioneer Woman</p>
//                       </div>
//                     </a>
//                   </li>
