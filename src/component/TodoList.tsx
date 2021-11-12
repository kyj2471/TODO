import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const TodoListItemFullWrapper = styled.div`
  margin-top: 50px;
`;

interface TodoListProps {
  state: any;
}

function TodoList({ state }: TodoListProps) {
  console.log(state);
  return (
    <TodoListItemFullWrapper>
      {state.todo.map((todo: any) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </TodoListItemFullWrapper>
  );
}
const mapStateToProps = (state: TodoListProps) => ({
  state
});
export default connect(mapStateToProps)(TodoList);
