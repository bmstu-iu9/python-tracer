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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gcd = 'def gcd(x, y):\n    if x < 0:\n        x = -x\n    if y < 0:\n        y = -y\n    while y != 0:\n        rem = x % y\n        x = y\n        y = rem\n    return x';

var hex = 'def hex(number):\n    if number == 0:\n        return \'0\'\n    res = \'\'\n    while number > 0:\n        digit = number % 16\n        if digit <= 9:\n            digit = str(digit)\n        elif digit <= 13:\n            if digit <= 11:\n                if digit == 10:\n                    digit = \'A\'\n                else:\n                    digit = \'B\'\n            elif digit == 12:\n                digit = \'C\'\n            else:\n                digit = \'D\'\n        elif digit == 14:\n            digit = \'E\'\n        else:\n            digit = \'F\'\n        res = digit + res\n        number = number // 16\n    return res';

var removeDigit = 'def remove_digit(number, digit):\n    res = 0\n    power = 1\n    while number > 0:\n        cur_digit = number % 10\n        if cur_digit != digit:\n            res = res + cur_digit * power\n            power = power * 10\n        number = number // 10\n    return res';

var factorize = 'def factorize(n):\n    res = \'\'\n    while n > 2 and n % 2 == 0:\n        res = res + \'2*\'\n        n = n // 2\n    d = 3\n    while n > d:\n        if n % d == 0:\n            res = res + str(d) + \'*\'\n            n = n // d\n        else:\n            d = d + 2\n    return res + str(n)';

var squareEqual = 'def square_equal(a, b, c):\n    if a != 0:\n        D = b*b - 4*a*c\n        if D > 0:\n            x1 = (-b - sqrt(D)) / (2*a)\n            x2 = (-b + sqrt(D)) / (2*a)\n            return str(x1) + \' and \' + str(x2)\n        elif D == 0:\n            return str(-b / (2*a))\n        else:\n            return \'no roots\'\n    else:\n        if b != 0:\n            return str(-c / b)\n        else:\n            return \'no roots\'';

exports.default = {
    GCD: function GCD() {

        var target = 'gcd(78, 45)';

        return new _Task2.default({
            _source: gcd,
            _target: target
        });
    },

    HEX: function HEX() {
        var target = 'hex(217)';

        return new _Task2.default({
            _source: hex,
            _target: target
        });
    },

    REMOVE_DIGIT: function REMOVE_DIGIT() {
        var target = 'remove_digit(166, 6)';

        return new _Task2.default({
            _source: removeDigit,
            _target: target
        });
    },

    FACTORIZE: function FACTORIZE() {
        var target = 'factorize(75)';

        return new _Task2.default({
            _source: factorize,
            _target: target
        });
    },

    SQUARE_EQUAL: function SQUARE_EQUAL() {
        var target = 'square_equal(49, 28, 53)';

        return new _Task2.default({
            _source: squareEqual,
            _target: target
        });
    }
};

},{"./Task":1}],3:[function(require,module,exports){
(function (global){
'use strict';

var _TaskFactory = require('./TaskFactory');

var _TaskFactory2 = _interopRequireDefault(_TaskFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.generateTasks = function (name, group) {
    return [_TaskFactory2.default.GCD(true), _TaskFactory2.default.GCD(false), _TaskFactory2.default.HEX(), _TaskFactory2.default.SQUARE_EQUAL(), _TaskFactory2.default.SQUARE_EQUAL(), _TaskFactory2.default.REMOVE_DIGIT()];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./TaskFactory":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHVpXFx0YXNrc1xcVGFzay5qcyIsInNyY1xcdWlcXHRhc2tzXFxUYXNrRmFjdG9yeS5qcyIsInNyY1xcdWlcXHRhc2tzXFxzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixLQUF4QixFQUErQjtBQUMzQixRQUFJLFNBQVMsTUFBYjs7QUFFQSxZQUFRLE1BQU0sT0FBTixDQUFjLE1BQWQsRUFBc0IsRUFBdEIsQ0FBUjtBQUNBLFlBQVEsTUFBTSxPQUFOLENBQWMsTUFBZCxFQUFzQixFQUF0QixDQUFSOztBQUVBLFdBQU8sVUFBVSxLQUFqQjtBQUNIOztJQUVLLEk7QUFFRixvQkFBMEI7QUFBQSxZQUFkLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDdEIsYUFBSyxPQUFMLEdBQWUsUUFBUSxPQUF2QjtBQUNBLGFBQUssT0FBTCxHQUFlLFFBQVEsT0FBdkI7QUFDQSxhQUFLLE1BQUwsR0FBYyxRQUFRLE1BQVIsSUFBa0IsRUFBaEM7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBUSxRQUFSLElBQW1CLEVBQW5DO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLFFBQVEsU0FBUixJQUFxQixDQUF0QztBQUNBLGFBQUssWUFBTCxHQUFvQixRQUFRLFlBQVIsSUFBd0IsRUFBNUM7QUFDQSxhQUFLLE9BQUwsR0FBZSxRQUFRLE9BQVIsSUFBbUIsS0FBSyxRQUFMLENBQWMsT0FBaEQ7O0FBRUEsYUFBSyxTQUFMLEdBQWlCLE9BQU8sS0FBSyxPQUFaLEVBQXFCLEtBQUssT0FBMUIsQ0FBakI7QUFDSDs7OzsrQkFFTSxPLEVBQVE7QUFDWCxnQkFBSSxPQUFKLEVBQVk7QUFDUixxQkFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLHVCQUFPLElBQVA7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLE9BQVo7QUFDSDs7O2tDQUVnQjtBQUNiLGdCQUFJLFVBQUssTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ2xCLHVCQUFPLEtBQUssUUFBWjtBQUNILGFBRkQsTUFFTyxJQUFJLFVBQUssTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ3pCLHFCQUFLLFFBQUw7QUFDQSx1QkFBTyxJQUFQO0FBQ0gsYUFITSxNQUdBLElBQUksVUFBSyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDekIscUJBQUssTUFBTDtBQUNBLHFCQUFLLE9BQUw7QUFDQSx1QkFBTyxJQUFQO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7a0NBRVM7O0FBRU4sZ0JBQUksS0FBSyxNQUFMLE1BQWlCLEtBQUssUUFBTCxDQUFjLE9BQS9CLElBQTBDLEtBQUssTUFBTCxNQUFpQixLQUFLLFFBQUwsQ0FBYyxLQUE3RSxFQUFvRjs7QUFFaEYscUJBQUssU0FBTDtBQUNBLHFCQUFLLE1BQUw7O0FBRUEsb0JBQUksS0FBSyxTQUFMLElBQWtCLEtBQUssWUFBdkIsSUFBdUMsS0FBSyxNQUFMLE9BQWtCLEtBQUssUUFBTCxDQUFjLE9BQTNFLEVBQW9GO0FBQ2hGLHlCQUFLLE1BQUwsQ0FBWSxLQUFLLFFBQUwsQ0FBYyxPQUExQjtBQUNIO0FBQ0o7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7K0JBRU0sSyxFQUFPO0FBQ1YsZ0JBQUksV0FBVyxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLElBQXJCLENBQWY7O0FBRUEsb0JBQVEsQ0FBQyxTQUFTLEtBQUssTUFBZixFQUF1QixLQUF2QixDQUE2QixJQUE3QixDQUFSOztBQUVBLGdCQUFJLFNBQVMsTUFBVCxJQUFtQixNQUFNLE1BQTdCLEVBQXFDO0FBQ2pDLG9CQUFJLE9BQU8sQ0FBWDs7QUFFQSx1QkFBTyxRQUFRLFNBQVMsSUFBVCxLQUFrQixFQUExQixFQUE4QixNQUFNLElBQU4sS0FBZSxFQUE3QyxNQUFxRCxTQUFTLElBQVQsS0FBa0IsTUFBTSxJQUFOLENBQXZFLENBQVAsRUFBNEY7QUFDeEY7QUFDSDs7QUFFRCxvQkFBSSxRQUFRLFNBQVMsTUFBckIsRUFBNkI7QUFDekIseUJBQUssT0FBTCxDQUFhLEtBQUssUUFBTCxDQUFjLE9BQTNCO0FBQ0gsaUJBRkQsTUFFTztBQUNILHlCQUFLLE9BQUwsQ0FBYSxLQUFLLFFBQUwsQ0FBYyxLQUEzQixzSkFBZ0UsT0FBTyxDQUF2RTtBQUNIO0FBQ0osYUFaRCxNQVlPO0FBQ0gscUJBQUssT0FBTCxDQUFhLEtBQUssUUFBTCxDQUFjLEtBQTNCLHFKQUFnRSxTQUFTLE1BQXpFO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7QUFHTCxLQUFLLFFBQUwsR0FBZ0I7QUFDWixhQUFTLENBREc7QUFFWixhQUFTLENBRkc7QUFHWixXQUFPLENBSEs7QUFJWixhQUFTO0FBSkcsQ0FBaEI7O2tCQU9lLEk7Ozs7Ozs7OztBQzlGZjs7Ozs7O0FBRUEsSUFBTSwwS0FBTjs7QUFXQSxJQUFNLCtvQkFBTjs7QUEwQkEsSUFBTSw4UkFBTjs7QUFXQSxJQUFNLG9UQUFOOztBQWNBLElBQU0sbWNBQU47O2tCQWlCZTtBQUNYLFNBQUssZUFBTTs7QUFFUCxZQUFJLFNBQVMsYUFBYjs7QUFFQSxlQUFPLG1CQUFTO0FBQ1oscUJBQVMsR0FERztBQUVaLHFCQUFTO0FBRkcsU0FBVCxDQUFQO0FBSUgsS0FUVTs7QUFXWCxTQUFLLGVBQU07QUFDUCxZQUFJLFNBQVMsVUFBYjs7QUFFQSxlQUFPLG1CQUFTO0FBQ1oscUJBQVMsR0FERztBQUVaLHFCQUFTO0FBRkcsU0FBVCxDQUFQO0FBSUgsS0FsQlU7O0FBb0JYLGtCQUFjLHdCQUFNO0FBQ2hCLFlBQUksU0FBUyxzQkFBYjs7QUFFQSxlQUFPLG1CQUFTO0FBQ1oscUJBQVMsV0FERztBQUVaLHFCQUFTO0FBRkcsU0FBVCxDQUFQO0FBSUgsS0EzQlU7O0FBNkJYLGVBQVcscUJBQU07QUFDYixZQUFJLFNBQVMsZUFBYjs7QUFFQSxlQUFPLG1CQUFTO0FBQ1oscUJBQVMsU0FERztBQUVaLHFCQUFTO0FBRkcsU0FBVCxDQUFQO0FBSUgsS0FwQ1U7O0FBc0NYLGtCQUFjLHdCQUFNO0FBQ2hCLFlBQUksU0FBUywwQkFBYjs7QUFFQSxlQUFPLG1CQUFTO0FBQ1oscUJBQVMsV0FERztBQUVaLHFCQUFTO0FBRkcsU0FBVCxDQUFQO0FBSUg7QUE3Q1UsQzs7Ozs7O0FDakZmOzs7Ozs7QUFFQSxPQUFPLGFBQVAsR0FBdUIsVUFBVSxJQUFWLEVBQWdCLEtBQWhCLEVBQXVCO0FBQzFDLFdBQU8sQ0FDSCxzQkFBWSxHQUFaLENBQWdCLElBQWhCLENBREcsRUFFSCxzQkFBWSxHQUFaLENBQWdCLEtBQWhCLENBRkcsRUFHSCxzQkFBWSxHQUFaLEVBSEcsRUFJSCxzQkFBWSxZQUFaLEVBSkcsRUFLSCxzQkFBWSxZQUFaLEVBTEcsRUFNSCxzQkFBWSxZQUFaLEVBTkcsQ0FBUDtBQVFILENBVEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gaXNFcXVhbChsaW5lMSwgbGluZTIpIHtcclxuICAgIGxldCByZWdFeHAgPSAvXFxzKy9nO1xyXG5cclxuICAgIGxpbmUxID0gbGluZTEucmVwbGFjZShyZWdFeHAsICcnKTtcclxuICAgIGxpbmUyID0gbGluZTIucmVwbGFjZShyZWdFeHAsICcnKTtcclxuXHJcbiAgICByZXR1cm4gbGluZTEgPT09IGxpbmUyO1xyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuICAgICAgICB0aGlzLl9zb3VyY2UgPSBvcHRpb25zLl9zb3VyY2U7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gb3B0aW9ucy5fdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuX2lucHV0ID0gb3B0aW9ucy5faW5wdXQgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IG9wdGlvbnMuX21lc3NhZ2UgfHwnJztcclxuICAgICAgICB0aGlzLl9hdHRlbXB0cyA9IG9wdGlvbnMuX2F0dGVtcHRzIHx8IDA7XHJcbiAgICAgICAgdGhpcy5fbWF4QXR0ZW1wdHMgPSBvcHRpb25zLl9tYXhBdHRlbXB0cyB8fCAxMDtcclxuICAgICAgICB0aGlzLl9zdGF0dXMgPSBvcHRpb25zLl9zdGF0dXMgfHwgVGFzay5zdGF0dXNlcy5JTklUSUFMO1xyXG5cclxuICAgICAgICB0aGlzLl9zb2x1dGlvbiA9IHRyYWNlcih0aGlzLl9zb3VyY2UsIHRoaXMuX3RhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdHVzKHN0YXR1cykge1xyXG4gICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgbWVzc2FnZSguLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2UgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMoYXJnc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZShhcmdzWzFdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhdHRlbXB0KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSBUYXNrLnN0YXR1c2VzLklOSVRJQUwgfHwgdGhpcy5zdGF0dXMoKSA9PSBUYXNrLnN0YXR1c2VzLkVSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hdHRlbXB0cysrO1xyXG4gICAgICAgICAgICB0aGlzLnZlcmlmeSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGVtcHRzID49IHRoaXMuX21heEF0dGVtcHRzICYmIHRoaXMuc3RhdHVzKCkgIT09IFRhc2suc3RhdHVzZXMuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMoVGFzay5zdGF0dXNlcy5CTE9DS0VEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmVyaWZ5KGlucHV0KSB7XHJcbiAgICAgICAgbGV0IHNvbHV0aW9uID0gdGhpcy5fc29sdXRpb24uc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBpbnB1dCA9IChpbnB1dCB8fCB0aGlzLl9pbnB1dCkuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBpZiAoc29sdXRpb24ubGVuZ3RoID49IGlucHV0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgbGluZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoaXNFcXVhbChzb2x1dGlvbltsaW5lXSB8fCAnJywgaW5wdXRbbGluZV0gfHwgJycpICYmIChzb2x1dGlvbltsaW5lXSB8fCBpbnB1dFtsaW5lXSkpIHtcclxuICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmUgPT0gc29sdXRpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UoVGFzay5zdGF0dXNlcy5TVUNDRVNTLCBg0JfQsNC00LDQvdC40LUg0YPRgdC/0LXRiNC90L4g0LLRi9C/0L7Qu9C90LXQvdC+IWApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlKFRhc2suc3RhdHVzZXMuRVJST1IsIGDQndC10LLQtdGA0L3Ri9C1INC30L3QsNGH0LXQvdC40Y8g0LIg0YHRgtGA0L7QutC1ICR7bGluZSArIDF9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UoVGFzay5zdGF0dXNlcy5FUlJPUiwgYNCd0LXQstC10YDQvdGL0LUg0LfQvdCw0YfQtdC90LjRjyDQsiDRgdGC0YDQvtC60LUgJHtzb2x1dGlvbi5sZW5ndGh9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuVGFzay5zdGF0dXNlcyA9IHtcclxuICAgIElOSVRJQUw6IDAsXHJcbiAgICBTVUNDRVNTOiAxLFxyXG4gICAgRVJST1I6IDIsXHJcbiAgICBCTE9DS0VEOiAzXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcblxyXG5jb25zdCBnY2QgPSBgZGVmIGdjZCh4LCB5KTpcclxuICAgIGlmIHggPCAwOlxyXG4gICAgICAgIHggPSAteFxyXG4gICAgaWYgeSA8IDA6XHJcbiAgICAgICAgeSA9IC15XHJcbiAgICB3aGlsZSB5ICE9IDA6XHJcbiAgICAgICAgcmVtID0geCAlIHlcclxuICAgICAgICB4ID0geVxyXG4gICAgICAgIHkgPSByZW1cclxuICAgIHJldHVybiB4YDtcclxuXHJcbmNvbnN0IGhleCA9IGBkZWYgaGV4KG51bWJlcik6XHJcbiAgICBpZiBudW1iZXIgPT0gMDpcclxuICAgICAgICByZXR1cm4gJzAnXHJcbiAgICByZXMgPSAnJ1xyXG4gICAgd2hpbGUgbnVtYmVyID4gMDpcclxuICAgICAgICBkaWdpdCA9IG51bWJlciAlIDE2XHJcbiAgICAgICAgaWYgZGlnaXQgPD0gOTpcclxuICAgICAgICAgICAgZGlnaXQgPSBzdHIoZGlnaXQpXHJcbiAgICAgICAgZWxpZiBkaWdpdCA8PSAxMzpcclxuICAgICAgICAgICAgaWYgZGlnaXQgPD0gMTE6XHJcbiAgICAgICAgICAgICAgICBpZiBkaWdpdCA9PSAxMDpcclxuICAgICAgICAgICAgICAgICAgICBkaWdpdCA9ICdBJ1xyXG4gICAgICAgICAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgICAgICAgICBkaWdpdCA9ICdCJ1xyXG4gICAgICAgICAgICBlbGlmIGRpZ2l0ID09IDEyOlxyXG4gICAgICAgICAgICAgICAgZGlnaXQgPSAnQydcclxuICAgICAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgICAgIGRpZ2l0ID0gJ0QnXHJcbiAgICAgICAgZWxpZiBkaWdpdCA9PSAxNDpcclxuICAgICAgICAgICAgZGlnaXQgPSAnRSdcclxuICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICBkaWdpdCA9ICdGJ1xyXG4gICAgICAgIHJlcyA9IGRpZ2l0ICsgcmVzXHJcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyIC8vIDE2XHJcbiAgICByZXR1cm4gcmVzYDtcclxuXHJcbmNvbnN0IHJlbW92ZURpZ2l0ID0gYGRlZiByZW1vdmVfZGlnaXQobnVtYmVyLCBkaWdpdCk6XHJcbiAgICByZXMgPSAwXHJcbiAgICBwb3dlciA9IDFcclxuICAgIHdoaWxlIG51bWJlciA+IDA6XHJcbiAgICAgICAgY3VyX2RpZ2l0ID0gbnVtYmVyICUgMTBcclxuICAgICAgICBpZiBjdXJfZGlnaXQgIT0gZGlnaXQ6XHJcbiAgICAgICAgICAgIHJlcyA9IHJlcyArIGN1cl9kaWdpdCAqIHBvd2VyXHJcbiAgICAgICAgICAgIHBvd2VyID0gcG93ZXIgKiAxMFxyXG4gICAgICAgIG51bWJlciA9IG51bWJlciAvLyAxMFxyXG4gICAgcmV0dXJuIHJlc2A7XHJcblxyXG5jb25zdCBmYWN0b3JpemUgPSBgZGVmIGZhY3Rvcml6ZShuKTpcclxuICAgIHJlcyA9ICcnXHJcbiAgICB3aGlsZSBuID4gMiBhbmQgbiAlIDIgPT0gMDpcclxuICAgICAgICByZXMgPSByZXMgKyAnMionXHJcbiAgICAgICAgbiA9IG4gLy8gMlxyXG4gICAgZCA9IDNcclxuICAgIHdoaWxlIG4gPiBkOlxyXG4gICAgICAgIGlmIG4gJSBkID09IDA6XHJcbiAgICAgICAgICAgIHJlcyA9IHJlcyArIHN0cihkKSArICcqJ1xyXG4gICAgICAgICAgICBuID0gbiAvLyBkXHJcbiAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgZCA9IGQgKyAyXHJcbiAgICByZXR1cm4gcmVzICsgc3RyKG4pYDtcclxuXHJcbmNvbnN0IHNxdWFyZUVxdWFsID0gYGRlZiBzcXVhcmVfZXF1YWwoYSwgYiwgYyk6XHJcbiAgICBpZiBhICE9IDA6XHJcbiAgICAgICAgRCA9IGIqYiAtIDQqYSpjXHJcbiAgICAgICAgaWYgRCA+IDA6XHJcbiAgICAgICAgICAgIHgxID0gKC1iIC0gc3FydChEKSkgLyAoMiphKVxyXG4gICAgICAgICAgICB4MiA9ICgtYiArIHNxcnQoRCkpIC8gKDIqYSlcclxuICAgICAgICAgICAgcmV0dXJuIHN0cih4MSkgKyAnIGFuZCAnICsgc3RyKHgyKVxyXG4gICAgICAgIGVsaWYgRCA9PSAwOlxyXG4gICAgICAgICAgICByZXR1cm4gc3RyKC1iIC8gKDIqYSkpXHJcbiAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgcmV0dXJuICdubyByb290cydcclxuICAgIGVsc2U6XHJcbiAgICAgICAgaWYgYiAhPSAwOlxyXG4gICAgICAgICAgICByZXR1cm4gc3RyKC1jIC8gYilcclxuICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ2A7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBHQ0Q6ICgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9ICdnY2QoNzgsIDQ1KSc7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGFzayh7XHJcbiAgICAgICAgICAgIF9zb3VyY2U6IGdjZCxcclxuICAgICAgICAgICAgX3RhcmdldDogdGFyZ2V0XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgSEVYOiAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9ICdoZXgoMjE3KSc7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGFzayh7XHJcbiAgICAgICAgICAgIF9zb3VyY2U6IGhleCxcclxuICAgICAgICAgICAgX3RhcmdldDogdGFyZ2V0XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgUkVNT1ZFX0RJR0lUOiAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9ICdyZW1vdmVfZGlnaXQoMTY2LCA2KSc7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGFzayh7XHJcbiAgICAgICAgICAgIF9zb3VyY2U6IHJlbW92ZURpZ2l0LFxyXG4gICAgICAgICAgICBfdGFyZ2V0OiB0YXJnZXRcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBGQUNUT1JJWkU6ICgpID0+IHtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gJ2ZhY3Rvcml6ZSg3NSknO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRhc2soe1xyXG4gICAgICAgICAgICBfc291cmNlOiBmYWN0b3JpemUsXHJcbiAgICAgICAgICAgIF90YXJnZXQ6IHRhcmdldFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIFNRVUFSRV9FUVVBTDogKCkgPT4ge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSAnc3F1YXJlX2VxdWFsKDQ5LCAyOCwgNTMpJztcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUYXNrKHtcclxuICAgICAgICAgICAgX3NvdXJjZTogc3F1YXJlRXF1YWwsXHJcbiAgICAgICAgICAgIF90YXJnZXQ6IHRhcmdldFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IFRhc2tGYWN0b3J5IGZyb20gJy4vVGFza0ZhY3RvcnknO1xyXG5cclxuZ2xvYmFsLmdlbmVyYXRlVGFza3MgPSBmdW5jdGlvbiAobmFtZSwgZ3JvdXApIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgVGFza0ZhY3RvcnkuR0NEKHRydWUpLFxyXG4gICAgICAgIFRhc2tGYWN0b3J5LkdDRChmYWxzZSksXHJcbiAgICAgICAgVGFza0ZhY3RvcnkuSEVYKCksXHJcbiAgICAgICAgVGFza0ZhY3RvcnkuU1FVQVJFX0VRVUFMKCksXHJcbiAgICAgICAgVGFza0ZhY3RvcnkuU1FVQVJFX0VRVUFMKCksXHJcbiAgICAgICAgVGFza0ZhY3RvcnkuUkVNT1ZFX0RJR0lUKClcclxuICAgIF07XHJcbn07Il19
