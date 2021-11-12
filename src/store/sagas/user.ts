import { call, fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../modules/user';
import { getUserApi } from '../api';
import { AxiosResponse } from 'axios';

function* getUser() {
  try {
    const response: AxiosResponse = yield call(getUserApi);
    yield put(actions.getUserSuccess(response));
  } catch (err) {
    console.log(err);
  }
}

function* watchGetUser() {
  yield takeEvery(actions.GET_USER, getUser);
}

export default function* watchSaga() {
  yield fork(watchGetUser);
}
