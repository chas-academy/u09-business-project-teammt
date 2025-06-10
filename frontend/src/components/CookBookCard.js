import Recipe from './Recipe';
import { cookbookApi } from '../api/cookbookApi';

const CookbookCard = ({ cookbook, refrashFun }) => {
  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${cookbook.title}" cookbook?`);
    if (!confirmed) return;

    try {
      await cookbookApi.delete(cookbook._id);
      refrashFun();
    } catch (err) {
      console.log('Delete failed:', err.message);
    }
  }

  return (
    <div className="cookbook-card">
      <div>
        <h3 className="cookbook-title">{cookbook.title}</h3>
        <button onClick={handleDelete} className="remove-button" title="Delete CookBook">
          ×
        </button>
      </div>

      <p className="cookbook-description">{cookbook.description}</p>
      <p className="cookbook-count">{cookbook.recipes?.length} recipes</p>

      {cookbook.recipes?.length > 0 &&
        cookbook.recipes.map((r) => (
          <Recipe key={r._id} recipe={r} refrashFun={refrashFun} bookid={cookbook._id} />
        ))}

      <span className="cookbook-date">{new Date(cookbook.createdAt).toLocaleDateString()}</span>
    </div>
  );
};

export default CookbookCard;
