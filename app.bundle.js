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

eval("var form = document.querySelector('form');\nvar input = document.querySelector('.form-input');\nvar messageContainer = document.querySelector('.message-container');\nvar deleteMessages = document.querySelector('.delete_msg');\ndeleteMessages.addEventListener('click', function (e) {\n  window.localStorage.clear();\n  location.reload();\n});\nvar attachedImage = null;\nvar fileUpload = document.getElementById('file_upload');\nvar imagePreview = document.getElementById('image-preview');\nfileUpload.addEventListener('change', function (event) {\n  var file = event.target.files[0];\n  if (file && file.type.startsWith('image/')) {\n    var reader = new FileReader();\n    reader.onload = function (e) {\n      attachedImage = e.target.result;\n      var imgElement = document.createElement('img');\n      imgElement.src = attachedImage;\n      imgElement.alt = 'Uploaded Image';\n      imgElement.style.maxWidth = '200px';\n      imagePreview.innerHTML = '';\n      imagePreview.appendChild(imgElement);\n    };\n    reader.readAsDataURL(file);\n  }\n});\nvar textHeight = document.querySelector('.form-input');\ndocument.addEventListener('keydown', function (event) {\n  if (event.key === 'Enter' && !event.shiftKey) {\n    event.preventDefault();\n    form.dispatchEvent(new Event('submit'));\n  }\n});\ntextHeight.addEventListener('input', function () {\n  this.style.height = 'auto'; // сбрасываем высоту\n  var scrollHeight = this.scrollHeight;\n  if (scrollHeight <= 250) {\n    this.style.height = scrollHeight + 'px';\n  } else {\n    this.style.height = '250px';\n  }\n  var textareaHeight = this.offsetHeight;\n  var containerHeight = \"calc(100vh - \".concat(textareaHeight + 150, \"px)\");\n  messageContainer.style.height = containerHeight;\n});\nvar chatElements = document.querySelectorAll('.chat-list');\nchatElements.forEach(function (chatElement) {\n  chatElement.addEventListener('click', function () {\n    enterChat();\n  });\n});\nvar enterChat = function enterChat() {\n  chats.style.display = 'block';\n  form.style.display = 'block';\n  messageContainer.style.display = 'flex';\n  loadMessages();\n};\nvar chats = document.querySelector('.chat-container');\nvar backButton = document.querySelector('.icon-back');\nbackButton.addEventListener('click', function () {\n  exitChat();\n});\nvar exitChat = function exitChat() {\n  messageContainer.innerHTML = '';\n  chats.style.display = 'none';\n  form.style.display = 'none';\n  messageContainer.style.display = 'none';\n};\nvar lastMessageTimeElement = document.querySelector('.sidebar-message-time');\nvar lastMessageTextElement = document.querySelector('.last-message');\nwindow.onload = function () {\n  return loadMessages();\n};\nvar loadMessages = function loadMessages() {\n  messageContainer.innerHTML = '';\n  var messages = [];\n  Object.keys(localStorage).forEach(function (key) {\n    if (key.startsWith('message')) {\n      var message = JSON.parse(localStorage.getItem(key));\n      messages.push({\n        key: key,\n        message: message\n      });\n    }\n  });\n  messages.sort(function (a, b) {\n    return parseInt(a.key.split('_')[1]) - parseInt(b.key.split('_')[1]);\n  });\n  messages.forEach(function (msgObj) {\n    displayMessage(msgObj.message.text, msgObj.message.time, msgObj.message.send, msgObj.message.image);\n  });\n  if (messages.length > 0) {\n    var lastMessageTime = messages[messages.length - 1].message;\n    lastMessageTimeElement.textContent = lastMessageTime.time;\n    var lastMessageText = messages[messages.length - 1].message;\n    lastMessageTextElement.textContent = lastMessageText.text;\n  }\n};\nform.addEventListener('submit', handleSubmit);\nfunction handleSubmit(event) {\n  if (input.value.trim() === \"\" && !attachedImage) {\n    event.preventDefault();\n  } else {\n    event.preventDefault();\n    var sender = 'я';\n    var date = new Date();\n    var options = {\n      hour: '2-digit',\n      minute: '2-digit'\n    };\n    var timeStr = date.toLocaleTimeString([], options);\n    var message = {\n      text: input.value || null,\n      image: attachedImage || null,\n      time: timeStr,\n      send: sender\n    };\n    saveMessage(message);\n    displayMessage(input.value, timeStr, sender, attachedImage);\n    imagePreview.innerHTML = '';\n    attachedImage = null;\n    input.style.height = '20px';\n    var textareaHeight = input.offsetHeight;\n    var containerHeight = \"calc(100vh - \".concat(textareaHeight + 150, \"px)\");\n    messageContainer.style.height = containerHeight;\n    lastMessageTimeElement.textContent = timeStr;\n    lastMessageTextElement.textContent = input.value;\n    input.value = \"\";\n  }\n}\nfunction saveMessage(message) {\n  var uniqueKey = 'message_' + Date.now();\n  localStorage.setItem(uniqueKey, JSON.stringify(message));\n}\nfunction displayMessage(text, time, send) {\n  var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n  var newMessage = document.createElement(\"div\");\n  newMessage.classList.add(\"message\");\n  if (image) {\n    var imageContainer = document.createElement(\"div\");\n    var imgElement = document.createElement(\"img\");\n    imgElement.src = image;\n    imgElement.alt = \"Uploaded Image\";\n    imgElement.style.maxWidth = \"200px\";\n    imgElement.classList.add(\"images\");\n    imageContainer.appendChild(imgElement);\n    newMessage.appendChild(imgElement);\n  }\n  var textContainer = document.createElement(\"div\");\n  if (text) {\n    var messageText = document.createElement(\"span\");\n    messageText.classList.add(\"message-text\");\n    messageText.innerText = text;\n    textContainer.appendChild(messageText);\n  }\n  var metadataContainer = document.createElement(\"div\");\n  metadataContainer.classList.add(\"message-metadata\");\n  var messageTime = document.createElement(\"span\");\n  messageTime.innerText = time;\n  messageTime.classList.add(\"message-time\");\n  var messageSender = document.createElement(\"span\");\n  messageSender.innerText = send;\n  messageSender.classList.add(\"message-send\");\n  metadataContainer.append(messageTime, messageSender);\n  textContainer.append(metadataContainer);\n  newMessage.appendChild(textContainer);\n  messageContainer.prepend(newMessage);\n  messageContainer.scrollTop = messageContainer.scrollHeight;\n}\n\n//# sourceURL=webpack:///./app.js?");

/***/ })

/******/ });