import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';
import constructorReducer from './constructor';
import ingredientDetailsReducer from './ingredient';
import orderReducer from './order';
import modalsReducer from './modals';
import authReducer from './user';
import wsReducer from './wsReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  modals: modalsReducer,
  authReducer,
  wsReducer
});