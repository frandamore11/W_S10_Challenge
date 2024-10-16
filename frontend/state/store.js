// state/store.js
import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import filterReducer from './filterSlice';

export const resetStore = () =>
  configureStore({
    reducer: {
      [pizzaApi.reducerPath]: pizzaApi.reducer,
      sizeFilter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pizzaApi.middleware),
  });

export const store = resetStore();