const ASTNodes = require('./ASTNodes');

class ASTBuilder {
    constructor() {
        return this;
    }

    getFunction(ctx, scope) {
        return new ASTNodes.FUNCTION_NODE(
            ctx.NAME().getText(),
            this.getParameters(ctx.parameters()),
            this.getSuite(ctx.suite()),
            scope
        );
    }

    getParameters(ctx) {
        return ctx.typedargslist().tfpdef().map(argctx => argctx.NAME().getText());
    }

    getSuite(ctx) {
        if (ctx.simple_stmt()) {
            return this.getSimpleStmt(ctx.simple_stmt());
        } else {
            return ctx.stmt().map(this.getStmt, this);
        }
    }

    getStmt(ctx) {
        if (ctx.simple_stmt()) {
            return this.getSimpleStmt(ctx.simple_stmt());
        } else {
            return this.getCompoundStmt(ctx.compound_stmt());
        }
    }

    getSimpleStmt(ctx) {
        return ctx.small_stmt().map(this.getSmallStmt, this);
    }

    getSmallStmt(ctx) {
        if (ctx.flow_stmt()) {
            return this.getFlowStmt(ctx.flow_stmt());
        } else if (ctx.expr_stmt()) {
            return this.getExprStmt(ctx.expr_stmt());
        }
    }

    getExprStmt(ctx) {
        if (ctx.children[1].getText() === '=') {
            return new ASTNodes.ASSIGN_NODE(
                this.getTestListStartExpr(ctx.testlist_star_expr(0)),
                this.getExprStmtRec(ctx.children.slice(2))
            )
        }
    }

    getExprStmtRec(children) {
        if (children.length === 1) {
            return this.getTestListStartExpr(children[0]);
        }

        return new ASTNodes.ASSIGN_NODE(
            this.getTestListStartExpr(children[0]),
            this.getExprStmtRec(children.slice(2))
        )
    }

    getTestListStartExpr(ctx) {
        return new ASTNodes.LIST_EXPR_NODE(
            ctx.test().map(this.getTest, this)
        )
    }

    getStarExpr(ctx) {
        //
    }

    getFlowStmt(ctx) {
        if (ctx.return_stmt()) {
            return this.getReturnStmt(ctx.return_stmt())
        }
    }

    getReturnStmt(ctx) {
        return new ASTNodes.RETURN_NODE(
            ctx.testlist() ?
                ctx.testlist().test()
                    .map(this.getTest, this) : null
        )
    }

    getExpr(ctx) {
        return new ASTNodes.OR_BIT_NODE(
            ctx.xor_expr().map(this.getXorExpr, this)
        );
    }

    getXorExpr(ctx) {
        return new ASTNodes.XOR_BIT_NODE(
            ctx.and_expr().map(this.getAndExpr, this)
        )
    }

    getAndExpr(ctx) {
        return new ASTNodes.AND_BIT_NODE(
            ctx.shift_expr().map(this.getShiftExpr, this)
        )
    }

    getShiftExpr(ctx) {
        return new ASTNodes.SHIFT_BIT_NODE(
            ctx.children[1] ? ctx.children[1].getText() : null,
            this.getArithExpr(ctx.arith_expr(0)),
            ctx.arith_expr(1) ? this.getArithExpr(ctx.arith_expr(1)) : null
        )
    }

    getArithExpr(ctx) {
        if (ctx.children.length === 1) {
            return this.getTerm(ctx.term(0));
        } else {
            switch (ctx.children[1].getText()) {
                case '+': return new ASTNodes.PLUS_BINARY_NODE([
                    this.getTerm(ctx.term(0)),
                    this.getArithExprRec(ctx.children.slice(2))
                ]);
                case '-': return new ASTNodes.MINUS_BINARY_NODE([
                    this.getTerm(ctx.term(0)),
                    this.getArithExprRec(ctx.children.slice(2))
                ]);
            }
        }
    }

    getArithExprRec(children) {
        if (children.length === 1) {
            return this.getTerm(children[0]);
        } else {
            switch (children[1].getText()) {
                case '+': return new ASTNodes.PLUS_BINARY_NODE([
                    this.getTerm(children[0]),
                    this.getArithExprRec(children.slice(2))
                ]);
                case '-': return new ASTNodes.MINUS_BINARY_NODE([
                    this.getTerm(children[0]),
                    this.getArithExprRec(children.slice(2))
                ]);
            }
        }
    }

    getTerm(ctx) {
        if (ctx.children.length === 1) {
            return this.getFactor(ctx.factor(0));
        } else {
            switch (ctx.children[1].getText()) {
                case '*': return this.getTermRec(
                    ctx.children.slice(3),
                    new ASTNodes.MUL_BINARY_NODE([
                        this.getFactor(ctx.factor(0)),
                        this.getFactor(ctx.factor(1))
                    ])
                );
                case '/': return this.getTermRec(
                    ctx.children.slice(3),
                    new ASTNodes.DIV_BINARY_NODE([
                        this.getFactor(ctx.factor(0)),
                        this.getFactor(ctx.factor(1))
                    ])
                );
                case '%': return this.getTermRec(
                    ctx.children.slice(3),
                    new ASTNodes.MOD_BINARY_NODE([
                        this.getFactor(ctx.factor(0)),
                        this.getFactor(ctx.factor(1))
                    ])
                );
            }
        }
    }

    getTermRec(children, stmt) {
        if (!children.length) {
            return stmt;
        } else {
            switch (ctx.children[0].getText()) {
                case '*': return this.getTermRec(
                    ctx.children.slice(2),
                    new ASTNodes.MUL_BINARY_NODE([
                        stmt,
                        this.getFactor(ctx.factor(1))
                    ])
                );
                case '/': return this.getTermRec(
                    ctx.children.slice(2),
                    new ASTNodes.DIV_BINARY_NODE([
                        stmt,
                        this.getFactor(ctx.factor(1))
                    ])
                );
                case '/': return this.getTermRec(
                    ctx.children.slice(2),
                    new ASTNodes.MOD_BINARY_NODE([
                        stmt,
                        this.getFactor(ctx.factor(1))
                    ])
                );
            }
        }
    }

    getFactor(ctx) {
        switch (ctx.children[0].getText()) {
            case '+': return new ASTNodes.PLUS_UNARY_NODE(
                this.getFactor(ctx.factor())
            );
            case '-': return new ASTNodes.MINUS_UNARY_NODE(
                this.getFactor(ctx.factor())
            );
            case '~': return new ASTNodes.NOT_BIT_NODE(
                this.getFactor(ctx.factor())
            );
            default: return this.getPower(ctx.power())
        }
    }

    getPower(ctx) {
        return new ASTNodes.POWER_NODE(
            this.getAtomExpr(ctx.atom_expr()),
            ctx.factor() ? this.getFactor(ctx.factor()) : null
        )
    }

    getAtomExpr(ctx) {
        return this.getAtom(ctx.atom());
    }

    getAtom(ctx) {
        if (ctx.NAME()) {
            return new ASTNodes.IDENT_NODE(ctx.NAME().getText());
        } else if (ctx.NUMBER()) {
            return new ASTNodes.NUMBER_NODE(ctx.NUMBER().getText());
        } else if (ctx.STRING()) {
            return new ASTNodes.STRING_NODE(ctx.STRING().getText());
        } else if (['True', 'False'].indexOf(ctx.children[0].getText()) !== -1) {
            return new ASTNodes.BOOLEAN_NODE(ctx.children[0].getText())
        }
    }

    getCompoundStmt(ctx) {
        if (ctx.if_stmt()) {
            return this.getIfStmt(ctx.if_stmt());
        }
        else if (ctx.while_stmt()) {
            return this.getWhileStmt(ctx.while_stmt());
        }
    }

    getIfStmt(ctx) {

        let ifBlock = ctx.suite(0),
            elseBlock = ctx.suite(1);

        return new ASTNodes.IF_NODE(
            this.getTest(ctx.test(0)),
            ifBlock ? this.getSuite(ctx.suite(0)) : null,
            elseBlock ? this.getSuite(ctx.suite(1)) : null
        )
    }

    getTest(ctx) {
        return this.getOrTest(ctx.or_test(0));
    }

    getOrTest(ctx) {
        return new ASTNodes.OR_LOGICAL_NODE(
            ctx.and_test().map(this.getAndTest, this)
        );
    }

    getAndTest(ctx) {
        return new ASTNodes.AND_LOGICAL_NODE(
            ctx.not_test().map(this.getNotTest, this)
        )
    }

    getNotTest(ctx) {
        if (ctx.comparison()) {
            return this.getComparison(ctx.comparison());
        } else return new ASTNodes.NOT_LOGICAL_NODE(
            this.getNotTest(ctx.not_test())
        )
    }

    getComparison(ctx) {
        return new ASTNodes.COMPARISON_NODE(
            ctx.comp_op(0) ? ctx.comp_op(0).getText() : null,
            this.getExpr(ctx.expr(0)),
            ctx.expr(1) ? this.getExpr(ctx.expr(1)) : null
        );
    }

    getWhileStmt(ctx) {
        return new ASTNodes.WHILE_NODE(
            this.getTest(ctx.test(0)),
            this.getSuite(ctx.suite(0))
        )
    }
}

module.exports = ASTBuilder;