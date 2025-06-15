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
  }

  if (!recipe) {
    return (
      <div className="recipe-details-overlay">
        <div className="recipe-details-modal">
          <div className="modal-header">
            <h3>Error</h3>
            <button onClick={onClose} className="remove-button">
              ×
            </button>
          </div>
          <p>Failed to load recipe details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details-overlay">
      <div className="recipe-details-modal" style={{ maxWidth: '800px', maxHeight: '90vh' }}>
        <div className="modal-header">
          <h3>{recipe.title}</h3>
          <button onClick={onClose} className="remove-button">
            ×
          </button>
        </div>

        <div style={{ overflow: 'auto', maxHeight: 'calc(90vh - 100px)' }}>
          {/* Recipe Image */}
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '20px'
              }}
            />
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px',
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            {recipe.readyInMinutes && (
              <div>
                <strong>Ready in:</strong><br />
                {recipe.readyInMinutes} minutes
              </div>
            )}
            {recipe.servings && (
              <div>
                <strong>Servings:</strong><br />
                {recipe.servings}
              </div>
            )}
            {recipe.pricePerServing && (
              <div>
                <strong>Price per serving:</strong><br />
                ${(recipe.pricePerServing / 100).toFixed(2)}
              </div>
            )}
            {recipe.healthScore && (
              <div>
                <strong>Health Score:</strong><br />
                {recipe.healthScore}/100
              </div>
            )}
          </div>

          {/* Diet Tags */}
          {(recipe.vegetarian || recipe.vegan || recipe.glutenFree || recipe.dairyFree) && (
            <div style={{ marginBottom: '20px' }}>
              <strong>Dietary Info:</strong>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                {recipe.vegetarian && (
                  <span style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    Vegetarian
                  </span>
                )}
                {recipe.vegan && (
                  <span style={{
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    Vegan
                  </span>
                )}
                {recipe.glutenFree && (
                  <span style={{
                    backgroundColor: '#fd7e14',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    Gluten Free
                  </span>
                )}
                {recipe.dairyFree && (
                  <span style={{
                    backgroundColor: '#6f42c1',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    Dairy Free
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Summary */}
          {recipe.summary && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>Summary</h4>
              <div
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '8px',
                  lineHeight: '1.6'
                }}
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </div>
          )}

          {/* Ingredients */}
          {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#333', marginBottom: '15px' }}>Ingredients</h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '15px'
              }}>
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index} style={{
                    padding: '8px 0',
                    borderBottom: index < recipe.extendedIngredients.length - 1 ? '1px solid #e9ecef' : 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {ingredient.image && (
                      <img
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                        alt={ingredient.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          marginRight: '12px',
                          borderRadius: '4px'
                        }}
                      />
                    )}
                    <span>
                      <strong>{ingredient.amount} {ingredient.unit}</strong> {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#333', marginBottom: '15px' }}>Instructions</h4>
              <div
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '8px',
                  lineHeight: '1.8'
                }}
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </div>
          )}

          {/* Source Link */}
          {recipe.sourceUrl && (
            <div style={{
              textAlign: 'center',
              padding: '15px',
              backgroundColor: '#e9ecef',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                View Original Recipe →
              </a>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="form-actions" style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            ← Back to Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;