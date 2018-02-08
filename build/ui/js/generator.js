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
    return [generate('GCD', true), generate('GCD', false), generate('HEX'), generate('SQUARE_EQUAL', [1, 2]), generate('SQUARE_EQUAL', [0, 1]), generate('REMOVE_DIGIT')];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Task":1,"./generators/gcd":3,"./generators/hex":4,"./generators/remove_digit":5,"./generators/square_equal":6,"./sources/gcd":7,"./sources/hex":8,"./sources/remove_digit":9,"./sources/square_equal":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (noZero) {

    function gen() {
        return {
            a: Math.random() * 200 - 100 >> 0,
            b: Math.random() * 200 - 100 >> 0
        };
    }

    var args = gen(),
        target = 'gcd(' + args.a + ', ' + args.b + ')',
        solution = tracer(_gcd2.default, target).split('\n');

    if (noZero) {
        while (!(args.a && args.b) || solution.length < 20 || solution.length > 30) {
            args = gen();
            target = 'gcd(' + args.a + ', ' + args.b + ')';
            solution = tracer(_gcd2.default, target).split('\n');
        }
    } else {
        while (args.a && args.b || args.a === args.b) {
            args = gen();
            target = 'gcd(' + args.a + ', ' + args.b + ')';
        }
    }

    return target;
};

var _gcd = require('../sources/gcd');

var _gcd2 = _interopRequireDefault(_gcd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../sources/gcd":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    do {
        var number = Math.random() * 980 + 20 >> 0;
    } while (!/[a-f]/.test(number.toString(16)));

    return "hex(" + number + ")";
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var gen = function gen() {
        return {
            a: Math.random() * 100000 >> 0,
            b: Math.random() * 10 >> 0
        };
    };

    var isValid = function isValid(args) {
        var first_digit = args.a;

        while (first_digit > 9) {
            first_digit = first_digit / 10 >> 0;
        }

        var arr = [1, 1, 2, 1, 3, 1],
            diflen = arr[Math.random() * 6 >> 0],
            regExp = new RegExp(args.b, 'g');

        return args.a.toString().length - args.a.toString().replace(regExp, '').length >= diflen && first_digit !== args.b && tracer(_remove_digit2.default, 'remove_digit(' + args.a + ', ' + args.b + ')').split('\n').length < 35;
    };

    do {
        var args = gen();
    } while (!isValid(args));

    return 'remove_digit(' + args.a + ', ' + args.b + ')';
};

var _remove_digit = require('../sources/remove_digit');

var _remove_digit2 = _interopRequireDefault(_remove_digit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../sources/remove_digit":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (rootsCount) {
    var gen = function gen() {
        return {
            a: Math.random() * 100 < 10 ? 0 : Math.random() * 200 - 100 >> 0,
            b: Math.random() * 200 - 100 >> 0,
            c: Math.random() * 200 - 100 >> 0
        };
    };

    var isqrt = function isqrt(n) {
        for (var i = 0; i <= 100; i++) {
            if (i * i == n) {
                return i;
            }
        }

        return null;
    };

    var isValid = function isValid(args) {
        var a = args.a,
            b = args.b,
            c = args.c,
            D = 0;


        if (a != 0) {
            D = b * b - 4 * a * c;
            if (D > 0) {
                var sqrtD = isqrt(D);

                return rootsCount.indexOf(2) >= 0 && sqrtD && 100 * (-b - sqrtD) % (2 * a) == 0 && 100 * (-b + sqrtD) % (2 * a) == 0;
            } else if (D == 0) {
                return rootsCount.indexOf(1) >= 0 && 100 * -b % (2 * a) == 0;
            } else {
                return rootsCount.indexOf(0) >= 0;
            }
        } else {
            if (b !== 0) {
                return rootsCount.indexOf(1) >= 0 && 100 * -c % b == 0;
            } else {
                return rootsCount.indexOf(0) >= 0;
            }
        }
    };

    do {
        var args = gen();
    } while (isValid(args));

    return "square_equal(" + args.a + ", " + args.b + ", " + args.c + ")";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHVpXFx0YXNrc1xcVGFzay5qcyIsInNyY1xcdWlcXHRhc2tzXFxzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yLmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXGdjZC5qcyIsInNyY1xcdWlcXHRhc2tzXFxnZW5lcmF0b3JzXFxoZXguanMiLCJzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yc1xccmVtb3ZlX2RpZ2l0LmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXHNxdWFyZV9lcXVhbC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2djZC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2hleC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL3JlbW92ZV9kaWdpdC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL3NxdWFyZV9lcXVhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsS0FBeEIsRUFBK0I7QUFDM0IsUUFBSSxTQUFTLE1BQWI7O0FBRUEsWUFBUSxNQUFNLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLENBQVI7QUFDQSxZQUFRLE1BQU0sT0FBTixDQUFjLE1BQWQsRUFBc0IsRUFBdEIsQ0FBUjs7QUFFQSxXQUFPLFVBQVUsS0FBakI7QUFDSDs7SUFFSyxJO0FBRUYsb0JBQTBCO0FBQUEsWUFBZCxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3RCLGFBQUssT0FBTCxHQUFlLFFBQVEsT0FBdkI7QUFDQSxhQUFLLE9BQUwsR0FBZSxRQUFRLE9BQXZCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsUUFBUSxNQUFSLElBQWtCLEVBQWhDO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQVEsUUFBUixJQUFtQixFQUFuQztBQUNBLGFBQUssU0FBTCxHQUFpQixRQUFRLFNBQVIs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QXlCLENBQXpCLElBQStCLE1BQU0sQ0FBQyxDQUFQLEdBQVcsQ0FBWCxJQUFnQixDQUF0RDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLFdBQVcsT0FBWCxDQUFtQixDQUFuQixLQUF5QixDQUFoQztBQUNIO0FBQ0o7QUFDSixLQXZCRDs7QUF5QkEsT0FBRztBQUNDLFlBQUksT0FBTyxLQUFYO0FBQ0gsS0FGRCxRQUVTLFFBQVEsSUFBUixDQUZUOztBQUlBLDZCQUF1QixLQUFLLENBQTVCLFVBQWtDLEtBQUssQ0FBdkMsVUFBNkMsS0FBSyxDQUFsRDtBQUNILEM7OztBQ2hGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBpc0VxdWFsKGxpbmUxLCBsaW5lMikge1xyXG4gICAgbGV0IHJlZ0V4cCA9IC9cXHMrL2c7XHJcblxyXG4gICAgbGluZTEgPSBsaW5lMS5yZXBsYWNlKHJlZ0V4cCwgJycpO1xyXG4gICAgbGluZTIgPSBsaW5lMi5yZXBsYWNlKHJlZ0V4cCwgJycpO1xyXG5cclxuICAgIHJldHVybiBsaW5lMSA9PT0gbGluZTI7XHJcbn1cclxuXHJcbmNsYXNzIFRhc2sge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG9wdGlvbnMuX3NvdXJjZTtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSBvcHRpb25zLl90YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5faW5wdXQgPSBvcHRpb25zLl9pbnB1dCB8fCAnJztcclxuICAgICAgICB0aGlzLl9tZXNzYWdlID0gb3B0aW9ucy5fbWVzc2FnZSB8fCcnO1xyXG4gICAgICAgIHRoaXMuX2F0dGVtcHRzID0gb3B0aW9ucy5fYXR0ZW1wdHMgfHwgMDtcclxuICAgICAgICB0aGlzLl9tYXhBdHRlbXB0cyA9IG9wdGlvbnMuX21heEF0dGVtcHRzIHx8IDEwO1xyXG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IG9wdGlvbnMuX3N0YXR1cyB8fCBUYXNrLnN0YXR1c2VzLklOSVRJQUw7XHJcblxyXG4gICAgICAgIHRoaXMuX3NvbHV0aW9uID0gdHJhY2VyKHRoaXMuX3NvdXJjZSwgdGhpcy5fdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0dXMoc3RhdHVzKSB7XHJcbiAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBtZXNzYWdlKC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyhhcmdzWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlKGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGVtcHQoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IFRhc2suc3RhdHVzZXMuSU5JVElBTCB8fCB0aGlzLnN0YXR1cygpID09IFRhc2suc3RhdHVzZXMuRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGVtcHRzKys7XHJcbiAgICAgICAgICAgIHRoaXMudmVyaWZ5KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdHMgPj0gdGhpcy5fbWF4QXR0ZW1wdHMgJiYgdGhpcy5zdGF0dXMoKSAhPT0gVGFzay5zdGF0dXNlcy5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyhUYXNrLnN0YXR1c2VzLkJMT0NLRUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB2ZXJpZnkoaW5wdXQpIHtcclxuICAgICAgICBsZXQgc29sdXRpb24gPSB0aGlzLl9zb2x1dGlvbi5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgIGlucHV0ID0gKGlucHV0IHx8IHRoaXMuX2lucHV0KS5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgIGlmIChzb2x1dGlvbi5sZW5ndGggPj0gaW5wdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBsaW5lID0gMDtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChpc0VxdWFsKHNvbHV0aW9uW2xpbmVdIHx8ICcnLCBpbnB1dFtsaW5lXSB8fCAnJykgJiYgKHNvbHV0aW9uW2xpbmVdIHx8IGlucHV0W2xpbmVdKSkge1xyXG4gICAgICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGluZSA9PSBzb2x1dGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZShUYXNrLnN0YXR1c2VzLlNVQ0NFU1MsIGDQl9Cw0LTQsNC90LjQtSDRg9GB0L/QtdGI0L3QviDQstGL0L/QvtC70L3QtdC90L4hYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UoVGFzay5zdGF0dXNlcy5FUlJPUiwgYNCd0LXQstC10YDQvdGL0LUg0LfQvdCw0YfQtdC90LjRjyDQsiDRgdGC0YDQvtC60LUgJHtsaW5lICsgMX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZShUYXNrLnN0YXR1c2VzLkVSUk9SLCBg0J3QtdCy0LXRgNC90YvQtSDQt9C90LDRh9C10L3QuNGPINCyINGB0YLRgNC+0LrQtSAke3NvbHV0aW9uLmxlbmd0aH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5UYXNrLnN0YXR1c2VzID0ge1xyXG4gICAgSU5JVElBTDogMCxcclxuICAgIFNVQ0NFU1M6IDEsXHJcbiAgICBFUlJPUjogMixcclxuICAgIEJMT0NLRUQ6IDNcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcclxuXHJcbmNvbnN0IHRhc2tzID0ge1xyXG4gICAgR0NEOiB7XHJcbiAgICAgICAgc291cmNlOiByZXF1aXJlKCcuL3NvdXJjZXMvZ2NkJyksXHJcbiAgICAgICAgZ2VuZXJhdG9yOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvZ2NkJylcclxuICAgIH0sXHJcblxyXG4gICAgSEVYOiB7XHJcbiAgICAgICAgc291cmNlOiByZXF1aXJlKCcuL3NvdXJjZXMvaGV4JyksXHJcbiAgICAgICAgZ2VuZXJhdG9yOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvaGV4JylcclxuICAgIH0sXHJcblxyXG4gICAgU1FVQVJFX0VRVUFMOiB7XHJcbiAgICAgICAgc291cmNlOiByZXF1aXJlKCcuL3NvdXJjZXMvc3F1YXJlX2VxdWFsJyksXHJcbiAgICAgICAgZ2VuZXJhdG9yOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvc3F1YXJlX2VxdWFsJylcclxuICAgIH0sXHJcblxyXG4gICAgUkVNT1ZFX0RJR0lUOiB7XHJcbiAgICAgICAgc291cmNlOiByZXF1aXJlKCcuL3NvdXJjZXMvcmVtb3ZlX2RpZ2l0JyksXHJcbiAgICAgICAgZ2VuZXJhdG9yOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvcmVtb3ZlX2RpZ2l0JylcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlKHRhc2tOYW1lLCAuLi5nZW5BcmdzKSB7XHJcblxyXG4gICAgbGV0IHRhc2sgPSB0YXNrc1t0YXNrTmFtZV07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBUYXNrKHtcclxuICAgICAgICBfc291cmNlOiB0YXNrLnNvdXJjZS5kZWZhdWx0LFxyXG4gICAgICAgIF90YXJnZXQ6IHRhc2suZ2VuZXJhdG9yLmRlZmF1bHQoLi4uZ2VuQXJncylcclxuICAgIH0pO1xyXG59XHJcblxyXG5nbG9iYWwuZ2VuZXJhdGVUYXNrcyA9IGZ1bmN0aW9uIChuYW1lLCBncm91cCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICBnZW5lcmF0ZSgnR0NEJywgdHJ1ZSksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0dDRCcsIGZhbHNlKSxcclxuICAgICAgICBnZW5lcmF0ZSgnSEVYJyksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ1NRVUFSRV9FUVVBTCcsIFsxLCAyXSksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ1NRVUFSRV9FUVVBTCcsIFswLCAxXSksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ1JFTU9WRV9ESUdJVCcpXHJcbiAgICBdO1xyXG59OyIsImltcG9ydCBnY2RTb3VyY2UgZnJvbSAnLi4vc291cmNlcy9nY2QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG5vWmVybykge1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhOiBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwID4+IDAsXHJcbiAgICAgICAgICAgIGI6IE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDAgPj4gMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXJncyA9IGdlbigpLFxyXG4gICAgICAgIHRhcmdldCA9IGBnY2QoJHthcmdzLmF9LCAke2FyZ3MuYn0pYCxcclxuICAgICAgICBzb2x1dGlvbiA9IHRyYWNlcihnY2RTb3VyY2UsIHRhcmdldCkuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgIGlmIChub1plcm8pIHtcclxuICAgICAgICB3aGlsZSAoIShhcmdzLmEgJiYgYXJncy5iKSB8fCBzb2x1dGlvbi5sZW5ndGggPCAyMCB8fCBzb2x1dGlvbi5sZW5ndGggPiAzMCkge1xyXG4gICAgICAgICAgICBhcmdzID0gZ2VuKCk7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IGBnY2QoJHthcmdzLmF9LCAke2FyZ3MuYn0pYDtcclxuICAgICAgICAgICAgc29sdXRpb24gPSB0cmFjZXIoZ2NkU291cmNlLCB0YXJnZXQpLnNwbGl0KCdcXG4nKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdoaWxlIChhcmdzLmEgJiYgYXJncy5iIHx8IChhcmdzLmEgPT09IGFyZ3MuYikpIHtcclxuICAgICAgICAgICAgYXJncyA9IGdlbigpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBgZ2NkKCR7YXJncy5hfSwgJHthcmdzLmJ9KWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgdmFyIG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiA5ODAgKyAyMCA+PiAwO1xyXG4gICAgfSB3aGlsZSAoIS9bYS1mXS8udGVzdChudW1iZXIudG9TdHJpbmcoMTYpKSk7XHJcblxyXG4gICAgcmV0dXJuIGBoZXgoJHtudW1iZXJ9KWA7XHJcbn0iLCJpbXBvcnQgcmVtb3ZlRGlnaXRTb3VyY2UgZnJvbSAnLi4vc291cmNlcy9yZW1vdmVfZGlnaXQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGdlbiA9ICgpID0+ICh7XHJcbiAgICAgICAgYTogTWF0aC5yYW5kb20oKSAqIDEwMDAwMCA+PiAwLFxyXG4gICAgICAgIGI6IE1hdGgucmFuZG9tKCkgKiAxMCA+PiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgaXNWYWxpZCA9IChhcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0IGZpcnN0X2RpZ2l0ID0gYXJncy5hO1xyXG5cclxuICAgICAgICB3aGlsZSAoZmlyc3RfZGlnaXQgPiA5KSB7XHJcbiAgICAgICAgICAgIGZpcnN0X2RpZ2l0ID0gZmlyc3RfZGlnaXQgLyAxMCA+PiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyciA9IFsxLCAxLCAyLCAxLCAzLCAxXSxcclxuICAgICAgICAgICAgZGlmbGVuID0gYXJyW01hdGgucmFuZG9tKCkgKiA2ID4+IDBdLFxyXG4gICAgICAgICAgICByZWdFeHAgPSBuZXcgUmVnRXhwKGFyZ3MuYiwgJ2cnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChhcmdzLmEudG9TdHJpbmcoKS5sZW5ndGggLSBhcmdzLmEudG9TdHJpbmcoKS5yZXBsYWNlKHJlZ0V4cCwgJycpLmxlbmd0aCkgPj0gZGlmbGVuICYmXHJcbiAgICAgICAgICAgIGZpcnN0X2RpZ2l0ICE9PSBhcmdzLmIgJiZcclxuICAgICAgICAgICAgdHJhY2VyKHJlbW92ZURpZ2l0U291cmNlLCBgcmVtb3ZlX2RpZ2l0KCR7YXJncy5hfSwgJHthcmdzLmJ9KWApLnNwbGl0KCdcXG4nKS5sZW5ndGggPCAzNTtcclxuICAgIH07XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBhcmdzID0gZ2VuKCk7XHJcbiAgICB9IHdoaWxlICghaXNWYWxpZChhcmdzKSk7XHJcblxyXG4gICAgcmV0dXJuIGByZW1vdmVfZGlnaXQoJHthcmdzLmF9LCAke2FyZ3MuYn0pYDtcclxufSIsIi8qXHJcbiBkZWYgZ2VuX3NxdWFyZV9lcXVhbChyb290c19jb3VudCk6XHJcbiAgICAgZGVmIGdlbmFyZ3MoKTpcclxuICAgICAgICAgaWYgcmFuZG9tLnJhbmRpbnQoMCwgMTAwKSA8IDEwOlxyXG4gICAgICAgICAgICBhID0gMFxyXG4gICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICBhID0gcmFuZG9tLnJhbmRpbnQoLTEwMCwgMTAwKVxyXG5cclxuICAgICAgICAgYiA9IHJhbmRvbS5yYW5kaW50KC0xMDAsIDEwMClcclxuICAgICAgICAgYyA9IHJhbmRvbS5yYW5kaW50KC0xMDAsIDEwMClcclxuICAgICAgICAgcmV0dXJuIChhLCBiLCBjKVxyXG5cclxuICAgICBkZWYgdmFsaWRhcmdzKGFyZ3MsIHJlc3VsdCwgc3Rkb3V0KTpcclxuICAgICAgICAgKGEsIGIsIGMpID0gYXJnc1xyXG4gICAgICAgICBpZiBhICE9IDA6XHJcbiAgICAgICAgICAgICBEID0gYipiIC0gNCphKmNcclxuICAgICAgICAgICAgIGlmIEQgPiAwOlxyXG4gICAgICAgICAgICAgICAgIHNxcnREID0gaW50X3NxcnQoRClcclxuICAgICAgICAgICAgICAgICByZXR1cm4gKDIgaW4gcm9vdHNfY291bnQgYW5kIHNxcnREXHJcbiAgICAgICAgICAgICAgICAgICAgIGFuZCAxMDAgKiAoLWIgLSBzcXJ0RCkgJSAoMiphKSA9PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgIGFuZCAxMDAgKiAoLWIgKyBzcXJ0RCkgJSAoMiphKSA9PSAwKVxyXG4gICAgICAgICAgICAgZWxpZiBEID09IDA6XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuICgxIGluIHJvb3RzX2NvdW50IGFuZCAxMDAgKiAoLWIpICUgKDIqYSkgPT0gMClcclxuICAgICAgICAgICAgIGVsc2U6XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIDAgaW4gcm9vdHNfY291bnQgYW5kIEQgPiAtMTAwMDBcclxuICAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgIGlmIGIgIT0gMDpcclxuICAgICAgICAgICAgICAgICByZXR1cm4gKDEgaW4gcm9vdHNfY291bnQgYW5kIDEwMCAqICgtYykgJSBiID09IDApXHJcbiAgICAgICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICAgICAgIHJldHVybiAwIGluIHJvb3RzX2NvdW50XHJcbiAgICAgcmV0dXJuICgnZmFsbF9tb2QxX3NxdWFyZV9lcXVhbC5weScsICdzcXVhcmVfZXF1YWwnLCBnZW5hcmdzLCB2YWxpZGFyZ3MpXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHJvb3RzQ291bnQpIHtcclxuICAgIGxldCBnZW4gPSAoKSA9PiAoe1xyXG4gICAgICAgIGE6IChNYXRoLnJhbmRvbSgpICogMTAwIDwgMTApID8gMCA6IChNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwID4+IDApLFxyXG4gICAgICAgIGI6IE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDAgPj4gMCxcclxuICAgICAgICBjOiBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwID4+IDBcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBpc3FydCA9IChuKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgKiBpID09IG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGlzVmFsaWQgPSAoYXJncykgPT4ge1xyXG5cclxuICAgICAgICBsZXQge2EsIGIsIGN9ID0gYXJncywgRCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChhICE9IDApIHtcclxuICAgICAgICAgICAgRCA9IGIqYiAtIDQqYSpjO1xyXG4gICAgICAgICAgICBpZiAoRCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXJ0RCA9IGlzcXJ0KEQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByb290c0NvdW50LmluZGV4T2YoMikgPj0gMCAmJiBzcXJ0RCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICgxMDAgKiAoLWIgLSBzcXJ0RCkgJSAoMiphKSA9PSAwKSAmJiAoMTAwICogKC1iICsgc3FydEQpICUgKDIqYSkgPT0gMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoRCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDEpID49IDAgJiYgKDEwMCAqIC1iICUgKDIqYSkgPT0gMClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb290c0NvdW50LmluZGV4T2YoMCkgPj0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChiICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDEpID49IDAgJiYgKDEwMCAqIC1jICUgYiA9PSAwKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RzQ291bnQuaW5kZXhPZigwKSA+PSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBnZW4oKTtcclxuICAgIH0gd2hpbGUgKGlzVmFsaWQoYXJncykpO1xyXG5cclxuICAgIHJldHVybiBgc3F1YXJlX2VxdWFsKCR7YXJncy5hfSwgJHthcmdzLmJ9LCAke2FyZ3MuY30pYDtcclxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBcImRlZiBnY2QoeCwgeSk6XFxuICAgIGlmIHggPCAwOlxcbiAgICAgICAgeCA9IC14XFxuICAgIGlmIHkgPCAwOlxcbiAgICAgICAgeSA9IC15XFxuICAgIHdoaWxlIHkgIT0gMDpcXG4gICAgICAgIHJlbSA9IHggJSB5XFxuICAgICAgICB4ID0geVxcbiAgICAgICAgeSA9IHJlbVxcbiAgICByZXR1cm4geFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUpuWTJRdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFwiZGVmIGhleChudW1iZXIpOlxcbiAgICBpZiBudW1iZXIgPT0gMDpcXG4gICAgICAgIHJldHVybiAnMCdcXG4gICAgcmVzID0gJydcXG4gICAgd2hpbGUgbnVtYmVyID4gMDpcXG4gICAgICAgIGRpZ2l0ID0gbnVtYmVyICUgMTZcXG4gICAgICAgIGlmIGRpZ2l0IDw9IDk6XFxuICAgICAgICAgICAgZGlnaXQgPSBzdHIoZGlnaXQpXFxuICAgICAgICBlbGlmIGRpZ2l0IDw9IDEzOlxcbiAgICAgICAgICAgIGlmIGRpZ2l0IDw9IDExOlxcbiAgICAgICAgICAgICAgICBpZiBkaWdpdCA9PSAxMDpcXG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0ID0gJ0EnXFxuICAgICAgICAgICAgICAgIGVsc2U6XFxuICAgICAgICAgICAgICAgICAgICBkaWdpdCA9ICdCJ1xcbiAgICAgICAgICAgIGVsaWYgZGlnaXQgPT0gMTI6XFxuICAgICAgICAgICAgICAgIGRpZ2l0ID0gJ0MnXFxuICAgICAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICAgICAgZGlnaXQgPSAnRCdcXG4gICAgICAgIGVsaWYgZGlnaXQgPT0gMTQ6XFxuICAgICAgICAgICAgZGlnaXQgPSAnRSdcXG4gICAgICAgIGVsc2U6XFxuICAgICAgICAgICAgZGlnaXQgPSAnRidcXG4gICAgICAgIHJlcyA9IGRpZ2l0ICsgcmVzXFxuICAgICAgICBudW1iZXIgPSBudW1iZXIgLy8gMTZcXG4gICAgcmV0dXJuIHJlc1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUpvWlhndWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFwiZGVmIHJlbW92ZV9kaWdpdChudW1iZXIsIGRpZ2l0KTpcXG4gICAgcmVzID0gMFxcbiAgICBwb3dlciA9IDFcXG4gICAgd2hpbGUgbnVtYmVyID4gMDpcXG4gICAgICAgIGN1cl9kaWdpdCA9IG51bWJlciAlIDEwXFxuICAgICAgICBpZiBjdXJfZGlnaXQgIT0gZGlnaXQ6XFxuICAgICAgICAgICAgcmVzID0gcmVzICsgY3VyX2RpZ2l0ICogcG93ZXJcXG4gICAgICAgICAgICBwb3dlciA9IHBvd2VyICogMTBcXG4gICAgICAgIG51bWJlciA9IG51bWJlciAvLyAxMFxcbiAgICByZXR1cm4gcmVzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSnlaVzF2ZG1WZlpHbG5hWFF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgc3F1YXJlX2VxdWFsKGEsIGIsIGMpOlxcbiAgICBpZiBhICE9IDA6XFxuICAgICAgICBEID0gYipiIC0gNCphKmNcXG4gICAgICAgIGlmIEQgPiAwOlxcbiAgICAgICAgICAgIHgxID0gKC1iIC0gc3FydChEKSkgLyAoMiphKVxcbiAgICAgICAgICAgIHgyID0gKC1iICsgc3FydChEKSkgLyAoMiphKVxcbiAgICAgICAgICAgIHJldHVybiBzdHIoeDEpICsgJyBhbmQgJyArIHN0cih4MilcXG4gICAgICAgIGVsaWYgRCA9PSAwOlxcbiAgICAgICAgICAgIHJldHVybiBzdHIoLWIgLyAoMiphKSlcXG4gICAgICAgIGVsc2U6XFxuICAgICAgICAgICAgcmV0dXJuICdubyByb290cydcXG4gICAgZWxzZTpcXG4gICAgICAgIGlmIGIgIT0gMDpcXG4gICAgICAgICAgICByZXR1cm4gc3RyKC1jIC8gYilcXG4gICAgICAgIGVsc2U6XFxuICAgICAgICAgICAgcmV0dXJuICdubyByb290cydcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKemNYVmhjbVZmWlhGMVlXd3Vhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2VzExOSJdfQ==
