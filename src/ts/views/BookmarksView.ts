import { SearchRecipe } from '../interfaces/Interfaces';
import previewView from './PreviewView';
import View from './View';

class BookmarksView extends View<SearchRecipe[]> {
  protected parentElement = document.querySelector(
    '.bookmarks__list'
  ) as Element;
  protected errorMessage: string =
    'No bookmarks yet. Find a good recipe to bookmark!';

  addHandlerRender(handler: () => void): void {
    window.addEventListener('load', handler);
  }

  protected generateMarkup(): string {
    return this.data
      .map((bookmark) => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
