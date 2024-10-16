// pizzaApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API slice
export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    // Endpoint to fetch orders
    getOrders: builder.query({
      query: () => 'pizza/history',
      providesTags: ['Orders'],
    }),
    // Endpoint to create a new pizza order
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'pizza/order',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetOrdersQuery, useCreateOrderMutation } = pizzaApi;