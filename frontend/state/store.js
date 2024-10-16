// state/store.js
import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';

export const resetStore = () =>
  configureStore({
    reducer: {
      // Add the API reducer
      [pizzaApi.reducerPath]: pizzaApi.reducer,
      // You can add other reducers here
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pizzaApi.middleware),
  });

export const store = resetStore();