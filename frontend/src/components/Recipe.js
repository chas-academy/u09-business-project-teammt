import { cookbookApi } from '../api/cookbookApi';
import { useState } from 'react';
import RecipeDetails from './RecipeDetails';

const Recipe = ({ recipe, refrashFun, bookid }) => {
  const [showDetails, setShowDetails] = useState(false);
  async function handleRemove() {
    const confirmed = window.confirm(`Remove "${recipe.title}" from cookbook?`);
    if (!confirmed) return;

    try {
      const recipeData = {
        operation: 'remove',
        recipe: { id: recipe.id.toString() },
      };

      await cookbookApi.update(bookid, recipeData);
      refrashFun();
    } catch (err) {
      console.log('Remove failed:', err.message);
    }
  }

  return (
    <div className="recipe">
      <h4 className="recipe-title">{recipe.title}</h4>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <button
        onClick={() => setShowDetails(true)}
        className="details-button"
        title="View recipe details"
      >
        Details
      </button>
      <button onClick={handleRemove} className="remove-button" title="Remove recipe">
        ×
      </button>
      {showDetails && <RecipeDetails recipeId={recipe.id} onClose={() => setShowDetails(false)} />}
    </div>
  );
};

export default Recipe;
