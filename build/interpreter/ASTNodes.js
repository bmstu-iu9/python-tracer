var Scope = require('./Scope');

class CONTROL_FLOW_NODE {

}

class TYPE_NODE {

}

class UNDEFINED_NODE extends TYPE_NODE {
    constructor(name) {

        super();

        this.name = name;
    }

    cast() {
        return this;
    }

    reduce() {
        throw new Error(`Обращение к несуществующей переменной "${this.name}"`)
    }

    toString() {
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
    }

    reduce(outerScope) {
        this.scope = outerScope;

        if (!this.scope.hasSymbol(this.name)) {
            this.scope.putSymbol(this.name, new UNDEFINED_NODE(this.name));
        }

        return this;
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

    reduce() {
        return this;
    }

    value() {
        return this;
    }

}

class STRING_NODE extends TYPE_NODE {
    constructor(val) {

        super();

        if (val instanceof TYPE_NODE) {
            this.val = this.cast(val).val;
        } else if (typeof val === 'string') {
            this.val = val.replace(/^'|'$/g, '');
        } else {
            throw new Error('Невозможно создать строковый тип: ', val);
        }
    }

    cast(obj) {
        if (obj instanceof NUMERIC_NODE) {
            return new STRING_NODE(obj.val + '');
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

    value() {
        return this;
    }

    reduce() {
        return this
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

    reduce() {
        return this
    }

    value() {
        return this;
    }
}

class NONE_NODE extends TYPE_NODE {
    constructor() {
        super();

        this.val = 'None';
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
}

class FUNCTION_NODE extends TYPE_NODE {
    constructor(name, args, body) {

        super();

        this.name = name;
        this.args = args || {};
        this.body = body || [];
        this.scope = new Scope(null, this);

        for (let i = 0; i < body.length; i++) {
            while (body[i].length) {
                body[i] = body[i][0];
            }
        }
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
    constructor(condition, ifStmt, elseStmt) {

        super();

        this.condition = condition;
        this.ifStmt = ifStmt;
        this.elseStmt = elseStmt;
    }

    reduce(outerScope) {

        console.log('if');

        var cond = new BOOLEAN_NODE(this.condition.reduce(outerScope).value());

        if (cond.val) {
            return this.ifStmt;
        } else if (this.elseStmt) {
            return this.elseStmt;
        } else {
            return []
        }
    }
}

class WHILE_NODE extends CONTROL_FLOW_NODE {
    constructor(condition, stmts) {

        super();

        this.condition = condition;
        this.stmts = stmts;
    }

    reduce(outerScope) {

        console.log('while');

        let cond = new BOOLEAN_NODE(this.condition.reduce(outerScope).value());

        if (cond.val) {
            return this.stmts.concat(this);
        }

        return [];
    }
}

class ASSIGN_NODE {
    constructor(listLeft, listRight) {
        this.listLeft = listLeft;
        this.listRight = listRight;
    }

    reduce(outerScope) {

        let res = new NONE_NODE(),
            left = this.listLeft.reduce(outerScope),
            right = this.listRight.reduce(outerScope);

        console.log(this.listLeft, this.listRight);

        if (!left.length) left = [left];
        if (!right.length) right = [right];

        left.forEach((stmt, i) => {
            if ((stmt instanceof IDENT_NODE) && right[i]) {
                res = right[i].value();
                console.log(`${stmt.name} = ${res.val}`);
                outerScope.putSymbol(stmt.name, res);
            }
        });

        return res;
    }
}

class OR_LOGICAL_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        console.log('REDUCE LOGICAL OR:');

        let result = new NONE_NODE();

        for (let i = 0; i < this.stmts.length; i++) {

            result = this.stmts[i].reduce(outerScope).value();

            console.log('res = ' + result.val);

            if (new BOOLEAN_NODE(result).val) {
                return result;
            }
        }

        return result;
    }
}

class AND_LOGICAL_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        console.log('REDUCE LOGICAL AND:');

        let result = new NONE_NODE();

        for (let i = 0; i < this.stmts.length; i++) {

            result = this.stmts[i].reduce(outerScope).value();

            if (!(new BOOLEAN_NODE(result).val)) {
                return result;
            }
        }

        return result;
    }
}

class NOT_LOGICAL_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new BOOLEAN_NODE(!this.stmt.reduce(outerScope).value().val);
    }
}

class RETURN_NODE extends CONTROL_FLOW_NODE {
    constructor(stmts) {

        super();

        this.stmts = stmts;
    }

    reduce(outerScope) {
        let len = this.stmts.length,
            res = len ? this.stmts[len - 1].reduce(outerScope).value() : new NONE_NODE();

        console.log(`return ${res.val}`);
        return res;
    }
}

class OR_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res.val | this.stmts[i].reduce(outerScope).value().val);
        }

        return res;
    }
}

class AND_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res.val & this.stmts[i].reduce(outerScope).value().val);
        }

        return res;
    }
}

class XOR_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res.val ^ this.stmts[i].reduce(outerScope).value().val);
        }

        return res;
    }
}

class SHIFT_BIT_NODE {
    constructor(op, stmtLeft, stmtRight) {
        this.op = op;
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {
        let left = new NUMERIC_NODE(this.stmtLeft.reduce(outerScope).value().val),
            right = this.stmtRight ? new NUMERIC_NODE(this.stmtRight.reduce(outerScope).value().val) : null;

        if (right === null) {
            return left;
        }

        return this.op === '>>' ? new NUMERIC_NODE(left.val >> right.val) : new NUMERIC_NODE(left.val << right.val);
    }
}

class PLUS_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = this.stmts[0].reduce(outerScope).value(),
            Type = NUMERIC_NODE;

        if (res instanceof STRING_NODE) {
            Type = STRING_NODE
        }

        console.log(res);

        for (let i = 1; i < this.stmts.length; i++) {

            let stmt = this.stmts[i].reduce(outerScope).value();

            res = new Type(res.val + stmt.val).value();
            console.log(res);
        }

        return res;
    }
}

class MINUS_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res.val - this.stmts[i].reduce(outerScope).value().val);
        }

        return res;
    }
}

class MUL_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {

            console.log(res.val, this.stmts[i].reduce(outerScope).value());

            res = new NUMERIC_NODE(res.val * this.stmts[i].reduce(outerScope).value().val);

            console.log('mul: ', res);
        }

        return res;
    }
}

class DIV_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res.val / this.stmts[i].reduce(outerScope).value().val);
        }

        return res;
    }
}

class FLOOR_DIV_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE((res.val / this.stmts[i].reduce(outerScope).value().val) >> 0);
        }

        return res;
    }
}

class MOD_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope).value().val);

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res.val % this.stmts[i].reduce(outerScope).value().val);
        }

        return res;
    }
}

class PLUS_UNARY_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new NUMERIC_NODE( + this.stmt.reduce(outerScope).value().val );
    }
}

class MINUS_UNARY_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new NUMERIC_NODE( - this.stmt.reduce(outerScope).value().val );
    }
}

class NOT_BIT_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new NUMERIC_NODE( ~ this.stmt.reduce(outerScope).value().val );
    }
}

class POWER_NODE {
    constructor(stmtLeft, stmtRight) {
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {
        let base = this.stmtLeft.reduce(outerScope).value(),
            count = this.stmtRight ? this.stmtRight.reduce(outerScope).value() : new NUMERIC_NODE(1);

        if (base instanceof NUMERIC_NODE && count instanceof NUMERIC_NODE) {
            return new NUMERIC_NODE(Math.pow(base.val, count.val));
        }
    }
}

class COMPARISON_NODE {
    constructor(op, stmtLeft, stmtRight) {
        this.op = op;
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {

        let left = this.stmtLeft.reduce(outerScope).value(),
            right = this.stmtRight ? this.stmtRight.reduce(outerScope).value() : null;

        console.log(`${left.val} ${this.op} ${right.val}`);
        if (right === null) {
            return left;
        }

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

class LIST_EXPR_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        return this.stmts.map(stmt => stmt.reduce(outerScope));
    }
}

class FUNCTION_CALL_NODE {
    constructor(ident, arglist) {

        this.ident = ident;
        this.arglist = arglist;
    }

    reduce(outerScope) {
        var functionNode = this.ident.reduce(outerScope).value();

        if (functionNode instanceof FUNCTION_NODE) {

            let scope = new Scope(outerScope, functionNode),
                args = this.arglist.reduce(outerScope);

            Object.keys(functionNode.args).forEach(
                (argName, index) => {
                    let symbol = args[index] || (new UNDEFINED_NODE(argName));
                    scope.putSymbol(argName, symbol.value());

                }
            );

            let queue = functionNode.body.slice(),
                node = null;

            while (queue.length) {

                node = queue.shift();

                // console.log('*****');
                // console.log(node);
                // console.log('-----');

                if (node instanceof CONTROL_FLOW_NODE) {
                    if (node instanceof RETURN_NODE) {
                        return node.reduce(scope);
                    } else {
                        queue.unshift(...node.reduce(scope));
                    }
                } else {
                    node.reduce(scope);
                }
            }

            return new NONE_NODE();

        } else {
            throw new Error(`Невозможно вызвать несуществующую функцию "${functionNode}"!`);
        }
    }
}

class SUBSCRIPT_NODE {
    constructor(obj, index) {
        this.obj = obj;
        this.index = index;
    }

    reduce(outerScope) {

        outerScope.print();

        var obj = this.obj.reduce(outerScope).value(),
            index = this.index.reduce(outerScope).value();

        if ((obj instanceof STRING_NODE) && (index instanceof NUMERIC_NODE)) {
            return new STRING_NODE(obj.val[index.val]);
        }
    }
}

class PROPERTY_NODE {
    constructor(obj, name) {
        this.obj = obj;
        this.name = name;
    }

    reduce(outerScope) {

    }
}

class ARGLIST_NODE {
    constructor(stmts) {
        this.stmts = stmts || [];
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
    STRING_NODE,
    BOOLEAN_NODE,
    COMPARISON_NODE,
    MOD_BINARY_NODE,
    LIST_EXPR_NODE,
    NONE_NODE,
    FUNCTION_CALL_NODE,
    SUBSCRIPT_NODE,
    PROPERTY_NODE,
    ARGLIST_NODE,
    FLOOR_DIV_BINARY_NODE
};