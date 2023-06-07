import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import data from '../../data/sample.json'; // Importa los datos de tu archivo de datos

const getSeriesQuery = () => ({
  data: data.entries.filter((entry) => entry.programType === 'series'),
});

export const seriesApi = createApi({
  reducerPath: 'seriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // No se utiliza la baseUrl en este caso
  endpoints: (builder) => ({
    getSeries: builder.query({
      queryFn: getSeriesQuery,
    }),
  }),
});

export const { useGetSeriesQuery } = seriesApi;
