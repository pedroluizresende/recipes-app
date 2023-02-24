import React, { useContext, useEffect, useState } from 'react';

import IngredientsList from '../components/IngredientsList';
import useFetch from '../hooks/useFetch';
import './RecipeInProgress.css';

import RecipesContext from '../context/RecipesContext';
import Buttons from '../components/Buttons';

function RecipeInProgress({ history }) {
  const { isAllChecked } = useContext(RecipesContext);
  const { makeFetch, isLoading } = useFetch();

  const [recipeApi, setRecipeApi] = useState([{}]);
  const { location: { pathname } } = history;

  const id = pathname.split('/')[2];
  const currPathName = pathname.split('/')[1];

  useEffect(() => {
    const fetchRecipe = async () => {
      if (pathname.includes('drinks')) {
        const data = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipeApi(data.drinks);
      } else {
        const data = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipeApi(data.meals);
      }
    };
    fetchRecipe();

    const inProgress = JSON.parse(localStorage.getItem('inProgress'));
    if (inProgress) {
      if (!inProgress[currPathName][id]) {
        const newInProgress = {
          ...inProgress,
          [currPathName]: {
            ...inProgress[currPathName],
            [id]: [],
          },
          [currPathName === 'drinks' ? 'meals' : 'drinks']:
           inProgress[[currPathName === 'drinks' ? 'meals' : 'drinks']],
        };
        localStorage.setItem('inProgress', JSON.stringify(newInProgress));
      }
    } else {
      const newInProgress = {
        ...inProgress,
        [currPathName]: {
          [id]: [],
        },
        [currPathName === 'drinks' ? 'meals' : 'drinks']: {},
      };
      localStorage.setItem('inProgress', JSON.stringify(newInProgress));
    }
  }, []);

  const makeIngredients = (recipe) => {
    const ing = (Object.entries(recipe)
      .filter(([key, value]) => key.startsWith('strIngredient') && value)
      .map(([, value]) => value));

    const measures = (Object.entries(recipe)
      .filter(([key, value]) => key.startsWith('strMeasure') && value)
      .map(([, value]) => value));

    const ingredients = ing.map((item, index) => `${item} ${measures[index]}`);
    return ingredients;
  };

  const ingredients = makeIngredients(recipeApi[0]);

  const onclick = () => {
    const tags = recipeApi[0].strTags ? recipeApi[0].strTags.split(',') : [];
    const dateNow = new Date().toISOString();
    const isDrink = currPathName === 'drinks';
    const currId = isDrink ? recipeApi[0].idDrink : recipeApi[0].idMeal;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newRecipe = {
      id: currId,
      type: isDrink ? 'drink' : 'meal',
      nationality: !isDrink ? recipeApi[0].strArea : '',
      category: recipeApi[0].strCategory,
      alcoholicOrNot: isDrink ? recipeApi[0].strAlcoholic : '',
      name: isDrink ? recipeApi[0].strDrink : recipeApi[0].strMeal,
      image: isDrink ? recipeApi[0].strDrinkThumb : recipeApi[0].strMealThumb,
      doneDate: dateNow,
      tags,
    };
    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipes, newRecipe]));

    history.push('/done-recipes');
  };

  const video = recipeApi[0].strYoutube;
  const urlVideo = video ? video.replace('watch?v=', 'embed/') : '';

  if (isLoading) {
    return (
      <div className="loading-container">
        <i
          className="fa-solid fa-spinner loading-icon"
        />
      </div>
    );
  }
  return (
    <main className="recipe-in-progress-content">
      <div
        className="background-image"
        style={
          { backgroundImage: `url(${currPathName === 'drinks'
            ? recipeApi[0].strDrinkThumb : recipeApi[0].strMealThumb})` }
        }
      >
        <div className="header-in-progress">
          <nav>
            {
              pathname.includes('drinks') ? (
                <h2
                  data-testid="recipe-category"
                >
                  { `${recipeApi[0].strCategory} ${recipeApi[0].strAlcoholic}` }

                </h2>
              ) : (<h2 data-testid="recipe-category">{recipeApi[0].strCategory}</h2>)
            }
            <Buttons
              recipeApi={ recipeApi[0] }
            />
          </nav>
          <h1 data-testid="recipe-title">

            {pathname.includes('drinks') ? recipeApi[0].strDrink : recipeApi[0].strMeal}

          </h1>

        </div>
      </div>
      <div className="ingredients-content">
        <h3>Ingredients</h3>
        { !isLoading && <IngredientsList
          isLoading={ isLoading }
          ingredients={ ingredients }
          id={ id }
          currPathName={ currPathName }
        />}
      </div>
      <div className="instructions-content">
        <h3>Instructions</h3>
        <p data-testid="instructions">
          { recipeApi[0].strInstructions}
        </p>
      </div>
      {
        video
        && (
          <div
            className="video-content"
          >

            <h3>Video</h3>
            <iframe
              title="Veja no youtube"
              data-testid="video"
              src={ urlVideo }
              height="205.09px"
              width="336px"
            />
          </div>
        )
      }
      <button
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
        disabled={ isAllChecked }
        onClick={ onclick }
      >
        Finish
      </button>
    </main>
  );
}

RecipeInProgress.propTypes = {}.isRequired;

export default RecipeInProgress;
