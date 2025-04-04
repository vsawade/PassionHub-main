export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const UPDATE_UPVOTES_GIVEN = 'UPDATE_UPVOTES_GIVEN';
export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';

export interface UpdateUpvotesGivenAction {
  type: typeof UPDATE_UPVOTES_GIVEN;
  payload: string;
}
export interface UpdateProfilePictureAction {
  type: typeof UPDATE_PROFILE_PICTURE;
  payload: string;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface LogoutRequestAction {
    type: typeof LOGOUT_REQUEST;
  }
   
export interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
  }
   
export interface LogoutFailureAction {
    type: typeof LOGOUT_FAILURE;
  }

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    userId: string;
    username: string;
    upvotes: number;
    upvotesGiven: string[];
    wallet: number;
    profilePicture: string;
  };
}
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
}

export type AuthActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction | UpdateUpvotesGivenAction | UpdateProfilePictureAction | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction;;