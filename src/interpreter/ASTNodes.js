var Scope = require('./Scope');

class NODE {
    text() {
        return this._text;
    }

    line() {
        return this.ctx.start.line;
    }
}

class CONTROL_FLOW_NODE extends NODE {}

class TYPE_NODE extends NODE {}

class ITERABLE extends TYPE_NODE {
    len() {
        return this.val.length;
    }

    elem(index) {
        return this.val[index];
    }
}

class UNDEFINED_NODE extends TYPE_NODE {
    constructor(name) {

        super();

        this.name = name;

        this.type = 'undefined';
    }

    cast() {
        return this;
    }

    reduce() {
        throw new Error(`Обращение к несуществующей переменной "${this.name}"`)
    }

    text() {
        throw new Error(`Обращение к несуществующей переменной "${this.name}"`)
    }

    value() {
        throw new Error(`Обращение к несуществующей переменной "${this.name}"`)
    }
}

class IDENT_NODE extends TYPE_NODE {
    constructor(name) {

        super();

        this.name = name;
        this.scope = new Scope();

        this.type = 'ident';
    }

    reduce(outerScope) {
        this.scope = outerScope;

        if (!this.scope.hasSymbol(this.name)) {
            this.scope.putSymbol(this.name, new UNDEFINED_NODE(this.name));
        }

        return this;
    }

    text() {
        return this.value().text();
    }

    value() {

        let result = this.scope.getSymbol(this.name);

        while (result instanceof IDENT_NODE) {
            result = result.value();
        }

        if (result instanceof UNDEFINED_NODE) {
            throw new Error(`Обращение к несуществующей переменной "${this.name}"`)
        }

        return result;
    }
}

class NUMERIC_NODE extends TYPE_NODE {
    constructor(val) {

        super();

        if (val instanceof TYPE_NODE) {
            this.val = this.cast(val).val;
        } else if (typeof val === 'number') {
            this.val = val;
        } else if (typeof val === 'string') {
            this.val = Number(val);
        } else {
            throw new Error('Невозможно создать числовой тип: ', val);
        }

        this.type = 'numeric';
    }

    cast(obj) {
        if (obj instanceof NUMERIC_NODE) {
            return obj;
        } else if (obj instanceof STRING_NODE) {
            let num = Number(obj.val);

            if (!isNaN(num)) {
                return new NUMERIC_NODE(num);
            }

            throw new Error('Невозможно преобразовать строку в число: ' + obj.val);
        } else if (obj instanceof BOOLEAN_NODE) {
            return new NUMERIC_NODE(+obj.val);
        } else if (obj instanceof NONE_NODE) {
            throw new Error('Невозможно преобразовать None в число!');
        } else if (obj instanceof FUNCTION_NODE) {
            throw new Error('Невозможно преобразовать функцию в число!');
        }
    }

    clone() {
        return new NUMERIC_NODE(this.val);
    }

    reduce() {
        return this;
    }

    value() {
        return this;
    }

    text() {
        return this.val;
    }

}

class INTEGER_NODE extends NUMERIC_NODE {
    constructor(val) {
        super(val);

        this.type = 'int';
    }

    clone() {
        return new INTEGER_NODE(this.val);
    }

    add(value) {
        if (value instanceof INTEGER_NODE || value instanceof BOOLEAN_NODE) {
            return new INTEGER_NODE(this.val + value.val);
        } else if (value instanceof FLOAT_NODE) {
            return new FLOAT_NODE(this.val + value.val);
        }

        throw new Error('Невозможно сложить int и ' + value.type);
    }

    sub(value) {
        if (value instanceof INTEGER_NODE || value instanceof BOOLEAN_NODE) {
            return new INTEGER_NODE(this.val - value.val);
        } else if (value instanceof FLOAT_NODE) {
            return new FLOAT_NODE(this.val - value.val);
        }

        throw new Error('Невозможно вычесть из int: ' + value.type);
    }

    mul(value) {
        if (value instanceof INTEGER_NODE || value instanceof BOOLEAN_NODE) {
            return new INTEGER_NODE(this.val * value.val);
        } else if (value instanceof FLOAT_NODE) {
            return new FLOAT_NODE(this.val * value.val);
        }

        throw new Error('Невозможно умножить int на ' + value.type);
    }

    div(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            let res = this.val / value.val;

            if (Number.isInteger(res)) {
                return new INTEGER_NODE(res);
            }

            return new FLOAT_NODE(res);
        }

        throw new Error('Невозможно поделить int на ' + value.type);
    }

    floor(value) {
        if (value instanceof INTEGER_NODE || value instanceof BOOLEAN_NODE) {
            return new INTEGER_NODE(this.val / value.val >> 0);
        } else if (value instanceof FLOAT_NODE) {
            return new FLOAT_NODE(this.val / value.val >> 0);
        }

        throw new Error('Невозможно поделить int на ' + value.type);
    }

    mod(value) {
        if (value instanceof INTEGER_NODE || value instanceof BOOLEAN_NODE) {
            return new INTEGER_NODE(this.val % value.val);
        } else if (value instanceof FLOAT_NODE) {
            return new FLOAT_NODE(this.val % value.val);
        }

        throw new Error('Невозможно получить остаток от деления int на ' + value.type);
    }

    pow(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            let res = Math.pow(this.val, value.val);

            if (Number.isInteger(res)) {
                return new INTEGER_NODE(res);
            }

            return new FLOAT_NODE(res);
        }

        throw new Error('Невозможно возвести int в степень ' + value.type);
    }
}

class FLOAT_NODE extends NUMERIC_NODE {
    constructor(val) {
        super(val);
    }

    clone() {
        return new FLOAT_NODE(this.val);
    }

    text() {
        if (Number.isInteger(this.val)) {
            return this.val.toFixed(1);
        }

        return this.val;
    }

    add(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            return new FLOAT_NODE(this.val + value.val);
        }

        throw new Error('Невозможно сложить float и ' + value.type);
    }

    sub(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            return new FLOAT_NODE(this.val - value.val);
        }

        throw new Error('Невозможно вычесть из float: ' + value.type);
    }

    mul(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            return new FLOAT_NODE(this.val * value.val);
        }

        throw new Error('Невозможно умножить float на ' + value.type);
    }

    div(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            return new FLOAT_NODE(this.val / value.val);
        }

        throw new Error('Невозможно поделить float на ' + value.type);
    }

    floor(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            return new FLOAT_NODE(this.val / value.val >> 0);
        }

        throw new Error('Невозможно поделить infloatt на ' + value.type);
    }

    mod(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            return new FLOAT_NODE(this.val % value.val);
        }

        throw new Error('Невозможно получить остаток от деления float на ' + value.type);
    }

    pow(value) {
        if (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE) {
            return new FLOAT_NODE(Math.pow(this.val, value.val));
        }

        throw new Error('Невозможно возвести float в степень ' + value.type);
    }
}

class STRING_NODE extends ITERABLE {
    constructor(val) {

        super();

        if (val instanceof TYPE_NODE) {
            this.val = this.cast(val).val;
        } else if (typeof val === 'string') {
            this.val = val.replace(/^'|^"|'$|"$/g, '');
        } else {
            throw new Error('Невозможно создать строковый тип: ', val);
        }
    }

    cast(obj) {
        if (obj instanceof NUMERIC_NODE) {
            return new STRING_NODE(obj.text() + '');
        } else if (obj instanceof STRING_NODE) {
            return obj;
        } else if (obj instanceof BOOLEAN_NODE) {
            throw new Error('Невозможно преобразовать логический тип в строку!');
        } else if (obj instanceof NONE_NODE) {
            throw new Error('Невозможно преобразовать None в строку!');
        } else if (obj instanceof FUNCTION_NODE) {
            throw new Error('Невозможно преобразовать функцию в строку!');
        }
    }

    clone() {
        return new STRING_NODE(this.val);
    }

    elem(index) {

        if (index < 0) {
            index = this.val.length + index;
        }

        if (index >= this.val.length) {
            throw new Error('Index out of range!');
        }

        return new STRING_NODE(this.val[index] || "");
    }

    slice(start, end, step) {
        start = start < 0 ? (this.len() + start) : start;
        end = end < 0 ? (this.len() + end) : end;

        if (start > this.len()) {
            start -= start % this.len();
        }
        if (end > this.len()) {
            end -= end % this.len();
        }

        let res = [],
            i = start;

        //console.log('start: ', start);
        //console.log('end: ', end);
        //console.log('step: ', step);

        while ((start < end) && (i < end) || (end < start) && (i > end)) {
            //console.log(this.elem(i));
            res.push(this.val[i]);
            i += step;
        }

        if (start > end) {
            res.reverse()
        }

        return new STRING_NODE(res.join(''));
    }

    add(value) {
        if (value instanceof STRING_NODE) {
            return new STRING_NODE(this.val + value.val);
        }

        throw new Error('Невозможно выполнить конкатенацию string и ' + value.type);
    }

    value() {
        return this;
    }

    reduce() {
        return this
    }

    text() {
        return `'${this.val}'`;
    }
}

class BOOLEAN_NODE extends TYPE_NODE {
    constructor(val) {

        super();

        if (val instanceof TYPE_NODE) {
            this.val = this.cast(val).val;
        } else if (typeof val === 'boolean') {
            this.val = val;
        } else if (typeof val === 'string') {
            this.val = (val === 'True');
        } else {
            throw new Error('Невозможно создать логический тип: ', val);
        }

        this.type = 'boolean';
    }

    clone() {
        return new BOOLEAN_NODE(this.val);
    }

    cast(obj) {
        if (obj instanceof NUMERIC_NODE) {
            return new BOOLEAN_NODE(obj.val !== 0);
        } else if (obj instanceof STRING_NODE) {
            return new BOOLEAN_NODE(obj.val.trim().length !== 0);
        } else if (obj instanceof BOOLEAN_NODE) {
            return obj;
        } else if (obj instanceof NONE_NODE) {
            throw new Error('Невозможно преобразовать None в строку!');
        } else if (obj instanceof FUNCTION_NODE) {
            throw new Error('Невозможно преобразовать функцию в строку!');
        }
    }

    asInteger() {
        return new INTEGER_NODE(+this.val);
    }

    add(value) {
        return this.asInteger().add(value);
    }

    sub(value) {
        return this.asInteger().sub(value);
    }

    mul(value) {
        return this.asInteger().mul(value);
    }

    div(value) {
        return this.asInteger().div(value);
    }

    floor(value) {
        return this.asInteger().floor(value);
    }

    mod(value) {
        return this.asInteger().mod(value);
    }

    pow(value) {
        return this.asInteger().pow(value);
    }

    reduce() {
        return this
    }

    value() {
        return this;
    }

    text() {
        return this.val ? 'True' : 'False';
    }
}

class NONE_NODE extends TYPE_NODE {
    constructor() {
        super();

        this.val = 'None';
        this.type = 'none';
    }

    clone() {
        return new NONE_NODE();
    }

    cast() {
        return this;
    }

    reduce() {
        return this;
    }

    value() {
        return this;
    }

    text() {
        return 'None';
    }
}

class FUNCTION_NODE extends TYPE_NODE {
    constructor(ctx, name, args, body, external = null) {

        super();

        this.ctx = ctx;
        this.name = name;
        this.args = args || {};
        this.body = body || [];
        this.scope = new Scope(null, this);

        for (let i = 0; i < this.body.length; i++) {
            while (this.body[i].length) {
                this.body[i] = this.body[i][0];
            }
        }

        if (typeof external === 'function') {
            this.external = external;
        }

        this.type = 'function';
    }

    clone() {

        let args = {};

        for (let name in this.args) {
            args[name] = this.args[name].clone()
        }

        let body = this.body.map(stmt => stmt.clone());

        return new FUNCTION_NODE(this.name, args, body, this.external);
    }

    value() {
        return this;
    }

    reduce(outerScope) {
        outerScope.putSymbol(this.name, this);

        return this;
    }
}


class IF_NODE extends CONTROL_FLOW_NODE {
    constructor(ctx, ifBlocks, elseBlock) {

        super();

        this.ctx = ctx;
        this.ifBlocks = ifBlocks;
        this.elseBlock = elseBlock;
    }

    reduce(outerScope) {
        for (let i = 0; i < this.ifBlocks.length; i++) {

            let cond = this.ifBlocks[i].condition.reduce(outerScope),
                flag = new BOOLEAN_NODE(cond.value());

            if (i == 0) {
                this._text = `${this.ifBlocks[i].ctx.start.line}. if ${cond.text()}:`;
            } else {
                this._text += '\n' + `${this.ifBlocks[i].ctx.start.line}. elif ${cond.text()}:`;
            }

            if (flag.val) {
                return this.ifBlocks[i].stmt;
            }
        }

        if (this.elseBlock) {
            this._text += '\n' + `${this.elseBlock.ctx.symbol.line}. else:`;
            return this.elseBlock.stmt || [];
        }

        return [];
    }
}

class WHILE_NODE extends CONTROL_FLOW_NODE {
    constructor(ctx, condition, stmts) {

        super();

        this.ctx = ctx;
        this.condition = condition;
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let cond = this.condition.reduce(outerScope),
            flag = new BOOLEAN_NODE(cond.value());

        this._text = `${this.line()}. while ${cond.text()}:`;

        if (flag.val) {
            return this.stmts.concat(this);
        }

        return [];
    }
}

class ASSIGN_NODE extends NODE {
    constructor(ctx, listLeft, listRight) {

        super();

        this.ctx = ctx;
        this.listLeft = listLeft;
        this.listRight = listRight;
    }

    reduce(outerScope) {

        let res = new NONE_NODE(),
            left = this.listLeft.reduce(outerScope),
            right = this.listRight.reduce(outerScope);

        if (!left.length) left = [left];
        if (!right.length) right = [right];

        let valueMap = {};

        left.forEach((stmt, i) => {
            if ((stmt instanceof IDENT_NODE) && right[i]) {
                res = right[i].value();

                valueMap[stmt.name] = res;

                this._text = `${this.line()}. ${stmt.name} = ${res.text()}`;
            }
        });

        for (let name in valueMap) {
            outerScope.putSymbol(name, valueMap[name]);
        }

        return res;
    }


}

class OR_LOGICAL_NODE extends NODE {
    constructor(stmts) {
        super();

        this.stmts = stmts;
    }

    reduce(outerScope) {
        //console.log('REDUCE LOGICAL OR:');

        let result = new NONE_NODE();
        let strings = [];

        for (let i = 0; i < this.stmts.length; i++) {

            result = this.stmts[i].reduce(outerScope).value();

            strings.push(result.text());

            if (new BOOLEAN_NODE(result).val) {
                this._text = strings.join(' or ');
                return result;
            }
        }

        this._text = strings.join(' or ');
        return result;
    }
}

class AND_LOGICAL_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        //console.log('REDUCE LOGICAL AND:');

        let result = new NONE_NODE();
        let strings = [];

        for (let i = 0; i < this.stmts.length; i++) {

            result = this.stmts[i].reduce(outerScope).value();
            strings.push(result.text());

            if (!(new BOOLEAN_NODE(result).val)) {
                this._text = strings.join(' and ');
                return result;
            }
        }

        this._text = strings.join(' and ');
        return result;
    }
}

class NOT_LOGICAL_NODE extends NODE {
    constructor(stmt) {
        super();
        this.stmt = stmt;
    }

    reduce(outerScope) {

        let result =  new BOOLEAN_NODE(!this.stmt.reduce(outerScope).value().val);

        this._text = result.text();

        return result;
    }
}

class RETURN_NODE extends CONTROL_FLOW_NODE {
    constructor(ctx, stmts) {

        super();

        this.ctx = ctx;
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let len = this.stmts.length,
            res = len ? this.stmts[len - 1].reduce(outerScope).value() : new NONE_NODE();

        this._text = `${this.line()}. return ${res.text()}`;

        return res;
    }
}

class OR_BIT_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new INTEGER_NODE(this.stmts[0].reduce(outerScope).value().val);
        let strings = [res.text()];

        for (let i = 1; i < this.stmts.length; i++) {

            let right = this.stmts[i].reduce(outerScope).value();

            strings.push(right.text());

            res = new INTEGER_NODE(res.val | right.val);
        }

        this._text = strings.join(' | ');

        return res;
    }
}

class AND_BIT_NODE extends NODE {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new INTEGER_NODE(this.stmts[0].reduce(outerScope).value().val);
        let strings = [res.text()];

        for (let i = 1; i < this.stmts.length; i++) {

            let right = this.stmts[i].reduce(outerScope).value();

            strings.push(right.text());

            res = new INTEGER_NODE(res.val & right.val);
        }

        this._text = strings.join(' | ');
        return res;
    }
}

class XOR_BIT_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new INTEGER_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new INTEGER_NODE(res.val ^ this.stmts[i].reduce(outerScope).value().val);
        }

        return res;
    }
}

class SHIFT_BIT_NODE extends NODE  {
    constructor(op, stmtLeft, stmtRight) {

        super();

        this.op = op;
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {
        let left = new INTEGER_NODE(this.stmtLeft.reduce(outerScope).value().val),
            right = this.stmtRight ? new INTEGER_NODE(this.stmtRight.reduce(outerScope).value().val) : null;

        if (right === null) {
            return left;
        }

        return this.op === '>>' ? new INTEGER_NODE(left.val >> right.val) : new INTEGER_NODE(left.val << right.val);
    }
}

class PLUS_BINARY_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {

        let res = this.stmts[0].reduce(outerScope).value(), strings = [res.text()];

        for (let i = 1; i < this.stmts.length; i++) {

            let stmt = this.stmts[i].reduce(outerScope).value();

            res = res.add(stmt);

            strings.push(res.text());
        }

        this._text = strings.join(' + ');

        return res;
    }
}

class MINUS_BINARY_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = this.stmts[0].reduce(outerScope).value();

        for (let i = 1; i < this.stmts.length; i++) {
            let value = this.stmts[i].reduce(outerScope).value();
            if ((res instanceof NUMERIC_NODE || res instanceof BOOLEAN_NODE) &&
                (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE)) {
                res = res.sub(value);
            } else {
                throw new Error('Невозможно выполнить вычитание: ', res.text(), value.text());
            }
        }

        return res;
    }
}

class MUL_BINARY_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = this.stmts[0].reduce(outerScope).value();

        for (let i = 1; i < this.stmts.length; i++) {
            let value = this.stmts[i].reduce(outerScope).value();
            if ((res instanceof NUMERIC_NODE || res instanceof BOOLEAN_NODE) &&
                (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE)) {
                res = res.mul(value);
            } else {
                throw new Error('Невозможно выполнить умножение: ', res.text(), value.text());
            }
        }

        return res;
    }
}

class DIV_BINARY_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = this.stmts[0].reduce(outerScope).value();

        for (let i = 1; i < this.stmts.length; i++) {
            let value = this.stmts[i].reduce(outerScope).value();
            if ((res instanceof NUMERIC_NODE || res instanceof BOOLEAN_NODE) &&
                (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE)) {
                res = res.div(value);
            } else {
                throw new Error('Невозможно выполнить деление: ', res.text(), value.text());
            }
        }

        return res;
    }
}

class FLOOR_DIV_BINARY_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = this.stmts[0].reduce(outerScope).value();

        for (let i = 1; i < this.stmts.length; i++) {
            let value = this.stmts[i].reduce(outerScope).value();
            if ((res instanceof NUMERIC_NODE || res instanceof BOOLEAN_NODE) &&
                (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE)) {
                res = res.floor(value);
            } else {
                throw new Error('Невозможно выполнить целочисленное деление: ', res.text(), value.text());
            }
        }

        return res;
    }
}

class MOD_BINARY_NODE extends NODE  {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = this.stmts[0].reduce(outerScope).value();

        for (let i = 1; i < this.stmts.length; i++) {
            let value = this.stmts[i].reduce(outerScope).value();
            if ((res instanceof NUMERIC_NODE || res instanceof BOOLEAN_NODE) &&
                (value instanceof NUMERIC_NODE || value instanceof BOOLEAN_NODE)) {
                res = res.mod(value);
            } else {
                throw new Error('Невозможно получить остаток от деления: ', res.text(), value.text());
            }
        }

        return res;
    }
}

class PLUS_UNARY_NODE extends NODE {
    constructor(stmt) {
        super();
        this.stmt = stmt;
    }

    reduce(outerScope) {
        let value = this.stmt.reduce(outerScope).value();

        if (value instanceof NUMERIC_NODE) {
            if (value instanceof INTEGER_NODE) {
                return new INTEGER_NODE( + value.val );
            } else if (value instanceof FLOAT_NODE) {
                return new FLOAT_NODE( + value.val );
            }
        } else if (value instanceof BOOLEAN_NODE) {
            return new INTEGER_NODE( + value.val );
        }

        throw new Error('Невозможно изменить знак нечислового типа: ', value.text());
    }
}

class MINUS_UNARY_NODE extends NODE {
    constructor(stmt) {
        super();
        this.stmt = stmt;
    }

    reduce(outerScope) {
        let value = this.stmt.reduce(outerScope).value();

        if (value instanceof NUMERIC_NODE) {
            if (value instanceof INTEGER_NODE) {
                return new INTEGER_NODE( - value.val );
            } else if (value instanceof FLOAT_NODE) {
                return new FLOAT_NODE( - value.val );
            }
        } else if (value instanceof BOOLEAN_NODE) {
            return new INTEGER_NODE( - value.val );
        }

        throw new Error('Невозможно изменить знак нечислового типа: ', value.text());
    }
}

class NOT_BIT_NODE extends NODE {
    constructor(stmt) {
        super();
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new INTEGER_NODE( ~ this.stmt.reduce(outerScope).value().val );
    }
}

class POWER_NODE extends NODE {
    constructor(stmtLeft, stmtRight) {
        super();
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {
        let base = this.stmtLeft.reduce(outerScope).value(),
            count = this.stmtRight ? this.stmtRight.reduce(outerScope).value() : new INTEGER_NODE(1);

        if ((base instanceof NUMERIC_NODE || base instanceof BOOLEAN_NODE) &&
            (count instanceof NUMERIC_NODE || count instanceof BOOLEAN_NODE)) {
            return base.pow(count);
        }

        throw new Error('Невозможно возвести в степень нечисловой тип: ', base.text(), count.text());
    }
}

class COMPARISON_NODE extends NODE {
    constructor(op, stmtLeft, stmtRight) {
        super();
        this.op = op;
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {
        let left = this.stmtLeft.reduce(outerScope).value(),
            right = this.stmtRight ? this.stmtRight.reduce(outerScope).value() : null;

        //console.log(`${left.text()} ${this.op} ${right.text()}`);
        if (right === null) {
            this._text = left.text();
            return left;
        }

        this._text = `${left.text()} ${this.op} ${right.text()}`;

        switch (this.op) {
            case '<': return new BOOLEAN_NODE(left.val < right.val);
            case '>': return new BOOLEAN_NODE(left.val > right.val);
            case '>=': return new BOOLEAN_NODE(left.val >= right.val);
            case '<=': return new BOOLEAN_NODE(left.val <= right.val);
            case '==': return new BOOLEAN_NODE(left.val == right.val);
            case '!=':
            case '<>': return new BOOLEAN_NODE(left.val != right.val);
        }
    }
}

class LIST_EXPR_NODE extends NODE {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        return this.stmts.map(stmt => stmt.reduce(outerScope));
    }
}

class FUNCTION_CALL_NODE extends NODE {
    constructor(ident, arglist) {
        super();

        this.ident = ident;
        this.arglist = arglist;
    }

    reduce(outerScope) {
        var functionNode = this.ident.reduce(outerScope).value();

        if (functionNode instanceof FUNCTION_NODE && functionNode) {

            let scope = new Scope(outerScope, functionNode),
                args = this.arglist.reduce(outerScope),
                argsMap = {};

            Object.keys(functionNode.args).forEach(
                (argName, index) => {
                    let symbol = args[index] || (new UNDEFINED_NODE(argName));

                    argsMap[argName] = symbol.text();

                    scope.putSymbol(argName, symbol.value());

                }
            );

            this._text = '';

            if (functionNode.ctx) {
                this._text = functionNode.line() + '. ';
            }

            if (functionNode.external) {

                this._text += `${functionNode.name}(${Object.keys(argsMap).map(
                        name => argsMap[name]
                ).join(', ')})`;

                return (functionNode.external(args.map(arg => arg.value()), scope) || (new NONE_NODE()));
            } else {
                this._text += `def ${functionNode.name}(${Object.keys(argsMap).map(
                        name => `${name} = ${argsMap[name]}`
                ).join(', ')})`;

                let queue = functionNode.body.slice(),
                    node = null;

                while (queue.length) {

                    node = queue.shift();

                    let res = node.reduce(scope);

                    //console.log(node.text());

                    if (node instanceof CONTROL_FLOW_NODE) {
                        this._text += '\n' + node.text();

                        if (node instanceof RETURN_NODE) {
                            //console.log(this._text);
                            return res;
                        } else {
                            queue.unshift(...res);
                        }
                    } else {
                        this._text += '\n' + node.text();
                    }
                }

                //console.log(this._text);

                return new NONE_NODE();
            }

        } else {
            throw new Error(`Невозможно вызвать несуществующую функцию "${functionNode}"!`);
        }
    }
}

class ELEM_NODE extends NODE  {
    constructor(obj, index) {
        super();
        this.obj = obj;
        this.index = index;
    }

    reduce(outerScope) {
        var obj = this.obj.reduce(outerScope).value(),
            index = this.index.reduce(outerScope).value();

        if ((obj instanceof ITERABLE) && (index instanceof INTEGER_NODE)) {
            return obj.elem(index.val);
        }
    }
}

class SLICE_NODE extends NODE  {
    constructor(obj,start, end, step) {
        super();
        this.obj = obj;
        this.start = start;
        this.end = end;
        this.step = step;
    }

    reduce(outerScope) {
        var obj = this.obj.reduce(outerScope).value();

        if (obj instanceof ITERABLE) {

            //console.log(this.start);
            //console.log(this.end);
            //console.log(this.step);

            let length = obj.len(),
                startIndex = this.start ? this.start.reduce(outerScope).value() : new INTEGER_NODE(0),
                endIndex = this.end ? this.end.reduce(outerScope).value() : new INTEGER_NODE(length),
                step = this.step ? this.step.reduce(outerScope).value() : new INTEGER_NODE(startIndex.val < endIndex.val ? 1 : -1);

            let res = obj.slice(startIndex.val, endIndex.val, step.val);

            this._text = res.text();

            return res;
        }
    }
}

class PROPERTY_NODE extends NODE  {
    constructor(obj, name) {
        super();
        this.obj = obj;
        this.name = name;
    }

    reduce(outerScope) {
        throw new Error('PROPERTY NODE NOT IMPLEMENTED!');
    }
}

class ARRAY_LIST_NODE extends ITERABLE {
    constructor(items = []) {
        super();

        if (!(items instanceof Array)) {
            items = [items];
        }

        this.val = [];
        this.items = items;
    }

    reduce(outerScope) {
        this.val = this.items.map(
            item => item.reduce(outerScope).value()
        );

        //console.log('VAL:::');
        //console.log(this.val);

        return this;
    }

    clone() {
        return new ARRAY_LIST_NODE(
            JSON.parse(JSON.stringify(this.val))
        );
    }

    elem(index) {

        if (index < 0) {
            index = this.len() + index;
        }

        if ((index >= this.len()) || (index < 0)) {
            return null
        }

        //console.log('VAL:::');
        //console.log(this.val[index] instanceof INTEGER_NODE);

        return this.val[index].clone();
    }

    slice(start, end, step) {
        start = start < 0 ? (this.len() + start) : start;
        end = end < 0 ? (this.len() + end) : end;

        if (start > this.len()) {
            start -= start % this.len();
        }
        if (end > this.len()) {
            end -= end % this.len();
        }

        let res = [],
            i = start;

        while ((start < end) && (i < end) || (end < start) && (i > end)) {
            let elem = this.elem(i);

            if (elem !== null) {
                res.push(elem);
            }

            i += step;
        }

        if (start > end) {
            res.reverse()
        }

        res = res.map(node => node.clone());

        let list = new ARRAY_LIST_NODE(res);
        list.val = res;

        return list;
    }

    add(value) {
        if (value instanceof ARRAY_LIST_NODE) {
            let res = new ARRAY_LIST_NODE(this.val.concat(value.val));

            res.val = res.items;

            return res;
        }

        throw new Error('Невозможно выполнить конкатенацию списков: ', this.text(), value.text());
    }

    value() {
        return this;
    }

    text() {
        return `[ ${this.val.map(elem => elem.text()).join(', ')} ]`;
    }
}

class ARGLIST_NODE extends NODE {
    constructor(stmts) {
        super();
        this.stmts = stmts;
    }

    reduce(outerScope) {
        return this.stmts.map(
            stmt => stmt.reduce(outerScope)
        );
    }
}


module.exports = {
    FUNCTION_NODE,
    IF_NODE,
    WHILE_NODE,
    ASSIGN_NODE,
    OR_LOGICAL_NODE,
    AND_LOGICAL_NODE,
    NOT_LOGICAL_NODE,
    RETURN_NODE,
    OR_BIT_NODE,
    AND_BIT_NODE,
    XOR_BIT_NODE,
    SHIFT_BIT_NODE,
    PLUS_BINARY_NODE,
    MINUS_BINARY_NODE,
    MUL_BINARY_NODE,
    DIV_BINARY_NODE,
    PLUS_UNARY_NODE,
    MINUS_UNARY_NODE,
    NOT_BIT_NODE,
    POWER_NODE,
    IDENT_NODE,
    NUMERIC_NODE,
    INTEGER_NODE,
    FLOAT_NODE,
    STRING_NODE,
    BOOLEAN_NODE,
    COMPARISON_NODE,
    MOD_BINARY_NODE,
    LIST_EXPR_NODE,
    NONE_NODE,
    FUNCTION_CALL_NODE,
    ELEM_NODE,
    SLICE_NODE,
    PROPERTY_NODE,
    ARGLIST_NODE,
    FLOOR_DIV_BINARY_NODE,
    ARRAY_LIST_NODE,
    UNDEFINED_NODE
};