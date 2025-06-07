import Recipe from "./Recipe";

const CookbookCard = ({ cookbook }) => {
  return (
    <div className="cookbook-card">
      <h3 className="cookbook-title">{cookbook.title}</h3>
      <p className="cookbook-description">{cookbook.description}</p>
      <p className="cookbook-count">{cookbook.recipes?.length} recipes</p>
      
      {cookbook.recipes?.length > 0 && (
        cookbook.recipes.map((r) => (
          <Recipe key={r._id} recipe={r} />
        ))
      )}
      
      <span className="cookbook-date">
        {new Date(cookbook.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};
export default CookbookCard;
