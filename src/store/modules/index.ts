import { combineReducers } from '@reduxjs/toolkit';
import todo from './todo';
import weather from './weather';
import user from './user';
import image from './image';

const index = combineReducers({
  todo,
  weather,
  user,
  image
});

export type RootState = ReturnType<typeof index>;
export default index;
