import { useState, useEffect } from 'react';
import { spoonacularApi } from '../api/spoonacularApi';

const RecipeDetails = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipeDetails();
  }, [recipeId]);

  async function loadRecipeDetails() {
    try {
      setLoading(true);
      const data = await spoonacularApi.getRecipeDetails(recipeId);
      setRecipe(data);
    } catch (err) {
      console.log('Failed to load recipe details:', err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="recipe-details-overlay">
        <div className="recipe-details-modal">
          <div className="loading">Loading recipe details...</div>
        </div>
      </div>
    );
  } else {
  }
};
export default RecipeDetails;
