var Scope = require('./Scope');

class IDENT_NODE {
    constructor(name, scope) {
        console.log('IDENT CREATED: ' + name);
        this.name = name;
        this.scope = scope;
    }

    reduce() {
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
        console.log('NUMBER CREATED: ' + value);
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
        return 'None';
    }

    valueOf() {
        return null
    }
}

class FUNCTION_NODE {
    constructor(name, args, body) {
        this.name = name;
        this.args = {};
        this.body = body || [];

        for (let i = 0; i < body.length; i++) {
            while (body[i].length) {
                body[i] = body[i][0];
            }
        }
    }

    reduce(outerScope) {
        this.scope = new Scope(outerScope);

        outerScope.putSymbol(this.name, this);

        Object.keys(this.args).forEach(
                argName => this.scope.putSymbol(argName, this.args[argName])
        );
    }

    execute() {
        this.body.map(stmt => stmt.reduce(this.scope))
    }
}

class PROGRAM_NODE {

    constructor(body) {
        this.scope = new Scope();
        this.body = body || [];
    }

    execute() {
        this.body.forEach(
                stmt => stmt.reduce(this.scope)
        );

        this.scope.print();
    }
}

class IF_NODE {
    constructor(condition, ifStmt, elseStmt) {
        this.condition = condition;
        this.ifStmt = ifStmt;
        this.elseStmt = elseStmt;
    }

    reduce(outerScope) {

    }
}

class WHILE_NODE {
    constructor(condition, stmt) {
        this.condition = condition;
        this.stmt = stmt;
    }

    reduce(outerScope) {

    }
}

class ASSIGN_NODE {
    constructor(stmtsLeft, stmtsRight) {
        this.stmtsLeft = stmtsLeft;
        this.stmtsRight = stmtsRight;
    }

    reduce(outerScope) {

        let res = new NONE_NODE();

        stmtsLeft.map(
            stmt => stmt.reduce(outerScope)
        ).forEach((stmt, i) => {
            if (stmt instanceof IDENT_NODE && this.stmtsRight[i]) {
                res = this.stmtsRight[i].reduce(outerScope);
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

        for (let i = 0; i < this.stmts.length; i++) {
            let result = new BOOLEAN_NODE(this.stmts[i].reduce(outerScope));

            if (result.isTrue()) {
                return result;
            }
        }

        return new BOOLEAN_NODE(false);
    }
}

class AND_LOGICAL_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        console.log('REDUCE LOGICAL AND:');

        for (let i = 0; i < this.stmts.length; i++) {
            let result = new BOOLEAN_NODE(this.stmts[i].reduce(outerScope));

            if (!result.isTrue()) {
                return result;
            }
        }

        return new BOOLEAN_NODE(true);
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

class RETURN_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {

        console.log('RETURN REDUCE:');

        let len = this.stmts.length;

        return len ? this.stmts[len - 1].reduce(outerScope) : new NONE_NODE();

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

        console.log('REDUCE COMPARISON:');

        let left = new BOOLEAN_NODE(this.stmtLeft.reduce(outerScope)),
            right = this.stmtRight ? new BOOLEAN_NODE(this.stmtRight.reduce(outerScope)) : null;

        if (right === null) {
            return left;
        }

        switch (this.op) {
            case '<': return new BOOLEAN_NODE(left < right);
            case '>': return new BOOLEAN_NODE(left > right);
            case '>=': return new BOOLEAN_NODE(left >= right);
            case '<=': return new BOOLEAN_NODE(left <= right);
            case '==': return new BOOLEAN_NODE(left === right);
            case '!=':
            case '<>': return new BOOLEAN_NODE(left !== right);
        }
    }
}

class LIST_EXPR_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce(outerScope) {
        let len = this.stmts.length;

        return len ? this.stmts[len - 1].reduce(outerScope) : new NONE_NODE();
    }
}

module.exports = {
    PROGRAM_NODE,
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
    NONE_NODE
};