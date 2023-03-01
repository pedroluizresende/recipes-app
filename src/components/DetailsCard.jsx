import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './DetailsCard.css';
import { useHistory } from 'react-router-dom';
import Buttons from './Buttons';
import BackButton from './BackButton';

function DetailsCard({
  image,
  name,
  category,
  ingredient,
  instruction,
  video,
  alcoholicOrNot,
  recomendations,
  pathname,
  id,
  recipeApi,
}) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const history = useHistory();

  const inProgressRecipes = {
    drinks: {
      178319: [],
    },
    meals: {
      52771: [],
    },
  };

  const startOrInProgress = () => {
    if (pathname.includes('drinks') && inProgressRecipes.drinks[id]) {
      return 'Continue Recipe';
    } if (pathname.includes('meals') && inProgressRecipes.meals[id]) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  };

  const clickChange = () => {
    history.push(`${pathname}/in-progress`);
  };

  const urlVideo = video ? video.replace('watch?v=', 'embed/') : '';

  return (
    <>

      <div
        className="background-image"
        style={ { backgroundImage: `url(${image})` } }
      >
        <div className="header-details">
          <BackButton />
          <nav>
            {pathname.includes('drinks') ? (
              <h2 data-testid="recipe-category">{`${category} - ${alcoholicOrNot}`}</h2>
            ) : (
              <h2 data-testid="recipe-category">{`${category}`}</h2>
            )}
            <Buttons
              recipeApi={ recipeApi }
            />
          </nav>
          <h1 data-testid="recipe-title">{name}</h1>
        </div>

      </div>

      <div className="ingredients-content">
        <h3>Ingredients</h3>
        <ul>
          {ingredient.map((ingrediente, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingrediente}
            </li>
          ))}
        </ul>
      </div>
      <div className="instructions-content">
        <h3>Instructions</h3>
        <p>{ instruction}</p>
      </div>
      {video && (
        <div className="video-content">
          <h3>Video</h3>
          <iframe
            title="Veja no youtube"
            data-testid="video"
            height="205.09px"
            width="336px"
            src={ urlVideo }
          />
        </div>
      )}
      <div className="slider-content">
        <h3>Recommended</h3>
        <Slider { ...settings }>
          {pathname.includes('drinks')
            ? recomendations.map((d, index) => (
              <button
                onClick={ () => history.push(`/recipes-app/meals/${d.idMeal}`) }
                key={ d.strMeal }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  key={ d.strMeal }
                  className="recomImg"
                  src={ d.strMealThumb }
                  alt={ d.strMeal }
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  {d.strMeal}
                </p>
              </button>
            ))
            : recomendations.map((d, index) => (
              <button
                onClick={ () => history.push(`/recipes-app/drinks/${d.idDrink}`) }
                key={ d.strDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  className="recomImg"
                  src={ d.strDrinkThumb }
                  alt={ d.strDrink }
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  {d.strDrink}
                </p>
              </button>
            ))}
        </Slider>
      </div>
      <button
        className="startRecipeBtn"
        type="button"
        id="startRecipeBtn"
        data-testid="start-recipe-btn"
        onClick={ clickChange }
      >
        {
          startOrInProgress()
        }
      </button>

    </>
  );
}

DetailsCard.propTypes = {}.isRequired;

export default DetailsCard;
