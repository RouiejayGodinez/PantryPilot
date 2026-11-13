function IngredientList({ ingredients, removeIngredient }) {
if (ingredients.length === 0) {
return <p>No ingredients added yet.</p>;
}

return (
<div className="ingredient-list">
{ingredients.map((item) => (
<span className="ingredient-tag" key={item}>
{item}

      <button
        type="button"
        onClick={() => removeIngredient(item)}
      >
        ×
      </button>
    </span>
  ))}
</div>

);
}

export default IngredientList;