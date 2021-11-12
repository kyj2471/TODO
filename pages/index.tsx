import React, { useState } from 'react';
import TodoForm from '../src/component/TodoForm';
import TodoList from '../src/component/TodoList';
import Header from '../src/component/Header';
import styled from 'styled-components';

const FullWrapperContent = styled.div`
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
  .titleOfApp {
    margin-top: 50px;
  }

  .titleOfApp {
    margin-top: 70px;
  }
`;

function Home() {
  const [myModal, setMyModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  return (
    <FullWrapperContent>
      <Header
        myModal={myModal}
        setMyModal={setMyModal}
        profileModal={profileModal}
        setProfileModal={setProfileModal}
      />
      <h1 className="titleOfApp">해야만 한다</h1>
      <div>
        <TodoForm />
        <TodoList />
      </div>
    </FullWrapperContent>
  );
}

export default Home;
