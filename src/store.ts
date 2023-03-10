import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IRootState } from './types';
import { weatherReducer } from './features/weather/weather-slice';

export type AppDispatch = ThunkDispatch<IRootState, any, AnyAction>;

const persistConfig = {
  key: 'weather.it',
  storage,
};
const persistedReducer = persistReducer(persistConfig, weatherReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
