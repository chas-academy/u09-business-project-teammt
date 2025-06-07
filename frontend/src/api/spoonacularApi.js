const BASE_URL =
  'https://api.spoonacular.com/recipes/complexSearch?apiKey=fbc26fcd6a3c4259852bd5a502da09a7&number=5&query=';

export const spoonacularApi = {
  async search(text) {
    const response = await fetch(`${BASE_URL}${text}`);
    const data = await response.json();
    return data.results; // Extract just results
  },
};
