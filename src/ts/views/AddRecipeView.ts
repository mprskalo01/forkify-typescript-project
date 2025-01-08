import { Recipe } from '../interfaces/Interfaces';
import View from './View';

class AddRecipeView extends View<Recipe> {
  protected parentElement = document.querySelector(
    '.upload'
  ) as HTMLFormElement;
  protected window = document.querySelector('.add-recipe-window') as Element;
  protected overlay = document.querySelector('.overlay') as Element;
  protected btnOpen = document.querySelector(
    '.nav__btn--add-recipe'
  ) as Element;
  protected btnClose = document.querySelector('.btn--close-modal') as Element;

  addHandlerShowWindow(): void {
    this.btnOpen.addEventListener('click', () => {
      this.overlay.classList.toggle('hidden');
      this.window.classList.toggle('hidden');
    });
  }

  addHandlerCloseWindow(): void {
    this.btnClose.addEventListener('click', () => {
      this.overlay.classList.toggle('hidden');
      this.window.classList.toggle('hidden');
    });
  }

  addHandlerUpload(
    handler: (newRecipe: { [k: string]: FormDataEntryValue }) => void
  ): void {
    this.parentElement.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const dataArr = [...new FormData(this.parentElement)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  protected generateMarkup(): string {
    return '';
  }
}

export default new AddRecipeView();
