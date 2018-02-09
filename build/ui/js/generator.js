(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
    } while (!isValid(args));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdWkvdGFza3MvVGFzay5qcyIsInNyYy91aS90YXNrcy9nZW5lcmF0b3IuanMiLCJzcmMvdWkvdGFza3MvZ2VuZXJhdG9ycy9nY2QuanMiLCJzcmMvdWkvdGFza3MvZ2VuZXJhdG9ycy9oZXguanMiLCJzcmMvdWkvdGFza3MvZ2VuZXJhdG9ycy9yZW1vdmVfZGlnaXQuanMiLCJzcmMvdWkvdGFza3MvZ2VuZXJhdG9ycy9zcXVhcmVfZXF1YWwuanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9nY2QuanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9oZXguanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9yZW1vdmVfZGlnaXQuanMiLCJzcmMvdWkvdGFza3Mvc291cmNlcy9zcXVhcmVfZXF1YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUEsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEtBQXhCLEVBQStCO0FBQzNCLFFBQUksU0FBUyxNQUFiOztBQUVBLFlBQVEsTUFBTSxPQUFOLENBQWMsTUFBZCxFQUFzQixFQUF0QixDQUFSO0FBQ0EsWUFBUSxNQUFNLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLENBQVI7O0FBRUEsV0FBTyxVQUFVLEtBQWpCO0FBQ0g7O0lBRUssSTtBQUVGLG9CQUEwQjtBQUFBLFlBQWQsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUN0QixhQUFLLE9BQUwsR0FBZSxRQUFRLE9BQXZCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsUUFBUSxPQUF2QjtBQUNBLGFBQUssTUFBTCxHQUFjLFFBQVEsTUFBUixJQUFrQixFQUFoQztBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFRLFFBQVIsSUFBbUIsRUFBbkM7QUFDQSxhQUFLLFNBQUwsR0FBaUIsUUFBUSxTQUFSLElBQXFCLENBQXRDO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLFFBQVEs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QVgsSUFBZ0IsQ0FBdEQ7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxXQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsS0FBeUIsQ0FBaEM7QUFDSDtBQUNKO0FBQ0osS0F2QkQ7O0FBeUJBLE9BQUc7QUFDQyxZQUFJLE9BQU8sS0FBWDtBQUNILEtBRkQsUUFFUyxDQUFDLFFBQVEsSUFBUixDQUZWOztBQUlBLDZCQUF1QixLQUFLLENBQTVCLFVBQWtDLEtBQUssQ0FBdkMsVUFBNkMsS0FBSyxDQUFsRDtBQUNILEM7OztBQ2hGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiZnVuY3Rpb24gaXNFcXVhbChsaW5lMSwgbGluZTIpIHtcclxuICAgIGxldCByZWdFeHAgPSAvXFxzKy9nO1xyXG5cclxuICAgIGxpbmUxID0gbGluZTEucmVwbGFjZShyZWdFeHAsICcnKTtcclxuICAgIGxpbmUyID0gbGluZTIucmVwbGFjZShyZWdFeHAsICcnKTtcclxuXHJcbiAgICByZXR1cm4gbGluZTEgPT09IGxpbmUyO1xyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuICAgICAgICB0aGlzLl9zb3VyY2UgPSBvcHRpb25zLl9zb3VyY2U7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gb3B0aW9ucy5fdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuX2lucHV0ID0gb3B0aW9ucy5faW5wdXQgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IG9wdGlvbnMuX21lc3NhZ2UgfHwnJztcclxuICAgICAgICB0aGlzLl9hdHRlbXB0cyA9IG9wdGlvbnMuX2F0dGVtcHRzIHx8IDA7XHJcbiAgICAgICAgdGhpcy5fbWF4QXR0ZW1wdHMgPSBvcHRpb25zLl9tYXhBdHRlbXB0cyB8fCAxMDtcclxuICAgICAgICB0aGlzLl9zdGF0dXMgPSBvcHRpb25zLl9zdGF0dXMgfHwgVGFzay5zdGF0dXNlcy5JTklUSUFMO1xyXG5cclxuICAgICAgICB0aGlzLl9zb2x1dGlvbiA9IHRyYWNlcih0aGlzLl9zb3VyY2UsIHRoaXMuX3RhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdHVzKHN0YXR1cykge1xyXG4gICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgbWVzc2FnZSguLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2UgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMoYXJnc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZShhcmdzWzFdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhdHRlbXB0KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSBUYXNrLnN0YXR1c2VzLklOSVRJQUwgfHwgdGhpcy5zdGF0dXMoKSA9PSBUYXNrLnN0YXR1c2VzLkVSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hdHRlbXB0cysrO1xyXG4gICAgICAgICAgICB0aGlzLnZlcmlmeSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGVtcHRzID49IHRoaXMuX21heEF0dGVtcHRzICYmIHRoaXMuc3RhdHVzKCkgIT09IFRhc2suc3RhdHVzZXMuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMoVGFzay5zdGF0dXNlcy5CTE9DS0VEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmVyaWZ5KGlucHV0KSB7XHJcbiAgICAgICAgbGV0IHNvbHV0aW9uID0gdGhpcy5fc29sdXRpb24uc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBpbnB1dCA9IChpbnB1dCB8fCB0aGlzLl9pbnB1dCkuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBpZiAoc29sdXRpb24ubGVuZ3RoID49IGlucHV0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgbGluZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoaXNFcXVhbChzb2x1dGlvbltsaW5lXSB8fCAnJywgaW5wdXRbbGluZV0gfHwgJycpICYmIChzb2x1dGlvbltsaW5lXSB8fCBpbnB1dFtsaW5lXSkpIHtcclxuICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmUgPT0gc29sdXRpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UoVGFzay5zdGF0dXNlcy5TVUNDRVNTLCBg0JfQsNC00LDQvdC40LUg0YPRgdC/0LXRiNC90L4g0LLRi9C/0L7Qu9C90LXQvdC+IWApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlKFRhc2suc3RhdHVzZXMuRVJST1IsIGDQndC10LLQtdGA0L3Ri9C1INC30L3QsNGH0LXQvdC40Y8g0LIg0YHRgtGA0L7QutC1ICR7bGluZSArIDF9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UoVGFzay5zdGF0dXNlcy5FUlJPUiwgYNCd0LXQstC10YDQvdGL0LUg0LfQvdCw0YfQtdC90LjRjyDQsiDRgdGC0YDQvtC60LUgJHtzb2x1dGlvbi5sZW5ndGh9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuVGFzay5zdGF0dXNlcyA9IHtcclxuICAgIElOSVRJQUw6IDAsXHJcbiAgICBTVUNDRVNTOiAxLFxyXG4gICAgRVJST1I6IDIsXHJcbiAgICBCTE9DS0VEOiAzXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcblxyXG5jb25zdCB0YXNrcyA9IHtcclxuICAgIEdDRDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2djZCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2djZCcpXHJcbiAgICB9LFxyXG5cclxuICAgIEhFWDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL2hleCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2hleCcpXHJcbiAgICB9LFxyXG5cclxuICAgIFNRVUFSRV9FUVVBTDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL3NxdWFyZV9lcXVhbCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL3NxdWFyZV9lcXVhbCcpXHJcbiAgICB9LFxyXG5cclxuICAgIFJFTU9WRV9ESUdJVDoge1xyXG4gICAgICAgIHNvdXJjZTogcmVxdWlyZSgnLi9zb3VyY2VzL3JlbW92ZV9kaWdpdCcpLFxyXG4gICAgICAgIGdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL3JlbW92ZV9kaWdpdCcpXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZSh0YXNrTmFtZSwgLi4uZ2VuQXJncykge1xyXG5cclxuICAgIGxldCB0YXNrID0gdGFza3NbdGFza05hbWVdO1xyXG5cclxuICAgIHJldHVybiBuZXcgVGFzayh7XHJcbiAgICAgICAgX3NvdXJjZTogdGFzay5zb3VyY2UuZGVmYXVsdCxcclxuICAgICAgICBfdGFyZ2V0OiB0YXNrLmdlbmVyYXRvci5kZWZhdWx0KC4uLmdlbkFyZ3MpXHJcbiAgICB9KTtcclxufVxyXG5cclxuZ2xvYmFsLmdlbmVyYXRlVGFza3MgPSBmdW5jdGlvbiAobmFtZSwgZ3JvdXApIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0dDRCcsIHRydWUpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdHQ0QnLCBmYWxzZSksXHJcbiAgICAgICAgZ2VuZXJhdGUoJ0hFWCcpLFxyXG4gICAgICAgIGdlbmVyYXRlKCdTUVVBUkVfRVFVQUwnLCBbMSwgMl0pLFxyXG4gICAgICAgIGdlbmVyYXRlKCdTUVVBUkVfRVFVQUwnLCBbMCwgMV0pLFxyXG4gICAgICAgIGdlbmVyYXRlKCdSRU1PVkVfRElHSVQnKVxyXG4gICAgXTtcclxufTsiLCJpbXBvcnQgZ2NkU291cmNlIGZyb20gJy4uL3NvdXJjZXMvZ2NkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChub1plcm8pIHtcclxuXHJcbiAgICBmdW5jdGlvbiBnZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYTogTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMCA+PiAwLFxyXG4gICAgICAgICAgICBiOiBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwID4+IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFyZ3MgPSBnZW4oKSxcclxuICAgICAgICB0YXJnZXQgPSBgZ2NkKCR7YXJncy5hfSwgJHthcmdzLmJ9KWAsXHJcbiAgICAgICAgc29sdXRpb24gPSB0cmFjZXIoZ2NkU291cmNlLCB0YXJnZXQpLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICBpZiAobm9aZXJvKSB7XHJcbiAgICAgICAgd2hpbGUgKCEoYXJncy5hICYmIGFyZ3MuYikgfHwgc29sdXRpb24ubGVuZ3RoIDwgMjAgfHwgc29sdXRpb24ubGVuZ3RoID4gMzApIHtcclxuICAgICAgICAgICAgYXJncyA9IGdlbigpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBgZ2NkKCR7YXJncy5hfSwgJHthcmdzLmJ9KWA7XHJcbiAgICAgICAgICAgIHNvbHV0aW9uID0gdHJhY2VyKGdjZFNvdXJjZSwgdGFyZ2V0KS5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aGlsZSAoYXJncy5hICYmIGFyZ3MuYiB8fCAoYXJncy5hID09PSBhcmdzLmIpKSB7XHJcbiAgICAgICAgICAgIGFyZ3MgPSBnZW4oKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gYGdjZCgke2FyZ3MuYX0sICR7YXJncy5ifSlgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogOTgwICsgMjAgPj4gMDtcclxuICAgIH0gd2hpbGUgKCEvW2EtZl0vLnRlc3QobnVtYmVyLnRvU3RyaW5nKDE2KSkpO1xyXG5cclxuICAgIHJldHVybiBgaGV4KCR7bnVtYmVyfSlgO1xyXG59IiwiaW1wb3J0IHJlbW92ZURpZ2l0U291cmNlIGZyb20gJy4uL3NvdXJjZXMvcmVtb3ZlX2RpZ2l0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBnZW4gPSAoKSA9PiAoe1xyXG4gICAgICAgIGE6IE1hdGgucmFuZG9tKCkgKiAxMDAwMDAgPj4gMCxcclxuICAgICAgICBiOiBNYXRoLnJhbmRvbSgpICogMTAgPj4gMFxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGlzVmFsaWQgPSAoYXJncykgPT4ge1xyXG4gICAgICAgIGxldCBmaXJzdF9kaWdpdCA9IGFyZ3MuYTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGZpcnN0X2RpZ2l0ID4gOSkge1xyXG4gICAgICAgICAgICBmaXJzdF9kaWdpdCA9IGZpcnN0X2RpZ2l0IC8gMTAgPj4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcnIgPSBbMSwgMSwgMiwgMSwgMywgMV0sXHJcbiAgICAgICAgICAgIGRpZmxlbiA9IGFycltNYXRoLnJhbmRvbSgpICogNiA+PiAwXSxcclxuICAgICAgICAgICAgcmVnRXhwID0gbmV3IFJlZ0V4cChhcmdzLmIsICdnJyk7XHJcblxyXG4gICAgICAgIHJldHVybiAoYXJncy5hLnRvU3RyaW5nKCkubGVuZ3RoIC0gYXJncy5hLnRvU3RyaW5nKCkucmVwbGFjZShyZWdFeHAsICcnKS5sZW5ndGgpID49IGRpZmxlbiAmJlxyXG4gICAgICAgICAgICBmaXJzdF9kaWdpdCAhPT0gYXJncy5iICYmXHJcbiAgICAgICAgICAgIHRyYWNlcihyZW1vdmVEaWdpdFNvdXJjZSwgYHJlbW92ZV9kaWdpdCgke2FyZ3MuYX0sICR7YXJncy5ifSlgKS5zcGxpdCgnXFxuJykubGVuZ3RoIDwgMzU7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgICB2YXIgYXJncyA9IGdlbigpO1xyXG4gICAgfSB3aGlsZSAoIWlzVmFsaWQoYXJncykpO1xyXG5cclxuICAgIHJldHVybiBgcmVtb3ZlX2RpZ2l0KCR7YXJncy5hfSwgJHthcmdzLmJ9KWA7XHJcbn0iLCIvKlxyXG4gZGVmIGdlbl9zcXVhcmVfZXF1YWwocm9vdHNfY291bnQpOlxyXG4gICAgIGRlZiBnZW5hcmdzKCk6XHJcbiAgICAgICAgIGlmIHJhbmRvbS5yYW5kaW50KDAsIDEwMCkgPCAxMDpcclxuICAgICAgICAgICAgYSA9IDBcclxuICAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgYSA9IHJhbmRvbS5yYW5kaW50KC0xMDAsIDEwMClcclxuXHJcbiAgICAgICAgIGIgPSByYW5kb20ucmFuZGludCgtMTAwLCAxMDApXHJcbiAgICAgICAgIGMgPSByYW5kb20ucmFuZGludCgtMTAwLCAxMDApXHJcbiAgICAgICAgIHJldHVybiAoYSwgYiwgYylcclxuXHJcbiAgICAgZGVmIHZhbGlkYXJncyhhcmdzLCByZXN1bHQsIHN0ZG91dCk6XHJcbiAgICAgICAgIChhLCBiLCBjKSA9IGFyZ3NcclxuICAgICAgICAgaWYgYSAhPSAwOlxyXG4gICAgICAgICAgICAgRCA9IGIqYiAtIDQqYSpjXHJcbiAgICAgICAgICAgICBpZiBEID4gMDpcclxuICAgICAgICAgICAgICAgICBzcXJ0RCA9IGludF9zcXJ0KEQpXHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuICgyIGluIHJvb3RzX2NvdW50IGFuZCBzcXJ0RFxyXG4gICAgICAgICAgICAgICAgICAgICBhbmQgMTAwICogKC1iIC0gc3FydEQpICUgKDIqYSkgPT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICBhbmQgMTAwICogKC1iICsgc3FydEQpICUgKDIqYSkgPT0gMClcclxuICAgICAgICAgICAgIGVsaWYgRCA9PSAwOlxyXG4gICAgICAgICAgICAgICAgIHJldHVybiAoMSBpbiByb290c19jb3VudCBhbmQgMTAwICogKC1iKSAlICgyKmEpID09IDApXHJcbiAgICAgICAgICAgICBlbHNlOlxyXG4gICAgICAgICAgICAgICAgIHJldHVybiAwIGluIHJvb3RzX2NvdW50IGFuZCBEID4gLTEwMDAwXHJcbiAgICAgICAgIGVsc2U6XHJcbiAgICAgICAgICAgICBpZiBiICE9IDA6XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuICgxIGluIHJvb3RzX2NvdW50IGFuZCAxMDAgKiAoLWMpICUgYiA9PSAwKVxyXG4gICAgICAgICAgICAgZWxzZTpcclxuICAgICAgICAgICAgICAgICByZXR1cm4gMCBpbiByb290c19jb3VudFxyXG4gICAgIHJldHVybiAoJ2ZhbGxfbW9kMV9zcXVhcmVfZXF1YWwucHknLCAnc3F1YXJlX2VxdWFsJywgZ2VuYXJncywgdmFsaWRhcmdzKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChyb290c0NvdW50KSB7XHJcbiAgICBsZXQgZ2VuID0gKCkgPT4gKHtcclxuICAgICAgICBhOiAoTWF0aC5yYW5kb20oKSAqIDEwMCA8IDEwKSA/IDAgOiAoKE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDApID4+IDApLFxyXG4gICAgICAgIGI6IChNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwKSA+PiAwLFxyXG4gICAgICAgIGM6IChNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwKSA+PiAwXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgaXNxcnQgPSAobikgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpICogaSA9PSBuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBpc1ZhbGlkID0gKGFyZ3MpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHthLCBiLCBjfSA9IGFyZ3MsIEQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoYSAhPSAwKSB7XHJcbiAgICAgICAgICAgIEQgPSBiKmIgLSA0KmEqYztcclxuICAgICAgICAgICAgaWYgKEQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3FydEQgPSBpc3FydChEKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDIpID49IDAgJiYgc3FydEQgJiZcclxuICAgICAgICAgICAgICAgICAgICAoMTAwICogKC1iIC0gc3FydEQpICUgKDIqYSkgPT0gMCkgJiYgKDEwMCAqICgtYiArIHNxcnREKSAlICgyKmEpID09IDApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKEQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RzQ291bnQuaW5kZXhPZigxKSA+PSAwICYmICgxMDAgKiAtYiAlICgyKmEpID09IDApXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdHNDb3VudC5pbmRleE9mKDApID49IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYiAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3RzQ291bnQuaW5kZXhPZigxKSA+PSAwICYmICgxMDAgKiAtYyAlIGIgPT0gMClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb290c0NvdW50LmluZGV4T2YoMCkgPj0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBhcmdzID0gZ2VuKCk7XHJcbiAgICB9IHdoaWxlICghaXNWYWxpZChhcmdzKSk7XHJcblxyXG4gICAgcmV0dXJuIGBzcXVhcmVfZXF1YWwoJHthcmdzLmF9LCAke2FyZ3MuYn0sICR7YXJncy5jfSlgO1xyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFwiZGVmIGdjZCh4LCB5KTpcXG4gICAgaWYgeCA8IDA6XFxuICAgICAgICB4ID0gLXhcXG4gICAgaWYgeSA8IDA6XFxuICAgICAgICB5ID0gLXlcXG4gICAgd2hpbGUgeSAhPSAwOlxcbiAgICAgICAgcmVtID0geCAlIHlcXG4gICAgICAgIHggPSB5XFxuICAgICAgICB5ID0gcmVtXFxuICAgIHJldHVybiB4XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm5ZMlF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgaGV4KG51bWJlcik6XFxuICAgIGlmIG51bWJlciA9PSAwOlxcbiAgICAgICAgcmV0dXJuICcwJ1xcbiAgICByZXMgPSAnJ1xcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgZGlnaXQgPSBudW1iZXIgJSAxNlxcbiAgICAgICAgaWYgZGlnaXQgPD0gOTpcXG4gICAgICAgICAgICBkaWdpdCA9IHN0cihkaWdpdClcXG4gICAgICAgIGVsaWYgZGlnaXQgPD0gMTM6XFxuICAgICAgICAgICAgaWYgZGlnaXQgPD0gMTE6XFxuICAgICAgICAgICAgICAgIGlmIGRpZ2l0ID09IDEwOlxcbiAgICAgICAgICAgICAgICAgICAgZGlnaXQgPSAnQSdcXG4gICAgICAgICAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0ID0gJ0InXFxuICAgICAgICAgICAgZWxpZiBkaWdpdCA9PSAxMjpcXG4gICAgICAgICAgICAgICAgZGlnaXQgPSAnQydcXG4gICAgICAgICAgICBlbHNlOlxcbiAgICAgICAgICAgICAgICBkaWdpdCA9ICdEJ1xcbiAgICAgICAgZWxpZiBkaWdpdCA9PSAxNDpcXG4gICAgICAgICAgICBkaWdpdCA9ICdFJ1xcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICBkaWdpdCA9ICdGJ1xcbiAgICAgICAgcmVzID0gZGlnaXQgKyByZXNcXG4gICAgICAgIG51bWJlciA9IG51bWJlciAvLyAxNlxcbiAgICByZXR1cm4gcmVzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSm9aWGd1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gXCJkZWYgcmVtb3ZlX2RpZ2l0KG51bWJlciwgZGlnaXQpOlxcbiAgICByZXMgPSAwXFxuICAgIHBvd2VyID0gMVxcbiAgICB3aGlsZSBudW1iZXIgPiAwOlxcbiAgICAgICAgY3VyX2RpZ2l0ID0gbnVtYmVyICUgMTBcXG4gICAgICAgIGlmIGN1cl9kaWdpdCAhPSBkaWdpdDpcXG4gICAgICAgICAgICByZXMgPSByZXMgKyBjdXJfZGlnaXQgKiBwb3dlclxcbiAgICAgICAgICAgIHBvd2VyID0gcG93ZXIgKiAxMFxcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyIC8vIDEwXFxuICAgIHJldHVybiByZXNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lKeVpXMXZkbVZmWkdsbmFYUXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2VzExOSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBcImRlZiBzcXVhcmVfZXF1YWwoYSwgYiwgYyk6XFxuICAgIGlmIGEgIT0gMDpcXG4gICAgICAgIEQgPSBiKmIgLSA0KmEqY1xcbiAgICAgICAgaWYgRCA+IDA6XFxuICAgICAgICAgICAgeDEgPSAoLWIgLSBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgeDIgPSAoLWIgKyBzcXJ0KEQpKSAvICgyKmEpXFxuICAgICAgICAgICAgcmV0dXJuIHN0cih4MSkgKyAnIGFuZCAnICsgc3RyKHgyKVxcbiAgICAgICAgZWxpZiBEID09IDA6XFxuICAgICAgICAgICAgcmV0dXJuIHN0cigtYiAvICgyKmEpKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1xcbiAgICBlbHNlOlxcbiAgICAgICAgaWYgYiAhPSAwOlxcbiAgICAgICAgICAgIHJldHVybiBzdHIoLWMgLyBiKVxcbiAgICAgICAgZWxzZTpcXG4gICAgICAgICAgICByZXR1cm4gJ25vIHJvb3RzJ1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUp6Y1hWaGNtVmZaWEYxWVd3dWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5Il19
