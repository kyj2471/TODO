'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=UserModal;var _react=require('react'),_react2=_interopRequireDefault(_react),_styles=require('../../styles/styles'),S=_interopRequireWildcard(_styles);function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function UserModal(a){var b=a.setProfileModal,c=a.user,d=c.userData.data.results[0];return<div>
      <S.ModalContainer>
        <div className="modalContent">
          <h2>USER CARD</h2>
          <p>ID : {d.login.username}</p>
          <p>성별 : {d.gender}</p>
          <p>전화번호 : {d.cell}</p>
          <p>사는곳 : {d.location.country}</p>
          <p>이메일 : {d.email}</p>
          <S.MainButton center onClick={function a(){b(!1)}}>
            x
          </S.MainButton>
        </div>
      </S.ModalContainer>
    </div>}