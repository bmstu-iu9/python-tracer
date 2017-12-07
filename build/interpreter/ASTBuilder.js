const ASTNodes = require('./ASTNodes');

class ASTBuilder {
    constructor() {
        return this;
    }

    buildProgram(ctx, args) {
        let program = new ASTNodes.FUNCTION_NODE(
            '__main__',
            args || {},
            ctx.stmt().map(this.getStmt, this)
        );

        program.execute = function() {
            return program.body.map(
                stmt => stmt.reduce(program.scope)
            )
        };

        return program;
    }

    getFuncDef(ctx) {
        return new ASTNodes.FUNCTION_NODE(
            ctx.NAME().getText(),
            this.getParameters(ctx.parameters()),
            this.getSuite(ctx.suite())
        );
    }

    getParameters(ctx) {

        let args = {};

        if (ctx.typedargslist()) {
            ctx.typedargslist().tfpdef().forEach(argctx =>
                args[argctx.NAME().getText()] = new ASTNodes.NONE_NODE()
            );
        }

        return args;
    }

    getSuite(ctx) {

        //console.log('SUITE');

        if (ctx.simple_stmt()) {
            return this.getSimpleStmt(ctx.simple_stmt());
        } else {
            return ctx.stmt().map(this.getStmt, this);
        }
    }

    getStmt(ctx) {

        //console.log('STMT');

        if (ctx.simple_stmt()) {
            return this.getSimpleStmt(ctx.simple_stmt());
        } else {
            return this.getCompoundStmt(ctx.compound_stmt());
        }
    }

    getSimpleStmt(ctx) {
        //console.log('SIMPLE STMT');
        //return ctx.small_stmt().map(this.getSmallStmt, this);
        return this.getSmallStmt(ctx.small_stmt(0));
    }

    getSmallStmt(ctx) {
        //console.log('SMALL STMT');
        if (ctx.flow_stmt()) {
            return this.getFlowStmt(ctx.flow_stmt());
        } else if (ctx.expr_stmt()) {
            return this.getExprStmt(ctx.expr_stmt());
        }
    }

    getExprStmt(ctx) {
        //console.log('EXPR STMT');
        if (ctx.children.length === 1) {
            return this.getTestListStarExpr(ctx.testlist_star_expr(0))
        }

        if (ctx.children[1].getText() === '=') {
            return new ASTNodes.ASSIGN_NODE(
                this.getTestListStarExpr(ctx.testlist_star_expr(0)),
                this.getExprStmtRec(ctx.children.slice(2))
            )
        }
    }

    getExprStmtRec(children) {
        if (children.length === 1) {
            return this.getTestListStarExpr(children[0]);
        }

        return new ASTNodes.ASSIGN_NODE(
            this.getTestListStarExpr(children[0]),
            this.getExprStmtRec(children.slice(2))
        )
    }

    getTestListStarExpr(ctx) {
        if (ctx.test().length === 1) {
            return this.getTest(ctx.test(0));
        }

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

        if (ctx.xor_expr().length === 1) {
            return this.getXorExpr(ctx.xor_expr(0))
        }

        return new ASTNodes.OR_BIT_NODE(
            ctx.xor_expr().map(this.getXorExpr, this)
        );
    }

    getXorExpr(ctx) {

        if (ctx.and_expr().length === 1) {
            return this.getAndExpr(ctx.and_expr(0))
        }

        return new ASTNodes.XOR_BIT_NODE(
            ctx.and_expr().map(this.getAndExpr, this)
        )
    }

    getAndExpr(ctx) {

        if (ctx.shift_expr().length === 1) {
            return this.getShiftExpr(ctx.shift_expr(0))
        }

        return new ASTNodes.AND_BIT_NODE(
            ctx.shift_expr().map(this.getShiftExpr, this)
        )
    }

    getShiftExpr(ctx) {

        if (!ctx.children[1]) {
            return this.getArithExpr(ctx.arith_expr(0))
        }

        return new ASTNodes.SHIFT_BIT_NODE(
            ctx.children[1] ? ctx.children[1].getText() : null,
            this.getArithExpr(ctx.arith_expr(0)),
            ctx.arith_expr(1) ? this.getArithExpr(ctx.arith_expr(1)) : null
        )
    }

    getArithExpr(ctx) {
        if (ctx.children.length === 1) {
            return this.getTerm(ctx.term(0));
        }

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

    getArithExprRec(children) {
        if (children.length === 1) {
            return this.getTerm(children[0]);
        }

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

    getTerm(ctx) {
        if (ctx.children.length === 1) {
            return this.getFactor(ctx.factor(0));
        }

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
            case '//': return this.getTermRec(
                ctx.children.slice(3),
                new ASTNodes.FLOOR_DIV_BINARY_NODE([
                    this.getFactor(ctx.factor(0)),
                    this.getFactor(ctx.factor(1))
                ])
            );
        }
    }

    getTermRec(children, stmt) {
        if (!children.length) {
            return stmt;
        }

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
            case '%': return this.getTermRec(
                ctx.children.slice(2),
                new ASTNodes.MOD_BINARY_NODE([
                    stmt,
                    this.getFactor(ctx.factor(1))
                ])
            );
            case '//': return this.getTermRec(
                ctx.children.slice(2),
                new ASTNodes.FLOOR_DIV_BINARY_NODE([
                    stmt,
                    this.getFactor(ctx.factor(1))
                ])
            );
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
        if (ctx.children.length === 1) {
            return this.getAtomExpr(ctx.atom_expr())
        }



        return new ASTNodes.POWER_NODE(
            this.getAtomExpr(ctx.atom_expr()),
            this.getFactor(ctx.factor())
        )
    }

    getAtomExpr(ctx) {

        let atomNode = this.getAtom(ctx.atom());

        if (!ctx.trailer().length) {
            return atomNode;
        } else {
            return this.getTrailer(atomNode, ctx.trailer());
        }
    }

    getTrailer(atomNode, trailers) {
        trailers.reverse();

        let trailerCtx = trailers[0],
            childNode = this.getTrailerRec(
                atomNode,
                trailers.slice(1)
            );

        if (trailerCtx.children[0].getText() === '(') {
            return new ASTNodes.FUNCTION_CALL_NODE(
                childNode,
                this.getArgList(trailerCtx.arglist())
            )
        } else if (trailerCtx.children[0].getText() === '[') {
            return new ASTNodes.SUBSCRIPT_NODE(
                childNode,
                this.getSubscriptList(trailerCtx.subscriptlist())
            )
        } else if (trailerCtx.NAME()) {
            return new ASTNodes.PROPERTY_NODE(
                childNode,
                trailerCtx.NAME().getText()
            )
        }
    }

    getTrailerRec(atomNode, trailers) {
        if (!trailers.length) {
            return atomNode
        } else {
            let trailerCtx = trailers[0],
                childNode = this.getTrailerRec(
                    atomNode,
                    trailers.slice(1)
                );

            if (trailerCtx.children[0].getText() === '(') {
                return new ASTNodes.FUNCTION_CALL_NODE(
                    childNode,
                    this.getArgList(trailerCtx.arglist())
                )
            } else if (trailerCtx.children[0].getText() === '[') {
                return new ASTNodes.SUBSCRIPT_NODE(
                    childNode,
                    this.getSubscriptList(trailerCtx.subscriptlist())
                )
            } else if (trailerCtx.NAME()) {
                return new ASTNodes.PROPERTY_NODE(
                    childNode,
                    trailerCtx.NAME().getText()
                )
            }
        }
    }

    getArgList(ctx) {
        return new ASTNodes.ARGLIST_NODE(
            ctx ? ctx.argument().map(this.getArgument, this) : []
        )
    }

    getArgument(ctx) {
        return this.getTest(ctx.test(0))
    }

    getSubscriptList(ctx) {
        return this.getSubscript(ctx.subscript(0));
    }

    getSubscript(ctx) {
        return this.getTest(ctx.test(0));
    }

    getAtom(ctx) {

        let cyrSymbol = ctx.children[0].getText();

        if (ctx.NAME()) {
            return new ASTNodes.IDENT_NODE(ctx.NAME().getText());
        } else if (ctx.NUMBER()) {
            return new ASTNodes.NUMERIC_NODE(ctx.NUMBER().getText());
        } else if (['True', 'False'].indexOf(cyrSymbol) !== -1) {
            return new ASTNodes.BOOLEAN_NODE(cyrSymbol === 'True')
        }  else if (cyrSymbol === 'None') {
            return new ASTNodes.NONE_NODE();
        } else if (ctx.STRING(0)) {
            return new ASTNodes.STRING_NODE(ctx.STRING(0).getText());
        } else if (cyrSymbol === '(' && ctx.testlist_comp()) {
            return this.getTestListComp(ctx.testlist_comp());
        }
    }

    getTestListComp(ctx) {
        if (ctx.test()) {
            return this.getTest(ctx.test(0));
        }
    }

    getCompoundStmt(ctx) {
        if (ctx.if_stmt()) {
            return this.getIfStmt(ctx.if_stmt());
        } else if (ctx.while_stmt()) {
            return this.getWhileStmt(ctx.while_stmt());
        } else if (ctx.funcdef()) {
            return this.getFuncDef(ctx.funcdef());
        }
    }

    getIfStmt(ctx) {

        let ifBlock = ctx.suite(0),
            elseBlock = ctx.suite(1);

        //console.log('IF STMT');

        return new ASTNodes.IF_NODE(
            this.getTest(ctx.test(0)),
            this.getSuite(ctx.suite(0)),
            elseBlock ? this.getSuite(ctx.suite(1)) : null
        )
    }

    getTest(ctx) {
        return this.getOrTest(ctx.or_test(0));
    }

    getOrTest(ctx) {

        if (ctx.and_test().length === 1) {
            return this.getAndTest(ctx.and_test(0))
        }

        return new ASTNodes.OR_LOGICAL_NODE(
            ctx.and_test().map(this.getAndTest, this)
        );
    }

    getAndTest(ctx) {

        if (ctx.not_test().length === 1) {
            return this.getNotTest(ctx.not_test(0))
        }

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

        if (!ctx.comp_op(0)) {
            return this.getExpr(ctx.expr(0));
        }

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