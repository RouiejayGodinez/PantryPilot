function IngredientInput({ input, setInput, addIngredient }) {
return (
<form className="ingredient-input" onSubmit={addIngredient}>
<input
type="text"
placeholder="Enter an ingredient..."
value={input}
onChange={(e) => setInput(e.target.value)}
/>

  <button type="submit" className="primary-button">
    Add
  </button>
</form>

);
}

export default IngredientInput;