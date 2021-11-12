import { put, call, takeEvery, fork } from 'redux-saga/effects';
import * as actions from '../modules/weather';
import { getWeatherApi } from '../api';
import { AxiosResponse } from 'axios';

function* getWeather() {
  try {
    const response: AxiosResponse = yield call(getWeatherApi);
    yield put(actions.getWeatherSuccess(response));
  } catch (err) {
    console.log(err);
  }
}

function* watchGetWeather() {
  yield takeEvery(actions.GET_WEATHER, getWeather);
}

export default function* watchSaga() {
  yield fork(watchGetWeather);
}
