import icons from 'url:../../img/icons.svg';

export default abstract class View<T> {
  protected data!: T; // todo maybe change ! postfix

  protected abstract parentElement: Element;

  protected errorMessage: string = 'An error occurred!';
  protected successMessage: string = 'Operation successful!';

  protected abstract generateMarkup(data?: T): string;

  render(data: T): void {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  protected clear() {
    this.parentElement.innerHTML = '';
  }

  renderSpinner(): void {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message: string = this.errorMessage): void {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(message: string = this.successMessage): void {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
