import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure, updateUpvotesGiven,updateProfilePicture } from './authActions';
import { logoutRequest, logoutSuccess, logoutFailure } from './authActions';
interface AuthState {
  loading: boolean;
  userId: string | null;
  username: string | null;
  upvotes: number | null;
  upvotesGiven: string[] | null;
  wallet: number | null;
  profilePicture: string | null;
  error: boolean;
}

const initialState: AuthState = {
  loading: false,
  userId: null,
  username: null,
  upvotes: null,
  upvotesGiven: null,
  wallet: null,
  profilePicture: null,
  error: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action: PayloadAction<{userId: string, username: string, upvotes: number, upvotesGiven: string[], wallet: number, profilePicture: string}>) => {
      state.loading = false;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.upvotes = action.payload.upvotes;
      state.upvotesGiven = action.payload.upvotesGiven;
      state.wallet = action.payload.wallet;
      state.profilePicture = action.payload.profilePicture ;
    })
    .addCase(loginFailure, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(updateUpvotesGiven, (state, action: PayloadAction<string>) => {
      if (state.upvotesGiven) {
        state.upvotesGiven.push(action.payload);
      }
    })
    .addCase(updateProfilePicture, (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload;
    })
    .addCase(logoutRequest, (state) => {
      state.loading = true;
    })
    .addCase(logoutSuccess, (state) => {
      state.loading = false;
      state.userId = null;
      state.username = null;
      state.upvotes = null;
      state.upvotesGiven = null;
      state.wallet = null;
      state.profilePicture = null;
      state.error = false;
    })
    .addCase(logoutFailure, (state) => {
      state.loading = false;
      state.error = true;
    });
});