import Link from 'next/link';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/modules/rootAction';
import moment from 'moment';
import Modal from './Modal';
import UserModal from './UserModal';
import styled from 'styled-components';
import { WeatherType } from '../store/interface/interface';
import { UserType } from '../store/interface/interface';

const NavHead = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
  max-width: 450px;
  margin: 0 auto;

  img {
    width: 50px;
    height: 50px;
  }
`;

interface HeaderProps {
  myModal: boolean;
  setMyModal: React.Dispatch<React.SetStateAction<boolean>>;
  profileModal: boolean;
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  weather: WeatherType;
  getWeather: any;
  user: UserType;
  getUser: any;
}

const Header = ({
  myModal,
  setMyModal,
  profileModal,
  setProfileModal,
  weather,
  getWeather,
  user,
  getUser
}: HeaderProps) => {
  const handleModal = () => {
    setMyModal(!myModal);
  };

  const handleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  useEffect(() => {
    getWeather();
    getUser();
  }, []);

  return (
    <NavHead>
      <div onClick={handleModal}>날씨</div>
      {myModal && <Modal setMyModal={setMyModal} weather={weather} />}

      <div onClick={handleProfileModal}>회원</div>
      {profileModal && (
        <UserModal setProfileModal={setProfileModal} user={user} />
      )}

      <Link href="/Image">
        <div>{moment().format('YYYY-MM-DD')}</div>
      </Link>
    </NavHead>
  );
};
const mapStateToProps = ({
  weather,
  getWeather,
  user,
  getUser
}: HeaderProps) => ({
  weather,
  getWeather,
  user,
  getUser
});

const mapDispatchToProps = (dispatch: any) => ({
  getWeather: (weather: HeaderProps) => dispatch(actions.getWeather(weather)),
  getUser: (user: HeaderProps) => dispatch(actions.getUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
