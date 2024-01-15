import { createSlice } from '@reduxjs/toolkit';

import { GitHubUser } from '../../components/shared/InputSearch';

export interface UserState {
  user: GitHubUser | null;
  repositories: [];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  repositories: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.repositories = [];
    },
    fetchUserReposRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchUserReposSuccess: (state, action) => {
      state.repositories = action.payload;
      state.loading = false;
    },
    clearUserData: state => {
      state.user = null;
      state.repositories = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserReposRequest,
  fetchUserReposSuccess,
  clearUserData,
} = userSlice.actions;
export default userSlice.reducer;
