import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { moviesApi } from '../features/movies/moviesApi';
import { seriesApi } from '../features/series/seriesApi'; // Agrega la importación del API de series

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [seriesApi.reducerPath]: seriesApi.reducer, // Agrega el reducerPath y reducer del API de series
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware, seriesApi.middleware), // Agrega el middleware del API de series
});

setupListeners(store.dispatch);
