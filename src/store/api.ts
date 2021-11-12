import axios from 'axios';

export function getUserApi() {
  return axios.get('https://randomuser.me/api');
}

// weather API
const API = {
  key: '062f94b6879d4a4a64755999bee3a513',
  base: 'https://api.openweathermap.org/data/2.5/'
};

export function getWeatherApi() {
  return axios.get(`${API.base}weather?q=Seoul&units=metric&APPID=${API.key}`);
}

// Image API
const IMAGE_API = 'mbNCpfb7kxD9BaLiEi0-4_2u5NEoEpNrhLzvmFPnxr8';

export function getSplashImage() {
  return axios.get(
    `https://api.unsplash.com/photos/?client_id=${IMAGE_API}&per_page=30`
  );
}
