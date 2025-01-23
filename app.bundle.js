/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logic_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/ui */ \"./logic/ui.js\");\n/* harmony import */ var _logic_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/storage */ \"./logic/storage.js\");\n/* harmony import */ var _logic_fileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logic/fileUpload */ \"./logic/fileUpload.js\");\n/* harmony import */ var _logic_adjustTextHeight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logic/adjustTextHeight */ \"./logic/adjustTextHeight.js\");\n/* harmony import */ var _logic_handleSubmit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logic/handleSubmit */ \"./logic/handleSubmit.js\");\n/* harmony import */ var _logic_onLoad__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logic/onLoad */ \"./logic/onLoad.js\");\n\n\n\n\n\n\nvar form = document.querySelector('form');\nObject(_logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"handleEnterKey\"])(form);\nvar input = document.querySelector('.form-input');\nvar messageContainer = document.querySelector('.message-container');\nvar deleteMessages = document.querySelector('.delete_msg');\ndeleteMessages.addEventListener('click', function () {\n  Object(_logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"handleDeleteMessages\"])(currentChatId, messageContainer, chatItems, _logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"updateSidebarChats\"]);\n});\nvar attachedImage = null;\nvar fileUpload = document.getElementById('file_upload');\nvar imagePreview = document.getElementById('image-preview');\nfileUpload.addEventListener('change', function (event) {\n  Object(_logic_fileUpload__WEBPACK_IMPORTED_MODULE_2__[\"handleFileUpload\"])(event, function (image) {\n    attachedImage = image;\n  }, imagePreview);\n});\nvar textHeight = document.querySelector('.form-input');\nObject(_logic_adjustTextHeight__WEBPACK_IMPORTED_MODULE_3__[\"adjustTextHeight\"])(textHeight, messageContainer);\nvar chatElements = document.querySelectorAll('.chat-list');\nchatElements.forEach(function (chatElement) {\n  chatElement.addEventListener('click', function () {\n    Object(_logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"enterChat\"])(chats, form, messageContainer, loadMessages);\n  });\n});\nvar chats = document.querySelector('.chat-container');\nvar backButton = document.querySelector('.icon-back');\nbackButton.addEventListener('click', function () {\n  Object(_logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"exitChat\"])(messageContainer, chats, form);\n});\nvar lastMessageTimeElement = document.querySelector('.sidebar-message-time');\nvar lastMessageTextElement = document.querySelector('.last-message');\nwindow.onload = function () {\n  currentChatId = Object(_logic_onLoad__WEBPACK_IMPORTED_MODULE_5__[\"handleWindowLoad\"])(chatItems, messageContainer, loadMessages, _logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"updateActiveChatUI\"], _logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"updateSidebarChats\"]);\n};\nfunction loadMessages() {\n  messageContainer.innerHTML = '';\n  var messages = [];\n  Object.keys(localStorage).forEach(function (key) {\n    if (key.startsWith(\"\".concat(currentChatId, \"_message\"))) {\n      var message = JSON.parse(localStorage.getItem(key));\n      messages.push({\n        key: key,\n        message: message\n      });\n    }\n  });\n  messages.sort(function (a, b) {\n    var aTime = parseInt(a.key.split('_')[2]);\n    var bTime = parseInt(b.key.split('_')[2]);\n    return aTime - bTime;\n  });\n  messages.forEach(function (msgObj) {\n    displayMessage(msgObj.message.text, msgObj.message.time, msgObj.message.send, msgObj.message.image);\n  });\n}\nform.addEventListener('submit', function (event) {\n  Object(_logic_handleSubmit__WEBPACK_IMPORTED_MODULE_4__[\"handleSubmit\"])(event, input, attachedImage, fileUpload, messageContainer, _logic_storage__WEBPACK_IMPORTED_MODULE_1__[\"saveMessage\"], displayMessage, _logic_ui__WEBPACK_IMPORTED_MODULE_0__[\"updateSidebarChats\"], currentChatId, lastMessageTextElement, lastMessageTimeElement, imagePreview, chatItems);\n});\nvar currentChatId = 'chat1';\nfunction displayMessage(text, time, send) {\n  var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n  var newMessage = document.createElement(\"div\");\n  newMessage.classList.add(\"message\");\n  if (image) {\n    var imageContainer = document.createElement(\"div\");\n    var imgElement = document.createElement(\"img\");\n    imgElement.src = image;\n    imgElement.alt = \"Uploaded Image\";\n    imgElement.style.maxWidth = \"200px\";\n    imgElement.classList.add(\"images\");\n    imageContainer.appendChild(imgElement);\n    newMessage.appendChild(imgElement);\n  }\n  var textContainer = document.createElement(\"div\");\n  if (text) {\n    var messageText = document.createElement(\"span\");\n    messageText.classList.add(\"message-text\");\n    messageText.innerText = text;\n    textContainer.appendChild(messageText);\n  }\n  var metadataContainer = document.createElement(\"div\");\n  metadataContainer.classList.add(\"message-metadata\");\n  var messageTime = document.createElement(\"span\");\n  messageTime.innerText = time;\n  messageTime.classList.add(\"message-time\");\n  var messageSender = document.createElement(\"span\");\n  messageSender.innerText = send;\n  messageSender.classList.add(\"message-send\");\n  metadataContainer.append(messageTime, messageSender);\n  textContainer.append(metadataContainer);\n  newMessage.appendChild(textContainer);\n  messageContainer.prepend(newMessage);\n  messageContainer.scrollTop = messageContainer.scrollHeight;\n}\nvar chatItems = document.querySelectorAll('.chat-list');\nchatItems.forEach(function (chatItem) {\n  chatItem.addEventListener('click', function () {\n    var chatId = chatItem.getAttribute('data-chat-id');\n    if (chatId !== currentChatId) {\n      currentChatId = chatId;\n      localStorage.setItem('activeChatId', currentChatId);\n      messageContainer.innerHTML = '';\n      loadMessages();\n      chatItems.forEach(function (item) {\n        return item.classList.remove('active');\n      });\n      chatItem.classList.add('active');\n    }\n  });\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./logic/adjustTextHeight.js":
/*!***********************************!*\
  !*** ./logic/adjustTextHeight.js ***!
  \***********************************/
/*! exports provided: adjustTextHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"adjustTextHeight\", function() { return adjustTextHeight; });\nfunction adjustTextHeight(textHeightElement, messageContainer) {\n  textHeightElement.addEventListener('input', function () {\n    this.style.height = 'auto';\n    var scrollHeight = this.scrollHeight;\n    if (scrollHeight <= 250) {\n      this.style.height = scrollHeight + 'px';\n    } else {\n      this.style.height = '250px';\n    }\n    var textareaHeight = this.offsetHeight;\n    var containerHeight = \"calc(100vh - \".concat(textareaHeight + 150, \"px)\");\n    messageContainer.style.height = containerHeight;\n  });\n}\n\n//# sourceURL=webpack:///./logic/adjustTextHeight.js?");

/***/ }),

/***/ "./logic/fileUpload.js":
/*!*****************************!*\
  !*** ./logic/fileUpload.js ***!
  \*****************************/
/*! exports provided: handleFileUpload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleFileUpload\", function() { return handleFileUpload; });\nfunction handleFileUpload(event, setAttachedImage, imagePreview) {\n  var file = event.target.files[0];\n  if (file && file.type.startsWith('image/')) {\n    var reader = new FileReader();\n    reader.onload = function (e) {\n      var attachedImage = e.target.result;\n      var imgElement = document.createElement('img');\n      imgElement.src = attachedImage;\n      imgElement.alt = 'Uploaded Image';\n      imgElement.style.maxWidth = '200px';\n      imagePreview.innerHTML = '';\n      imagePreview.appendChild(imgElement);\n      setAttachedImage(attachedImage);\n    };\n    reader.readAsDataURL(file);\n  }\n}\n\n//# sourceURL=webpack:///./logic/fileUpload.js?");

/***/ }),

/***/ "./logic/handleSubmit.js":
/*!*******************************!*\
  !*** ./logic/handleSubmit.js ***!
  \*******************************/
/*! exports provided: handleSubmit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleSubmit\", function() { return handleSubmit; });\nfunction handleSubmit(event, input, attachedImage, fileUpload, messageContainer, saveMessage, displayMessage, updateSidebarChats, currentChatId, lastMessageTextElement, lastMessageTimeElement, imagePreview, chatItems) {\n  event.preventDefault();\n  if (input.value.trim() === \"\" && !attachedImage) {\n    return;\n  }\n  var sender = 'я';\n  var date = new Date();\n  var options = {\n    hour: '2-digit',\n    minute: '2-digit'\n  };\n  var timeStr = date.toLocaleTimeString([], options);\n  var message = {\n    text: input.value || null,\n    image: attachedImage || null,\n    imageName: fileUpload.files[0] ? fileUpload.files[0].name : null,\n    time: timeStr,\n    send: sender\n  };\n  saveMessage(currentChatId, message);\n  displayMessage(input.value, timeStr, sender, attachedImage);\n  if (message.imageName) {\n    lastMessageTextElement.textContent = message.imageName;\n  } else {\n    lastMessageTextElement.textContent = input.value;\n  }\n  imagePreview.innerHTML = '';\n  attachedImage = null;\n  input.style.height = '20px';\n  var textareaHeight = input.offsetHeight;\n  var containerHeight = \"calc(100vh - \".concat(textareaHeight + 150, \"px)\");\n  messageContainer.style.height = containerHeight;\n  lastMessageTimeElement.textContent = timeStr;\n  input.value = \"\";\n  updateSidebarChats(chatItems);\n}\n\n//# sourceURL=webpack:///./logic/handleSubmit.js?");

/***/ }),

/***/ "./logic/onLoad.js":
/*!*************************!*\
  !*** ./logic/onLoad.js ***!
  \*************************/
/*! exports provided: handleWindowLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleWindowLoad\", function() { return handleWindowLoad; });\nfunction handleWindowLoad(chatItems, messageContainer, loadMessages, updateActiveChatUI, updateSidebarChats) {\n  var savedChatId = localStorage.getItem('activeChatId');\n  var currentChatId = savedChatId || 'chat1';\n  chatItems.forEach(function (chatItem) {\n    var chatId = chatItem.getAttribute('data-chat-id');\n    if (chatId === currentChatId) {\n      chatItem.classList.add('active');\n    } else {\n      chatItem.classList.remove('active');\n    }\n  });\n  updateActiveChatUI(chatItems, currentChatId);\n  loadMessages();\n  updateSidebarChats(chatItems);\n  return currentChatId;\n}\n\n//# sourceURL=webpack:///./logic/onLoad.js?");

/***/ }),

/***/ "./logic/storage.js":
/*!**************************!*\
  !*** ./logic/storage.js ***!
  \**************************/
/*! exports provided: saveMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveMessage\", function() { return saveMessage; });\nvar saveMessage = function saveMessage(currentChatId, message) {\n  var uniqueKey = \"\".concat(currentChatId, \"_message_\").concat(Date.now());\n  localStorage.setItem(uniqueKey, JSON.stringify(message));\n  var lastMessageKey = \"\".concat(currentChatId, \"_lastMessage\");\n  localStorage.setItem(lastMessageKey, JSON.stringify({\n    text: message.text || (message.imageName ? \"[Image: \".concat(message.imageName, \"]\") : \"Без текста\"),\n    time: message.time\n  }));\n};\n\n//# sourceURL=webpack:///./logic/storage.js?");

/***/ }),

/***/ "./logic/ui.js":
/*!*********************!*\
  !*** ./logic/ui.js ***!
  \*********************/
/*! exports provided: enterChat, exitChat, updateSidebarChats, updateActiveChatUI, handleDeleteMessages, handleEnterKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enterChat\", function() { return enterChat; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"exitChat\", function() { return exitChat; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateSidebarChats\", function() { return updateSidebarChats; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateActiveChatUI\", function() { return updateActiveChatUI; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleDeleteMessages\", function() { return handleDeleteMessages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleEnterKey\", function() { return handleEnterKey; });\nvar enterChat = function enterChat(chats, form, messageContainer, loadMessages) {\n  chats.style.display = 'block';\n  form.style.display = 'block';\n  messageContainer.style.display = 'flex';\n  loadMessages();\n};\nvar exitChat = function exitChat(messageContainer, chats, form) {\n  messageContainer.innerHTML = '';\n  chats.style.display = 'none';\n  form.style.display = 'none';\n  messageContainer.style.display = 'none';\n};\nvar updateSidebarChats = function updateSidebarChats(chatItems) {\n  chatItems.forEach(function (chatItem) {\n    var chatId = chatItem.getAttribute('data-chat-id');\n    var lastMessageKey = \"\".concat(chatId, \"_lastMessage\");\n    var lastMessage = JSON.parse(localStorage.getItem(lastMessageKey));\n    var lastMessageText = chatItem.querySelector('.last-message');\n    var lastMessageTime = chatItem.querySelector('.sidebar-message-time');\n    if (lastMessage) {\n      lastMessageText.textContent = lastMessage.text;\n      lastMessageTime.textContent = lastMessage.time;\n    } else {\n      lastMessageText.textContent = \"\";\n      lastMessageTime.textContent = \"\";\n    }\n  });\n};\nvar updateActiveChatUI = function updateActiveChatUI(chatItems, currentChatId) {\n  chatItems.forEach(function (chatItem) {\n    var chatId = chatItem.getAttribute('data-chat-id');\n    if (chatId === currentChatId) {\n      chatItem.classList.add('active');\n    } else {\n      chatItem.classList.remove('active');\n    }\n  });\n};\nfunction handleDeleteMessages(currentChatId, messageContainer, chatItems, updateSidebarChats) {\n  Object.keys(localStorage).forEach(function (key) {\n    if (key.startsWith(\"\".concat(currentChatId, \"_message\"))) {\n      localStorage.removeItem(key);\n    }\n  });\n  var lastMessageKey = \"\".concat(currentChatId, \"_lastMessage\");\n  localStorage.removeItem(lastMessageKey);\n  updateSidebarChats(chatItems);\n  messageContainer.innerHTML = '<p></p>';\n}\nfunction handleEnterKey(form) {\n  document.addEventListener('keydown', function (event) {\n    if (event.key === 'Enter' && !event.shiftKey) {\n      event.preventDefault();\n      form.dispatchEvent(new Event('submit'));\n    }\n  });\n}\n\n//# sourceURL=webpack:///./logic/ui.js?");

/***/ })

/******/ });