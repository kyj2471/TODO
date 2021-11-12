import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  updateTodoSaga,
  checkedTodoSaga,
  deleteTodoSaga
} from '../store/modules/todo';
import * as S from '../../styles/styles';

interface TodoItem {
  todo: { id: number; text: string; checked: boolean };
  text?: string;
  checked?: boolean;
  key: number;
  updateTodoSaga: any;
  checkedTodoSaga: any;
  deleteTodoSaga: any;
}

function TodoItem({
  todo,
  text,
  updateTodoSaga,
  checkedTodoSaga,
  deleteTodoSaga
}: TodoItem) {
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [input, setInput] = useState(todo.text);
  const [isChecked, setIsChecked] = useState(false);
  const handleUpdate = () => {
    console.log('todo', todo);
    updateTodoSaga({
      ...todo,
      text: input
    });
    setIsEditTodo(!isEditTodo);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleDelete = () => {
    deleteTodoSaga(todo.id);
  };

  const handleChecked = () => {
    checkedTodoSaga({ ...todo });
    setIsChecked(!isChecked);
  };

  const todoClassName = todo.checked ? 'doneTodo' : 'notDoneTodo';

  return (
    <S.TodoItemFull>
      <span className="listItems">
        {isEditTodo ? (
          <input type="text" value={text} onChange={handleChange} />
        ) : (
          <div className={todoClassName}>{todo.text}</div>
        )}
      </span>
      <span className="listButtonContainer">
        <S.MainButton onClick={handleUpdate}>
          {isEditTodo ? '변경' : '수정'}
        </S.MainButton>
        <S.MainButton onClick={handleDelete}>삭제</S.MainButton>
        <S.MainButton onClick={handleChecked}>완료</S.MainButton>
      </span>
    </S.TodoItemFull>
  );
}

const mapStateToProps = ({
  updateTodoSaga,
  deleteTodoSaga,
  checkedTodoSaga
}: TodoItem) => ({
  updateTodoSaga,
  deleteTodoSaga,
  checkedTodoSaga
});

const mapDispatchToProps = (dispatch: any) => ({
  deleteTodoSaga: (todo: TodoItem) => dispatch(deleteTodoSaga(todo)),
  checkedTodoSaga: (todo: TodoItem) => dispatch(checkedTodoSaga(todo)),
  updateTodoSaga: (todo: TodoItem) => dispatch(updateTodoSaga(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
