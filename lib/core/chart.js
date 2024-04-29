"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Class Name: Chart
 * Description: All chart types should extend or inherit from this class because 
 *              it encompasses shared methods and properties.
 */
var Chart = /*#__PURE__*/function () {
  function Chart() {
    _classCallCheck(this, Chart);
    // Chart Data (Instance of DataTable Class)
    this._data = null;

    // Width of the chart
    this._width = null;

    // Height of the chart
    this._height = null;

    // SVG Element
    this._svg = null;

    // Configuration for Chart, Legend & Tooltip
    this._options = {
      chart: {},
      legend: {},
      tooltip: {}
    };

    // Chart Animation Configuration
    this._animation = {};
  }

  /** 
   * This method is used to set chart configuration.
   * 
   * @param {Object} options 
   * @returns {this}
   */
  return _createClass(Chart, [{
    key: "options",
    value: function options(_options) {
      this._options.chart = _objectSpread(_objectSpread({}, this.options.chart), _options);
      return this;
    }

    /**
     * This method is used to set configuration related to chart animation.
     * 
     * @param {object} options 
     * @returns {this}
     */
  }, {
    key: "animate",
    value: function animate() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Default Animation Options
      this._animation = _objectSpread({
        time: 750
      }, options);
      return this;
    }

    /**
     * This method is used to set legend configuration.
     * 
     * @param {object} options 
     * @returns {this}
     */
  }, {
    key: "legend",
    value: function legend() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._options.legend = _objectSpread(_objectSpread({}, this._options.legend), options);
      return this;
    }

    /**
     * This method is used to set tooltip configuration
     * 
     * @param {object} options
     * @returns {this}
     */
  }, {
    key: "tooltip",
    value: function tooltip() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._options.tooltip = _objectSpread(_objectSpread({}, this._options.tooltip), options);
      return this;
    }

    /**
     * 
     * @param {object} data Instance of DataTable Class 
     * @returns {this}
     */
  }, {
    key: "bind",
    value: function bind(data) {
      if (data instanceof DataTable) {
        this._data = data;
      } else {
        var rows = data.slice(1);
        this._data = new DataTable(data[0], rows);
      }
      return this;
    }
  }]);
}();