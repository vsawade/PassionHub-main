import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authReducer';

const rootReducer = {
  auth: authReducer,
  // other reducers go here
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;