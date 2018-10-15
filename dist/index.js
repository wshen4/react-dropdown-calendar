"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props:
//getSelectedDate!: callback function
//monthYearRange?: { from: Date, to: Date}
//defaultValues?: [Date]

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedDate: null,
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      tableToggle: false,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear().toString(),
      days: [[]]
    }, _this.handleClick = function (e) {
      if (_this.node.contains(e.target)) {
        return;
      }

      _this.setState({ tableToggle: false });
    }, _this.mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], _this.handleLabelClick = function () {
      var tableToggle = !_this.state.tableToggle;
      _this.setState({ tableToggle: tableToggle });
    }, _this.setDays = function () {
      var firstIndex = new Date(_this.state.currentYear, _this.state.currentMonth, 1).getDay();
      var days = [];
      var numberOfDays = new Date(_this.state.currentYear, _this.state.currentMonth - 1, 0).getDate();

      var row = [];

      for (var i = 0; i < firstIndex; i++) {
        row.push({
          value: new Date(_this.state.currentYear, _this.state.currentMonth, i - firstIndex + 1).getDate(),
          type: "invalid"
        });
      }

      for (var _i = 1; _i <= numberOfDays; _i++) {
        row.push({ value: _i, type: "valid" });
        firstIndex++;

        if (firstIndex === 7) {
          firstIndex = 0;
          days.push([].concat(row));
          row.length = 0;
        }
      }

      if (row.length > 0 || days.length < 6) {
        var restDay = 1;
        for (var _i2 = row.length; _i2 < 7; _i2++) {
          row.push({ value: restDay++, type: "invalid" });
        }
        days.push([].concat(row));

        if (days.length < 6) {
          var tmp = [];
          for (var _i3 = 0; _i3 < 7; _i3++) {
            tmp.push({ value: restDay++, type: "invalid" });
          }
          days.push([].concat(tmp));
        }
      }

      _this.utilUpdateValidSelection(days);

      _this.setState({ days: days });
    }, _this.handleMonthSelect = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(forward) {
        var currentMonth, currentYear, _currentMonth, _currentYear;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!forward) {
                  _context.next = 8;
                  break;
                }

                currentMonth = _this.state.currentMonth + 1;
                currentYear = _this.state.currentYear;

                if (currentMonth === 12) {
                  currentMonth = 0;
                  currentYear = (parseInt(currentYear) + 1).toString();
                }
                _context.next = 6;
                return _this.setState({ currentMonth: currentMonth, currentYear: currentYear });

              case 6:
                _context.next = 13;
                break;

              case 8:
                _currentMonth = _this.state.currentMonth - 1;
                _currentYear = _this.state.currentYear;

                if (_currentMonth === -1) {
                  _currentMonth = 11;
                  _currentYear = (parseInt(_currentYear) - 1).toString();
                }
                _context.next = 13;
                return _this.setState({ currentMonth: _currentMonth, currentYear: _currentYear });

              case 13:
                _this.setDays();

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.handleDateSelect = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(day) {
        var date;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this.props.getSelectedDate) {
                  _context2.next = 3;
                  break;
                }

                console.error("Error: Missing props getSelectedDate.");
                return _context2.abrupt("return");

              case 3:
                date = new Date(_this.state.currentYear, _this.state.currentMonth, day);
                _context2.next = 6;
                return _this.setState({ selectedDate: date, tableToggle: false });

              case 6:
                _context2.next = 8;
                return _this.props.getSelectedDate(_this.state.selectedDate);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.utilCheckDateRange = function () {
      if (!_this.props.monthYearRange || !_this.props.monthYearRange.from || !_this.props.monthYearRange.to) return "noProps";

      var tmp = new Date(_this.state.currentYear, _this.state.currentMonth);
      if (tmp <= _this.props.monthYearRange.from) return "smaller";
      if (tmp >= _this.props.monthYearRange.to) return "larger";

      return "inRange";
    }, _this.utilUpdateValidSelection = function (days) {
      if (!_this.props.defaultValues) return "noProps";

      var set = new Set();

      for (var i = 0; i < _this.props.defaultValues.length; i++) {
        var date = _this.props.defaultValues[i];
        set.add(date.getFullYear().toString() + "-" + date.getMonth().toString() + date.getDate().toString());
      }

      for (var _i4 = 0; _i4 < days.length; _i4++) {
        for (var j = 0; j < days[0].length; j++) {
          if (days[_i4][j].type === "invalid") continue;
          var _date = _this.state.currentYear + "-" + _this.state.currentMonth + days[_i4][j].value.toString();
          if (!set.has(_date)) {
            days[_i4][j].type = "invalid";
          }
        }
      }
    }, _this.utilDisplayDate = function () {
      var date = _this.state.selectedDate;
      return _this.mlist[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setDays();
      document.addEventListener("mousedown", this.handleClick, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.addEventListener("mousedown", this.handleClick, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var days = this.state.days;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          "div",
          {
            className: this.state.selectedDate === null ? "rdcLabel rdcLabelUnselected" : "rdcLabel rdcLabelSelected",
            onClick: this.handleLabelClick
          },
          this.state.selectedDate ? this.utilDisplayDate(this.state.selectedDate) : "Select Date"
        ),
        _react2.default.createElement(
          "div",
          {
            className: this.state.tableToggle ? "rdcContainer rdcShow" : "rdcContainer rdcHide",
            ref: function ref(node) {
              return _this3.node = node;
            }
          },
          _react2.default.createElement(
            "div",
            { className: "rdcPicker" },
            _react2.default.createElement(
              "span",
              {
                className: "arrow",
                style: {
                  float: "left",
                  cursor: "pointer",
                  userSelect: "none",
                  visibility: this.utilCheckDateRange() === "smaller" ? "hidden" : "visible"
                },
                onClick: function onClick() {
                  return _this3.handleMonthSelect(false);
                }
              },
              "<"
            ),
            _react2.default.createElement(
              "span",
              { style: { userSelect: "none" } },
              this.mlist[this.state.currentMonth] + " " + this.state.currentYear
            ),
            _react2.default.createElement(
              "span",
              {
                className: "arrow",
                style: {
                  float: "right",
                  cursor: "pointer",
                  userSelect: "none",
                  visibility: this.utilCheckDateRange() === "larger" ? "hidden" : "visible"
                },
                onClick: function onClick() {
                  return _this3.handleMonthSelect(true);
                }
              },
              ">"
            )
          ),
          _react2.default.createElement(
            "table",
            { className: "rdcTable" },
            _react2.default.createElement(
              "thead",
              { style: { backgroundColor: "#559FFF" } },
              _react2.default.createElement(
                "tr",
                null,
                this.state.weekdays.map(function (day) {
                  return _react2.default.createElement(
                    "th",
                    { key: day, className: "rdcHeader" },
                    day
                  );
                })
              )
            ),
            _react2.default.createElement(
              "tbody",
              null,
              days.map(function (row) {
                return _react2.default.createElement(
                  "tr",
                  { key: days.indexOf(row) },
                  row.map(function (day) {
                    return _react2.default.createElement(
                      "td",
                      {
                        key: day.value,
                        className: day.type === "valid" ? "rdcBody rdcBodyCurrent" : "rdcBody rdcNoneCurrent",
                        onClick: function onClick() {
                          if (day.type !== "valid") return;
                          return _this3.handleDateSelect(day.value);
                        }
                      },
                      day.value
                    );
                  })
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;