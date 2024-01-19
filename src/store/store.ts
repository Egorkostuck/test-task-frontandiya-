import { configureStore } from '@reduxjs/toolkit';

import { api } from 'api/Api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(api.middleware);
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
