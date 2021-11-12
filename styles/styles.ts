import styled, { css } from 'styled-components';

interface CssProps {
  center?: any;
  huge?: any;
}

// 모든 Component에서 사용되는 버튼 css입니다.
export const MainButton = styled.button<CssProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 35px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #a6ffcf;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  ${(props) =>
    props.center &&
    css`
      margin-left: 150px;
    `}

  ${(props) =>
    props.huge &&
    css`
      width: 100px;
      height: 45px;
    `}

  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

// modal 구현을 위한 기본 layout 입니다.
export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  z-index: 100000;

  .modalContent {
    background-color: #fff;
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 10px;
    text-align: center;
  }
`;

// Todo메인 페이지 layout 입니다.
export const HeadTodoForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  .formContainer {
    display: flex;
    align-items: center;
  }
`;

export const TodoInput = styled.input`
  width: 250px;
  height: 45px;
  border-radius: 4px;
  margin-right: 1.5rem;
`;

// todo Item List 기본 Layout입니다.
export const TodoItemFull = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;

  .listButtonContainer {
    display: flex;
    justify-content: space-around;
    width: 200px;
  }

  .doneTodo {
    text-decoration: line-through;
    color: red;
  }
  .notDoneTodo {
    color: blue;
  }
`;
