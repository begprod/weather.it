import { AnyAction } from 'redux';
import { ThunkDispatch } from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import { IRootState } from './interfaces';
import { weatherReducer } from './features/weather/weather-slice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = ThunkDispatch<IRootState, any, AnyAction>;
