var Scope = require('./Scope');

class CONTROL_FLOW_NODE {

}

class UNDEFINED_NODE {
    constructor(name) {
        this.name = name;
    }
    reduce() {
        throw new Error(`Обращение к несуществующей переменной "${this.name}"`)
    }

    toString() {
        return 'undefined';
    }

    valueOf() {
        return 'undefined';
    }
}

class IDENT_NODE {
    constructor(name) {
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

    valueOf() {
        return this.scope.getSymbol(this.name);
    }

    toString() {
        return this.scope.getSymbol(this.name);
    }
}

class NUMERIC_NODE {
    constructor(value) {

        if (typeof value === 'object') {
            value = value.valueOf();
        }

        this.value = value;
    }

    reduce() {
        return this;
    }

    toString() {
        return this.value;
    }

    valueOf() {
        return +this.value;
    }

}

class STRING_NODE {
    constructor(value) {
        this.value = value;
    }

    reduce() {
        return this
    }
}

class BOOLEAN_NODE {
    constructor(value) {
        this.value = !!value;
    }

    reduce() {
        return this
    }

    isTrue() {
        return this.value;
    }

    toString() {
        return this.value ? 'True' : 'False';
    }

    valueOf() {
        return this.value;
    }
}

class NONE_NODE {
    constructor() {

    }

    reduce() {
        return this;
    }

    toString() {
        return this
    }

    valueOf() {
        return this
    }
}

class FUNCTION_NODE {
    constructor(name, args, body) {
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

        var cond = this.condition.reduce(outerScope).valueOf();

        if (cond) {
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

        let cond = this.condition.reduce(outerScope).valueOf();

        if (cond) {
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

        if (!left.length) left = [left];
        if (!right.length) right = [right];

        left.forEach((stmt, i) => {
            if ((stmt instanceof IDENT_NODE) && right[i]) {
                res = ((right[i] instanceof IDENT_NODE) ? right[i].valueOf() : right[i]);
                console.log(`${stmt.name} = ${res}`);
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

            result = this.stmts[i].reduce(outerScope);

            let boolNode = new BOOLEAN_NODE(result);

            if (boolNode.isTrue()) {
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

            result = this.stmts[i].reduce(outerScope);

            let boolNode = new BOOLEAN_NODE(result);

            if (!boolNode.isTrue()) {
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
        return new BOOLEAN_NODE(
            !(new BOOLEAN_NODE(this.stmt))
        );
    }
}

class RETURN_NODE extends CONTROL_FLOW_NODE {
    constructor(stmts) {

        super();

        this.stmts = stmts;
    }

    reduce(outerScope) {

        console.log('RETURN REDUCE:');

        let len = this.stmts.length;

        return len ? this.stmts[len - 1].reduce(outerScope).valueOf() : new NONE_NODE();

    }
}

class OR_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res | new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
        }

        return res;
    }
}

class AND_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res & new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
        }

        return res;
    }
}

class XOR_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res ^ new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
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
        let left = new NUMERIC_NODE(this.stmtLeft.reduce(outerScope)),
            right = this.stmtRight ? new NUMERIC_NODE(this.stmtRight.reduce(outerScope)) : null;

        if (right === null) {
            return left;
        }

        return this.op === '>>' ? new NUMERIC_NODE(left >> right) : new NUMERIC_NODE(left << right);
    }
}

class PLUS_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res + new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
        }

        return res;
    }
}

class MINUS_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res - new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
        }

        return res;
    }
}

class MUL_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res * new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
        }

        return res;
    }
}

class DIV_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res / new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
        }

        return res;
    }
}

class MOD_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let res = new NUMERIC_NODE(this.stmts[0].reduce(outerScope));

        for (let i = 1; i < this.stmts.length; i++) {
            res = new NUMERIC_NODE(res % new NUMERIC_NODE(this.stmts[i].reduce(outerScope)));
        }

        return res;
    }
}

class PLUS_UNARY_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new NUMERIC_NODE( + new NUMERIC_NODE(this.stmt.reduce(outerScope)) );
    }
}

class MINUS_UNARY_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new NUMERIC_NODE( - new NUMERIC_NODE(this.stmt.reduce(outerScope)) );
    }
}

class NOT_BIT_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce(outerScope) {
        return new NUMERIC_NODE( ~ new NUMERIC_NODE(this.stmt.reduce(outerScope)) );
    }
}

class POWER_NODE {
    constructor(stmtLeft, stmtRight) {
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {
        let base = new NUMERIC_NODE(this.stmtLeft.reduce(outerScope)),
            count = this.stmtRight ? new NUMERIC_NODE(this.stmtRight.reduce(outerScope)) : new NUMERIC_NODE(1);

        return new NUMERIC_NODE(Math.pow(base, count));
    }
}

class COMPARISON_NODE {
    constructor(op, stmtLeft, stmtRight) {
        this.op = op;
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce(outerScope) {

        let left = this.stmtLeft.reduce(outerScope).valueOf(),
            right = this.stmtRight ? this.stmtRight.reduce(outerScope).valueOf() : null;

        console.log(`${left} ${this.op} ${right}`);
        if (right === null) {
            return left;
        }

        switch (this.op) {
            case '<': return new BOOLEAN_NODE(left < right);
            case '>': return new BOOLEAN_NODE(left > right);
            case '>=': return new BOOLEAN_NODE(left >= right);
            case '<=': return new BOOLEAN_NODE(left <= right);
            case '==': return new BOOLEAN_NODE(left == right);
            case '!=':
            case '<>': return new BOOLEAN_NODE(left != right);
        }
    }
}

class LIST_EXPR_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        return this.stmts.map(stmt => stmt.reduce(outerScope))
    }
}

class FUNCTION_CALL_NODE {
    constructor(ident, arglist) {

        this.ident = ident;
        this.arglist = arglist;
    }

    reduce(outerScope) {
        var node = this.ident.reduce(outerScope),
            functionNode = node.valueOf();

        if (node instanceof IDENT_NODE) {
            if (functionNode instanceof FUNCTION_NODE) {

                let scope = new Scope(outerScope, functionNode),
                    args = this.arglist.reduce(outerScope);

                Object.keys(functionNode.args).forEach(
                    (argName, index) => {
                        let symbol = args[index] || (new UNDEFINED_NODE());

                        console.log(`${argName} = ${symbol}`);

                        scope.putSymbol(argName, symbol);

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
                throw new Error(`Невозможно вызвать несуществующую функцию "${node.toString()}"!`);
            }
        } else {
            throw new Error('Некорректный вызов функции!');
        }
    }
}

class SUBSCRIPT_NODE {
    constructor(obj, index) {
        this.obj = obj;
        this.index = index;
    }

    reduce(outerScope) {

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
    STRING_NODE,
    BOOLEAN_NODE,
    COMPARISON_NODE,
    MOD_BINARY_NODE,
    LIST_EXPR_NODE,
    NONE_NODE,
    FUNCTION_CALL_NODE,
    SUBSCRIPT_NODE,
    PROPERTY_NODE,
    ARGLIST_NODE
};