import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  addTodoSaga,
  checkedTodoSaga,
  deleteTodoSaga,
  updateTodoSaga
} from '../modules/todo';

//추가기능 사가
export function* onAddTodoSaga({ payload }: any) {
  yield put(addTodoSaga(payload));
}

export function* onAdd() {
  yield takeLatest('ADD_TODO_SAGA', onAddTodoSaga);
}

// 삭제기능 사가
export function* onDeleteTodoSaga({ payload }: any) {
  yield put(deleteTodoSaga(payload));
}

export function* onDelete() {
  yield takeLatest('DELETE_TODO_SAGA', onDeleteTodoSaga);
}

// 수정기능 사가
export function* onUpdateTodoSaga({ payload }: any) {
  yield put(updateTodoSaga(payload));
  console.log('asdf');
}

export function* onUpdate() {
  yield takeLatest('UPDATE_TODO_SAGA', onUpdateTodoSaga);
}

//완료기능 사가
export function* onCheckedTodoSaga({ payload }: any) {
  yield put(checkedTodoSaga(payload));
}

export function* onChecked() {
  yield takeLatest('CHECKED_TODO_SAGA', onCheckedTodoSaga);
}

//모든 각각의 기능의 사가들 모아서 export
export function* todos() {
  yield all([call(onAdd), call(onDelete), call(onUpdate), call(onChecked)]);
}
