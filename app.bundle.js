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
/*! no static exports found */
/***/ (function(module, exports) {

eval("var form = document.querySelector('form');\nvar input = document.querySelector('.form-input');\nvar messageContainer = document.querySelector('.message-container');\nvar chooseChat = document.querySelector('.choose-chat');\nvar chatElements = document.querySelectorAll('.chat-list');\nchatElements.forEach(function (chatElement) {\n  chatElement.addEventListener('click', function () {\n    enterChat();\n  });\n});\nvar enterChat = function enterChat() {\n  chats.style.display = 'block';\n  form.style.display = 'block';\n  messageContainer.style.display = 'flex';\n  chooseChat.style.display = 'none';\n  loadMessages();\n};\nvar chats = document.querySelector('.chat-container');\nvar backButton = document.querySelector('.icon-back');\nbackButton.addEventListener('click', function () {\n  exitChat();\n});\nvar exitChat = function exitChat() {\n  messageContainer.innerHTML = '';\n  chooseChat.style.display = 'block';\n  chats.style.display = 'none';\n  form.style.display = 'none';\n  messageContainer.style.display = 'none';\n};\nvar lastMessageTimeElement = document.querySelector('.sidebar-message-time');\nvar lastMessageTextElement = document.querySelector('.last-message');\nvar scrollButton = document.getElementById('scroll-to-bottom');\n// Показать кнопку только, если мы не внизу страницы\nmessageContainer.addEventListener('scroll', function () {\n  if (messageContainer.scrollHeight - messageContainer.scrollTop > messageContainer.clientHeight + 100) {\n    scrollButton.style.display = 'block';\n  } else {\n    scrollButton.style.display = 'none';\n  }\n});\n// Прокрутка вниз при нажатии на кнопку\nscrollButton.addEventListener('click', function () {\n  messageContainer.scrollTop = messageContainer.scrollHeight;\n});\nwindow.onload = function () {\n  return loadMessages();\n};\nvar loadMessages = function loadMessages() {\n  chooseChat.style.display = 'none';\n  messageContainer.innerHTML = '';\n  var messages = [];\n  Object.keys(localStorage).forEach(function (key) {\n    if (key.startsWith('message')) {\n      var message = JSON.parse(localStorage.getItem(key));\n      messages.push({\n        key: key,\n        message: message\n      });\n    }\n  });\n  messages.sort(function (a, b) {\n    return parseInt(a.key.split('_')[1]) - parseInt(b.key.split('_')[1]);\n  });\n  messages.forEach(function (msgObj) {\n    displayMessage(msgObj.message.text, msgObj.message.time, msgObj.message.send);\n  });\n  // Отобразить время, текст последнего сообщения\n  if (messages.length > 0) {\n    var lastMessageTime = messages[messages.length - 1].message;\n    lastMessageTimeElement.textContent = lastMessageTime.time;\n    var lastMessageText = messages[messages.length - 1].message;\n    lastMessageTextElement.textContent = lastMessageText.text;\n  }\n};\nform.addEventListener('submit', handleSubmit);\nfunction handleSubmit(event) {\n  if (input.value === \"\") {\n    event.preventDefault();\n  } else {\n    event.preventDefault();\n    var sender = 'я';\n    var date = new Date();\n    var options = {\n      hour: '2-digit',\n      minute: '2-digit'\n    };\n    var timeStr = date.toLocaleTimeString([], options);\n    var message = {\n      text: input.value,\n      time: timeStr,\n      send: sender\n    };\n    saveMessage(message);\n    displayMessage(input.value, timeStr, sender);\n    lastMessageTimeElement.textContent = timeStr;\n    lastMessageTextElement.textContent = input.value;\n    input.value = \"\";\n  }\n}\nfunction saveMessage(message) {\n  var uniqueKey = 'message_' + Date.now();\n  localStorage.setItem(uniqueKey, JSON.stringify(message));\n}\nfunction displayMessage(text, time, send) {\n  var newMessage = document.createElement(\"div\");\n  newMessage.classList.add(\"message\");\n  var messageText = document.createElement(\"span\");\n  messageText.innerText = text;\n  var messageTime = document.createElement(\"span\");\n  messageTime.innerText = time;\n  messageTime.classList.add(\"message-time\");\n  var messageSender = document.createElement(\"span\");\n  messageSender.innerText = send;\n  messageSender.classList.add(\"message-send\");\n  newMessage.append(messageText, messageTime, messageSender);\n  messageContainer.prepend(newMessage);\n  messageContainer.scrollTop = messageContainer.scrollHeight;\n}\n\n//# sourceURL=webpack:///./app.js?");

/***/ })

/******/ });