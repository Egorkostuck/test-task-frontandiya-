import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_GIT_HUB_USER_API;
const API_TOKEN = process.env.REACT_APP_GIT_HUB_YOUR_ACCESS_TOKEN;

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
