(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isEqual(line1, line2) {
    var regExp = /\s+/g;

    line1 = line1.replace(regExp, '').replace(/"/g, '\'');
    line2 = line2.replace(regExp, '').replace(/"/g, '\'');

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

            input = (input || this._input).trim().split('\n');

            var line = 0;

            while (isEqual(solution[line] || '', input[line] || '') && (solution[line] || input[line])) {
                line++;
            }

            if (line == solution.length) {
                this.message(Task.statuses.SUCCESS, '\u0417\u0430\u0434\u0430\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E!');
            } else {
                this.message(Task.statuses.ERROR, '\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0432 \u0441\u0442\u0440\u043E\u043A\u0435 ' + Math.min(line + 1, solution.length));
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
    },

    FACTORIZE: {
        source: require('./sources/factorize'),
        generator: require('./generators/factorize')
    },

    JOIN: {
        source: require('./sources/join'),
        generator: require('./generators/join')
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
    return [generate('GCD', true), generate('GCD', false), generate('HEX'), generate('SQUARE_EQUAL', [1, 2]), generate('SQUARE_EQUAL', [0, 1]), generate('REMOVE_DIGIT'), generate('FACTORIZE'), generate('JOIN')];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Task":1,"./generators/factorize":3,"./generators/gcd":4,"./generators/hex":5,"./generators/join":6,"./generators/remove_digit":7,"./generators/square_equal":8,"./sources/factorize":9,"./sources/gcd":10,"./sources/hex":11,"./sources/join":12,"./sources/remove_digit":13,"./sources/square_equal":14}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    var gen = function gen() {
        return Math.random() * 2000 >> 0;
    };

    do {
        var arg = gen(),
            target = 'factorize(' + arg + ')';
    } while (tracer(_factorize2.default, target).split('\n').length >= 35);

    return target;
};

var _factorize = require('../sources/factorize');

var _factorize2 = _interopRequireDefault(_factorize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../sources/factorize":9}],4:[function(require,module,exports){
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

    function gcd(args) {
        if (!args.b) {
            return Math.abs(args.a);
        }

        return gcd({ a: Math.abs(args.b), b: Math.abs(args.a) % Math.abs(args.b) });
    }

    var args = void 0,
        target = void 0,
        solution = void 0,
        res = void 0;

    if (noZero) {
        do {
            args = gen();
            target = 'gcd(' + args.a + ', ' + args.b + ')';
            res = gcd(args);
            solution = tracer(_gcd2.default, target).split('\n');
        } while (!(args.a && args.b) || res === 1 || solution.length < 20 || solution.length > 30);
    } else {
        do {
            args = gen();
            res = gcd(args);
            target = 'gcd(' + args.a + ', ' + args.b + ')';
        } while (args.a && args.b || args.a === args.b || res === 1);
    }

    return target;
};

var _gcd = require('../sources/gcd');

var _gcd2 = _interopRequireDefault(_gcd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../sources/gcd":10}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    var arr = new Array((Math.random() * 3 >> 0) + 5).fill(0).map(function () {
        return Math.random() * 100 >> 0;
    }),
        splitter = ['-', ':', ',', '|', '#'][Math.random() * 5 >> 0];

    return 'join("' + splitter + '", [' + arr.join(', ') + '])';
};

},{}],7:[function(require,module,exports){
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

},{"../sources/remove_digit":13}],8:[function(require,module,exports){
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
    } while (!isValid(args));

    return "square_equal(" + args.a + ", " + args.b + ", " + args.c + ")";
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def factorize(n):\n    res = ''\n    while n > 2 and n % 2 == 0:\n        res = res + '2*'\n        n = n // 2\n    d = 3\n    while n > d:\n        if n % d == 0:\n            res = res + str(d) + '*'\n            n = n // d\n        else:\n            d = d + 2\n    return res + str(n)";

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def gcd(x, y):\n    if x < 0:\n        x = -x\n    if y < 0:\n        y = -y\n    while y != 0:\n        rem = x % y\n        x = y\n        y = rem\n    return x";

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def hex(number):\n    if number == 0:\n        return '0'\n    res = ''\n    while number > 0:\n        digit = number % 16\n        if digit <= 9:\n            digit = str(digit)\n        elif digit <= 13:\n            if digit <= 11:\n                if digit == 10:\n                    digit = 'A'\n                else:\n                    digit = 'B'\n            elif digit == 12:\n                digit = 'C'\n            else:\n                digit = 'D'\n        elif digit == 14:\n            digit = 'E'\n        else:\n            digit = 'F'\n        res = digit + res\n        number = number // 16\n    return res";

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def join(sep, items):\n    res = ''\n    if len(items) > 0:\n        res = str(items[0])\n        items = items[1:]\n        while len(items) > 0:\n            res = res + sep + str(items[0])\n            items = items[1:]\n    return res";

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def remove_digit(number, digit):\n    res = 0\n    power = 1\n    while number > 0:\n        cur_digit = number % 10\n        if cur_digit != digit:\n            res = res + cur_digit * power\n            power = power * 10\n        number = number // 10\n    return res";

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "def square_equal(a, b, c):\n    if a != 0:\n        D = b*b - 4*a*c\n        if D > 0:\n            x1 = (-b - sqrt(D)) / (2*a)\n            x2 = (-b + sqrt(D)) / (2*a)\n            return str(x1) + ' and ' + str(x2)\n        elif D == 0:\n            return str(-b / (2*a))\n        else:\n            return 'no roots'\n    else:\n        if b != 0:\n            return str(-c / b)\n        else:\n            return 'no roots'";

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHVpXFx0YXNrc1xcVGFzay5qcyIsInNyY1xcdWlcXHRhc2tzXFxzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yLmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXGZhY3Rvcml6ZS5qcyIsInNyY1xcdWlcXHRhc2tzXFxnZW5lcmF0b3JzXFxnY2QuanMiLCJzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yc1xcaGV4LmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXGpvaW4uanMiLCJzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yc1xccmVtb3ZlX2RpZ2l0LmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXHNxdWFyZV9lcXVhbC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2ZhY3Rvcml6ZS5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2djZC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2hleC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2pvaW4uanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9yZW1vdmVfZGlnaXQuanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9zcXVhcmVfZXF1YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUEsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEtBQXhCLEVBQStCO0FBQzNCLFFBQUksU0FBUyxNQUFiOztBQUVBLFlBQVEsTUFBTSxPQUFOLENBQWMsTUFBZCxFQUFzQixFQUF0QixFQUEwQixPQUExQixDQUFrQyxJQUFsQyxPQUFSO0FBQ0EsWUFBUSxNQUFNLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLEVBQTBCLE9BQTFCLENBQWtDLElBQWxDLE9BQVI7O0FBRUEsV0FBTyxVQUFVLEtBQWpCO0FBQ0g7O0lBRUssSTtBQUVGLG9CQUEwQjtBQUFBLFlBQWQsT0FBYyx1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LENBRDVCLElBQ21DLE9BQU8sQ0FBQyxDQUFELEdBQUssS0FBWixLQUFzQixJQUFFLENBQXhCLEtBQThCLENBRHhFO0FBRUgsYUFMRCxNQUtPLElBQUksS0FBSyxDQUFULEVBQVk7QUFDZix1QkFBTyxXQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsS0FBeUIsQ0FBekIsSUFBK0IsTUFBTSxDQUFDLENBQVAsSUFBWSxJQUFFLENBQWQsS0FBb0IsQ0FBMUQ7QUFDSCxhQUZNLE1BRUE7QUFDSCx1QkFBTyxXQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsS0FBeUIsQ0FBaEM7QUFDSDtBQUNKLFNBWkQsTUFZTztBQUNILGdCQUFJLE1BQU0sQ0FBVixFQUFhO0FBQ1QsdUJBQU8sV0FBVyxPQUFYLENBQW1CLENBQW5CLEtBQXlCLENBQXpCLElBQStCLE1BQU0sQ0FBQyxDQUFQLEdBQVcsQ0FBWCxJQUFnQixDQUF0RDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLFdBQVcsT0FBWCxDQUFtQixDQUFuQixLQUF5QixDQUFoQztBQUNIO0FBQ0o7QUFDSixLQXZCRDs7QUF5QkEsT0FBRztBQUNDLFlBQUksT0FBTyxLQUFYO0FBQ0gsS0FGRCxRQUVTLENBQUMsUUFBUSxJQUFSLENBRlY7O0FBSUEsNkJBQXVCLEtBQUssQ0FBNUIsVUFBa0MsS0FBSyxDQUF2QyxVQUE2QyxLQUFLLENBQWxEO0FBQ0gsQzs7O0FDaEZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGlzRXF1YWwobGluZTEsIGxpbmUyKSB7XHJcbiAgICBsZXQgcmVnRXhwID0gL1xccysvZztcclxuXHJcbiAgICBsaW5lMSA9IGxpbmUxLnJlcGxhY2UocmVnRXhwLCAnJykucmVwbGFjZSgvXCIvZywgYCdgKTtcclxuICAgIGxpbmUyID0gbGluZTIucmVwbGFjZShyZWdFeHAsICcnKS5yZXBsYWNlKC9cIi9nLCBgJ2ApO1xyXG5cclxuICAgIHJldHVybiBsaW5lMSA9PT0gbGluZTI7XHJcbn1cclxuXHJcbmNsYXNzIFRhc2sge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG9wdGlvbnMuX3NvdXJjZTtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSBvcHRpb25zLl90YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5faW5wdXQgPSBvcHRpb25zLl9pbnB1dCB8fCAnJztcclxuICAgICAgICB0aGlzLl9tZXNzYWdlID0gb3B0aW9ucy5fbWVzc2FnZSB8fCcnO1xyXG4gICAgICAgIHRoaXMuX2F0dGVtcHRzID0gb3B0aW9ucy5fYXR0ZW1wdHMgfHwgMDtcclxuICAgICAgICB0aGlzLl9tYXhBdHRlbXB0cyA9IG9wdGlvbnMuX21heEF0dGVtcHRzIHx8IDEwO1xyXG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IG9wdGlvbnMuX3N0YXR1cyB8fCBUYXNrLnN0YXR1c2VzLklOSVRJQUw7XHJcblxyXG4gICAgICAgIHRoaXMuX3NvbHV0aW9uID0gdHJhY2VyKHRoaXMuX3NvdXJjZSwgdGhpcy5fdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0dXMoc3RhdHVzKSB7XHJcbiAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBtZXNzYWdlKC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyhhcmdzWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlKGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGVtcHQoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IFRhc2suc3RhdHVzZXMuSU5JVElBTCB8fCB0aGlzLnN0YXR1cygpID09IFRhc2suc3RhdHVzZXMuRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGVtcHRzKys7XHJcbiAgICAgICAgICAgIHRoaXMudmVyaWZ5KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdHMgPj0gdGhpcy5fbWF4QXR0ZW1wdHMgJiYgdGhpcy5zdGF0dXMoKSAhPT0gVGFzay5zdGF0dXNlcy5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyhUYXNrLnN0YXR1c2VzLkJMT0NLRUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB2ZXJpZnkoaW5wdXQpIHtcclxuICAgICAgICBsZXQgc29sdXRpb24gPSB0aGlzLl9zb2x1dGlvbi5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgIGlucHV0ID0gKGlucHV0IHx8IHRoaXMuX2lucHV0KS50cmltKCkuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBkZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgbGV0IGxpbmUgPSAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoaXNFcXVhbChzb2x1dGlvbltsaW5lXSB8fCAnJywgaW5wdXRbbGluZV0gfHwgJycpICYmIChzb2x1dGlvbltsaW5lXSB8fCBpbnB1dFtsaW5lXSkpIHtcclxuICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpbmUgPT0gc29sdXRpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZShUYXNrLnN0YXR1c2VzLlNVQ0NFU1MsIGDQl9Cw0LTQsNC90LjQtSDRg9GB0L/QtdGI0L3QviDQstGL0L/QvtC70L3QtdC90L4hYCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlKFRhc2suc3RhdHVzZXMuRVJST1IsIGDQndC10LLQtdGA0L3Ri9C1INC30L3QsNGH0LXQvdC40Y8g0LIg0YHRgtGA0L7QutC1ICR7TWF0aC5taW4obGluZSArIDEsIHNvbHV0aW9uLmxlbmd0aCl9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuVGFzay5zdGF0dXNlcyA9IHtcclxuICAgIElOSVRJQUw6IDAsXHJcbiAgICBTVUNDRVNTOiAxLFxyXG4gICAgRVJST1I6IDIsXHJcbiAgICBCTE9DS0VEOiAzXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcblxyXG5jb25zdCB0YXNrcyA9IHtcclxuICAgIEdDRDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2djZCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2djZCcpXHJcbiAgICB9LFxyXG5cclxuICAgIEhFWDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2hleCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2hleCcpXHJcbiAgICB9LFxyXG5cclxuICAgIFNRVUFSRV9FUVVBTDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL3NxdWFyZV9lcXVhbCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL3NxdWFyZV9lcXVhbCcpXHJcbiAgICB9LFxyXG5cclxuICAgIFJFTU9WRV9ESUdJVDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL3JlbW92ZV9kaWdpdCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL3JlbW92ZV9kaWdpdCcpXHJcbiAgICB9LFxyXG5cclxuICAgIEZBQ1RPUklaRToge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2ZhY3Rvcml6ZScpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2ZhY3Rvcml6ZScpXHJcbiAgICB9LFxyXG5cclxuICAgIEpPSU46IHtcclxuICAgICAgICBzb3VyY2U6IHJlcXVpcmUoJy4vc291cmNlcy9qb2luJyksXHJcbiAgICAgICAgZ2VuZXJhdG9yOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvam9pbicpXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZSh0YXNrTmFtZSwgLi4uZ2VuQXJncykge1xyXG5cclxuICAgIGxldCB0YXNrID0gdGFza3NbdGFza05hbWVdO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGFzayh7XHJcbiAgICAgICAgX3NvdXJjZTogdGFzay5zb3VyY2UuZGVmYXVsdCxcclxuICAgICAgICBfdGFyZ2V0OiB0YXNrLmdlbmVyYXRvci5kZWZhdWx0KC4uLmdlbkFyZ3MpXHJcbiAgICB9KTtcclxufVxyXG5cclxuZ2xvYmFsLmdlbmVyYXRlVGFza3MgPSBmdW5jdGlvbiAobmFtZSwgZ3JvdXApIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0dDRCcsIHRydWUpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdHQ0QnLCBmYWxzZSksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0hFWCcpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdTUVVBUkVfRVFVQUwnLCBbMSwgMl0pLFxyXG4gICAgICAgIGdlbmVyYXRlKCdTUVVBUkVfRVFVQUwnLCBbMCwgMV0pLFxyXG4gICAgICAgIGdlbmVyYXRlKCdSRU1PVkVfRElHSVQnKSxcclxuICAgICAgICBnZW5lcmF0ZSgnRkFDVE9SSVpFJyksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0pPSU4nKVxyXG4gICAgXTtcclxufTsiLCJpbXBvcnQgZmFjdG9yaXplU291cmNlIGZyb20gJy4uL3NvdXJjZXMvZmFjdG9yaXplJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBsZXQgZ2VuID0gKCkgPT4gKE1hdGgucmFuZG9tKCkgKiAyMDAwID4+IDApO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICB2YXIgYXJnID0gZ2VuKCksXHJcbiAgICAgICAgICAgIHRhcmdldCA9IGBmYWN0b3JpemUoJHthcmd9KWA7XHJcbiAgICB9IHdoaWxlICh0cmFjZXIoZmFjdG9yaXplU291cmNlLCB0YXJnZXQpLnNwbGl0KCdcXG4nKS5sZW5ndGggPj0gMzUpO1xyXG5cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0iLCJpbXBvcnQgZ2NkU291cmNlIGZyb20gJy4uL3NvdXJjZXMvZ2NkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChub1plcm8pIHtcclxuXHJcbiAgICBmdW5jdGlvbiBnZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYTogTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMCA+PiAwLFxyXG4gICAgICAgICAgICBiOiBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwID4+IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2NkKGFyZ3MpIHtcclxuICAgICAgICBpZiAoIWFyZ3MuYikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMoYXJncy5hKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBnY2Qoe2E6IE1hdGguYWJzKGFyZ3MuYiksIGI6IE1hdGguYWJzKGFyZ3MuYSkgJSBNYXRoLmFicyhhcmdzLmIpfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFyZ3MsIHRhcmdldCwgc29sdXRpb24sIHJlcztcclxuXHJcbiAgICBpZiAobm9aZXJvKSB7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBhcmdzID0gZ2VuKCk7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IGBnY2QoJHthcmdzLmF9LCAke2FyZ3MuYn0pYDtcclxuICAgICAgICAgICAgcmVzID0gZ2NkKGFyZ3MpO1xyXG4gICAgICAgICAgICBzb2x1dGlvbiA9IHRyYWNlcihnY2RTb3VyY2UsIHRhcmdldCkuc3BsaXQoJ1xcbicpO1xyXG4gICAgICAgIH0gd2hpbGUgKCEoYXJncy5hICYmIGFyZ3MuYikgfHwgcmVzID09PSAxIHx8IHNvbHV0aW9uLmxlbmd0aCA8IDIwIHx8IHNvbHV0aW9uLmxlbmd0aCA+IDMwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBhcmdzID0gZ2VuKCk7XHJcbiAgICAgICAgICAgIHJlcyA9IGdjZChhcmdzKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gYGdjZCgke2FyZ3MuYX0sICR7YXJncy5ifSlgO1xyXG4gICAgICAgIH0gd2hpbGUgKGFyZ3MuYSAmJiBhcmdzLmIgfHwgYXJncy5hID09PSBhcmdzLmIgfHwgcmVzID09PSAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogOTgwICsgMjAgPj4gMDtcclxuICAgIH0gd2hpbGUgKCEvW2EtZl0vLnRlc3QobnVtYmVyLnRvU3RyaW5nKDE2KSkpO1xyXG5cclxuICAgIHJldHVybiBgaGV4KCR7bnVtYmVyfSlgO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGxldCBhcnIgPSBuZXcgQXJyYXkoKE1hdGgucmFuZG9tKCkgKiAzID4+IDApICsgNSkuZmlsbCgwKS5tYXAoKCkgPT4gTWF0aC5yYW5kb20oKSAqIDEwMCA+PiAwKSxcclxuICAgICAgICBzcGxpdHRlciA9IFsnLScsICc6JywgJywnLCAnfCcsICcjJ11bTWF0aC5yYW5kb20oKSAqIDUgPj4gMF07XHJcblxyXG4gICAgcmV0dXJuIGBqb2luKFwiJHtzcGxpdHRlcn1cIiwgWyR7YXJyLmpvaW4oJywgJyl9XSlgXHJcbn0iLCJpbXBvcnQgcmVtb3ZlRGlnaXRTb3VyY2UgZnJvbSAnLi4vc291cmNlcy9yZW1vdmVfZGlnaXQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGdlbiA9ICgpID0+ICh7XHJcbiAgICAgICAgYTogTWF0aC5yYW5kb20oKSAqIDEwMDAwMCA+PiAwLFxyXG4gICAgICAgIGI6IE1hdGgucmFuZG9tKCkgKiAxMCA+PiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgaXNWYWxpZCA9IChhcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0IGZpcnN0X2RpZ2l0ID0gYXJncy5hO1xyXG5cclxuICAgICAgICB3aGlsZSAoZmlyc3RfZGlnaXQgPiA5KSB7XHJcbiAgICAgICAgICAgIGZpcnN0X2RpZ2l0ID0gZmlyc3RfZGlnaXQgLyAxMCA+PiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyciA9IFsxLCAxLCAyLCAxLCAzLCAxXSxcclxuICAgICAgICAgICAgZGlmbGVuID0gYXJyW01hdGgucmFuZG9tKCkgKiA2ID4+IDBdLFxyXG4gICAgICAgICAgICByZWdFeHAgPSBuZXcgUmVnRXhwKGFyZ3MuYiwgJ2cnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChhcmdzLmEudG9TdHJpbmcoKS5sZW5ndGggLSBhcmdzLmEudG9TdHJpbmcoKS5yZXBsYWNlKHJlZ0V4cCwgJycpLmxlbmd0aCkgPj0gZGlmbGVuICYmXHJcbiAgICAgICAgICAgIGZpcnN0X2RpZ2l0ICE9PSBhcmdzLmIgJiZcclxuICAgICAgICAgICAgdHJhY2VyKHJlbW92ZURpZ2l0U291cmNlLCBgcmVtb3ZlX2RpZ2l0KCR7YXJncy5hfSwgJHthcmdzLmJ9KWApLnNwbGl0KCdcXG4nKS5sZW5ndGggPCAzNTtcclxuICAgIH07XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBhcmdzID0gZ2VuKCk7XHJcbiAgICB9IHdoaWxlICghaXNWYWxpZChhcmdzKSk7XHJcblxyXG4gICAgcmV0dXJuIGByZW1vdmVfZGlnaXQoJHthcmdzLmF9LCAke2FyZ3MuYn0pYDtcclxufSIsIi8qXHJcbiBkZWYgZ2VuX3NxdWFyZV9lcXVhbChyb290c19jb3VudCk6XHJcbiAgICAgZGVmIGdlbmFyZ3MoKTpcclxuICAgICAgICAgaWYgcmFuZG9tLnJhbmRpbnQoMCwgMTAwKSA8IDEwOlxyXG4gICAgICAgICAgICBhID0gMFxyXG4gICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICBhID0gcmFuZG9tLnJhbmRpbnQoLTEwMCwgMTAwKVxyXG5cclxuICAgICAgICAgYiA9IHJhbmRvbS5yYW5kaW50KC0xMDAsIDEwMClcclxuICAgICAgICAgYyA9IHJhbmRvbS5yYW5kaW50KC0xMDAsIDEwMClcclxuICAgICAgICAgcmV0dXJuIChhLCBiLCBjKVxyXG5cclxuICAgICBkZWYgdmFsaWRhcmdzKGFyZ3MsIHJlc3VsdCwgc3Rkb3V0KTpcclxuICAgICAgICAgKGEsIGIsIGMpID0gYXJnc1xyXG4gICAgICAgICBpZiBhICE9IDA6XHJcbiAgICAgICAgICAgICBEID0gYipiIC0gNCphKmNcclxuICAgICAgICAgICAgIGlmIEQgPiAwOlxyXG4gICAgICAgICAgICAgICAgIHNxcnREID0gaW50X3NxcnQoRClcclxuICAgICAgICAgICAgICAgICByZXR1cm4gKDIgaW4gcm9vdHNfY291bnQgYW5kIHNxcnREXHJcbiAgICAgICAgICAgICAgICAgICAgIGFuZCAxMDAgKiAoLWIgLSBzcXJ0RCkgJSAoMiphKSA9PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgIGFuZCAxMDAgKiAoLWIgKyBzcXJ0RCkgJSAoMiphKSA9PSAwKVxyXG4gICAgICAgICAgICAgZWxpZiBEID09IDA6XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuICgxIGluIHJvb3RzX2NvdW50IGFuZCAxMDAgKiAoLWIpICUgKDIqYSkgPT0gMClcclxuICAgICAgICAgICAgIGVsc2U6XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIDAgaW4gcm9vdHNfY291bnQgYW5kIEQgPiAtMTAwMDBcclxuICAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgIGlmIGIgIT0gMDpcclxuICAgICAgICAgICAgICAgICByZXR1cm4gKDEgaW4gcm9vdHNfY291bnQgYW5kIDEwMCAqICgtYykgJSBiID09IDApXHJcbiAgICAgICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICAgICAgIHJldHVybiAwIGluIHJvb3RzX2NvdW50XHJcbiAgICAgcmV0dXJuICgnZmFsbF9tb2QxX3NxdWFyZV9lcXVhbC5weScsICdzcXVhcmVfZXF1YWwnLCBnZW5hcmdzLCB2YWxpZGFyZ3MpXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHJvb3RzQ291bnQpIHtcclxuICAgIGxldCBnZW4gPSAoKSA9PiAoe1xyXG4gICAgICAgIGE6IChNYXRoLnJhbmRvbSgpICogMTAwIDwgMTApID8gMCA6ICgoTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMCkgPj4gMCksXHJcbiAgICAgICAgYjogKE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDApID4+IDAsXHJcbiAgICAgICAgYzogKE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDApID4+IDBcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBpc3FydCA9IChuKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgKiBpID09IG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGlzVmFsaWQgPSAoYXJncykgPT4ge1xyXG5cclxuICAgICAgICBsZXQge2EsIGIsIGN9ID0gYXJncywgRCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChhICE9IDApIHtcclxuICAgICAgICAgICAgRCA9IGIqYiAtIDQqYSpjO1xyXG4gICAgICAgICAgICBpZiAoRCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXJ0RCA9IGlzcXJ0KEQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByb290c0NvdW50LmluZGV4T2YoMikgPj0gMCAmJiBzcXJ0RCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICgxMDAgKiAoLWIgLSBzcXJ0RCkgJSAoMiphKSA9PSAwKSAmJiAoMTAwICogKC1iICsgc3FydEQpICUgKDIqYSkgPT0gMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoRCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDEpID49IDAgJiYgKDEwMCAqIC1iICUgKDIqYSkgPT0gMClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb290c0NvdW50LmluZGV4T2YoMCkgPj0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChiICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDEpID49IDAgJiYgKDEwMCAqIC1jICUgYiA9PSAwKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RzQ291bnQuaW5kZXhPZigwKSA+PSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBnZW4oKTtcclxuICAgIH0gd2hpbGUgKCFpc1ZhbGlkKGFyZ3MpKTtcclxuXHJcbiAgICByZXR1cm4gYHNxdWFyZV9lcXVhbCgke2FyZ3MuYX0sICR7YXJncy5ifSwgJHthcmdzLmN9KWA7XHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgZmFjdG9yaXplKG4pOlxcbiAgICByZXMgPSAnJ1xcbiAgICB3aGlsZSBuID4gMiBhbmQgbiAlIDIgPT0gMDpcXG4gICAgICAgIHJlcyA9IHJlcyArICcyKidcXG4gICAgICAgIG4gPSBuIC8vIDJcXG4gICAgZCA9IDNcXG4gICAgd2hpbGUgbiA+IGQ6XFxuICAgICAgICBpZiBuICUgZCA9PSAwOlxcbiAgICAgICAgICAgIHJlcyA9IHJlcyArIHN0cihkKSArICcqJ1xcbiAgICAgICAgICAgIG4gPSBuIC8vIGRcXG4gICAgICAgIGVsc2U6XFxuICAgICAgICAgICAgZCA9IGQgKyAyXFxuICAgIHJldHVybiByZXMgKyBzdHIobilcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKbVlXTjBiM0pwZW1VdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFwiZGVmIGdjZCh4LCB5KTpcXG4gICAgaWYgeCA8IDA6XFxuICAgICAgICB4ID0gLXhcXG4gICAgaWYgeSA8IDA6XFxuICAgICAgICB5ID0gLXlcXG4gICAgd2hpbGUgeSAhPSAwOlxcbiAgICAgICAgcmVtID0geCAlIHlcXG4gICAgICAgIHggPSB5XFxuICAgICAgICB5ID0gcmVtXFxuICAgIHJldHVybiB4XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm5ZMlF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgaGV4KG51bWJlcik6XFxuICAgIGlmIG51bWJlciA9PSAwOlxcbiAgICAgICAgcmV0dXJuICcwJ1xcbiAgICByZXMgPSAnJ1xcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgZGlnaXQgPSBudW1iZXIgJSAxNlxcbiAgICAgICAgaWYgZGlnaXQgPD0gOTpcXG4gICAgICAgICAgICBkaWdpdCA9IHN0cihkaWdpdClcXG4gICAgICAgIGVsaWYgZGlnaXQgPD0gMTM6XFxuICAgICAgICAgICAgaWYgZGlnaXQgPD0gMTE6XFxuICAgICAgICAgICAgICAgIGlmIGRpZ2l0ID09IDEwOlxcbiAgICAgICAgICAgICAgICAgICAgZGlnaXQgPSAnQSdcXG4gICAgICAgICAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0ID0gJ0InXFxuICAgICAgICAgICAgZWxpZiBkaWdpdCA9PSAxMjpcXG4gICAgICAgICAgICAgICAgZGlnaXQgPSAnQydcXG4gICAgICAgICAgICBlbHNlOlxcbiAgICAgICAgICAgICAgICBkaWdpdCA9ICdEJ1xcbiAgICAgICAgZWxpZiBkaWdpdCA9PSAxNDpcXG4gICAgICAgICAgICBkaWdpdCA9ICdFJ1xcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICBkaWdpdCA9ICdGJ1xcbiAgICAgICAgcmVzID0gZGlnaXQgKyByZXNcXG4gICAgICAgIG51bWJlciA9IG51bWJlciAvLyAxNlxcbiAgICByZXR1cm4gcmVzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm9aWGd1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgam9pbihzZXAsIGl0ZW1zKTpcXG4gICAgcmVzID0gJydcXG4gICAgaWYgbGVuKGl0ZW1zKSA+IDA6XFxuICAgICAgICByZXMgPSBzdHIoaXRlbXNbMF0pXFxuICAgICAgICBpdGVtcyA9IGl0ZW1zWzE6XVxcbiAgICAgICAgd2hpbGUgbGVuKGl0ZW1zKSA+IDA6XFxuICAgICAgICAgICAgcmVzID0gcmVzICsgc2VwICsgc3RyKGl0ZW1zWzBdKVxcbiAgICAgICAgICAgIGl0ZW1zID0gaXRlbXNbMTpdXFxuICAgIHJldHVybiByZXNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKcWIybHVMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZGZRPT0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgcmVtb3ZlX2RpZ2l0KG51bWJlciwgZGlnaXQpOlxcbiAgICByZXMgPSAwXFxuICAgIHBvd2VyID0gMVxcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgY3VyX2RpZ2l0ID0gbnVtYmVyICUgMTBcXG4gICAgICAgIGlmIGN1cl9kaWdpdCAhPSBkaWdpdDpcXG4gICAgICAgICAgICByZXMgPSByZXMgKyBjdXJfZGlnaXQgKiBwb3dlclxcbiAgICAgICAgICAgIHBvd2VyID0gcG93ZXIgKiAxMFxcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyIC8vIDEwXFxuICAgIHJldHVybiByZXNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKeVpXMXZkbVZmWkdsbmFYUXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2VzExOSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBcImRlZiBzcXVhcmVfZXF1YWwoYSwgYiwgYyk6XFxuICAgIGlmIGEgIT0gMDpcXG4gICAgICAgIEQgPSBiKmIgLSA0KmEqY1xcbiAgICAgICAgaWYgRCA+IDA6XFxuICAgICAgICAgICAgeDEgPSAoLWIgLSBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgeDIgPSAoLWIgKyBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgcmV0dXJuIHN0cih4MSkgKyAnIGFuZCAnICsgc3RyKHgyKVxcbiAgICAgICAgZWxpZiBEID09IDA6XFxuICAgICAgICAgICAgcmV0dXJuIHN0cigtYiAvICgyKmEpKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1xcbiAgICBlbHNlOlxcbiAgICAgICAgaWYgYiAhPSAwOlxcbiAgICAgICAgICAgIHJldHVybiBzdHIoLWMgLyBiKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUp6Y1hWaGNtVmZaWEYxWVd3dWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5Il19
