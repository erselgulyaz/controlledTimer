(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var controlledTimer =
/*#__PURE__*/
function () {
  function controlledTimer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, controlledTimer);

    this.mainControl = true;
    this.defaultInterval = null;
    var defaults = {
      container: '#controlledtimer-container',
      selector: '#controlledtimer-selector',
      start: '00:58',
      end: '00:00',
      direction: 'down',

      /* up, down */
      startCallback: function startCallback() {},
      endCallback: function endCallback() {}
    };
    var extend = Object.assign(defaults, options);

    for (var key in extend) {
      if (extend.hasOwnProperty(key)) {
        this[key] = extend[key];
      }
    }

    this.rending();
    this.init();
  }
  /* constructor */


  _createClass(controlledTimer, [{
    key: "init",
    value: function init() {
      if (document.querySelector(this.container) !== null) {
        this.getTemplate();
        this.partyHard();
      }
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var template = "";
      var boxGroupCounter = this.time.split(":");

      for (var i = 0; i < boxGroupCounter.length; i++) {
        template += this.getBoxGroup(boxGroupCounter[i]);
      }

      document.querySelector(this.selector).innerHTML = template;
    }
  }, {
    key: "getBoxGroup",
    value: function getBoxGroup(p) {
      var els = p.split("");
      var template = "<div class=\"controlledtimer-box-group\">";

      for (var i = 0; i < els.length; i++) {
        template += "<div class=\"controlledtimer-box-item\">".concat(els[i], "</div>");
      }

      template += "</div>";
      return template;
    }
  }, {
    key: "rending",
    value: function rending() {
      this.time = this.start;
      this.splitterCounter = this.start.split(":").length;
      this.second = this.start.split(":")[this.splitterCounter - 1];
      this.minute = this.start.split(":")[this.splitterCounter - 2];
      this.hour = this.start.split(":")[this.splitterCounter - 3];
      this.day = this.start.split(":")[this.splitterCounter - 4];
    }
  }, {
    key: "partyHard",
    value: function partyHard() {
      var _this = this;

      this.startCallback();
      this.defaultInterval = setInterval(function () {
        if (_this.mainControl) {
          if (_this.time !== _this.end) {
            if (_this.second >= 0 && _this.second < 59 && _this.second !== undefined) {
              _this.secondActions();
            } else if (_this.minute >= 0 && _this.minute < 59 && _this.minute !== undefined) {
              _this.minuteActions();
            } else if (_this.hour >= 0 && _this.hour < 24 && _this.hour !== undefined) {
              _this.hourActions();
            } else if (_this.day >= 0 && _this.day !== undefined) {
              _this.dayActions();
            } else {
              _this.kill();
            }

            _this.time = "";
            if (_this.day !== undefined) _this.time += "".concat(_this.day, ":");
            if (_this.hour !== undefined) _this.time += "".concat(_this.hour, ":");
            if (_this.minute !== undefined) _this.time += "".concat(_this.minute, ":");
            if (_this.second !== undefined) _this.time += "".concat(_this.second);

            _this.getTemplate();
          } else {
            _this.kill();
          }
        }
      }, 1000);
    }
  }, {
    key: "secondActions",
    value: function secondActions() {
      this.direction === "down" ? this.second-- : this.second++;
      if (this.second.toString().split("").length < 2) this.second = "0".concat(this.second);
    }
  }, {
    key: "minuteActions",
    value: function minuteActions() {
      if (this.direction === "down") {
        this.minute--;
        this.second = 59;
      } else {
        this.minute++;
        this.second = "00";
      }

      if (this.minute.toString().split("").length < 2) this.minute = "0".concat(this.minute);
    }
  }, {
    key: "hourActions",
    value: function hourActions() {
      if (this.direction === "down") {
        this.hour--;
        this.minute = 59;
        this.second = 59;
      } else {
        this.hour++;
        this.minute = "00";
        this.second = "00";
      }

      if (this.hour.toString().split("").length < 2) this.hour = "0".concat(this.hour);
    }
  }, {
    key: "dayActions",
    value: function dayActions() {
      if (this.direction === "down") {
        this.day--;
        this.hour = 23;
        this.minute = 59;
        this.second = 59;
      } else {
        this.day++;
        this.hour = "00";
        this.minute = "00";
        this.second = "00";
      }

      if (this.day.toString().split("").length < 2) this.day = "0".concat(this.day);
    }
  }, {
    key: "kill",
    value: function kill() {
      clearInterval(this.defaultInterval);
      this.defaultInterval = null;
      this.endCallback();
    }
  }, {
    key: "restart",
    value: function restart() {
      clearInterval(this.defaultInterval);
      this.rending();
      this.init();
    }
  }, {
    key: "playPause",
    value: function playPause() {
      this.mainControl = !this.mainControl;
    }
  }]);

  return controlledTimer;
}();

var _default = controlledTimer;
exports["default"] = _default;

},{}]},{},[1]);
