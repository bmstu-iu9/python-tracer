// Generated from Python.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by PythonParser.
function PythonListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

PythonListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
PythonListener.prototype.constructor = PythonListener;

// Enter a parse tree produced by PythonParser#single_input.
PythonListener.prototype.enterSingle_input = function(ctx) {
};

// Exit a parse tree produced by PythonParser#single_input.
PythonListener.prototype.exitSingle_input = function(ctx) {
};


// Enter a parse tree produced by PythonParser#file_input.
PythonListener.prototype.enterFile_input = function(ctx) {
};

// Exit a parse tree produced by PythonParser#file_input.
PythonListener.prototype.exitFile_input = function(ctx) {
};


// Enter a parse tree produced by PythonParser#eval_input.
PythonListener.prototype.enterEval_input = function(ctx) {
};

// Exit a parse tree produced by PythonParser#eval_input.
PythonListener.prototype.exitEval_input = function(ctx) {
};


// Enter a parse tree produced by PythonParser#decorator.
PythonListener.prototype.enterDecorator = function(ctx) {
};

// Exit a parse tree produced by PythonParser#decorator.
PythonListener.prototype.exitDecorator = function(ctx) {
};


// Enter a parse tree produced by PythonParser#decorators.
PythonListener.prototype.enterDecorators = function(ctx) {
};

// Exit a parse tree produced by PythonParser#decorators.
PythonListener.prototype.exitDecorators = function(ctx) {
};


// Enter a parse tree produced by PythonParser#decorated.
PythonListener.prototype.enterDecorated = function(ctx) {
};

// Exit a parse tree produced by PythonParser#decorated.
PythonListener.prototype.exitDecorated = function(ctx) {
};


// Enter a parse tree produced by PythonParser#async_funcdef.
PythonListener.prototype.enterAsync_funcdef = function(ctx) {
};

// Exit a parse tree produced by PythonParser#async_funcdef.
PythonListener.prototype.exitAsync_funcdef = function(ctx) {
};


// Enter a parse tree produced by PythonParser#funcdef.
PythonListener.prototype.enterFuncdef = function(ctx) {
};

// Exit a parse tree produced by PythonParser#funcdef.
PythonListener.prototype.exitFuncdef = function(ctx) {
};


// Enter a parse tree produced by PythonParser#parameters.
PythonListener.prototype.enterParameters = function(ctx) {
};

// Exit a parse tree produced by PythonParser#parameters.
PythonListener.prototype.exitParameters = function(ctx) {
};


// Enter a parse tree produced by PythonParser#typedargslist.
PythonListener.prototype.enterTypedargslist = function(ctx) {
};

// Exit a parse tree produced by PythonParser#typedargslist.
PythonListener.prototype.exitTypedargslist = function(ctx) {
};


// Enter a parse tree produced by PythonParser#tfpdef.
PythonListener.prototype.enterTfpdef = function(ctx) {
};

// Exit a parse tree produced by PythonParser#tfpdef.
PythonListener.prototype.exitTfpdef = function(ctx) {
};


// Enter a parse tree produced by PythonParser#varargslist.
PythonListener.prototype.enterVarargslist = function(ctx) {
};

// Exit a parse tree produced by PythonParser#varargslist.
PythonListener.prototype.exitVarargslist = function(ctx) {
};


// Enter a parse tree produced by PythonParser#vfpdef.
PythonListener.prototype.enterVfpdef = function(ctx) {
};

// Exit a parse tree produced by PythonParser#vfpdef.
PythonListener.prototype.exitVfpdef = function(ctx) {
};


// Enter a parse tree produced by PythonParser#stmt.
PythonListener.prototype.enterStmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#stmt.
PythonListener.prototype.exitStmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#simple_stmt.
PythonListener.prototype.enterSimple_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#simple_stmt.
PythonListener.prototype.exitSimple_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#small_stmt.
PythonListener.prototype.enterSmall_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#small_stmt.
PythonListener.prototype.exitSmall_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#expr_stmt.
PythonListener.prototype.enterExpr_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#expr_stmt.
PythonListener.prototype.exitExpr_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#annassign.
PythonListener.prototype.enterAnnassign = function(ctx) {
};

// Exit a parse tree produced by PythonParser#annassign.
PythonListener.prototype.exitAnnassign = function(ctx) {
};


// Enter a parse tree produced by PythonParser#testlist_star_expr.
PythonListener.prototype.enterTestlist_star_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#testlist_star_expr.
PythonListener.prototype.exitTestlist_star_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#augassign.
PythonListener.prototype.enterAugassign = function(ctx) {
};

// Exit a parse tree produced by PythonParser#augassign.
PythonListener.prototype.exitAugassign = function(ctx) {
};


// Enter a parse tree produced by PythonParser#del_stmt.
PythonListener.prototype.enterDel_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#del_stmt.
PythonListener.prototype.exitDel_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#pass_stmt.
PythonListener.prototype.enterPass_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#pass_stmt.
PythonListener.prototype.exitPass_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#flow_stmt.
PythonListener.prototype.enterFlow_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#flow_stmt.
PythonListener.prototype.exitFlow_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#break_stmt.
PythonListener.prototype.enterBreak_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#break_stmt.
PythonListener.prototype.exitBreak_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#continue_stmt.
PythonListener.prototype.enterContinue_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#continue_stmt.
PythonListener.prototype.exitContinue_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#return_stmt.
PythonListener.prototype.enterReturn_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#return_stmt.
PythonListener.prototype.exitReturn_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#yield_stmt.
PythonListener.prototype.enterYield_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#yield_stmt.
PythonListener.prototype.exitYield_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#raise_stmt.
PythonListener.prototype.enterRaise_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#raise_stmt.
PythonListener.prototype.exitRaise_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#import_stmt.
PythonListener.prototype.enterImport_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#import_stmt.
PythonListener.prototype.exitImport_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#import_name.
PythonListener.prototype.enterImport_name = function(ctx) {
};

// Exit a parse tree produced by PythonParser#import_name.
PythonListener.prototype.exitImport_name = function(ctx) {
};


// Enter a parse tree produced by PythonParser#import_from.
PythonListener.prototype.enterImport_from = function(ctx) {
};

// Exit a parse tree produced by PythonParser#import_from.
PythonListener.prototype.exitImport_from = function(ctx) {
};


// Enter a parse tree produced by PythonParser#import_as_name.
PythonListener.prototype.enterImport_as_name = function(ctx) {
};

// Exit a parse tree produced by PythonParser#import_as_name.
PythonListener.prototype.exitImport_as_name = function(ctx) {
};


// Enter a parse tree produced by PythonParser#dotted_as_name.
PythonListener.prototype.enterDotted_as_name = function(ctx) {
};

// Exit a parse tree produced by PythonParser#dotted_as_name.
PythonListener.prototype.exitDotted_as_name = function(ctx) {
};


// Enter a parse tree produced by PythonParser#import_as_names.
PythonListener.prototype.enterImport_as_names = function(ctx) {
};

// Exit a parse tree produced by PythonParser#import_as_names.
PythonListener.prototype.exitImport_as_names = function(ctx) {
};


// Enter a parse tree produced by PythonParser#dotted_as_names.
PythonListener.prototype.enterDotted_as_names = function(ctx) {
};

// Exit a parse tree produced by PythonParser#dotted_as_names.
PythonListener.prototype.exitDotted_as_names = function(ctx) {
};


// Enter a parse tree produced by PythonParser#dotted_name.
PythonListener.prototype.enterDotted_name = function(ctx) {
};

// Exit a parse tree produced by PythonParser#dotted_name.
PythonListener.prototype.exitDotted_name = function(ctx) {
};


// Enter a parse tree produced by PythonParser#global_stmt.
PythonListener.prototype.enterGlobal_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#global_stmt.
PythonListener.prototype.exitGlobal_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#nonlocal_stmt.
PythonListener.prototype.enterNonlocal_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#nonlocal_stmt.
PythonListener.prototype.exitNonlocal_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#assert_stmt.
PythonListener.prototype.enterAssert_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#assert_stmt.
PythonListener.prototype.exitAssert_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#compound_stmt.
PythonListener.prototype.enterCompound_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#compound_stmt.
PythonListener.prototype.exitCompound_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#async_stmt.
PythonListener.prototype.enterAsync_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#async_stmt.
PythonListener.prototype.exitAsync_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#if_stmt.
PythonListener.prototype.enterIf_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#if_stmt.
PythonListener.prototype.exitIf_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#while_stmt.
PythonListener.prototype.enterWhile_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#while_stmt.
PythonListener.prototype.exitWhile_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#for_stmt.
PythonListener.prototype.enterFor_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#for_stmt.
PythonListener.prototype.exitFor_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#try_stmt.
PythonListener.prototype.enterTry_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#try_stmt.
PythonListener.prototype.exitTry_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#with_stmt.
PythonListener.prototype.enterWith_stmt = function(ctx) {
};

// Exit a parse tree produced by PythonParser#with_stmt.
PythonListener.prototype.exitWith_stmt = function(ctx) {
};


// Enter a parse tree produced by PythonParser#with_item.
PythonListener.prototype.enterWith_item = function(ctx) {
};

// Exit a parse tree produced by PythonParser#with_item.
PythonListener.prototype.exitWith_item = function(ctx) {
};


// Enter a parse tree produced by PythonParser#except_clause.
PythonListener.prototype.enterExcept_clause = function(ctx) {
};

// Exit a parse tree produced by PythonParser#except_clause.
PythonListener.prototype.exitExcept_clause = function(ctx) {
};


// Enter a parse tree produced by PythonParser#suite.
PythonListener.prototype.enterSuite = function(ctx) {
};

// Exit a parse tree produced by PythonParser#suite.
PythonListener.prototype.exitSuite = function(ctx) {
};


// Enter a parse tree produced by PythonParser#test.
PythonListener.prototype.enterTest = function(ctx) {
};

// Exit a parse tree produced by PythonParser#test.
PythonListener.prototype.exitTest = function(ctx) {
};


// Enter a parse tree produced by PythonParser#test_nocond.
PythonListener.prototype.enterTest_nocond = function(ctx) {
};

// Exit a parse tree produced by PythonParser#test_nocond.
PythonListener.prototype.exitTest_nocond = function(ctx) {
};


// Enter a parse tree produced by PythonParser#lambdef.
PythonListener.prototype.enterLambdef = function(ctx) {
};

// Exit a parse tree produced by PythonParser#lambdef.
PythonListener.prototype.exitLambdef = function(ctx) {
};


// Enter a parse tree produced by PythonParser#lambdef_nocond.
PythonListener.prototype.enterLambdef_nocond = function(ctx) {
};

// Exit a parse tree produced by PythonParser#lambdef_nocond.
PythonListener.prototype.exitLambdef_nocond = function(ctx) {
};


// Enter a parse tree produced by PythonParser#or_test.
PythonListener.prototype.enterOr_test = function(ctx) {
};

// Exit a parse tree produced by PythonParser#or_test.
PythonListener.prototype.exitOr_test = function(ctx) {
};


// Enter a parse tree produced by PythonParser#and_test.
PythonListener.prototype.enterAnd_test = function(ctx) {
};

// Exit a parse tree produced by PythonParser#and_test.
PythonListener.prototype.exitAnd_test = function(ctx) {
};


// Enter a parse tree produced by PythonParser#not_test.
PythonListener.prototype.enterNot_test = function(ctx) {
};

// Exit a parse tree produced by PythonParser#not_test.
PythonListener.prototype.exitNot_test = function(ctx) {
};


// Enter a parse tree produced by PythonParser#comparison.
PythonListener.prototype.enterComparison = function(ctx) {
};

// Exit a parse tree produced by PythonParser#comparison.
PythonListener.prototype.exitComparison = function(ctx) {
};


// Enter a parse tree produced by PythonParser#comp_op.
PythonListener.prototype.enterComp_op = function(ctx) {
};

// Exit a parse tree produced by PythonParser#comp_op.
PythonListener.prototype.exitComp_op = function(ctx) {
};


// Enter a parse tree produced by PythonParser#star_expr.
PythonListener.prototype.enterStar_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#star_expr.
PythonListener.prototype.exitStar_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#expr.
PythonListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#expr.
PythonListener.prototype.exitExpr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#xor_expr.
PythonListener.prototype.enterXor_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#xor_expr.
PythonListener.prototype.exitXor_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#and_expr.
PythonListener.prototype.enterAnd_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#and_expr.
PythonListener.prototype.exitAnd_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#shift_expr.
PythonListener.prototype.enterShift_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#shift_expr.
PythonListener.prototype.exitShift_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#arith_expr.
PythonListener.prototype.enterArith_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#arith_expr.
PythonListener.prototype.exitArith_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#term.
PythonListener.prototype.enterTerm = function(ctx) {
};

// Exit a parse tree produced by PythonParser#term.
PythonListener.prototype.exitTerm = function(ctx) {
};


// Enter a parse tree produced by PythonParser#factor.
PythonListener.prototype.enterFactor = function(ctx) {
};

// Exit a parse tree produced by PythonParser#factor.
PythonListener.prototype.exitFactor = function(ctx) {
};


// Enter a parse tree produced by PythonParser#power.
PythonListener.prototype.enterPower = function(ctx) {
};

// Exit a parse tree produced by PythonParser#power.
PythonListener.prototype.exitPower = function(ctx) {
};


// Enter a parse tree produced by PythonParser#atom_expr.
PythonListener.prototype.enterAtom_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#atom_expr.
PythonListener.prototype.exitAtom_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#atom.
PythonListener.prototype.enterAtom = function(ctx) {
};

// Exit a parse tree produced by PythonParser#atom.
PythonListener.prototype.exitAtom = function(ctx) {
};


// Enter a parse tree produced by PythonParser#testlist_comp.
PythonListener.prototype.enterTestlist_comp = function(ctx) {
};

// Exit a parse tree produced by PythonParser#testlist_comp.
PythonListener.prototype.exitTestlist_comp = function(ctx) {
};


// Enter a parse tree produced by PythonParser#trailer.
PythonListener.prototype.enterTrailer = function(ctx) {
};

// Exit a parse tree produced by PythonParser#trailer.
PythonListener.prototype.exitTrailer = function(ctx) {
};


// Enter a parse tree produced by PythonParser#subscriptlist.
PythonListener.prototype.enterSubscriptlist = function(ctx) {
};

// Exit a parse tree produced by PythonParser#subscriptlist.
PythonListener.prototype.exitSubscriptlist = function(ctx) {
};


// Enter a parse tree produced by PythonParser#subscript.
PythonListener.prototype.enterSubscript = function(ctx) {
};

// Exit a parse tree produced by PythonParser#subscript.
PythonListener.prototype.exitSubscript = function(ctx) {
};


// Enter a parse tree produced by PythonParser#sliceop.
PythonListener.prototype.enterSliceop = function(ctx) {
};

// Exit a parse tree produced by PythonParser#sliceop.
PythonListener.prototype.exitSliceop = function(ctx) {
};


// Enter a parse tree produced by PythonParser#exprlist.
PythonListener.prototype.enterExprlist = function(ctx) {
};

// Exit a parse tree produced by PythonParser#exprlist.
PythonListener.prototype.exitExprlist = function(ctx) {
};


// Enter a parse tree produced by PythonParser#testlist.
PythonListener.prototype.enterTestlist = function(ctx) {
};

// Exit a parse tree produced by PythonParser#testlist.
PythonListener.prototype.exitTestlist = function(ctx) {
};


// Enter a parse tree produced by PythonParser#dictorsetmaker.
PythonListener.prototype.enterDictorsetmaker = function(ctx) {
};

// Exit a parse tree produced by PythonParser#dictorsetmaker.
PythonListener.prototype.exitDictorsetmaker = function(ctx) {
};


// Enter a parse tree produced by PythonParser#classdef.
PythonListener.prototype.enterClassdef = function(ctx) {
};

// Exit a parse tree produced by PythonParser#classdef.
PythonListener.prototype.exitClassdef = function(ctx) {
};


// Enter a parse tree produced by PythonParser#arglist.
PythonListener.prototype.enterArglist = function(ctx) {
};

// Exit a parse tree produced by PythonParser#arglist.
PythonListener.prototype.exitArglist = function(ctx) {
};


// Enter a parse tree produced by PythonParser#argument.
PythonListener.prototype.enterArgument = function(ctx) {
};

// Exit a parse tree produced by PythonParser#argument.
PythonListener.prototype.exitArgument = function(ctx) {
};


// Enter a parse tree produced by PythonParser#comp_iter.
PythonListener.prototype.enterComp_iter = function(ctx) {
};

// Exit a parse tree produced by PythonParser#comp_iter.
PythonListener.prototype.exitComp_iter = function(ctx) {
};


// Enter a parse tree produced by PythonParser#comp_for.
PythonListener.prototype.enterComp_for = function(ctx) {
};

// Exit a parse tree produced by PythonParser#comp_for.
PythonListener.prototype.exitComp_for = function(ctx) {
};


// Enter a parse tree produced by PythonParser#comp_if.
PythonListener.prototype.enterComp_if = function(ctx) {
};

// Exit a parse tree produced by PythonParser#comp_if.
PythonListener.prototype.exitComp_if = function(ctx) {
};


// Enter a parse tree produced by PythonParser#encoding_decl.
PythonListener.prototype.enterEncoding_decl = function(ctx) {
};

// Exit a parse tree produced by PythonParser#encoding_decl.
PythonListener.prototype.exitEncoding_decl = function(ctx) {
};


// Enter a parse tree produced by PythonParser#yield_expr.
PythonListener.prototype.enterYield_expr = function(ctx) {
};

// Exit a parse tree produced by PythonParser#yield_expr.
PythonListener.prototype.exitYield_expr = function(ctx) {
};


// Enter a parse tree produced by PythonParser#yield_arg.
PythonListener.prototype.enterYield_arg = function(ctx) {
};

// Exit a parse tree produced by PythonParser#yield_arg.
PythonListener.prototype.exitYield_arg = function(ctx) {
};



exports.PythonListener = PythonListener;