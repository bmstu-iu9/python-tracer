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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHVpXFx0YXNrc1xcVGFzay5qcyIsInNyY1xcdWlcXHRhc2tzXFxzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yLmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXGZhY3Rvcml6ZS5qcyIsInNyY1xcdWlcXHRhc2tzXFxnZW5lcmF0b3JzXFxnY2QuanMiLCJzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yc1xcaGV4LmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXGpvaW4uanMiLCJzcmNcXHVpXFx0YXNrc1xcZ2VuZXJhdG9yc1xccmVtb3ZlX2RpZ2l0LmpzIiwic3JjXFx1aVxcdGFza3NcXGdlbmVyYXRvcnNcXHNxdWFyZV9lcXVhbC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2ZhY3Rvcml6ZS5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2djZC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2hleC5qcyIsInNyYy91aS90YXNrcy9zb3VyY2VzL2pvaW4uanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9yZW1vdmVfZGlnaXQuanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9zcXVhcmVfZXF1YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUEsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEtBQXhCLEVBQStCO0FBQzNCLFFBQUksU0FBUyxNQUFiOztBQUVBLFlBQVEsTUFBTSxPQUFOLENBQWMsTUFBZCxFQUFzQixFQUF0QixFQUEwQixPQUExQixDQUFrQyxJQUFsQyxPQUFSO0FBQ0EsWUFBUSxNQUFNLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLEVBQTBCLE9BQTFCLENBQWtDLElBQWxDLE9BQVI7O0FBRUEsV0FBTyxVQUFVLEtBQWpCO0FBQ0g7O0lBRUssSTtBQUVGLG9CQUEwQjtBQUFBLFlBQWQsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUN0QixhQUFLLE9BQUwsR0FBZSxRQUFRLE9BQXZCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsUUFBUSxPQUF2QjtBQUNBLGFBQUssTUFBTCxHQUFjLFFBQVEsTUFBUixJQUFrQixFQUFoQztBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFRLFFBQVIsSUFBbUIsRUFBbkM7QUFDQSxhQUFLLFNBQUwsR0FBaUIsUUFBUSxTQUFSLElBQXFCLENBQXRDO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLFFBQVEsWUFBUixJQUF3QixFQUE1QztBQUNBLGFBQUssT0FBTCxHQUFlLFFBQVEsT0FBUixJQUFtQixLQUFLLFFBQUwsQ0FBYyxPQUFoRDs7QUFFQSxhQUFLLFNBQUwsR0FBaUIsT0FBTyxLQUFLLE9BQVosRUFBcUIsS0FBSyxPQUExQixDQUFqQjtBQUNIOzs7OytCQUVNLE8sRUFBUTtBQUNYLGdCQUFJLE9BQUosRUFBWTtBQUNSLHFCQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsdUJBQU8sSUFBUDtBQUNIOztBQUVELG1CQUFPLEtBQUssT0FBWjtBQUNIOzs7a0NBRWdCO0FBQ2IsZ0JBQUksVUFBSyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsdUJBQU8sS0FBSyxRQUFaO0FBQ0gsYUFGRCxNQUVPLElBQUksVUFBSyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDekIscUJBQUssUUFBTDtBQUNBLHVCQUFPLElBQVA7QUFDSCxhQUhNLE1BR0EsSUFBSSxVQUFLLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUN6QixxQkFBSyxNQUFMO0FBQ0EscUJBQUssT0FBTDtBQUNBLHVCQUFPLElBQVA7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7OztrQ0FFUzs7QUFFTixnQkFBSSxLQUFLLE1BQUwsTUFBaUIsS0FBSyxRQUFMLENBQWMsT0FBL0IsSUFBMEMsS0FBSyxNQUFMLE1BQWlCLEtBQUssUUFBTCxDQUFjLEtBQTdFLEVBQW9GOztBQUVoRixxQkFBSyxTQUFMO0FBQ0EscUJBQUssTUFBTDs7QUFFQSxvQkFBSSxLQUFLLFNBQUwsSUFBa0IsS0FBSyxZQUF2QixJQUF1QyxLQUFLLE1BQUwsT0FBa0IsS0FBSyxRQUFMLENBQWMsT0FBM0UsRUFBb0Y7QUFDaEYseUJBQUssTUFBTCxDQUFZLEtBQUssUUFBTCxDQUFjLE9BQTFCO0FBQ0g7QUFDSjs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7OzsrQkFFTSxLLEVBQU87QUFDVixnQkFBSSxXQUFXLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUIsSUFBckIsQ0FBZjs7QUFFQSxvQkFBUSxDQUFDLFNBQVMsS0FBSyxNQUFmLEVBQXVCLEtBQXZCLENBQTZCLElBQTdCLENBQVI7O0FBRUEsZ0JBQUksU0FBUyxNQUFULElBQW1CLE1BQU0sTUFBN0IsRUFBcUM7QUFDakMsb0JBQUksT0FBTyxDQUFYOztBQUVBLHVCQUFPLFFBQVEsU0FBUyxJQUFULEtBQWtCLEVBQTFCLEVBQThCLE1BQU0sSUFBTixLQUFlLEVBQTdDLE1BQXFELFNBQVMsSUFBVCxLQUFrQixNQUFNLElBQU4sQ0FBdkUsQ0FBUCxFQUE0RjtBQUN4RjtBQUNIOztBQUVELG9CQUFJLFFBQVEsU0FBUyxNQUFyQixFQUE2QjtBQUN6Qix5QkFBSyxPQUFMLENBQWEsS0FBSyxRQUFMLENBQWMsT0FBM0I7QUFDSCxpQkFGRCxNQUVPO0FBQ0gseUJBQUssT0FBTCxDQUFhLEtBQUssUUFBTCxDQUFjLEtBQTNCLHNKQUFnRSxPQUFPLENBQXZFO0FBQ0g7QUFDSixhQVpELE1BWU87QUFDSCxxQkFBSyxPQUFMLENBQWEsS0FBSyxRQUFMLENBQWMsS0FBM0IscUpBQWdFLFNBQVMsTUFBekU7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7Ozs7OztBQUdMLEtBQUssUUFBTCxHQUFnQjtBQUNaLGFBQVMsQ0FERztBQUVaLGFBQVMsQ0FGRztBQUdaLFdBQU8sQ0FISztBQUlaLGFBQVM7QUFKRyxDQUFoQjs7a0JBT2UsSTs7Ozs7O0FDOUZmOzs7Ozs7QUFFQSxJQUFNLFFBQVE7QUFDVixTQUFLO0FBQ0QsZ0JBQVEsUUFBUSxlQUFSLENBRFA7QUFFRCxtQkFBVyxRQUFRLGtCQUFSO0FBRlYsS0FESzs7QUFNVixTQUFLO0FBQ0QsZ0JBQVEsUUFBUSxlQUFSLENBRFA7QUFFRCxtQkFBVyxRQUFRLGtCQUFSO0FBRlYsS0FOSzs7QUFXVixrQkFBYztBQUNWLGdCQUFRLFFBQVEsd0JBQVIsQ0FERTtBQUVWLG1CQUFXLFFBQVEsMkJBQVI7QUFGRCxLQVhKOztBQWdCVixrQkFBYztBQUNWLGdCQUFRLFFBQVEsd0JBQVIsQ0FERTtBQUVWLG1CQUFXLFFBQVEsMkJBQVI7QUFGRCxLQWhCSjs7QUFxQlYsZUFBVztBQUNQLGdCQUFRLFFBQVEscUJBQVIsQ0FERDtBQUVQLG1CQUFXLFFBQVEsd0JBQVI7QUFGSixLQXJCRDs7QUEwQlYsVUFBTTtBQUNGLGdCQUFRLFFBQVEsZ0JBQVIsQ0FETjtBQUVGLG1CQUFXLFFBQVEsbUJBQVI7QUFGVDtBQTFCSSxDQUFkOztBQWdDQSxTQUFTLFFBQVQsQ0FBa0IsUUFBbEIsRUFBd0M7QUFBQTs7QUFFcEMsUUFBSSxPQUFPLE1BQU0sUUFBTixDQUFYOztBQUZvQyxzQ0FBVCxPQUFTO0FBQVQsZUFBUztBQUFBOztBQUlwQyxXQUFPLG1CQUFTO0FBQ1osaUJBQVMsS0FBSyxNQUFMLENBQVksT0FEVDtBQUVaLGlCQUFTLHdCQUFLLFNBQUwsRUFBZSxPQUFmLHdCQUEwQixPQUExQjtBQUZHLEtBQVQsQ0FBUDtBQUlIOztBQUVELE9BQU8sYUFBUCxHQUF1QixVQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUI7QUFDMUMsV0FBTyxDQUNILFNBQVMsS0FBVCxFQUFnQixJQUFoQixDQURHLEVBRUgsU0FBUyxLQUFULEVBQWdCLEtBQWhCLENBRkcsRUFHSCxTQUFTLEtBQVQsQ0FIRyxFQUlILFNBQVMsY0FBVCxFQUF5QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXpCLENBSkcsRUFLSCxTQUFTLGNBQVQsRUFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF6QixDQUxHLEVBTUgsU0FBUyxjQUFULENBTkcsRUFPSCxTQUFTLFdBQVQsQ0FQRyxFQVFILFNBQVMsTUFBVCxDQVJHLENBQVA7QUFVSCxDQVhEOzs7Ozs7Ozs7OztrQkMxQ2UsWUFBWTs7QUFFdkIsUUFBSSxNQUFNLFNBQU4sR0FBTTtBQUFBLGVBQU8sS0FBSyxNQUFMLEtBQWdCLElBQWhCLElBQXdCLENBQS9CO0FBQUEsS0FBVjs7QUFFQSxPQUFHO0FBQ0MsWUFBSSxNQUFNLEtBQVY7QUFBQSxZQUNJLHdCQUFzQixHQUF0QixNQURKO0FBRUgsS0FIRCxRQUdTLDRCQUF3QixNQUF4QixFQUFnQyxLQUFoQyxDQUFzQyxJQUF0QyxFQUE0QyxNQUE1QyxJQUFzRCxFQUgvRDs7QUFLQSxXQUFPLE1BQVA7QUFDSCxDOztBQVpEOzs7Ozs7Ozs7Ozs7O2tCQ0VlLFVBQVUsTUFBVixFQUFrQjs7QUFFN0IsYUFBUyxHQUFULEdBQWU7QUFDWCxlQUFPO0FBQ0gsZUFBRyxLQUFLLE1BQUwsS0FBZ0IsR0FBaEIsR0FBc0IsR0FBdEIsSUFBNkIsQ0FEN0I7QUFFSCxlQUFHLEtBQUssTUFBTCxLQUFnQixHQUFoQixHQUFzQixHQUF0QixJQUE2QjtBQUY3QixTQUFQO0FBSUg7O0FBRUQsUUFBSSxPQUFPLEtBQVg7QUFBQSxRQUNJLGtCQUFnQixLQUFLLENBQXJCLFVBQTJCLEtBQUssQ0FBaEMsTUFESjtBQUFBLFFBRUksV0FBVyxzQkFBa0IsTUFBbEIsRUFBMEIsS0FBMUIsQ0FBZ0MsSUFBaEMsQ0FGZjs7QUFJQSxRQUFJLE1BQUosRUFBWTtBQUNSLGVBQU8sRUFBRSxLQUFLLENBQUwsSUFBVSxLQUFLLENBQWpCLEtBQXVCLFNBQVMsTUFBVCxHQUFrQixFQUF6QyxJQUErQyxTQUFTLE1BQVQsR0FBa0IsRUFBeEUsRUFBNEU7QUFDeEUsbUJBQU8sS0FBUDtBQUNBLDhCQUFnQixLQUFLLENBQXJCLFVBQTJCLEtBQUssQ0FBaEM7QUFDQSx1QkFBVyxzQkFBa0IsTUFBbEIsRUFBMEIsS0FBMUIsQ0FBZ0MsSUFBaEMsQ0FBWDtBQUNIO0FBQ0osS0FORCxNQU1PO0FBQ0gsZUFBTyxLQUFLLENBQUwsSUFBVSxLQUFLLENBQWYsSUFBcUIsS0FBSyxDQUFMLEtBQVcsS0FBSyxDQUE1QyxFQUFnRDtBQUM1QyxtQkFBTyxLQUFQO0FBQ0EsOEJBQWdCLEtBQUssQ0FBckIsVUFBMkIsS0FBSyxDQUFoQztBQUNIO0FBQ0o7O0FBRUQsV0FBTyxNQUFQO0FBQ0gsQzs7QUE3QkQ7Ozs7Ozs7Ozs7Ozs7a0JDQWUsWUFBWTtBQUN2QixPQUFHO0FBQ0MsWUFBSSxTQUFTLEtBQUssTUFBTCxLQUFnQixHQUFoQixHQUFzQixFQUF0QixJQUE0QixDQUF6QztBQUNILEtBRkQsUUFFUyxDQUFDLFFBQVEsSUFBUixDQUFhLE9BQU8sUUFBUCxDQUFnQixFQUFoQixDQUFiLENBRlY7O0FBSUEsb0JBQWMsTUFBZDtBQUNILEM7Ozs7Ozs7OztrQkNOYyxZQUFZOztBQUV2QixRQUFJLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBQyxLQUFLLE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUIsQ0FBdEIsSUFBMkIsQ0FBckMsRUFBd0MsSUFBeEMsQ0FBNkMsQ0FBN0MsRUFBZ0QsR0FBaEQsQ0FBb0Q7QUFBQSxlQUFNLEtBQUssTUFBTCxLQUFnQixHQUFoQixJQUF1QixDQUE3QjtBQUFBLEtBQXBELENBQVY7QUFBQSxRQUNJLFdBQVcsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsS0FBSyxNQUFMLEtBQWdCLENBQWhCLElBQXFCLENBQS9DLENBRGY7O0FBR0Esc0JBQWdCLFFBQWhCLFlBQStCLElBQUksSUFBSixDQUFTLElBQVQsQ0FBL0I7QUFDSCxDOzs7Ozs7Ozs7a0JDSmMsWUFBWTtBQUN2QixRQUFJLE1BQU0sU0FBTixHQUFNO0FBQUEsZUFBTztBQUNiLGVBQUcsS0FBSyxNQUFMLEtBQWdCLE1BQWhCLElBQTBCLENBRGhCO0FBRWIsZUFBRyxLQUFLLE1BQUwsS0FBZ0IsRUFBaEIsSUFBc0I7QUFGWixTQUFQO0FBQUEsS0FBVjs7QUFLQSxRQUFJLFVBQVUsU0FBVixPQUFVLENBQUMsSUFBRCxFQUFVO0FBQ3BCLFlBQUksY0FBYyxLQUFLLENBQXZCOztBQUVBLGVBQU8sY0FBYyxDQUFyQixFQUF3QjtBQUNwQiwwQkFBYyxjQUFjLEVBQWQsSUFBb0IsQ0FBbEM7QUFDSDs7QUFFRCxZQUFJLE1BQU0sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFWO0FBQUEsWUFDSSxTQUFTLElBQUksS0FBSyxNQUFMLEtBQWdCLENBQWhCLElBQXFCLENBQXpCLENBRGI7QUFBQSxZQUVJLFNBQVMsSUFBSSxNQUFKLENBQVcsS0FBSyxDQUFoQixFQUFtQixHQUFuQixDQUZiOztBQUlBLGVBQVEsS0FBSyxDQUFMLENBQU8sUUFBUCxHQUFrQixNQUFsQixHQUEyQixLQUFLLENBQUwsQ0FBTyxRQUFQLEdBQWtCLE9BQWxCLENBQTBCLE1BQTFCLEVBQWtDLEVBQWxDLEVBQXNDLE1BQWxFLElBQTZFLE1BQTdFLElBQ0gsZ0JBQWdCLEtBQUssQ0FEbEIsSUFFSCxpREFBMEMsS0FBSyxDQUEvQyxVQUFxRCxLQUFLLENBQTFELFFBQWdFLEtBQWhFLENBQXNFLElBQXRFLEVBQTRFLE1BQTVFLEdBQXFGLEVBRnpGO0FBR0gsS0FkRDs7QUFnQkEsT0FBRztBQUNDLFlBQUksT0FBTyxLQUFYO0FBQ0gsS0FGRCxRQUVTLENBQUMsUUFBUSxJQUFSLENBRlY7O0FBSUEsNkJBQXVCLEtBQUssQ0FBNUIsVUFBa0MsS0FBSyxDQUF2QztBQUNILEM7O0FBN0JEOzs7Ozs7Ozs7Ozs7O2tCQ2lDZSxVQUFVLFVBQVYsRUFBc0I7QUFDakMsUUFBSSxNQUFNLFNBQU4sR0FBTTtBQUFBLGVBQU87QUFDYixlQUFJLEtBQUssTUFBTCxLQUFnQixHQUFoQixHQUFzQixFQUF2QixHQUE2QixDQUE3QixHQUFtQyxLQUFLLE1BQUwsS0FBZ0IsR0FBaEIsR0FBc0IsR0FBdkIsSUFBK0IsQ0FEdkQ7QUFFYixlQUFJLEtBQUssTUFBTCxLQUFnQixHQUFoQixHQUFzQixHQUF2QixJQUErQixDQUZyQjtBQUdiLGVBQUksS0FBSyxNQUFMLEtBQWdCLEdBQWhCLEdBQXNCLEdBQXZCLElBQStCO0FBSHJCLFNBQVA7QUFBQSxLQUFWOztBQU1BLFFBQUksUUFBUSxTQUFSLEtBQVEsQ0FBQyxDQUFELEVBQU87QUFDZixhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLEtBQUssR0FBckIsRUFBMEIsR0FBMUIsRUFBK0I7QUFDM0IsZ0JBQUksSUFBSSxDQUFKLElBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPLENBQVA7QUFDSDtBQUNKOztBQUVELGVBQU8sSUFBUDtBQUNILEtBUkQ7O0FBVUEsUUFBSSxVQUFVLFNBQVYsT0FBVSxDQUFDLElBQUQsRUFBVTtBQUFBLFlBRWYsQ0FGZSxHQUVKLElBRkksQ0FFZixDQUZlO0FBQUEsWUFFWixDQUZZLEdBRUosSUFGSSxDQUVaLENBRlk7QUFBQSxZQUVULENBRlMsR0FFSixJQUZJLENBRVQsQ0FGUztBQUFBLFlBRUUsQ0FGRixHQUVNLENBRk47OztBQUlwQixZQUFJLEtBQUssQ0FBVCxFQUFZO0FBQ1IsZ0JBQUksSUFBRSxDQUFGLEdBQU0sSUFBRSxDQUFGLEdBQUksQ0FBZDtBQUNBLGdCQUFJLElBQUksQ0FBUixFQUFXO0FBQ1Asb0JBQUksUUFBUSxNQUFNLENBQU4sQ0FBWjs7QUFFQSx1QkFBTyxXQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsS0FBeUIsQ0FBekIsSUFBOEIsS0FBOUIsSUFDRixPQUFPLENBQUMsQ0FBRCxHQUFLLEtBQVosS0FBc0IsSUFBRSxDQUF4QixLQUE4QixDQUQ1QixJQUNtQyxPQUFPLENBQUMsQ0FBRCxHQUFLLEtBQVosS0FBc0IsSUFBRSxDQUF4QixLQUE4QixDQUR4RTtBQUVILGFBTEQsTUFLTyxJQUFJLEtBQUssQ0FBVCxFQUFZO0FBQ2YsdUJBQU8sV0FBVyxPQUFYLENBQW1CLENBQW5CLEtBQXlCLENBQXpCLElBQStCLE1BQU0sQ0FBQyxDQUFQLElBQVksSUFBRSxDQUFkLEtBQW9CLENBQTFEO0FBQ0gsYUFGTSxNQUVBO0FBQ0gsdUJBQU8sV0FBVyxPQUFYLENBQW1CLENBQW5CLEtBQXlCLENBQWhDO0FBQ0g7QUFDSixTQVpELE1BWU87QUFDSCxnQkFBSSxNQUFNLENBQVYsRUFBYTtBQUNULHVCQUFPLFdBQVcsT0FBWCxDQUFtQixDQUFuQixLQUF5QixDQUF6QixJQUErQixNQUFNLENBQUMsQ0FBUCxHQUFXLENBQVgsSUFBZ0IsQ0FBdEQ7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxXQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsS0FBeUIsQ0FBaEM7QUFDSDtBQUNKO0FBQ0osS0F2QkQ7O0FBeUJBLE9BQUc7QUFDQyxZQUFJLE9BQU8sS0FBWDtBQUNILEtBRkQsUUFFUyxDQUFDLFFBQVEsSUFBUixDQUZWOztBQUlBLDZCQUF1QixLQUFLLENBQTVCLFVBQWtDLEtBQUssQ0FBdkMsVUFBNkMsS0FBSyxDQUFsRDtBQUNILEM7OztBQ2hGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBpc0VxdWFsKGxpbmUxLCBsaW5lMikge1xyXG4gICAgbGV0IHJlZ0V4cCA9IC9cXHMrL2c7XHJcblxyXG4gICAgbGluZTEgPSBsaW5lMS5yZXBsYWNlKHJlZ0V4cCwgJycpLnJlcGxhY2UoL1wiL2csIGAnYCk7XHJcbiAgICBsaW5lMiA9IGxpbmUyLnJlcGxhY2UocmVnRXhwLCAnJykucmVwbGFjZSgvXCIvZywgYCdgKTtcclxuXHJcbiAgICByZXR1cm4gbGluZTEgPT09IGxpbmUyO1xyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuICAgICAgICB0aGlzLl9zb3VyY2UgPSBvcHRpb25zLl9zb3VyY2U7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gb3B0aW9ucy5fdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuX2lucHV0ID0gb3B0aW9ucy5faW5wdXQgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IG9wdGlvbnMuX21lc3NhZ2UgfHwnJztcclxuICAgICAgICB0aGlzLl9hdHRlbXB0cyA9IG9wdGlvbnMuX2F0dGVtcHRzIHx8IDA7XHJcbiAgICAgICAgdGhpcy5fbWF4QXR0ZW1wdHMgPSBvcHRpb25zLl9tYXhBdHRlbXB0cyB8fCAxMDtcclxuICAgICAgICB0aGlzLl9zdGF0dXMgPSBvcHRpb25zLl9zdGF0dXMgfHwgVGFzay5zdGF0dXNlcy5JTklUSUFMO1xyXG5cclxuICAgICAgICB0aGlzLl9zb2x1dGlvbiA9IHRyYWNlcih0aGlzLl9zb3VyY2UsIHRoaXMuX3RhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdHVzKHN0YXR1cykge1xyXG4gICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgbWVzc2FnZSguLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2UgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMoYXJnc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZShhcmdzWzFdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhdHRlbXB0KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSBUYXNrLnN0YXR1c2VzLklOSVRJQUwgfHwgdGhpcy5zdGF0dXMoKSA9PSBUYXNrLnN0YXR1c2VzLkVSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hdHRlbXB0cysrO1xyXG4gICAgICAgICAgICB0aGlzLnZlcmlmeSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGVtcHRzID49IHRoaXMuX21heEF0dGVtcHRzICYmIHRoaXMuc3RhdHVzKCkgIT09IFRhc2suc3RhdHVzZXMuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMoVGFzay5zdGF0dXNlcy5CTE9DS0VEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmVyaWZ5KGlucHV0KSB7XHJcbiAgICAgICAgbGV0IHNvbHV0aW9uID0gdGhpcy5fc29sdXRpb24uc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBpbnB1dCA9IChpbnB1dCB8fCB0aGlzLl9pbnB1dCkuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBpZiAoc29sdXRpb24ubGVuZ3RoID49IGlucHV0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgbGluZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoaXNFcXVhbChzb2x1dGlvbltsaW5lXSB8fCAnJywgaW5wdXRbbGluZV0gfHwgJycpICYmIChzb2x1dGlvbltsaW5lXSB8fCBpbnB1dFtsaW5lXSkpIHtcclxuICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmUgPT0gc29sdXRpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UoVGFzay5zdGF0dXNlcy5TVUNDRVNTLCBg0JfQsNC00LDQvdC40LUg0YPRgdC/0LXRiNC90L4g0LLRi9C/0L7Qu9C90LXQvdC+IWApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlKFRhc2suc3RhdHVzZXMuRVJST1IsIGDQndC10LLQtdGA0L3Ri9C1INC30L3QsNGH0LXQvdC40Y8g0LIg0YHRgtGA0L7QutC1ICR7bGluZSArIDF9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UoVGFzay5zdGF0dXNlcy5FUlJPUiwgYNCd0LXQstC10YDQvdGL0LUg0LfQvdCw0YfQtdC90LjRjyDQsiDRgdGC0YDQvtC60LUgJHtzb2x1dGlvbi5sZW5ndGh9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuVGFzay5zdGF0dXNlcyA9IHtcclxuICAgIElOSVRJQUw6IDAsXHJcbiAgICBTVUNDRVNTOiAxLFxyXG4gICAgRVJST1I6IDIsXHJcbiAgICBCTE9DS0VEOiAzXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcblxyXG5jb25zdCB0YXNrcyA9IHtcclxuICAgIEdDRDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2djZCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2djZCcpXHJcbiAgICB9LFxyXG5cclxuICAgIEhFWDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2hleCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2hleCcpXHJcbiAgICB9LFxyXG5cclxuICAgIFNRVUFSRV9FUVVBTDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL3NxdWFyZV9lcXVhbCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL3NxdWFyZV9lcXVhbCcpXHJcbiAgICB9LFxyXG5cclxuICAgIFJFTU9WRV9ESUdJVDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL3JlbW92ZV9kaWdpdCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL3JlbW92ZV9kaWdpdCcpXHJcbiAgICB9LFxyXG5cclxuICAgIEZBQ1RPUklaRToge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2ZhY3Rvcml6ZScpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2ZhY3Rvcml6ZScpXHJcbiAgICB9LFxyXG5cclxuICAgIEpPSU46IHtcclxuICAgICAgICBzb3VyY2U6IHJlcXVpcmUoJy4vc291cmNlcy9qb2luJyksXHJcbiAgICAgICAgZ2VuZXJhdG9yOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvam9pbicpXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZSh0YXNrTmFtZSwgLi4uZ2VuQXJncykge1xyXG5cclxuICAgIGxldCB0YXNrID0gdGFza3NbdGFza05hbWVdO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGFzayh7XHJcbiAgICAgICAgX3NvdXJjZTogdGFzay5zb3VyY2UuZGVmYXVsdCxcclxuICAgICAgICBfdGFyZ2V0OiB0YXNrLmdlbmVyYXRvci5kZWZhdWx0KC4uLmdlbkFyZ3MpXHJcbiAgICB9KTtcclxufVxyXG5cclxuZ2xvYmFsLmdlbmVyYXRlVGFza3MgPSBmdW5jdGlvbiAobmFtZSwgZ3JvdXApIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0dDRCcsIHRydWUpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdHQ0QnLCBmYWxzZSksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0hFWCcpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdTUVVBUkVfRVFVQUwnLCBbMSwgMl0pLFxyXG4gICAgICAgIGdlbmVyYXRlKCdTUVVBUkVfRVFVQUwnLCBbMCwgMV0pLFxyXG4gICAgICAgIGdlbmVyYXRlKCdSRU1PVkVfRElHSVQnKSxcclxuICAgICAgICBnZW5lcmF0ZSgnRkFDVE9SSVpFJyksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0pPSU4nKVxyXG4gICAgXTtcclxufTsiLCJpbXBvcnQgZmFjdG9yaXplU291cmNlIGZyb20gJy4uL3NvdXJjZXMvZmFjdG9yaXplJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBsZXQgZ2VuID0gKCkgPT4gKE1hdGgucmFuZG9tKCkgKiAyMDAwID4+IDApO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICB2YXIgYXJnID0gZ2VuKCksXHJcbiAgICAgICAgICAgIHRhcmdldCA9IGBmYWN0b3JpemUoJHthcmd9KWA7XHJcbiAgICB9IHdoaWxlICh0cmFjZXIoZmFjdG9yaXplU291cmNlLCB0YXJnZXQpLnNwbGl0KCdcXG4nKS5sZW5ndGggPj0gMzUpO1xyXG5cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0iLCJpbXBvcnQgZ2NkU291cmNlIGZyb20gJy4uL3NvdXJjZXMvZ2NkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChub1plcm8pIHtcclxuXHJcbiAgICBmdW5jdGlvbiBnZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYTogTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMCA+PiAwLFxyXG4gICAgICAgICAgICBiOiBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwID4+IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFyZ3MgPSBnZW4oKSxcclxuICAgICAgICB0YXJnZXQgPSBgZ2NkKCR7YXJncy5hfSwgJHthcmdzLmJ9KWAsXHJcbiAgICAgICAgc29sdXRpb24gPSB0cmFjZXIoZ2NkU291cmNlLCB0YXJnZXQpLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICBpZiAobm9aZXJvKSB7XHJcbiAgICAgICAgd2hpbGUgKCEoYXJncy5hICYmIGFyZ3MuYikgfHwgc29sdXRpb24ubGVuZ3RoIDwgMjAgfHwgc29sdXRpb24ubGVuZ3RoID4gMzApIHtcclxuICAgICAgICAgICAgYXJncyA9IGdlbigpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBgZ2NkKCR7YXJncy5hfSwgJHthcmdzLmJ9KWA7XHJcbiAgICAgICAgICAgIHNvbHV0aW9uID0gdHJhY2VyKGdjZFNvdXJjZSwgdGFyZ2V0KS5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aGlsZSAoYXJncy5hICYmIGFyZ3MuYiB8fCAoYXJncy5hID09PSBhcmdzLmIpKSB7XHJcbiAgICAgICAgICAgIGFyZ3MgPSBnZW4oKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gYGdjZCgke2FyZ3MuYX0sICR7YXJncy5ifSlgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogOTgwICsgMjAgPj4gMDtcclxuICAgIH0gd2hpbGUgKCEvW2EtZl0vLnRlc3QobnVtYmVyLnRvU3RyaW5nKDE2KSkpO1xyXG5cclxuICAgIHJldHVybiBgaGV4KCR7bnVtYmVyfSlgO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGxldCBhcnIgPSBuZXcgQXJyYXkoKE1hdGgucmFuZG9tKCkgKiAzID4+IDApICsgNSkuZmlsbCgwKS5tYXAoKCkgPT4gTWF0aC5yYW5kb20oKSAqIDEwMCA+PiAwKSxcclxuICAgICAgICBzcGxpdHRlciA9IFsnLScsICc6JywgJywnLCAnfCcsICcjJ11bTWF0aC5yYW5kb20oKSAqIDUgPj4gMF07XHJcblxyXG4gICAgcmV0dXJuIGBqb2luKFwiJHtzcGxpdHRlcn1cIiwgWyR7YXJyLmpvaW4oJywgJyl9XSlgXHJcbn0iLCJpbXBvcnQgcmVtb3ZlRGlnaXRTb3VyY2UgZnJvbSAnLi4vc291cmNlcy9yZW1vdmVfZGlnaXQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGdlbiA9ICgpID0+ICh7XHJcbiAgICAgICAgYTogTWF0aC5yYW5kb20oKSAqIDEwMDAwMCA+PiAwLFxyXG4gICAgICAgIGI6IE1hdGgucmFuZG9tKCkgKiAxMCA+PiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgaXNWYWxpZCA9IChhcmdzKSA9PiB7XHJcbiAgICAgICAgbGV0IGZpcnN0X2RpZ2l0ID0gYXJncy5hO1xyXG5cclxuICAgICAgICB3aGlsZSAoZmlyc3RfZGlnaXQgPiA5KSB7XHJcbiAgICAgICAgICAgIGZpcnN0X2RpZ2l0ID0gZmlyc3RfZGlnaXQgLyAxMCA+PiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyciA9IFsxLCAxLCAyLCAxLCAzLCAxXSxcclxuICAgICAgICAgICAgZGlmbGVuID0gYXJyW01hdGgucmFuZG9tKCkgKiA2ID4+IDBdLFxyXG4gICAgICAgICAgICByZWdFeHAgPSBuZXcgUmVnRXhwKGFyZ3MuYiwgJ2cnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChhcmdzLmEudG9TdHJpbmcoKS5sZW5ndGggLSBhcmdzLmEudG9TdHJpbmcoKS5yZXBsYWNlKHJlZ0V4cCwgJycpLmxlbmd0aCkgPj0gZGlmbGVuICYmXHJcbiAgICAgICAgICAgIGZpcnN0X2RpZ2l0ICE9PSBhcmdzLmIgJiZcclxuICAgICAgICAgICAgdHJhY2VyKHJlbW92ZURpZ2l0U291cmNlLCBgcmVtb3ZlX2RpZ2l0KCR7YXJncy5hfSwgJHthcmdzLmJ9KWApLnNwbGl0KCdcXG4nKS5sZW5ndGggPCAzNTtcclxuICAgIH07XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBhcmdzID0gZ2VuKCk7XHJcbiAgICB9IHdoaWxlICghaXNWYWxpZChhcmdzKSk7XHJcblxyXG4gICAgcmV0dXJuIGByZW1vdmVfZGlnaXQoJHthcmdzLmF9LCAke2FyZ3MuYn0pYDtcclxufSIsIi8qXHJcbiBkZWYgZ2VuX3NxdWFyZV9lcXVhbChyb290c19jb3VudCk6XHJcbiAgICAgZGVmIGdlbmFyZ3MoKTpcclxuICAgICAgICAgaWYgcmFuZG9tLnJhbmRpbnQoMCwgMTAwKSA8IDEwOlxyXG4gICAgICAgICAgICBhID0gMFxyXG4gICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICBhID0gcmFuZG9tLnJhbmRpbnQoLTEwMCwgMTAwKVxyXG5cclxuICAgICAgICAgYiA9IHJhbmRvbS5yYW5kaW50KC0xMDAsIDEwMClcclxuICAgICAgICAgYyA9IHJhbmRvbS5yYW5kaW50KC0xMDAsIDEwMClcclxuICAgICAgICAgcmV0dXJuIChhLCBiLCBjKVxyXG5cclxuICAgICBkZWYgdmFsaWRhcmdzKGFyZ3MsIHJlc3VsdCwgc3Rkb3V0KTpcclxuICAgICAgICAgKGEsIGIsIGMpID0gYXJnc1xyXG4gICAgICAgICBpZiBhICE9IDA6XHJcbiAgICAgICAgICAgICBEID0gYipiIC0gNCphKmNcclxuICAgICAgICAgICAgIGlmIEQgPiAwOlxyXG4gICAgICAgICAgICAgICAgIHNxcnREID0gaW50X3NxcnQoRClcclxuICAgICAgICAgICAgICAgICByZXR1cm4gKDIgaW4gcm9vdHNfY291bnQgYW5kIHNxcnREXHJcbiAgICAgICAgICAgICAgICAgICAgIGFuZCAxMDAgKiAoLWIgLSBzcXJ0RCkgJSAoMiphKSA9PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgIGFuZCAxMDAgKiAoLWIgKyBzcXJ0RCkgJSAoMiphKSA9PSAwKVxyXG4gICAgICAgICAgICAgZWxpZiBEID09IDA6XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuICgxIGluIHJvb3RzX2NvdW50IGFuZCAxMDAgKiAoLWIpICUgKDIqYSkgPT0gMClcclxuICAgICAgICAgICAgIGVsc2U6XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIDAgaW4gcm9vdHNfY291bnQgYW5kIEQgPiAtMTAwMDBcclxuICAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgIGlmIGIgIT0gMDpcclxuICAgICAgICAgICAgICAgICByZXR1cm4gKDEgaW4gcm9vdHNfY291bnQgYW5kIDEwMCAqICgtYykgJSBiID09IDApXHJcbiAgICAgICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICAgICAgIHJldHVybiAwIGluIHJvb3RzX2NvdW50XHJcbiAgICAgcmV0dXJuICgnZmFsbF9tb2QxX3NxdWFyZV9lcXVhbC5weScsICdzcXVhcmVfZXF1YWwnLCBnZW5hcmdzLCB2YWxpZGFyZ3MpXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHJvb3RzQ291bnQpIHtcclxuICAgIGxldCBnZW4gPSAoKSA9PiAoe1xyXG4gICAgICAgIGE6IChNYXRoLnJhbmRvbSgpICogMTAwIDwgMTApID8gMCA6ICgoTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMCkgPj4gMCksXHJcbiAgICAgICAgYjogKE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDApID4+IDAsXHJcbiAgICAgICAgYzogKE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDApID4+IDBcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBpc3FydCA9IChuKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgKiBpID09IG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGlzVmFsaWQgPSAoYXJncykgPT4ge1xyXG5cclxuICAgICAgICBsZXQge2EsIGIsIGN9ID0gYXJncywgRCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChhICE9IDApIHtcclxuICAgICAgICAgICAgRCA9IGIqYiAtIDQqYSpjO1xyXG4gICAgICAgICAgICBpZiAoRCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcXJ0RCA9IGlzcXJ0KEQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByb290c0NvdW50LmluZGV4T2YoMikgPj0gMCAmJiBzcXJ0RCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICgxMDAgKiAoLWIgLSBzcXJ0RCkgJSAoMiphKSA9PSAwKSAmJiAoMTAwICogKC1iICsgc3FydEQpICUgKDIqYSkgPT0gMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoRCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDEpID49IDAgJiYgKDEwMCAqIC1iICUgKDIqYSkgPT0gMClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb290c0NvdW50LmluZGV4T2YoMCkgPj0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChiICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDEpID49IDAgJiYgKDEwMCAqIC1jICUgYiA9PSAwKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RzQ291bnQuaW5kZXhPZigwKSA+PSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBnZW4oKTtcclxuICAgIH0gd2hpbGUgKCFpc1ZhbGlkKGFyZ3MpKTtcclxuXHJcbiAgICByZXR1cm4gYHNxdWFyZV9lcXVhbCgke2FyZ3MuYX0sICR7YXJncy5ifSwgJHthcmdzLmN9KWA7XHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgZmFjdG9yaXplKG4pOlxcbiAgICByZXMgPSAnJ1xcbiAgICB3aGlsZSBuID4gMiBhbmQgbiAlIDIgPT0gMDpcXG4gICAgICAgIHJlcyA9IHJlcyArICcyKidcXG4gICAgICAgIG4gPSBuIC8vIDJcXG4gICAgZCA9IDNcXG4gICAgd2hpbGUgbiA+IGQ6XFxuICAgICAgICBpZiBuICUgZCA9PSAwOlxcbiAgICAgICAgICAgIHJlcyA9IHJlcyArIHN0cihkKSArICcqJ1xcbiAgICAgICAgICAgIG4gPSBuIC8vIGRcXG4gICAgICAgIGVsc2U6XFxuICAgICAgICAgICAgZCA9IGQgKyAyXFxuICAgIHJldHVybiByZXMgKyBzdHIobilcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKbVlXTjBiM0pwZW1VdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFwiZGVmIGdjZCh4LCB5KTpcXG4gICAgaWYgeCA8IDA6XFxuICAgICAgICB4ID0gLXhcXG4gICAgaWYgeSA8IDA6XFxuICAgICAgICB5ID0gLXlcXG4gICAgd2hpbGUgeSAhPSAwOlxcbiAgICAgICAgcmVtID0geCAlIHlcXG4gICAgICAgIHggPSB5XFxuICAgICAgICB5ID0gcmVtXFxuICAgIHJldHVybiB4XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm5ZMlF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgaGV4KG51bWJlcik6XFxuICAgIGlmIG51bWJlciA9PSAwOlxcbiAgICAgICAgcmV0dXJuICcwJ1xcbiAgICByZXMgPSAnJ1xcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgZGlnaXQgPSBudW1iZXIgJSAxNlxcbiAgICAgICAgaWYgZGlnaXQgPD0gOTpcXG4gICAgICAgICAgICBkaWdpdCA9IHN0cihkaWdpdClcXG4gICAgICAgIGVsaWYgZGlnaXQgPD0gMTM6XFxuICAgICAgICAgICAgaWYgZGlnaXQgPD0gMTE6XFxuICAgICAgICAgICAgICAgIGlmIGRpZ2l0ID09IDEwOlxcbiAgICAgICAgICAgICAgICAgICAgZGlnaXQgPSAnQSdcXG4gICAgICAgICAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0ID0gJ0InXFxuICAgICAgICAgICAgZWxpZiBkaWdpdCA9PSAxMjpcXG4gICAgICAgICAgICAgICAgZGlnaXQgPSAnQydcXG4gICAgICAgICAgICBlbHNlOlxcbiAgICAgICAgICAgICAgICBkaWdpdCA9ICdEJ1xcbiAgICAgICAgZWxpZiBkaWdpdCA9PSAxNDpcXG4gICAgICAgICAgICBkaWdpdCA9ICdFJ1xcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICBkaWdpdCA9ICdGJ1xcbiAgICAgICAgcmVzID0gZGlnaXQgKyByZXNcXG4gICAgICAgIG51bWJlciA9IG51bWJlciAvLyAxNlxcbiAgICByZXR1cm4gcmVzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm9aWGd1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgam9pbihzZXAsIGl0ZW1zKTpcXG4gICAgcmVzID0gJydcXG4gICAgaWYgbGVuKGl0ZW1zKSA+IDA6XFxuICAgICAgICByZXMgPSBzdHIoaXRlbXNbMF0pXFxuICAgICAgICBpdGVtcyA9IGl0ZW1zWzE6XVxcbiAgICAgICAgd2hpbGUgbGVuKGl0ZW1zKSA+IDA6XFxuICAgICAgICAgICAgcmVzID0gcmVzICsgc2VwICsgc3RyKGl0ZW1zWzBdKVxcbiAgICAgICAgICAgIGl0ZW1zID0gaXRlbXNbMTpdXFxuICAgIHJldHVybiByZXNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKcWIybHVMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZGZRPT0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgcmVtb3ZlX2RpZ2l0KG51bWJlciwgZGlnaXQpOlxcbiAgICByZXMgPSAwXFxuICAgIHBvd2VyID0gMVxcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgY3VyX2RpZ2l0ID0gbnVtYmVyICUgMTBcXG4gICAgICAgIGlmIGN1cl9kaWdpdCAhPSBkaWdpdDpcXG4gICAgICAgICAgICByZXMgPSByZXMgKyBjdXJfZGlnaXQgKiBwb3dlclxcbiAgICAgICAgICAgIHBvd2VyID0gcG93ZXIgKiAxMFxcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyIC8vIDEwXFxuICAgIHJldHVybiByZXNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKeVpXMXZkbVZmWkdsbmFYUXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2VzExOSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBcImRlZiBzcXVhcmVfZXF1YWwoYSwgYiwgYyk6XFxuICAgIGlmIGEgIT0gMDpcXG4gICAgICAgIEQgPSBiKmIgLSA0KmEqY1xcbiAgICAgICAgaWYgRCA+IDA6XFxuICAgICAgICAgICAgeDEgPSAoLWIgLSBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgeDIgPSAoLWIgKyBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgcmV0dXJuIHN0cih4MSkgKyAnIGFuZCAnICsgc3RyKHgyKVxcbiAgICAgICAgZWxpZiBEID09IDA6XFxuICAgICAgICAgICAgcmV0dXJuIHN0cigtYiAvICgyKmEpKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1xcbiAgICBlbHNlOlxcbiAgICAgICAgaWYgYiAhPSAwOlxcbiAgICAgICAgICAgIHJldHVybiBzdHIoLWMgLyBiKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUp6Y1hWaGNtVmZaWEYxWVd3dWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5Il19
