import { createAction, createReducer } from '@reduxjs/toolkit';
import { UserType } from '../interface/interface';

export const GET_USER = 'user/GET_USER';
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'user/GET_USER_FAILURE';

export const getUser = createAction(GET_USER, function prepare(user: any) {
  return {
    payload: {
      user
    }
  };
});
export const getUserSuccess = createAction(
  GET_USER_SUCCESS,
  function prepare(user: any) {
    return {
      payload: {
        user
      }
    };
  }
);
export const getUserFailure = createAction(GET_USER_FAILURE);

const initialState: UserType = {
  userData: { user: { userData: { user: { data: { results: {} } } } } }
};

const reducer = createReducer(initialState, {
  [getUserSuccess.type]: (state, action) => {
    state.userData = action.payload;
  },
  [getUserFailure.type]: (state) => {
    state;
  }
});

export default reducer;
