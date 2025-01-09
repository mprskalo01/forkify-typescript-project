import { Search } from '../interfaces/Interfaces';
import View from './View';
const icons = '/public/img/icons.svg';

class PaginationView extends View<Search> {
  protected parentElement = document.querySelector('.pagination') as Element;

  addHandlerClick(handler: (goToPage: number) => void) {
    this.parentElement.addEventListener('click', function (event: Event) {
      event.preventDefault();

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest('.btn--inline') as HTMLElement | null;
      if (!btn || !btn.dataset.goto) return;

      const goToPage: number = parseInt(btn.dataset.goto, 10);

      handler(goToPage);
    });
  }

  protected generateMarkup(): string {
    const btnNext: string = `
    <button data-goto="${
      this.data.page + 1
    }" class="btn--inline pagination__btn--next">
              <span>Page ${this.data.page + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
            `;
    const btnPrevious: string = `
     <button data-goto="${
       this.data.page - 1
     }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this.data.page - 1}</span>
            </button>
    `;
    const numPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this.data.page === 1 && numPages > 1) {
      return btnNext;
    }

    // Last page
    if (this.data.page === numPages && numPages > 1) {
      return btnPrevious;
    }
    // Other page
    if (this.data.page < numPages) {
      return btnPrevious + btnNext;
    }

    return '';
  }
}

export default new PaginationView();
