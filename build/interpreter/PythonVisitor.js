// Generated from src/interpreter/Python.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by PythonParser.

function PythonVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

PythonVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
PythonVisitor.prototype.constructor = PythonVisitor;

// Visit a parse tree produced by PythonParser#single_input.
PythonVisitor.prototype.visitSingle_input = function(ctx) {
};


// Visit a parse tree produced by PythonParser#file_input.
PythonVisitor.prototype.visitFile_input = function(ctx) {
};


// Visit a parse tree produced by PythonParser#eval_input.
PythonVisitor.prototype.visitEval_input = function(ctx) {
};


// Visit a parse tree produced by PythonParser#decorator.
PythonVisitor.prototype.visitDecorator = function(ctx) {
};


// Visit a parse tree produced by PythonParser#decorators.
PythonVisitor.prototype.visitDecorators = function(ctx) {
};


// Visit a parse tree produced by PythonParser#decorated.
PythonVisitor.prototype.visitDecorated = function(ctx) {
};


// Visit a parse tree produced by PythonParser#async_funcdef.
PythonVisitor.prototype.visitAsync_funcdef = function(ctx) {
};


// Visit a parse tree produced by PythonParser#funcdef.
PythonVisitor.prototype.visitFuncdef = function(ctx) {
};


// Visit a parse tree produced by PythonParser#parameters.
PythonVisitor.prototype.visitParameters = function(ctx) {
};


// Visit a parse tree produced by PythonParser#typedargslist.
PythonVisitor.prototype.visitTypedargslist = function(ctx) {
};


// Visit a parse tree produced by PythonParser#tfpdef.
PythonVisitor.prototype.visitTfpdef = function(ctx) {
};


// Visit a parse tree produced by PythonParser#varargslist.
PythonVisitor.prototype.visitVarargslist = function(ctx) {
};


// Visit a parse tree produced by PythonParser#vfpdef.
PythonVisitor.prototype.visitVfpdef = function(ctx) {
};


// Visit a parse tree produced by PythonParser#stmt.
PythonVisitor.prototype.visitStmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#simple_stmt.
PythonVisitor.prototype.visitSimple_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#small_stmt.
PythonVisitor.prototype.visitSmall_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#expr_stmt.
PythonVisitor.prototype.visitExpr_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#annassign.
PythonVisitor.prototype.visitAnnassign = function(ctx) {
};


// Visit a parse tree produced by PythonParser#testlist_star_expr.
PythonVisitor.prototype.visitTestlist_star_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#augassign.
PythonVisitor.prototype.visitAugassign = function(ctx) {
};


// Visit a parse tree produced by PythonParser#del_stmt.
PythonVisitor.prototype.visitDel_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#pass_stmt.
PythonVisitor.prototype.visitPass_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#flow_stmt.
PythonVisitor.prototype.visitFlow_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#break_stmt.
PythonVisitor.prototype.visitBreak_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#continue_stmt.
PythonVisitor.prototype.visitContinue_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#return_stmt.
PythonVisitor.prototype.visitReturn_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#yield_stmt.
PythonVisitor.prototype.visitYield_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#raise_stmt.
PythonVisitor.prototype.visitRaise_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#import_stmt.
PythonVisitor.prototype.visitImport_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#import_name.
PythonVisitor.prototype.visitImport_name = function(ctx) {
};


// Visit a parse tree produced by PythonParser#import_from.
PythonVisitor.prototype.visitImport_from = function(ctx) {
};


// Visit a parse tree produced by PythonParser#import_as_name.
PythonVisitor.prototype.visitImport_as_name = function(ctx) {
};


// Visit a parse tree produced by PythonParser#dotted_as_name.
PythonVisitor.prototype.visitDotted_as_name = function(ctx) {
};


// Visit a parse tree produced by PythonParser#import_as_names.
PythonVisitor.prototype.visitImport_as_names = function(ctx) {
};


// Visit a parse tree produced by PythonParser#dotted_as_names.
PythonVisitor.prototype.visitDotted_as_names = function(ctx) {
};


// Visit a parse tree produced by PythonParser#dotted_name.
PythonVisitor.prototype.visitDotted_name = function(ctx) {
};


// Visit a parse tree produced by PythonParser#global_stmt.
PythonVisitor.prototype.visitGlobal_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#nonlocal_stmt.
PythonVisitor.prototype.visitNonlocal_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#assert_stmt.
PythonVisitor.prototype.visitAssert_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#compound_stmt.
PythonVisitor.prototype.visitCompound_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#async_stmt.
PythonVisitor.prototype.visitAsync_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#if_stmt.
PythonVisitor.prototype.visitIf_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#while_stmt.
PythonVisitor.prototype.visitWhile_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#for_stmt.
PythonVisitor.prototype.visitFor_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#try_stmt.
PythonVisitor.prototype.visitTry_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#with_stmt.
PythonVisitor.prototype.visitWith_stmt = function(ctx) {
};


// Visit a parse tree produced by PythonParser#with_item.
PythonVisitor.prototype.visitWith_item = function(ctx) {
};


// Visit a parse tree produced by PythonParser#except_clause.
PythonVisitor.prototype.visitExcept_clause = function(ctx) {
};


// Visit a parse tree produced by PythonParser#suite.
PythonVisitor.prototype.visitSuite = function(ctx) {
};


// Visit a parse tree produced by PythonParser#test.
PythonVisitor.prototype.visitTest = function(ctx) {
};


// Visit a parse tree produced by PythonParser#test_nocond.
PythonVisitor.prototype.visitTest_nocond = function(ctx) {
};


// Visit a parse tree produced by PythonParser#lambdef.
PythonVisitor.prototype.visitLambdef = function(ctx) {
};


// Visit a parse tree produced by PythonParser#lambdef_nocond.
PythonVisitor.prototype.visitLambdef_nocond = function(ctx) {
};


// Visit a parse tree produced by PythonParser#or_test.
PythonVisitor.prototype.visitOr_test = function(ctx) {
};


// Visit a parse tree produced by PythonParser#and_test.
PythonVisitor.prototype.visitAnd_test = function(ctx) {
};


// Visit a parse tree produced by PythonParser#not_test.
PythonVisitor.prototype.visitNot_test = function(ctx) {
};


// Visit a parse tree produced by PythonParser#comparison.
PythonVisitor.prototype.visitComparison = function(ctx) {
};


// Visit a parse tree produced by PythonParser#comp_op.
PythonVisitor.prototype.visitComp_op = function(ctx) {
};


// Visit a parse tree produced by PythonParser#star_expr.
PythonVisitor.prototype.visitStar_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#expr.
PythonVisitor.prototype.visitExpr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#xor_expr.
PythonVisitor.prototype.visitXor_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#and_expr.
PythonVisitor.prototype.visitAnd_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#shift_expr.
PythonVisitor.prototype.visitShift_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#arith_expr.
PythonVisitor.prototype.visitArith_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#term.
PythonVisitor.prototype.visitTerm = function(ctx) {
};


// Visit a parse tree produced by PythonParser#factor.
PythonVisitor.prototype.visitFactor = function(ctx) {
};


// Visit a parse tree produced by PythonParser#power.
PythonVisitor.prototype.visitPower = function(ctx) {
};


// Visit a parse tree produced by PythonParser#atom_expr.
PythonVisitor.prototype.visitAtom_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#atom.
PythonVisitor.prototype.visitAtom = function(ctx) {
};


// Visit a parse tree produced by PythonParser#testlist_comp.
PythonVisitor.prototype.visitTestlist_comp = function(ctx) {
};


// Visit a parse tree produced by PythonParser#trailer.
PythonVisitor.prototype.visitTrailer = function(ctx) {
};


// Visit a parse tree produced by PythonParser#subscriptlist.
PythonVisitor.prototype.visitSubscriptlist = function(ctx) {
};


// Visit a parse tree produced by PythonParser#subscript.
PythonVisitor.prototype.visitSubscript = function(ctx) {
};


// Visit a parse tree produced by PythonParser#sliceop.
PythonVisitor.prototype.visitSliceop = function(ctx) {
};


// Visit a parse tree produced by PythonParser#exprlist.
PythonVisitor.prototype.visitExprlist = function(ctx) {
};


// Visit a parse tree produced by PythonParser#testlist.
PythonVisitor.prototype.visitTestlist = function(ctx) {
};


// Visit a parse tree produced by PythonParser#dictorsetmaker.
PythonVisitor.prototype.visitDictorsetmaker = function(ctx) {
};


// Visit a parse tree produced by PythonParser#classdef.
PythonVisitor.prototype.visitClassdef = function(ctx) {
};


// Visit a parse tree produced by PythonParser#arglist.
PythonVisitor.prototype.visitArglist = function(ctx) {
};


// Visit a parse tree produced by PythonParser#argument.
PythonVisitor.prototype.visitArgument = function(ctx) {
};


// Visit a parse tree produced by PythonParser#comp_iter.
PythonVisitor.prototype.visitComp_iter = function(ctx) {
};


// Visit a parse tree produced by PythonParser#comp_for.
PythonVisitor.prototype.visitComp_for = function(ctx) {
};


// Visit a parse tree produced by PythonParser#comp_if.
PythonVisitor.prototype.visitComp_if = function(ctx) {
};


// Visit a parse tree produced by PythonParser#encoding_decl.
PythonVisitor.prototype.visitEncoding_decl = function(ctx) {
};


// Visit a parse tree produced by PythonParser#yield_expr.
PythonVisitor.prototype.visitYield_expr = function(ctx) {
};


// Visit a parse tree produced by PythonParser#yield_arg.
PythonVisitor.prototype.visitYield_arg = function(ctx) {
};



exports.PythonVisitor = PythonVisitor;