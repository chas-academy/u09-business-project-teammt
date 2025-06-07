const Recipe = ({recipe}) => {
    console.log(recipe)
  return (
      <div className="recipe">
      <h4 className="recipe-title">{recipe.title}</h4>
      <img 
        src={recipe.image}  // Fixed: was recipe.Image (uppercase I)
        alt={recipe.title}
        className="recipe-image"
      />
    </div>
  );
}
export default Recipe;
