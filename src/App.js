import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/recipes-app" component={ Login } />
      <Route exact path="/recipes-app/meals" component={ Recipes } />
      <Route exact path="/recipes-app/drinks" component={ Recipes } />
      <Route exact path="/recipes-app/profile" component={ Profile } />
      <Route exact path="/recipes-app/done-recipes" component={ DoneRecipes } />
      <Route exact path="/recipes-app/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/recipes-app/meals/:id" component={ RecipeDetails } />
      <Route exact path="/recipes-app/drinks/:id" component={ RecipeDetails } />
      <Route
        exact
        path="/recipes-app/meals/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/recipes-app/drinks/:id/in-progress"
        component={ RecipeInProgress }
      />
    </Switch>
  );
}

export default App;
