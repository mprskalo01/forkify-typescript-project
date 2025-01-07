import View from './View';

class SearchView extends View<void> {
  protected parentElement = document.querySelector('.search') as Element;
  protected searchField = this.parentElement.querySelector(
    '.search__field'
  ) as HTMLInputElement;

  getQuery(): string {
    const query = this.searchField.value;
    this.clearInput();
    return query;
  }

  protected clearInput() {
    this.searchField.value = '';
  }

  addHandlerSearch(handler: (event: Event) => Promise<void>): void {
    this.parentElement.addEventListener('submit', handler);
  }

  // addHandlerSearch(handler: () => Promise<void>): void {
  //   this.parentElement.addEventListener('submit', handler);
  // }

  protected generateMarkup(): string {
    return '';
  }
}

export default new SearchView();
