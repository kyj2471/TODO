import React from 'react';
import * as S from '../../styles/styles';

interface ModalProps {
  setMyModal: any;
  weather: any;
}

export default function Modal({ setMyModal, weather }: ModalProps) {
  const handleModalCancel = () => {
    setMyModal(false);
  };
  const detactWeather = weather.weatherData.weather.data;
  return (
    <div>
      <S.ModalContainer>
        <div className="modalContent">
          <h2>오늘의 날씨</h2>
          <p>현재기온 : {detactWeather.main.temp}</p>
          <p>현재도시 : {detactWeather.name}</p>
          <p>최고기온 : {detactWeather.main.temp_max}</p>
          <p>최저기온 : {detactWeather.main.temp_min}</p>
          <p>현재기온 : {detactWeather.main.feels_like}</p>
          <S.MainButton center onClick={handleModalCancel}>
            취소
          </S.MainButton>
        </div>
      </S.ModalContainer>
    </div>
  );
}
