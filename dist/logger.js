(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.logger = undefined;
	
	var _ajax = __webpack_require__(1);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CONSOLE_METHOD = ['log', 'error', 'info', 'warn', 'dir', 'time', 'timeEnd', 'clear', 'table', 'assert', 'count', 'debug'];
	
	var logger = {
	    errors: [],
	    timer: null,
	    url: '',
	    init: function init(opts) {
	        this.url = opts.url;
	        this.delay = opts.delay || 30000;
	    },
	    bind: function bind() {},
	    add: function add(err) {
	        this.errors.push(err);
	        this.startTimer();
	    },
	    startTimer: function startTimer() {
	        var self = this;
	        if (!self.timer) {
	            //30s发送所有错误
	            self.timer = setTimeout(function () {
	                if (self.errors.length > 0) {
	                    clearTimeout(self.timer);
	                    self.timer = null;
	                    self.send();
	                    self.errors.length = 0;
	                }
	            }, self.delay);
	        }
	    },
	    send: function send() {},
	    _rejectionHandler: function _rejectionHandler(e) {
	        this.add(e);
	    },
	    overrideConsole: function overrideConsole() {
	        var self = this,
	            errors = this.errors,
	            origConsole = this._origConsole = {},
	            winConsole = window.console;
	
	        CONSOLE_METHOD.forEach(function (name) {
	            var origin = origConsole[name] = function () {};
	            if (winConsole[name]) {
	                origin = origConsole[name] = winConsole[name].bind(winConsole);
	            }
	            winConsole[name] = function () {
	                self.add(arguments);
	                origin(arguments);
	            };
	        });
	
	        return this;
	    },
	    restoreConsole: function restoreConsole() {
	        var self = this;
	
	        if (!this._origConsole) {
	            return this;
	        }
	
	        CONSOLE_METHOD.forEach(function (name) {
	            window.console[name] = self._origConsole[name];
	        });
	
	        delete this._origConsole;
	
	        return this;
	    },
	    catchGlobalErr: function catchGlobalErr() {
	        var self = this;
	        self._origOnerror = window.onerror;
	        //window的error错误
	        window.onerror = function (errMsg, url, lineNum, column, errObj) {
	            self.add(errObj ? errObj : errMsg);
	        };
	        //promise的未捕获错误
	        window.addEventListener('unhandledrejection', this._rejectionHandler);
	
	        return this;
	    },
	    ignoreGlobalErr: function ignoreGlobalErr() {
	        if (this._origOnerror) {
	            window.onerror = this._origOnerror;
	            delete this._origOnerror;
	        }
	        window.removeEventListener('unhandledrejection', this._rejectionHandler);
	
	        return this;
	    },
	    destroy: function destroy() {
	        this.ignoreGlobalErr();
	        this.restoreConsole();
	    }
	};
	
	exports.logger = logger;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
	 * ajax - v2.3.0
	 * Ajax module in Vanilla JS
	 * https://github.com/fdaciuk/ajax
	
	 * Sun Jul 23 2017 10:55:09 GMT-0300 (BRT)
	 * MIT (c) Fernando Daciuk
	*/
	!function(e,t){"use strict"; true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?exports=module.exports=t():e.ajax=t()}(this,function(){"use strict";function e(e){var r=["get","post","put","delete"];return e=e||{},e.baseUrl=e.baseUrl||"",e.method&&e.url?n(e.method,e.baseUrl+e.url,t(e.data),e):r.reduce(function(r,o){return r[o]=function(r,u){return n(o,e.baseUrl+r,t(u),e)},r},{})}function t(e){return e||null}function n(e,t,n,u){var c=["then","catch","always"],i=c.reduce(function(e,t){return e[t]=function(n){return e[t]=n,e},e},{}),f=new XMLHttpRequest,d=r(t,n,e);return f.open(e,d,!0),f.withCredentials=u.hasOwnProperty("withCredentials"),o(f,u.headers),f.addEventListener("readystatechange",a(i,f),!1),f.send(s(n)),i.abort=function(){return f.abort()},i}function r(e,t,n){if("get"!==n.toLowerCase()||!t)return e;var r=s(t),o=e.indexOf("?")>-1?"&":"?";return e+o+r}function o(e,t){t=t||{},u(t)||(t["Content-Type"]="application/x-www-form-urlencoded"),Object.keys(t).forEach(function(n){t[n]&&e.setRequestHeader(n,t[n])})}function u(e){return Object.keys(e).some(function(e){return"content-type"===e.toLowerCase()})}function a(e,t){return function n(){t.readyState===t.DONE&&(t.removeEventListener("readystatechange",n,!1),e.always.apply(e,c(t)),t.status>=200&&t.status<300?e.then.apply(e,c(t)):e["catch"].apply(e,c(t)))}}function c(e){var t;try{t=JSON.parse(e.responseText)}catch(n){t=e.responseText}return[t,e]}function s(e){return i(e)?f(e):e}function i(e){return"[object Object]"===Object.prototype.toString.call(e)}function f(e){return Object.keys(e).reduce(function(t,n){var r=t?t+"&":"";return r+d(n)+"="+d(e[n])},"")}function d(e){return encodeURIComponent(e)}return e});

/***/ })
/******/ ])
});
;
//# sourceMappingURL=logger.js.map