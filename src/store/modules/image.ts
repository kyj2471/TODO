import { createAction, createReducer } from '@reduxjs/toolkit';
import { ImageType } from '../interface/interface';
export const IMAGES_LOAD = 'IMAGES_LOAD';
export const IMAGES_LOAD_SUCCESS = 'IMAGES_LOAD_SUCCESS';
export const IMAGES_LOAD_FAILURE = 'IMAGES_LOAD_FAILURE';

export const imagesLoad = createAction(
  IMAGES_LOAD,
  function prepare(image: any) {
    return {
      payload: {
        image
      }
    };
  }
);
export const imagesLoadSuccess = createAction(
  IMAGES_LOAD_SUCCESS,
  function prepare(image: any) {
    return {
      payload: {
        image
      }
    };
  }
);
export const imagesLoadFailure = createAction(IMAGES_LOAD_FAILURE);

const initialState: ImageType = {
  isLoading: false,
  imageData: { image: { imageData: { image: { data: {} } } } }
};

const reducer = createReducer(initialState, {
  [imagesLoad.type]: (state) => {
    state.isLoading = true;
  },
  [imagesLoadSuccess.type]: (state, action) => {
    (state.imageData = action.payload), (state.isLoading = false);
  },
  [imagesLoadFailure.type]: (state) => {
    state.isLoading = false;
  }
});

export default reducer;
