// Define type for HTML element
const recipeContainer: HTMLElement | null = document.querySelector('.recipe');

// Type guard to check if element exists
if (!recipeContainer) {
  throw new Error('Recipe container not found');
}

// Timeout function with proper Promise typing
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
