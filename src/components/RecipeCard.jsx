function RecipeCard({
recipe,
favorites,
toggleFavorite,
setSelectedRecipe,
addMissingIngredients,
}) {
const isFavorite = favorites.includes(recipe.id);

return (
<article className="recipe-card">
<div className="recipe-card-header">
<h3>
{recipe.image} {recipe.name}
</h3>

    <button
      type="button"
      onClick={() => toggleFavorite(recipe.id)}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  </div>

  <p>
    {recipe.category} · {recipe.time} minutes
  </p>

  <p>
    Available: {recipe.matched.length} | Missing:{" "}
    {recipe.missing.length}
  </p>

  <button
    type="button"
    onClick={() => setSelectedRecipe(recipe)}
  >
    View Recipe
  </button>

  <button
    type="button"
    onClick={() => addMissingIngredients(recipe)}
  >
    Add Missing Ingredients
  </button>
</article>

);
}

export default RecipeCard;