import React from 'react';
import TodoForm from '../src/component/TodoForm';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const mockStore = configureStore([]);
let store;
let component;

beforeEach(() => {
  store = mockStore({
    myState: 'sample text'
  });
  store.dispatch = jest.fn();

  component = renderer.create(
    <Provider store={store}>
      <TodoForm />
    </Provider>
  );
});

describe('<T O D O _ F O R M > T E S T', () => {
  it('[스냅샷]-TodoForm', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('todoform test', () => {
    jest.spyOn(Date, 'now').mockReturnValueOnce(1000);
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });

    renderer.act(() => {
      component.root
        .findByType('input')
        .props.onChange({ target: { value: 'asd' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        id: 1000,
        text: ''
      },
      type: 'todo/ADD_TODO_SAGA'
    });
  });
});

// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import TodoForm from '../src/component/TodoForm';
// import configureStore from 'redux-mock-store';

// const mockStore = configureStore([]);

// let store = mockStore({
//   myState: 'sample text'
// });
// store.dispatch = jest.fn();
// console.log(store);

// it('should not call addTodo if length of text is 0', () => {
//   const mockAddTodoSaga = jest.fn();
//   render(<TodoForm store={store} addTodoSaga={mockAddTodoSaga} />);
//   fireEvent.change(screen.getByLabelText(/formInput/i), {
//     target: { value: '' }
//   });
//   expect(mockAddTodoSaga).toHaveBeenCalledTimes(0);
// });

// it('should call addTodo if length of text is greater than 0', () => {
//   const mockAddTodoSaga = jest.fn();
//   render(<TodoForm store={store} addTodoSaga={mockAddTodoSaga} />);

//   fireEvent.change(screen.getByLabelText(/formInput/i), {
//     target: { value: 'Tony' }
//   });
//   expect(mockAddTodoSaga).toHaveBeenCalledTimes(1);
// });
