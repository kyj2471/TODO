'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=Modal;var _react=require('react'),_react2=_interopRequireDefault(_react),_styles=require('../../styles/styles'),S=_interopRequireWildcard(_styles);function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function Modal(a){var b=a.setMyModal,c=a.weather,d=c.weatherData.data;return<div>
      <S.ModalContainer>
        <div className="modalContent">
          <h2>오늘의 날씨</h2>
          <p>현재기온 : {d.main.temp}</p>
          <p>현재도시 : {d.name}</p>
          <p>최고기온 : {d.main.temp_max}</p>
          <p>최저기온 : {d.main.temp_min}</p>
          <p>현재기온 : {d.main.feels_like}</p>
          <S.MainButton center onClick={function a(){b(!1)}}>
            취소
          </S.MainButton>
        </div>
      </S.ModalContainer>
    </div>}