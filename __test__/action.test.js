import * as actions from '../src/store/modules/todo';
import * as types from '../src/store/modules/todo';

describe.skip('action', () => {
  it('actions', () => {
    const todo = 'finish docs';
    const expectedAction = {
      type: types.ADD_TODO_SAGA,
      todo
    };
    expect(actions.addTodoSaga(todo)).toEqual(expectedAction);
  });
});
