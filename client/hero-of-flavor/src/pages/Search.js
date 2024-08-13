import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './Search.css'; // Import the CSS file

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term
  const itemsPerPage = 32; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ingredients');
        setIngredients(response.data); // Store the fetched ingredients in state
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  // Handle ingredient click
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (!prev.includes(ingredient)) {
        return [...prev, ingredient];
      }
      return prev;
    });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter ingredients based on the search term
  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle finding recipes
  const findRecipes = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', {
        ingredients: selectedIngredients.map(ingredient => ingredient.Name)
      });
      setRecipes(response.data); // Store the fetched recipes in state
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Handle page navigation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container">
      <h1>Recipe by Ingredient Tool</h1>
      <button className="button" onClick={findRecipes}>
        Find Recipes With My Ingredients!
      </button>

      <div className="options">
        <button className="optionButton">Sort By Type</button>
        <button className="optionButton">Sort Alphabetically</button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="searchBar"
      />

      <div className="selectedIngredients">
        <h3>Selected Ingredients:</h3>
        {selectedIngredients.length > 0 ? (
          <div className="ingredientsGrid">
            {selectedIngredients.map((ingredient, idx) => (
              <div
                key={idx} 
                onClick={() => handleIngredientClick(ingredient)}
                className="ingredientItem"
              >
                <img src={`/images/ingredients/${ingredient.imagePath}`} alt={ingredient.Name} />
                <p>{ingredient.Name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No ingredients selected yet.</p>
        )}
      </div>

      <div className="ingredientsGrid">
        {currentItems.map((ingredient) => (
          <div
            key={ingredient._id} // Assuming MongoDB's ObjectId is used as the unique identifier
            onClick={() => handleIngredientClick(ingredient)}
            className="ingredientItem"
          >
            <img src={`/images/ingredients/${ingredient.imagePath}`} alt={ingredient.Name} />
            <p>{ingredient.Name}</p>
          </div>
        ))}
      </div>

      {recipes.length > 0 && (
        <div className="recipesList">
          <h2>Possible Recipes</h2>
          <div className="recipesGrid">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="recipeItem">
                <img src={`/images/recipes/${recipe.imagePath}`} alt={recipe.Name} className="recipeImage" />
                <p>{recipe.Name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;