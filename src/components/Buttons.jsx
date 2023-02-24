import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';

function Buttons({ recipeApi }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  const id = pathname.split('/')[2];
  const currPathName = pathname.split('/')[1];

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const isFavoriteRecipe = favoriteRecipes.some((recipe) => recipe.id
    === recipeApi.idDrink
      || recipe.id === recipeApi.idMeal);
    setIsFavorite(isFavoriteRecipe);
  }, [recipeApi]);

  const saveFavorite = () => {
    const isDrink = currPathName === 'drinks';
    const currId = isDrink ? recipeApi.idDrink : recipeApi.idMeal;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavoriteRecipe = favoriteRecipes.some((recipe) => recipe.id === currId);
    if (!isFavoriteRecipe) {
      const newRecipe = {
        id: currId,
        type: isDrink ? 'drink' : 'meal',
        nationality: !isDrink ? recipeApi.strArea : '',
        category: recipeApi.strCategory,
        alcoholicOrNot: isDrink ? recipeApi.strAlcoholic : '',
        name: isDrink ? recipeApi.strDrink : recipeApi.strMeal,
        image: isDrink ? recipeApi.strDrinkThumb : recipeApi.strMealThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newRecipe]));
    } else {
      const newFavorite = favoriteRecipes.filter((recipe) => recipe.id !== currId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000/${currPathName}/${id}`);
          setLinkCopied(true);
        } }
      >
        <i className="fa-solid fa-share-nodes" />
      </button>
      <button
        onClick={ () => {
          saveFavorite();
          setIsFavorite(!isFavorite);
        } }
      >

        {
          isFavorite ? <i className="fa-solid fa-heart" />
            : <i className="fa-regular fa-heart" />
        }
      </button>

      {linkCopied && <p>Link copied!</p>}
    </div>
  );
}

Buttons.propTypes = {}.isRequired;

export default Buttons;
