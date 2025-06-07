import { cookbookApi } from '../api/cookbookApi';

const Recipe = ({ recipe, refrashFun, bookid }) => {
  async function handleRemove() {
    const recipeData = {
      operation: 'remove',
      recipe: { id: recipe.id.toString() },
    };

    await cookbookApi.update(bookid, recipeData);

    refrashFun();
  }
  return (
    <div className="recipe">
      <h4 className="recipe-title">{recipe.title}</h4>
      <img
        src={recipe.image} // Fixed: was recipe.Image (uppercase I)
        alt={recipe.title}
        className="recipe-image"
      />
      <button onClick={handleRemove} className="remove-button" title="Remove recipe">
        ×
      </button>
    </div>
  );
};
export default Recipe;
