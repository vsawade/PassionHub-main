import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction<{userId: string, username: string, upvotes: number, upvotesGiven: string[], wallet: number, profilePicture: string}>('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const updateUpvotesGiven = createAction<string>('UPDATE_UPVOTES_GIVEN');
export const updateProfilePicture = createAction<string>('UPDATE_PROFILE_PICTURE');

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const logoutFailure = createAction('LOGOUT_FAILURE');
 
