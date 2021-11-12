import { AxiosResponse } from 'axios';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { getSplashImage } from '../api';
import * as actions from '../modules/image';

function* getImagesLoad() {
  try {
    const response: AxiosResponse = yield call(getSplashImage);
    yield put(actions.imagesLoadSuccess(response));
  } catch (err) {
    console.log(err);
  }
}

function* watchGetImages() {
  yield takeLatest(actions.IMAGES_LOAD, getImagesLoad);
}

export default function* watchSaga() {
  yield fork(watchGetImages);
}
