import { useState } from 'react';
import { cookbookApi } from '../api/cookbookApi';

const SearchResult = ({ recipe, cookbooklist, refrashFun }) => {
  const [selectedCookbookId, setSelectedCookbookId] = useState('');

  async function handleAdd() {
    if (!selectedCookbookId) return;
    const recipeData = {
      operation: 'add',
      recipe: { id: recipe.id.toString(), title: recipe.title, image: recipe.image },
    };

    await cookbookApi.update(selectedCookbookId, recipeData);
    setSelectedCookbookId(''); // Reset selection
    refrashFun();
    alert('Recipe added successfully!');
  }

  return (
    <div className="recipe">
      <h4 className="recipe-title">{recipe.title}</h4>
      <img
        src={recipe.image} // Fixed: was recipe.Image (uppercase I)
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="add-to-cookbook">
        <select
          value={selectedCookbookId}
          onChange={(e) => setSelectedCookbookId(e.target.value)}
          className="cookbook-select"
        >
          <option value="">Select cookbook...</option>
          {cookbooklist.map((cookbook) => (
            <option key={cookbook._id} value={cookbook._id}>
              {cookbook.title}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};
export default SearchResult;
