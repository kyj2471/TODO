import { all, fork } from 'redux-saga/effects';
import { todos } from './todo';
import weather from './weather';
import user from './user';
import image from './image';

export default function* rootSaga() {
  yield all([fork(todos), fork(weather), fork(user), fork(image)]);
}
