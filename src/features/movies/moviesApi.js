import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import data from '../../data/sample.json'; // Importa los datos de tu archivo de datos

const getMoviesQuery = () => ({
  data: data.entries.filter((entry) => entry.programType === 'movie'),
});

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // No se utiliza la baseUrl en este caso
  endpoints: (builder) => ({
    getMovies: builder.query({
      queryFn: getMoviesQuery,
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
