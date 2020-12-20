!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r={inputSelector:".form__text",invalidInputClass:"form__text_invalid",submitSelector:".form__button-submit",submitDisabledClass:"form__button-submit_disabled"},o="Escape";function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var a=function(){function t(e,n,r,o,i,a){var s=e._id,u=e.name,l=e.link,c=e.owner,f=e.likes;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._id=s,this._name=u,this._link=l,this._owner=c,this._likes=f,this._userID=n,this._templateSelector=r,this._handleCardClick=o,this._handleCardDeletion=i,this._handleCardLike=a,this._element=null,this._likeElement=null}var e,n,r;return e=t,(n=[{key:"updateLikes",value:function(t){this._element||this._createElement(),this._likes=t,this._likeElement.textContent=this._likes.length}},{key:"isLiked",value:function(){return this._element||this._createElement(),this._likeElement.classList.contains("photo-card__like-button_liked")}},{key:"like",value:function(){this._likeElement.classList.toggle("photo-card__like-button_liked")}},{key:"_createElement",value:function(){var t=this;this._element=document.querySelector(this._templateSelector).content.querySelector(".photo-card").cloneNode(!0),this._setEventListeners();var e=this._element.querySelector(".photo-card__title"),n=this._element.querySelector(".photo-card__image");e.textContent=this._name,e.title=this._name,n.alt=this._name,n.src=this._link,this._likeElement=this._element.querySelector(".photo-card__like-button"),this._likeElement.textContent=this._likes.length,this._userID!==this._owner._id&&this._element.querySelector(".photo-card__del-button").remove(),this._likes.forEach((function(e){e._id===t._userID&&t.like()}))}},{key:"_setEventListeners",value:function(){var t=this;this._element||this._createElement(),this._element.querySelector(".photo-card__image").addEventListener("click",(function(){t._handleCardClick(t._name,t._link)})),this._element.querySelector(".photo-card__like-button").addEventListener("click",(function(){t._handleCardLike(t),t.like()})),this._element.querySelector(".photo-card__del-button").addEventListener("click",(function(){t._handleCardDeletion(t)}))}},{key:"remove",value:function(){this._element.remove(),this._element=null}},{key:"id",get:function(){return this._id}},{key:"element",get:function(){return this._element||this._createElement(),this._element}}])&&i(e.prototype,n),r&&i(e,r),t}();function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formElement=n,this._inputList=Array.from(n.querySelectorAll(e.inputSelector)),this._invalidInputClass=e.invalidInputClass,this._submitButton=n.querySelector(e.submitSelector),this._submitDisabledClass=e.submitDisabledClass}var e,n,r;return e=t,(n=[{key:"_validateInput",value:function(t){var e=this._formElement.querySelector("#".concat(t.id,"-error"));t.classList[t.validity.valid?"remove":"add"](this._invalidInputClass),e.textContent=t.validationMessage}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleSubmitState",value:function(){this._submitButton.classList[this._hasInvalidInput()?"add":"remove"](this._submitDisabledClass),this._submitButton.disabled=this._hasInvalidInput()}},{key:"_setEventListeners",value:function(){var t=this;this._toggleSubmitState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._validateInput(e),t._toggleSubmitState()}))}))}},{key:"clearStatus",value:function(){var t=this;this._inputList.forEach((function(e){t._formElement.querySelector("#".concat(e.id,"-error")).textContent="",e.classList.remove(t._invalidInputClass)})),this._submitButton.classList.add(this._submitDisabledClass),this._submitButton.disabled=!0}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&s(e.prototype,n),r&&s(e,r),t}();function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var c=function(){function t(e,n){var r=e.renderer,o=e.isEmpty,i=e.toggleEmptyMessage,a=e.handleItemRemoval;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._items=null,this._renderItem=r,this._container=document.querySelector(n),this.isEmpty=o,this.toggleEmptyMessage=i,this._container.addEventListener("click",a.bind(this))}var e,n,r;return e=t,(n=[{key:"renderItems",value:function(t){var e=this;this._items=t,t&&t.forEach((function(t){e._renderItem(t)}))}},{key:"addItem",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this._container[e?"prepend":"append"](t),this.toggleEmptyMessage()}},{key:"container",get:function(){return this._container}}])&&l(e.prototype,n),r&&l(e,r),t}();function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var h=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,n,r;return e=t,(n=[{key:"_handleEscClose",value:function(t){t.key===o&&this.close()}},{key:"_setEventListeners",value:function(){var t=this;this._popup.addEventListener("click",(function(e){(e.target.classList.contains("popup__button-close")||e.target===e.currentTarget)&&t.close()}))}},{key:"open",value:function(){this._popup.classList.add("popup_visible"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_visible"),document.removeEventListener("keydown",this._handleEscClose)}}])&&f(e.prototype,n),r&&f(e,r),t}();function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e,n){return(m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=b(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function _(t,e){return(_=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=b(t);if(e){var o=b(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return v(this,n)}}function v(t,e){return!e||"object"!==d(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_(t,e)}(i,t);var e,n,r,o=y(i);function i(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(r=o.call(this,t))._imageElement=r._popup.querySelector(e),r._titleElement=r._popup.querySelector(n),r._setEventListeners(),r}return e=i,(n=[{key:"open",value:function(t,e){this._imageElement.src=e,this._imageElement.alt=t,this._titleElement.textContent=t,m(b(i.prototype),"open",this).call(this)}}])&&p(e.prototype,n),r&&p(e,r),i}(h);function k(t){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function E(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function S(t,e,n){return(S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=j(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function L(t,e){return(L=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=j(t);if(e){var o=j(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return C(this,n)}}function C(t,e){return!e||"object"!==k(e)&&"function"!=typeof e?O(t):e}function O(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function j(t){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&L(t,e)}(i,t);var e,n,r,o=w(i);function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=o.call(this,t))._submitHandler=function(t){t.preventDefault(),e.bind(O(n))(n._getInputValues())},n._formElement=n._popup.querySelector("form"),n._inputList=Array.from(n._formElement.querySelectorAll("input")),n._submitButton=n._formElement.querySelector('button[type="submit"]'),n._setEventListeners(),n}return e=i,(n=[{key:"_setEventListeners",value:function(){S(j(i.prototype),"_setEventListeners",this).call(this),this._formElement.addEventListener("submit",this._submitHandler)}},{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}},{key:"close",value:function(){S(j(i.prototype),"close",this).call(this),this._formElement.reset()}},{key:"toggleLoadingStatus",value:function(t){this._submitButton.textContent=t,this._submitButton.disabled=!this._submitButton.disabled}},{key:"changeSubmitHandler",value:function(t){var e=this;this._formElement.removeEventListener("submit",this._submitHandler),this._submitHandler=function(n){n.preventDefault(),t.bind(e)()},this._formElement.addEventListener("submit",this._submitHandler)}}])&&E(e.prototype,n),r&&E(e,r),i}(h);function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var P=function(){function t(e){var n=e.userNameSelector,r=e.userInfoSelector,o=e.userAvatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameElement=document.querySelector(n),this._infoElement=document.querySelector(r),this._avatarElement=document.querySelector(o),this._name=this._nameElement.textContent,this._info=this._infoElement.textContent,this._avatar=this._avatarElement.src,this._id=null}var e,n,r;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._name,info:this._info,avatar:this._avatar}}},{key:"setUserInfo",value:function(t){var e=t.id,n=void 0===e?null:e,r=t.name,o=t.info,i=t.avatar,a=void 0===i?null:i;n&&(this._id=n),this._nameElement.textContent=this._name=r,this._infoElement.textContent=this._info=o,a&&this.setUserAvatar(a)}},{key:"setUserAvatar",value:function(t){this._avatarElement.src=this._avatar=t}},{key:"id",get:function(){return this._id}}])&&R(e.prototype,n),r&&R(e,r),t}();function q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return U(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return U(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function U(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var D=new(function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseURL=e.url,this._token=e.token}var e,n,r;return e=t,(n=[{key:"_handleResponse",value:function(t){return t.ok?t.json():Promise.reject("Error ".concat(t.status,": ").concat(t.statusText,"."))}},{key:"getUserData",value:function(){var t=this;return fetch("".concat(this._baseURL,"/users/me"),{method:"GET",headers:{authorization:this._token}}).then((function(e){return t._handleResponse(e)}))}},{key:"setUserData",value:function(t){var e=this,n=t.name,r=t.info;return fetch("".concat(this._baseURL,"/users/me"),{method:"PATCH",headers:{authorization:this._token,"content-type":"application/json"},body:JSON.stringify({name:n,about:r})}).then((function(t){return e._handleResponse(t)}))}},{key:"setUserAvatar",value:function(t){var e=this;return fetch("".concat(this._baseURL,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this._token,"content-type":"application/json"},body:JSON.stringify({avatar:t})}).then((function(t){return e._handleResponse(t)}))}},{key:"getCards",value:function(){var t=this;return fetch("".concat(this._baseURL,"/cards"),{method:"GET",headers:{authorization:this._token}}).then((function(e){return t._handleResponse(e)}))}},{key:"addCard",value:function(t){var e=this;return fetch("".concat(this._baseURL,"/cards"),{method:"POST",headers:{authorization:this._token,"content-type":"application/json"},body:JSON.stringify({name:t.name,link:t.link})}).then((function(t){return e._handleResponse(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._baseURL,"/cards/").concat(t),{method:"DELETE",headers:{authorization:this._token}}).then((function(t){return e._handleResponse(t)}))}},{key:"toggleLike",value:function(t,e){var n=this;return fetch("".concat(this._baseURL,"/cards/likes/").concat(t),{method:e?"DELETE":"PUT",headers:{authorization:this._token}}).then((function(t){return n._handleResponse(t)}))}}])&&q(e.prototype,n),r&&q(e,r),t}())({url:"https://mesto.nomoreparties.co/v1/cohort-18",token:"80cc9190-bc61-4b09-b6f2-ea43f973474f"}),T=new u(r,document.forms.place),A=new u(r,document.forms.profile),B=new u(r,document.forms.avatar),M=new P({userNameSelector:".profile__name",userInfoSelector:".profile__career",userAvatarSelector:".profile__avatar"}),H=function(t){return new a(t,M.id,"#photo-card",G.open.bind(G),(function(t){J.open(),J.changeSubmitHandler((function(){var e=this;this.toggleLoadingStatus("Удаление ..."),D.deleteCard(t.id).then((function(){t.remove(),e.close()})).catch((function(t){console.log(t)})).finally((function(){e.toggleLoadingStatus("Да")}))}))}),(function(t){D.toggleLike(t.id,t.isLiked()).then((function(e){t.updateLikes(e.likes)})).catch((function(t){console.log(t)}))}))},z=new I('.popup[data-type="avatar"]',(function(t){var e=this;this.toggleLoadingStatus("Сохранение ...");var n=t["avatar-link"];D.setUserAvatar(n).then((function(){M.setUserAvatar(n),e.close()})).catch((function(t){console.log(t)})).finally((function(){e.toggleLoadingStatus("Сохранить")}))})),N=new I('.popup[data-type="profile"]',(function(t){var e=this;this.toggleLoadingStatus("Сохранение ...");var n=t["user-name"],r=t["user-hobby"];D.setUserData({name:n,info:r}).then((function(){M.setUserInfo({name:n,info:r}),e.close()})).catch((function(t){console.log(t)})).finally((function(){e.toggleLoadingStatus("Сохранить")}))})),V=new I('.popup[data-type="place"]',(function(t){var e=this;this.toggleLoadingStatus("Создание ...");var n=t["place-name"],r=t["place-link"];D.addCard({name:n,link:r}).then((function(t){$.addItem(H(t).element,!0),e.close()})).catch((function(t){console.log(t)})).finally((function(){e.toggleLoadingStatus("Создать")}))})),J=new I('.popup[data-type="confirmation"',(function(){})),G=new g('.popup[data-type="photo"]',".photo__image",".photo__title"),$=new c({renderer:function(t){this.addItem(t)},isEmpty:function(){return!Boolean(this.container.querySelector(".photo-card"))},toggleEmptyMessage:function(){document.querySelector(".gallery__message").classList[this.isEmpty()?"add":"remove"]("gallery__message_visible")},handleItemRemoval:function(t){t.target.classList.contains("photo-card__del-button")&&this.toggleEmptyMessage()}},".gallery");window.onload=function(){Promise.all([D.getUserData(),D.getCards()]).then((function(t){var e=x(t,2),n=e[0],r=e[1];M.setUserInfo({id:n._id,name:n.name,info:n.about,avatar:n.avatar});var o=r.map((function(t){return H(t).element}));$.renderItems(o),document.querySelector(".profile__avatar-overlay").addEventListener("click",(function(){B.clearStatus(),B._submitButton.textContent="Сохранить";var t=M.getUserInfo().avatar;document.forms.avatar.elements["avatar-link"].value=t,z.open()})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){A.clearStatus(),A._submitButton.textContent="Сохранить";var t=M.getUserInfo(),e=t.name,n=t.info;document.forms.profile.elements["user-name"].value=e,document.forms.profile.elements["user-hobby"].value=n,N.open()})),document.querySelector(".profile__add-button").addEventListener("click",(function(){T.clearStatus(),T._submitButton.textContent="Создать",V.open()})),B.enableValidation(),A.enableValidation(),T.enableValidation()})).catch((function(t){console.log(t)}))}}]);