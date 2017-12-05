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

class NUMBER_NODE {
    constructor(value) {
        console.log('NUMBER CREATED: ' + value);
        this.value = value;
    }

    reduce() {
        return this;
    }

    toString() {
        return +this.value;
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
        this.value = value;
    }

    reduce() {
        return this
    }

    toString() {
        return this.value ? 'True' : 'False';
    }

    valueOf() {
        return this.value ? 'True' : 'False';
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
        return 'None';
    }
}

class PROGRAM_NODE {

    constructor(body) {
        this.scope = new Scope();
        this.body = body || [];
    }

    execute() {
        this.body.forEach(stmt => stmt.reduce());

        this.scope.print();
    }
}

class FUNCTION_NODE {
    constructor(name, args, body, outerScope) {
        this.name = name;
        this.args = {};
        this.body = body || [];
        this.scope = new Scope(outerScope);

        args.forEach(arg => this.scope.putSymbol(arg));

        for (let i = 0; i < body.length; i++) {
            while (body[i].length) {
                body[i] = body[i][0];
            }
        }
    }

    reduce() {
        return this.body.map(stmt => {
            try {
                return stmt.reduce();
            } catch (e) {
                console.log('REDUCE ERROR: ');
                console.log(stmt);
            }
        })
    }
}

class IF_NODE {
    constructor(condition, ifStmt, elseStmt) {
        this.condition = condition;
        this.ifStmt = ifStmt;
        this.elseStmt = elseStmt;
    }

    reduce() {

    }
}

class WHILE_NODE {
    constructor(condition, stmt) {
        this.condition = condition;
        this.stmt = stmt;
    }

    reduce() {

    }
}

class ASSIGN_NODE {
    constructor(stmtsLeft, stmtsRight, scope) {
        this.stmtsLeft = stmtsLeft;
        this.stmtsRight = stmtsRight;
        this.scope = scope;
    }

    reduce() {

        let res = null;

        stmtsLeft.map(
            stmt => stmt.reduce()
        ).forEach((stmt, i) => {
            if (stmt instanceof IDENT_NODE && this.stmtsRight[i]) {
                res = this.stmtsRight[i].reduce();
                this.scope.putSymbol(stmt.name, res.valueOf());
            }
        });

        return res;
    }
}

class OR_LOGICAL_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {

        console.log('REDUCE OR:');

        let arr = this.stmts.map(
            stmt => stmt.reduce()
        );

        for (let i = 0; i < this.stmts.length; i++) {
            if (arr[i].valueOf()) {
                return arr[i];
            }
        }
    }
}

class AND_LOGICAL_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        console.log('REDUCE AND:');

        let arr = this.stmts.map(
            stmt => stmt.reduce()
        );

        for (let i = 0; i < this.stmts.length; i++) {
            if (!arr[i].valueOf()) {
                return new BOOLEAN_NODE(false)
            }
        }

        return arr[arr.length - 1];
    }
}

class NOT_LOGICAL_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce() {
        //TODO
    }
}

class RETURN_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {

        console.log('RETURN REDUCE:');

        let len = this.stmts.length;

        let res = len ? this.stmts[len - 1].reduce() : null;

        return res;
    }
}

class OR_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res |= this.stmts[i].reduce()
        }

        return res;
    }
}

class AND_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res &= this.stmts[i].reduce()
        }

        return res;
    }
}

class XOR_BIT_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res ^= this.stmts[i].reduce()
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

    reduce() {
        let left = this.stmtLeft.reduce(),
            right = this.stmtRight ? this.stmtRight.reduce() : null;

        if (right === null) {
            return left;
        }

        return this.op === '>>' ? left >> right : left << right;
    }
}

class PLUS_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res += this.stmts[i].reduce()
        }

        return res;
    }
}

class MINUS_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res -= this.stmts[i].reduce()
        }

        return res;
    }
}

class MUL_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res *= this.stmts[i].reduce()
        }

        return res;
    }
}

class DIV_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res /= this.stmts[i].reduce()
        }

        return res;
    }
}

class MOD_BINARY_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let res = this.stmts[0].reduce();

        for (let i = 1; i < this.stmts.length; i++) {
            res %= this.stmts[i].reduce()
        }

        return res;
    }
}

class PLUS_UNARY_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce() {
        return +this.stmt.reduce();
    }
}

class MINUS_UNARY_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce() {
        return -this.stmt.reduce();
    }
}

class NOT_BIT_NODE {
    constructor(stmt) {
        this.stmt = stmt;
    }

    reduce() {
        return  ~this.stmt.reduce();
    }
}

class POWER_NODE {
    constructor(stmtLeft, stmtRight) {
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce() {
        let base = this.stmtLeft.reduce(),
            count = this.stmtRight ? this.stmtRight.reduce() : 1;

        return Math.pow(base, count);
    }
}

class COMPARISON_NODE {
    constructor(op, stmtLeft, stmtRight) {
        this.op = op;
        this.stmtLeft = stmtLeft;
        this.stmtRight = stmtRight;
    }

    reduce() {

        console.log('REDUCE COMPARISON:');

        let left = this.stmtLeft.reduce(),
            right = this.stmtRight ? this.stmtRight.reduce() : null;

        if (right === null) {
            return left;
        }

        switch (this.op) {
            case '<': return left < right;
            case '>': return left > right;
            case '>=': return left >= right;
            case '<=': return left <= right;
            case '==': return left == right;
            case '!=':
            case '<>': return left != right;
        }
    }
}

class LIST_EXPR_NODE {
    constructor(stmts) {
        this.stmts = stmts;
    }

    reduce() {
        let len = this.stmts.length;

        return len ? this.stmts[len - 1].reduce() : null;
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
    NUMBER_NODE,
    STRING_NODE,
    BOOLEAN_NODE,
    COMPARISON_NODE,
    MOD_BINARY_NODE,
    LIST_EXPR_NODE
};