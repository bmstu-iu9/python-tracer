(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isEqual(line1, line2) {
    var regExp = /\s+/g;

    line1 = line1.replace(regExp, '');
    line2 = line2.replace(regExp, '');

    return line1 === line2;
}

var Task = function () {
    function Task() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Task);

        this._source = options._source;
        this._target = options._target;
        this._input = options._input || '';
        this._message = options._message || '';
        this._attempts = options._attempts || 0;
        this._maxAttempts = options._maxAttempts || 10;
        this._status = options._status || Task.statuses.INITIAL;

        this._solution = tracer(this._source, this._target);
    }

    _createClass(Task, [{
        key: 'status',
        value: function status(_status) {
            if (_status) {
                this._status = _status;
                return this;
            }

            return this._status;
        }
    }, {
        key: 'message',
        value: function message() {
            if (arguments.length == 0) {
                return this._message;
            } else if (arguments.length == 1) {
                this._message = arguments.length <= 0 ? undefined : arguments[0];
                return this;
            } else if (arguments.length == 2) {
                this.status(arguments.length <= 0 ? undefined : arguments[0]);
                this.message(arguments.length <= 1 ? undefined : arguments[1]);
                return this;
            }

            return this;
        }
    }, {
        key: 'attempt',
        value: function attempt() {

            if (this.status() == Task.statuses.INITIAL || this.status() == Task.statuses.ERROR) {

                this._attempts++;
                this.verify();

                if (this._attempts >= this._maxAttempts && this.status() !== Task.statuses.SUCCESS) {
                    this.status(Task.statuses.BLOCKED);
                }
            }

            return this;
        }
    }, {
        key: 'verify',
        value: function verify(input) {
            var solution = this._solution.split('\n');

            input = (input || this._input).split('\n');

            if (solution.length >= input.length) {
                var line = 0;

                while (isEqual(solution[line] || '', input[line] || '') && (solution[line] || input[line])) {
                    line++;
                }

                if (line == solution.length) {
                    this.message(Task.statuses.SUCCESS, '\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E!');
                } else {
                    this.message(Task.statuses.ERROR, '\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0432 \u0441\u0442\u0440\u043E\u043A\u0435 ' + (line + 1));
                }
            } else {
                this.message(Task.statuses.ERROR, '\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0432 \u0441\u0442\u0440\u043E\u043A\u0435 ' + solution.length);
            }

            return this;
        }
    }]);

    return Task;
}();

Task.statuses = {
    INITIAL: 0,
    SUCCESS: 1,
    ERROR: 2,
    BLOCKED: 3
};

exports.default = Task;

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tasks = {
    GCD: {
        source: require('./sources/gcd'),
        generator: require('./generators/gcd')
    },

    HEX: {
        source: require('./sources/hex'),
        generator: require('./generators/hex')
    },

    SQUARE_EQUAL: {
        source: require('./sources/square_equal'),
        generator: require('./generators/square_equal')
    },

    REMOVE_DIGIT: {
        source: require('./sources/remove_digit'),
        generator: require('./generators/remove_digit')
    }
};

function generate(taskName) {
    var _task$generator;

    var task = tasks[taskName];

    for (var _len = arguments.length, genArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        genArgs[_key - 1] = arguments[_key];
    }

    return new _Task2.default({
        _source: task.source.default,
        _target: (_task$generator = task.generator).default.apply(_task$generator, genArgs)
    });
}

global.generateTasks = function (name, group) {
    return [generate('GCD', true), generate('GCD', false), generate('HEX', false), generate('SQUARE_EQUAL'), generate('SQUARE_EQUAL'), generate('REMOVE_DIGIT')];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Task":1,"./generators/gcd":3,"./generators/hex":4,"./generators/remove_digit":5,"./generators/square_equal":6,"./sources/gcd":7,"./sources/hex":8,"./sources/remove_digit":9,"./sources/square_equal":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return 'gcd(28, -34)';
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return 'hex(145)';
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return 'remove_digit(28797, 7)';
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return 'square_equal(49, 28, 53)';
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def gcd(x, y):\n    if x < 0:\n        x = -x\n    if y < 0:\n        y = -y\n    while y != 0:\n        rem = x % y\n        x = y\n        y = rem\n    return x";

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def hex(number):\n    if number == 0:\n        return '0'\n    res = ''\n    while number > 0:\n        digit = number % 16\n        if digit <= 9:\n            digit = str(digit)\n        elif digit <= 13:\n            if digit <= 11:\n                if digit == 10:\n                    digit = 'A'\n                else:\n                    digit = 'B'\n            elif digit == 12:\n                digit = 'C'\n            else:\n                digit = 'D'\n        elif digit == 14:\n            digit = 'E'\n        else:\n            digit = 'F'\n        res = digit + res\n        number = number // 16\n    return res";

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def remove_digit(number, digit):\n    res = 0\n    power = 1\n    while number > 0:\n        cur_digit = number % 10\n        if cur_digit != digit:\n            res = res + cur_digit * power\n            power = power * 10\n        number = number // 10\n    return res";

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def square_equal(a, b, c):\n    if a != 0:\n        D = b*b - 4*a*c\n        if D > 0:\n            x1 = (-b - sqrt(D)) / (2*a)\n            x2 = (-b + sqrt(D)) / (2*a)\n            return str(x1) + ' and ' + str(x2)\n        elif D == 0:\n            return str(-b / (2*a))\n        else:\n            return 'no roots'\n    else:\n        if b != 0:\n            return str(-c / b)\n        else:\n            return 'no roots'";

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHVpXFx0YXNrc1xcVGFzay5qcyIsInNyY1xcdWlcXHRhc2tzXFxzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yLmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXGdjZC5qcyIsInNyY1xcdWlcXHRhc2tzXFxnZW5lcmF0b3JzXFxoZXguanMiLCJzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yc1xccmVtb3ZlX2RpZ2l0LmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXHNxdWFyZV9lcXVhbC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2djZC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2hleC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL3JlbW92ZV9kaWdpdC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL3NxdWFyZV9lcXVhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsS0FBeEIsRUFBK0I7QUFDM0IsUUFBSSxTQUFTLE1BQWI7O0FBRUEsWUFBUSxNQUFNLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLENBQVI7QUFDQSxZQUFRLE1BQU0sT0FBTixDQUFjLE1BQWQsRUFBc0IsRUFBdEIsQ0FBUjs7QUFFQSxXQUFPLFVBQVUsS0FBakI7QUFDSDs7SUFFSyxJO0FBRUYsb0JBQTBCO0FBQUEsWUFBZCxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3RCLGFBQUssT0FBTCxHQUFlLFFBQVEsT0FBdkI7QUFDQSxhQUFLLE9BQUwsR0FBZSxRQUFRLE9BQXZCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsUUFBUSxNQUFSLElBQWtCLEVBQWhDO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQVEsUUFBUixJQUFtQixFQUFuQztBQUNBLGFBQUssU0FBTCxHQUFpQixRQUFRLFNBQVIs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Q1YsZ0JBQVEsUUFBUSx3QkFBUixDQURFO0FBRVYsbUJBQVcsUUFBUSwyQkFBUjtBQUZEO0FBaEJKLENBQWQ7O0FBc0JBLFNBQVMsUUFBVCxDQUFrQixRQUFsQixFQUF3QztBQUFBOztBQUVwQyxRQUFJLE9BQU8sTUFBTSxRQUFOLENBQVg7O0FBRm9DLHNDQUFULE9BQVM7QUFBVCxlQUFTO0FBQUE7O0FBSXBDLFdBQU8sbUJBQVM7QUFDWixpQkFBUyxLQUFLLE1BQUwsQ0FBWSxPQURUO0FBRVosaUJBQVMsd0JBQUssU0FBTCxFQUFlLE9BQWYsd0JBQTBCLE9BQTFCO0FBRkcsS0FBVCxDQUFQO0FBSUg7O0FBRUQsT0FBTyxhQUFQLEdBQXVCLFVBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QjtBQUMxQyxXQUFPLENBQ0gsU0FBUyxLQUFULEVBQWdCLElBQWhCLENBREcsRUFFSCxTQUFTLEtBQVQsRUFBZ0IsS0FBaEIsQ0FGRyxFQUdILFNBQVMsS0FBVCxFQUFnQixLQUFoQixDQUhHLEVBSUgsU0FBUyxjQUFULENBSkcsRUFLSCxTQUFTLGNBQVQsQ0FMRyxFQU1ILFNBQVMsY0FBVCxDQU5HLENBQVA7QUFRSCxDQVREOzs7Ozs7Ozs7OztrQkNsQ2UsWUFBWTtBQUN2QixXQUFPLGNBQVA7QUFDSCxDOzs7Ozs7Ozs7a0JDRmMsWUFBWTtBQUN2QixXQUFPLFVBQVA7QUFDSCxDOzs7Ozs7Ozs7a0JDRmMsWUFBWTtBQUN2QixXQUFPLHdCQUFQO0FBQ0gsQzs7Ozs7Ozs7O2tCQ0ZjLFlBQVk7QUFDdkIsV0FBTywwQkFBUDtBQUNILEM7OztBQ0ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGlzRXF1YWwobGluZTEsIGxpbmUyKSB7XHJcbiAgICBsZXQgcmVnRXhwID0gL1xccysvZztcclxuXHJcbiAgICBsaW5lMSA9IGxpbmUxLnJlcGxhY2UocmVnRXhwLCAnJyk7XHJcbiAgICBsaW5lMiA9IGxpbmUyLnJlcGxhY2UocmVnRXhwLCAnJyk7XHJcblxyXG4gICAgcmV0dXJuIGxpbmUxID09PSBsaW5lMjtcclxufVxyXG5cclxuY2xhc3MgVGFzayB7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5fc291cmNlID0gb3B0aW9ucy5fc291cmNlO1xyXG4gICAgICAgIHRoaXMuX3RhcmdldCA9IG9wdGlvbnMuX3RhcmdldDtcclxuICAgICAgICB0aGlzLl9pbnB1dCA9IG9wdGlvbnMuX2lucHV0IHx8ICcnO1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBvcHRpb25zLl9tZXNzYWdlIHx8Jyc7XHJcbiAgICAgICAgdGhpcy5fYXR0ZW1wdHMgPSBvcHRpb25zLl9hdHRlbXB0cyB8fCAwO1xyXG4gICAgICAgIHRoaXMuX21heEF0dGVtcHRzID0gb3B0aW9ucy5fbWF4QXR0ZW1wdHMgfHwgMTA7XHJcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gb3B0aW9ucy5fc3RhdHVzIHx8IFRhc2suc3RhdHVzZXMuSU5JVElBTDtcclxuXHJcbiAgICAgICAgdGhpcy5fc29sdXRpb24gPSB0cmFjZXIodGhpcy5fc291cmNlLCB0aGlzLl90YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXR1cyhzdGF0dXMpIHtcclxuICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIG1lc3NhZ2UoLi4uYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlID0gYXJnc1swXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzKGFyZ3NbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UoYXJnc1sxXSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0ZW1wdCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gVGFzay5zdGF0dXNlcy5JTklUSUFMIHx8IHRoaXMuc3RhdHVzKCkgPT0gVGFzay5zdGF0dXNlcy5FUlJPUikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fYXR0ZW1wdHMrKztcclxuICAgICAgICAgICAgdGhpcy52ZXJpZnkoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdHRlbXB0cyA+PSB0aGlzLl9tYXhBdHRlbXB0cyAmJiB0aGlzLnN0YXR1cygpICE9PSBUYXNrLnN0YXR1c2VzLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzKFRhc2suc3RhdHVzZXMuQkxPQ0tFRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZlcmlmeShpbnB1dCkge1xyXG4gICAgICAgIGxldCBzb2x1dGlvbiA9IHRoaXMuX3NvbHV0aW9uLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgaW5wdXQgPSAoaW5wdXQgfHwgdGhpcy5faW5wdXQpLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgaWYgKHNvbHV0aW9uLmxlbmd0aCA+PSBpbnB1dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IGxpbmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGlzRXF1YWwoc29sdXRpb25bbGluZV0gfHwgJycsIGlucHV0W2xpbmVdIHx8ICcnKSAmJiAoc29sdXRpb25bbGluZV0gfHwgaW5wdXRbbGluZV0pKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5lID09IHNvbHV0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlKFRhc2suc3RhdHVzZXMuU1VDQ0VTUywgYNCX0LDQtNCw0L3QuNC1INGD0YHQv9C10YjQvdC+INCy0YvQv9C+0LvQvdC10L3QviFgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZShUYXNrLnN0YXR1c2VzLkVSUk9SLCBg0J3QtdCy0LXRgNC90YvQtSDQt9C90LDRh9C10L3QuNGPINCyINGB0YLRgNC+0LrQtSAke2xpbmUgKyAxfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlKFRhc2suc3RhdHVzZXMuRVJST1IsIGDQndC10LLQtdGA0L3Ri9C1INC30L3QsNGH0LXQvdC40Y8g0LIg0YHRgtGA0L7QutC1ICR7c29sdXRpb24ubGVuZ3RofWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcblRhc2suc3RhdHVzZXMgPSB7XHJcbiAgICBJTklUSUFMOiAwLFxyXG4gICAgU1VDQ0VTUzogMSxcclxuICAgIEVSUk9SOiAyLFxyXG4gICAgQkxPQ0tFRDogM1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xyXG5cclxuY29uc3QgdGFza3MgPSB7XHJcbiAgICBHQ0Q6IHtcclxuICAgICAgICBzb3VyY2U6IHJlcXVpcmUoJy4vc291cmNlcy9nY2QnKSxcclxuICAgICAgICBnZW5lcmF0b3I6IHJlcXVpcmUoJy4vZ2VuZXJhdG9ycy9nY2QnKVxyXG4gICAgfSxcclxuXHJcbiAgICBIRVg6IHtcclxuICAgICAgICBzb3VyY2U6IHJlcXVpcmUoJy4vc291cmNlcy9oZXgnKSxcclxuICAgICAgICBnZW5lcmF0b3I6IHJlcXVpcmUoJy4vZ2VuZXJhdG9ycy9oZXgnKVxyXG4gICAgfSxcclxuXHJcbiAgICBTUVVBUkVfRVFVQUw6IHtcclxuICAgICAgICBzb3VyY2U6IHJlcXVpcmUoJy4vc291cmNlcy9zcXVhcmVfZXF1YWwnKSxcclxuICAgICAgICBnZW5lcmF0b3I6IHJlcXVpcmUoJy4vZ2VuZXJhdG9ycy9zcXVhcmVfZXF1YWwnKVxyXG4gICAgfSxcclxuXHJcbiAgICBSRU1PVkVfRElHSVQ6IHtcclxuICAgICAgICBzb3VyY2U6IHJlcXVpcmUoJy4vc291cmNlcy9yZW1vdmVfZGlnaXQnKSxcclxuICAgICAgICBnZW5lcmF0b3I6IHJlcXVpcmUoJy4vZ2VuZXJhdG9ycy9yZW1vdmVfZGlnaXQnKVxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGUodGFza05hbWUsIC4uLmdlbkFyZ3MpIHtcclxuXHJcbiAgICBsZXQgdGFzayA9IHRhc2tzW3Rhc2tOYW1lXTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFRhc2soe1xyXG4gICAgICAgIF9zb3VyY2U6IHRhc2suc291cmNlLmRlZmF1bHQsXHJcbiAgICAgICAgX3RhcmdldDogdGFzay5nZW5lcmF0b3IuZGVmYXVsdCguLi5nZW5BcmdzKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmdsb2JhbC5nZW5lcmF0ZVRhc2tzID0gZnVuY3Rpb24gKG5hbWUsIGdyb3VwKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIGdlbmVyYXRlKCdHQ0QnLCB0cnVlKSxcclxuICAgICAgICBnZW5lcmF0ZSgnR0NEJywgZmFsc2UpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdIRVgnLCBmYWxzZSksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ1NRVUFSRV9FUVVBTCcpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdTUVVBUkVfRVFVQUwnKSxcclxuICAgICAgICBnZW5lcmF0ZSgnUkVNT1ZFX0RJR0lUJylcclxuICAgIF07XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICdnY2QoMjgsIC0zNCknXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gJ2hleCgxNDUpJztcclxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAncmVtb3ZlX2RpZ2l0KDI4Nzk3LCA3KSdcclxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAnc3F1YXJlX2VxdWFsKDQ5LCAyOCwgNTMpJ1xyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFwiZGVmIGdjZCh4LCB5KTpcXG4gICAgaWYgeCA8IDA6XFxuICAgICAgICB4ID0gLXhcXG4gICAgaWYgeSA8IDA6XFxuICAgICAgICB5ID0gLXlcXG4gICAgd2hpbGUgeSAhPSAwOlxcbiAgICAgICAgcmVtID0geCAlIHlcXG4gICAgICAgIHggPSB5XFxuICAgICAgICB5ID0gcmVtXFxuICAgIHJldHVybiB4XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm5ZMlF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgaGV4KG51bWJlcik6XFxuICAgIGlmIG51bWJlciA9PSAwOlxcbiAgICAgICAgcmV0dXJuICcwJ1xcbiAgICByZXMgPSAnJ1xcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgZGlnaXQgPSBudW1iZXIgJSAxNlxcbiAgICAgICAgaWYgZGlnaXQgPD0gOTpcXG4gICAgICAgICAgICBkaWdpdCA9IHN0cihkaWdpdClcXG4gICAgICAgIGVsaWYgZGlnaXQgPD0gMTM6XFxuICAgICAgICAgICAgaWYgZGlnaXQgPD0gMTE6XFxuICAgICAgICAgICAgICAgIGlmIGRpZ2l0ID09IDEwOlxcbiAgICAgICAgICAgICAgICAgICAgZGlnaXQgPSAnQSdcXG4gICAgICAgICAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0ID0gJ0InXFxuICAgICAgICAgICAgZWxpZiBkaWdpdCA9PSAxMjpcXG4gICAgICAgICAgICAgICAgZGlnaXQgPSAnQydcXG4gICAgICAgICAgICBlbHNlOlxcbiAgICAgICAgICAgICAgICBkaWdpdCA9ICdEJ1xcbiAgICAgICAgZWxpZiBkaWdpdCA9PSAxNDpcXG4gICAgICAgICAgICBkaWdpdCA9ICdFJ1xcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICBkaWdpdCA9ICdGJ1xcbiAgICAgICAgcmVzID0gZGlnaXQgKyByZXNcXG4gICAgICAgIG51bWJlciA9IG51bWJlciAvLyAxNlxcbiAgICByZXR1cm4gcmVzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm9aWGd1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgcmVtb3ZlX2RpZ2l0KG51bWJlciwgZGlnaXQpOlxcbiAgICByZXMgPSAwXFxuICAgIHBvd2VyID0gMVxcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgY3VyX2RpZ2l0ID0gbnVtYmVyICUgMTBcXG4gICAgICAgIGlmIGN1cl9kaWdpdCAhPSBkaWdpdDpcXG4gICAgICAgICAgICByZXMgPSByZXMgKyBjdXJfZGlnaXQgKiBwb3dlclxcbiAgICAgICAgICAgIHBvd2VyID0gcG93ZXIgKiAxMFxcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyIC8vIDEwXFxuICAgIHJldHVybiByZXNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKeVpXMXZkbVZmWkdsbmFYUXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2VzExOSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBcImRlZiBzcXVhcmVfZXF1YWwoYSwgYiwgYyk6XFxuICAgIGlmIGEgIT0gMDpcXG4gICAgICAgIEQgPSBiKmIgLSA0KmEqY1xcbiAgICAgICAgaWYgRCA+IDA6XFxuICAgICAgICAgICAgeDEgPSAoLWIgLSBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgeDIgPSAoLWIgKyBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgcmV0dXJuIHN0cih4MSkgKyAnIGFuZCAnICsgc3RyKHgyKVxcbiAgICAgICAgZWxpZiBEID09IDA6XFxuICAgICAgICAgICAgcmV0dXJuIHN0cigtYiAvICgyKmEpKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1xcbiAgICBlbHNlOlxcbiAgICAgICAgaWYgYiAhPSAwOlxcbiAgICAgICAgICAgIHJldHVybiBzdHIoLWMgLyBiKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUp6Y1hWaGNtVmZaWEYxWVd3dWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5Il19
