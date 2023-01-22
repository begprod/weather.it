import { combineReducers } from 'redux';
import { weatherListReducer } from './weather/weather-reducer';


export const rootReducer = combineReducers({
  weatherList: weatherListReducer,
});
