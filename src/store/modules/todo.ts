import { createAction, createReducer } from '@reduxjs/toolkit';
import { todos } from '../sagas/todo';

export const ADD_TODO_SAGA = 'todo/ADD_TODO_SAGA';
export const DELETE_TODO_SAGA = 'todo/DELETE_TODO_SAGA';
export const UPDATE_TODO_SAGA = 'todo/UPDATE_TODO_SAGA';
export const CHECKED_TODO_SAGA = 'todo/CHECKED_TODO_SAGA';

export const addTodoSaga = createAction(
  ADD_TODO_SAGA,
  function prepare(todo: any) {
    return {
      payload: {
        id: todo.id,
        text: todo.text
      }
    };
  }
);
export const deleteTodoSaga = createAction(
  DELETE_TODO_SAGA,
  function prepare(todo: any) {
    return {
      payload: {
        id: todo
      }
    };
  }
);
export const updateTodoSaga = createAction(
  UPDATE_TODO_SAGA,
  function prepare(todo: any) {
    return {
      payload: {
        id: todo.id,
        text: todo.text
      }
    };
  }
);
export const checkedTodoSaga = createAction(
  CHECKED_TODO_SAGA,
  function prepare(todo: any) {
    return {
      payload: {
        id: todo.id,
        text: todo.text
      }
    };
  }
);

const initialState = [
  {
    id: 0,
    text: '으아앙',
    checked: false
  }
];

const reducer = createReducer(initialState, {
  [addTodoSaga.type]: (state, action) => {
    state.push(action.payload);
  },
  [deleteTodoSaga.type]: (state, action) => {
    return state.filter((todo) => todo.id !== action.payload.id);
  },
  [updateTodoSaga.type]: (state, action) => {
    const index = state.findIndex((todo) => todo.id === action.payload.id);
    state[index] = action.payload;
  },
  [checkedTodoSaga.type]: (state, action) => {
    const index = state.findIndex((todo) => todo.id === action.payload.id);
    state[index].checked = !state[index].checked;
  }
});
export default reducer;
