import React from 'react';
import * as S from '../../styles/styles';
import { UserType } from '../store/interface/interface';

interface UserModal {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}

export default function UserModal({ setProfileModal, user }: UserModal) {
  console.log(`user:${user}`);
  const handleProfileModalCancel = (e: any) => {
    setProfileModal(false);
  };
  const detactUser = user.userData.user.data.results[0];
  return (
    <div>
      <S.ModalContainer>
        <div className="modalContent">
          <h2>USER CARD</h2>
          <p>ID : {detactUser.login.username}</p>
          <p>성별 : {detactUser.gender}</p>
          <p>전화번호 : {detactUser.cell}</p>
          <p>사는곳 : {detactUser.location.country}</p>
          <p>이메일 : {detactUser.email}</p>
          <S.MainButton center onClick={handleProfileModalCancel}>
            x
          </S.MainButton>
        </div>
      </S.ModalContainer>
    </div>
  );
}
