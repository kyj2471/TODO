import { createAction, createReducer } from '@reduxjs/toolkit';
import { WeatherType } from '../interface/interface';

export const GET_WEATHER = 'weather/GET_WEATHER';
export const GET_WEATHER_SUCCESS = 'weather/GET_WEATHER_SUCCESS';
export const GET_WEATHER_FAILURE = 'weather/GET_WEATHER_FAILURE';
export const GET_WEATHER_LOADING = 'weather/GET_WEATHER_LOADING';

export const getWeather = createAction(
  GET_WEATHER,
  function prepare(weather: any) {
    return {
      payload: {
        weather
      }
    };
  }
);
export const getWeatherSuccess = createAction(
  GET_WEATHER_SUCCESS,
  function prepare(weather: any) {
    return {
      payload: {
        weather
      }
    };
  }
);
export const getWeatherFailure = createAction(GET_WEATHER_FAILURE);
export const getWeatherLoading = createAction(GET_WEATHER_LOADING);

const initialState: WeatherType = {
  isLoading: false,
  weatherData: { weather: {} }
};

const reducer = createReducer(initialState, {
  [getWeatherLoading.type]: (state) => {
    state.isLoading = true;
  },
  [getWeatherSuccess.type]: (state, action) => {
    (state.isLoading = false), (state.weatherData = action.payload);
  },
  [getWeatherFailure.type]: (state) => {
    state;
  }
});

export default reducer;
