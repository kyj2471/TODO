'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=watchSaga;var _effects=require('redux-saga/effects'),_api=require('../api'),_image=require('../modules/image'),actions=_interopRequireWildcard(_image);function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}var _marked=/*#__PURE__*/regeneratorRuntime.mark(getImagesLoad),_marked2=/*#__PURE__*/regeneratorRuntime.mark(watchGetImages),_marked3=/*#__PURE__*/regeneratorRuntime.mark(watchSaga);function getImagesLoad(){var a;return regeneratorRuntime.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.prev=0,b.next=3,(0,_effects.call)(_api.getSplashImage);case 3:return a=b.sent,b.next=6,(0,_effects.put)(actions.imagesLoadSuccess(a));case 6:b.next=12;break;case 8:return b.prev=8,b.t0=b['catch'](0),b.next=12,(0,_effects.put)(actions.imagesLoadFailure(b.t0));case 12:case'end':return b.stop();}},_marked,this,[[0,8]])}function watchGetImages(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,(0,_effects.takeLatest)(actions.IMAGES_LOAD,getImagesLoad);case 2:case'end':return a.stop();}},_marked2,this)}function watchSaga(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,(0,_effects.fork)(watchGetImages);case 2:case'end':return a.stop();}},_marked3,this)}