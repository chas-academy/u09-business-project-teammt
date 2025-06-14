const BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = 'fbc26fcd6a3c4259852bd5a502da09a7';

export const spoonacularApi = {
  async search(text) {
    const response = await fetch(
      `${BASE_URL}/complexSearch?apiKey=${API_KEY}&number=15&query=${text}`
    );
    const data = await response.json();
    return data.results;
  },

  async getRecipeDetails(recipeId) {
    const response = await fetch(
      `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`
    );
    const data = await response.json();
    return data;
  },
};
