import { useState, useEffect } from "react";
import recipes from "./data/recipes";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ShoppingList from "./pages/ShoppingList";

function App() {
  const [ingredients, setIngredients] = useState(
    () => JSON.parse(localStorage.getItem("ingredients")) || []
  );

  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [shopping, setShopping] = useState(
    () => JSON.parse(localStorage.getItem("shopping")) || []
  );

  const [input, setInput] = useState("");
  const [shoppingInput, setShoppingInput] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("Home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("shopping", JSON.stringify(shopping));
  }, [shopping]);

  function addIngredient(e) {
    e.preventDefault();

    const item = input.trim().toLowerCase();

    if (!item || ingredients.includes(item)) return;

    setIngredients((previous) => [...previous, item]);
    setInput("");
  }

  function removeIngredient(item) {
    setIngredients((previous) =>
      previous.filter((ingredient) => ingredient !== item)
    );
  }

  const matchedRecipes = [];

  for (const recipe of recipes) {
    const matched = [];
    const missing = [];

    for (const item of recipe.ingredients) {
      if (ingredients.includes(item)) {
        matched.push(item);
      } else {
        missing.push(item);
      }
    }

    const result = {
      ...recipe,
      matched,
      missing,
      score: matched.length,
    };

    const hasIngredients =
      ingredients.length === 0 || result.score > 0;

    const matchesCategory =
      category === "All" || recipe.category === category;

    if (hasIngredients && matchesCategory) {
      matchedRecipes.push(result);
    }
  }

  matchedRecipes.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return a.missing.length - b.missing.length;
  });

  function toggleFavorite(id) {
    setFavorites((previous) => {
      if (previous.includes(id)) {
        return previous.filter((favorite) => favorite !== id);
      }

      return [...previous, id];
    });
  }

  function addMissingIngredients(recipe) {
    const missing = recipe.ingredients.filter(
      (item) => !ingredients.includes(item)
    );

    setShopping((previous) => {
      const updated = [...previous];

      for (const item of missing) {
        const alreadyExists = updated.some(
          (shoppingItem) => shoppingItem.name === item
        );

        if (!alreadyExists) {
          updated.push({
            name: item,
            checked: false,
          });
        }
      }

      return updated;
    });
  }

  function addShoppingItem(e) {
    e.preventDefault();

    const item = shoppingInput.trim().toLowerCase();

    if (!item) return;

    if (shopping.some((shoppingItem) => shoppingItem.name === item)) {
      return;
    }

    setShopping((previous) => [
      ...previous,
      { name: item, checked: false },
    ]);

    setShoppingInput("");
  }

  function toggleShopping(index) {
    setShopping((previous) =>
      previous.map((item, i) => {
        if (i === index) {
          return { ...item, checked: !item.checked };
        }

        return item;
      })
    );
  }

  function removeShopping(index) {
    setShopping((previous) =>
      previous.filter((_, i) => i !== index)
    );
  }

  function RecipeDetails() {
    if (!selectedRecipe) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <button
            className="close-button"
            onClick={() => setSelectedRecipe(null)}
          >
            ✕
          </button>

          <h2>
            {selectedRecipe.image} {selectedRecipe.name}
          </h2>

          <p>
            Cooking Time: {selectedRecipe.time} minutes
          </p>

          <h3>Ingredients</h3>

          <ul>
            {selectedRecipe.ingredients.map((item) => (
              <li key={item}>
                {item} {ingredients.includes(item) ? "✓" : "— Missing"}
              </li>
            ))}
          </ul>

          <h3>Instructions</h3>

          <ol>
            {selectedRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <button
            className="primary-button"
            onClick={() => addMissingIngredients(selectedRecipe)}
          >
            Add Missing Ingredients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🥬 PantryPilot</h1>
        <p>Good meals start with what you have.</p>
      </header>

      <Navbar page={page} setPage={setPage} />

      <main>
        {page === "Home" && (
          <Home
            ingredients={ingredients}
            input={input}
            setInput={setInput}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            setIngredients={setIngredients}
            category={category}
            setCategory={setCategory}
            matchedRecipes={matchedRecipes}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setSelectedRecipe={setSelectedRecipe}
            addMissingIngredients={addMissingIngredients}
          />
        )}

        {page === "Favorites" && (
          <Favorites
            recipes={recipes}
            favorites={favorites}
            ingredients={ingredients}
            toggleFavorite={toggleFavorite}
            setSelectedRecipe={setSelectedRecipe}
            addMissingIngredients={addMissingIngredients}
          />
        )}

        {page === "Shopping" && (
          <ShoppingList
            shopping={shopping}
            shoppingInput={shoppingInput}
            setShoppingInput={setShoppingInput}
            addShoppingItem={addShoppingItem}
            toggleShopping={toggleShopping}
            removeShopping={removeShopping}
            setShopping={setShopping}
          />
        )}
      </main>

      <RecipeDetails />

      <footer>
        <p>PantryPilot © 2026</p>
      </footer>
    </div>
  );
}

export default App;