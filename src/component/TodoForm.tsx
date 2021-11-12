import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodoSaga } from '../store/modules/todo';
import * as S from '../../styles/styles';

interface TodoForm {
  text: any;
  addTodoSaga: any;
}

function TodoForm({ addTodoSaga }: TodoForm) {
  const [input, setInput] = useState('');

  const handleChange = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    addTodoSaga({
      id: Date.now(),
      text: input
    });

    setInput('');
  };

  return (
    <S.HeadTodoForm>
      <form className="formContainer" onSubmit={handleSubmit}>
        <S.TodoInput
          className="todoInput"
          value={input}
          onChange={handleChange}
          type="text"
          required
        />
        <S.MainButton
          huge
          type="submit"
          className="todoButton"
          onClick={handleSubmit}>
          추가
        </S.MainButton>
      </form>
    </S.HeadTodoForm>
  );
}

const mapStateToProps = ({ text, addTodoSaga }: TodoForm) => ({
  text,
  addTodoSaga
});

const mapDispatchToProps = (dispatch: any) => ({
  addTodoSaga: (todo: TodoForm) => dispatch(addTodoSaga(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
