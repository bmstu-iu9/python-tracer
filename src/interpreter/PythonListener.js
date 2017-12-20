// Generated from src/interpreter/Python.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');
var ASTNodes = require('./ASTNodes');

// This class defines a complete listener for a parse tree produced by PythonParser.
function PythonListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

PythonListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
PythonListener.prototype.constructor = PythonListener;

// Enter a parse tree produced by PythonParser#single_input.
PythonListener.prototype.enterSingle_input = function(ctx) { console.log('enterSingle_input');
};

// Exit a parse tree produced by PythonParser#single_input.
PythonListener.prototype.exitSingle_input = function(ctx) { console.log('exitSingle_input');
};


// Enter a parse tree produced by PythonParser#file_input.
PythonListener.prototype.enterFile_input = function(ctx) { console.log('enterFile_input');
};

// Exit a parse tree produced by PythonParser#file_input.
PythonListener.prototype.exitFile_input = function(ctx) { console.log('exitFile_input');
};


// Enter a parse tree produced by PythonParser#eval_input.
PythonListener.prototype.enterEval_input = function(ctx) { console.log('enterEval_input');
};

// Exit a parse tree produced by PythonParser#eval_input.
PythonListener.prototype.exitEval_input = function(ctx) { console.log('exitEval_input');
};


// Enter a parse tree produced by PythonParser#decorator.
PythonListener.prototype.enterDecorator = function(ctx) { console.log('enterDecorator');
};

// Exit a parse tree produced by PythonParser#decorator.
PythonListener.prototype.exitDecorator = function(ctx) { console.log('exitDecorator');
};


// Enter a parse tree produced by PythonParser#decorators.
PythonListener.prototype.enterDecorators = function(ctx) { console.log('enterDecorators');
};

// Exit a parse tree produced by PythonParser#decorators.
PythonListener.prototype.exitDecorators = function(ctx) { console.log('exitDecorators');
};


// Enter a parse tree produced by PythonParser#decorated.
PythonListener.prototype.enterDecorated = function(ctx) { console.log('enterDecorated');
};

// Exit a parse tree produced by PythonParser#decorated.
PythonListener.prototype.exitDecorated = function(ctx) { console.log('exitDecorated');
};


// Enter a parse tree produced by PythonParser#async_funcdef.
PythonListener.prototype.enterAsync_funcdef = function(ctx) { console.log('enterAsync_funcdef');
};

// Exit a parse tree produced by PythonParser#async_funcdef.
PythonListener.prototype.exitAsync_funcdef = function(ctx) { console.log('exitAsync_funcdef');
};


// Enter a parse tree produced by PythonParser#funcdef.
PythonListener.prototype.enterFuncdef = function(ctx) { console.log('enterFuncdef');
	return new ASTNodes.FUNCTION_NODE(
		ctx.NAME().getText(),
		this.enterParameters(ctx.parameters)
	);
};

// Exit a parse tree produced by PythonParser#funcdef.
PythonListener.prototype.exitFuncdef = function(ctx) {
};


// Enter a parse tree produced by PythonParser#parameters.
PythonListener.prototype.enterParameters = function(ctx) { console.log('enterParameters');
};

// Exit a parse tree produced by PythonParser#parameters.
PythonListener.prototype.exitParameters = function(ctx) { console.log('exitParameters');
};


// Enter a parse tree produced by PythonParser#typedargslist.
PythonListener.prototype.enterTypedargslist = function(ctx) { console.log('enterTypedargslist');
};

// Exit a parse tree produced by PythonParser#typedargslist.
PythonListener.prototype.exitTypedargslist = function(ctx) { console.log('exitTypedargslist');
};


// Enter a parse tree produced by PythonParser#tfpdef.
PythonListener.prototype.enterTfpdef = function(ctx) {
	console.log('enterTfpdef');
};

// Exit a parse tree produced by PythonParser#tfpdef.
PythonListener.prototype.exitTfpdef = function(ctx) { console.log('exitTfpdef');
};


// Enter a parse tree produced by PythonParser#varargslist.
PythonListener.prototype.enterVarargslist = function(ctx) { console.log('enterVarargslist');
};

// Exit a parse tree produced by PythonParser#varargslist.
PythonListener.prototype.exitVarargslist = function(ctx) { console.log('exitVarargslist');
};


// Enter a parse tree produced by PythonParser#vfpdef.
PythonListener.prototype.enterVfpdef = function(ctx) { console.log('enterVfpdef');
};

// Exit a parse tree produced by PythonParser#vfpdef.
PythonListener.prototype.exitVfpdef = function(ctx) { console.log('exitVfpdef');
};


// Enter a parse tree produced by PythonParser#stmt.
PythonListener.prototype.enterStmt = function(ctx) { console.log('enterStmt');
};

// Exit a parse tree produced by PythonParser#stmt.
PythonListener.prototype.exitStmt = function(ctx) { console.log('exitStmt');
};


// Enter a parse tree produced by PythonParser#simple_stmt.
PythonListener.prototype.enterSimple_stmt = function(ctx) { console.log('enterSimple_stmt');
};

// Exit a parse tree produced by PythonParser#simple_stmt.
PythonListener.prototype.exitSimple_stmt = function(ctx) { console.log('exitSimple_stmt');
};


// Enter a parse tree produced by PythonParser#small_stmt.
PythonListener.prototype.enterSmall_stmt = function(ctx) { console.log('enterSmall_stmt');
};

// Exit a parse tree produced by PythonParser#small_stmt.
PythonListener.prototype.exitSmall_stmt = function(ctx) { console.log('exitSmall_stmt');
};


// Enter a parse tree produced by PythonParser#expr_stmt.
PythonListener.prototype.enterExpr_stmt = function(ctx) { console.log('enterExpr_stmt');
};

// Exit a parse tree produced by PythonParser#expr_stmt.
PythonListener.prototype.exitExpr_stmt = function(ctx) { console.log('exitExpr_stmt');
};


// Enter a parse tree produced by PythonParser#annassign.
PythonListener.prototype.enterAnnassign = function(ctx) { console.log('enterAnnassign');
};

// Exit a parse tree produced by PythonParser#annassign.
PythonListener.prototype.exitAnnassign = function(ctx) { console.log('exitAnnassign');
};


// Enter a parse tree produced by PythonParser#testlist_star_expr.
PythonListener.prototype.enterTestlist_star_expr = function(ctx) { console.log('enterTestlist_star_expr');
};

// Exit a parse tree produced by PythonParser#testlist_star_expr.
PythonListener.prototype.exitTestlist_star_expr = function(ctx) { console.log('exitTestlist_star_expr');
};


// Enter a parse tree produced by PythonParser#augassign.
PythonListener.prototype.enterAugassign = function(ctx) { console.log('enterAugassign');
};

// Exit a parse tree produced by PythonParser#augassign.
PythonListener.prototype.exitAugassign = function(ctx) { console.log('exitAugassign');
};


// Enter a parse tree produced by PythonParser#del_stmt.
PythonListener.prototype.enterDel_stmt = function(ctx) { console.log('enterDel_stmt');
};

// Exit a parse tree produced by PythonParser#del_stmt.
PythonListener.prototype.exitDel_stmt = function(ctx) { console.log('exitDel_stmt');
};


// Enter a parse tree produced by PythonParser#pass_stmt.
PythonListener.prototype.enterPass_stmt = function(ctx) { console.log('enterPass_stmt');
};

// Exit a parse tree produced by PythonParser#pass_stmt.
PythonListener.prototype.exitPass_stmt = function(ctx) { console.log('exitPass_stmt');
};


// Enter a parse tree produced by PythonParser#flow_stmt.
PythonListener.prototype.enterFlow_stmt = function(ctx) { console.log('enterFlow_stmt');
};

// Exit a parse tree produced by PythonParser#flow_stmt.
PythonListener.prototype.exitFlow_stmt = function(ctx) { console.log('exitFlow_stmt');
};


// Enter a parse tree produced by PythonParser#break_stmt.
PythonListener.prototype.enterBreak_stmt = function(ctx) { console.log('enterBreak_stmt');
};

// Exit a parse tree produced by PythonParser#break_stmt.
PythonListener.prototype.exitBreak_stmt = function(ctx) { console.log('exitBreak_stmt');
};


// Enter a parse tree produced by PythonParser#continue_stmt.
PythonListener.prototype.enterContinue_stmt = function(ctx) { console.log('enterContinue_stmt');
};

// Exit a parse tree produced by PythonParser#continue_stmt.
PythonListener.prototype.exitContinue_stmt = function(ctx) { console.log('exitContinue_stmt');
};


// Enter a parse tree produced by PythonParser#return_stmt.
PythonListener.prototype.enterReturn_stmt = function(ctx) { console.log('enterReturn_stmt');
};

// Exit a parse tree produced by PythonParser#return_stmt.
PythonListener.prototype.exitReturn_stmt = function(ctx) { console.log('exitReturn_stmt');
};


// Enter a parse tree produced by PythonParser#yield_stmt.
PythonListener.prototype.enterYield_stmt = function(ctx) { console.log('enterYield_stmt');
};

// Exit a parse tree produced by PythonParser#yield_stmt.
PythonListener.prototype.exitYield_stmt = function(ctx) { console.log('exitYield_stmt');
};


// Enter a parse tree produced by PythonParser#raise_stmt.
PythonListener.prototype.enterRaise_stmt = function(ctx) { console.log('enterRaise_stmt');
};

// Exit a parse tree produced by PythonParser#raise_stmt.
PythonListener.prototype.exitRaise_stmt = function(ctx) { console.log('exitRaise_stmt');
};


// Enter a parse tree produced by PythonParser#import_stmt.
PythonListener.prototype.enterImport_stmt = function(ctx) { console.log('enterImport_stmt');
};

// Exit a parse tree produced by PythonParser#import_stmt.
PythonListener.prototype.exitImport_stmt = function(ctx) { console.log('exitImport_stmt');
};


// Enter a parse tree produced by PythonParser#import_name.
PythonListener.prototype.enterImport_name = function(ctx) { console.log('enterImport_name');
};

// Exit a parse tree produced by PythonParser#import_name.
PythonListener.prototype.exitImport_name = function(ctx) { console.log('exitImport_name');
};


// Enter a parse tree produced by PythonParser#import_from.
PythonListener.prototype.enterImport_from = function(ctx) { console.log('enterImport_from');
};

// Exit a parse tree produced by PythonParser#import_from.
PythonListener.prototype.exitImport_from = function(ctx) { console.log('exitImport_from');
};


// Enter a parse tree produced by PythonParser#import_as_name.
PythonListener.prototype.enterImport_as_name = function(ctx) { console.log('enterImport_as_name');
};

// Exit a parse tree produced by PythonParser#import_as_name.
PythonListener.prototype.exitImport_as_name = function(ctx) { console.log('exitImport_as_name');
};


// Enter a parse tree produced by PythonParser#dotted_as_name.
PythonListener.prototype.enterDotted_as_name = function(ctx) { console.log('enterDotted_as_name');
};

// Exit a parse tree produced by PythonParser#dotted_as_name.
PythonListener.prototype.exitDotted_as_name = function(ctx) { console.log('exitDotted_as_name');
};


// Enter a parse tree produced by PythonParser#import_as_names.
PythonListener.prototype.enterImport_as_names = function(ctx) { console.log('enterImport_as_names');
};

// Exit a parse tree produced by PythonParser#import_as_names.
PythonListener.prototype.exitImport_as_names = function(ctx) { console.log('exitImport_as_names');
};


// Enter a parse tree produced by PythonParser#dotted_as_names.
PythonListener.prototype.enterDotted_as_names = function(ctx) { console.log('enterDotted_as_names');
};

// Exit a parse tree produced by PythonParser#dotted_as_names.
PythonListener.prototype.exitDotted_as_names = function(ctx) { console.log('exitDotted_as_names');
};


// Enter a parse tree produced by PythonParser#dotted_name.
PythonListener.prototype.enterDotted_name = function(ctx) { console.log('enterDotted_name');
};

// Exit a parse tree produced by PythonParser#dotted_name.
PythonListener.prototype.exitDotted_name = function(ctx) { console.log('exitDotted_name');
};


// Enter a parse tree produced by PythonParser#global_stmt.
PythonListener.prototype.enterGlobal_stmt = function(ctx) { console.log('enterGlobal_stmt');
};

// Exit a parse tree produced by PythonParser#global_stmt.
PythonListener.prototype.exitGlobal_stmt = function(ctx) { console.log('exitGlobal_stmt');
};


// Enter a parse tree produced by PythonParser#nonlocal_stmt.
PythonListener.prototype.enterNonlocal_stmt = function(ctx) { console.log('enterNonlocal_stmt');
};

// Exit a parse tree produced by PythonParser#nonlocal_stmt.
PythonListener.prototype.exitNonlocal_stmt = function(ctx) { console.log('exitNonlocal_stmt');
};


// Enter a parse tree produced by PythonParser#assert_stmt.
PythonListener.prototype.enterAssert_stmt = function(ctx) { console.log('enterAssert_stmt');
};

// Exit a parse tree produced by PythonParser#assert_stmt.
PythonListener.prototype.exitAssert_stmt = function(ctx) { console.log('exitAssert_stmt');
};


// Enter a parse tree produced by PythonParser#compound_stmt.
PythonListener.prototype.enterCompound_stmt = function(ctx) { console.log('enterCompound_stmt');
};

// Exit a parse tree produced by PythonParser#compound_stmt.
PythonListener.prototype.exitCompound_stmt = function(ctx) { console.log('exitCompound_stmt');
};


// Enter a parse tree produced by PythonParser#async_stmt.
PythonListener.prototype.enterAsync_stmt = function(ctx) { console.log('enterAsync_stmt');
};

// Exit a parse tree produced by PythonParser#async_stmt.
PythonListener.prototype.exitAsync_stmt = function(ctx) { console.log('exitAsync_stmt');
};


// Enter a parse tree produced by PythonParser#if_stmt.
PythonListener.prototype.enterIf_stmt = function(ctx) { console.log('enterIf_stmt');
};

// Exit a parse tree produced by PythonParser#if_stmt.
PythonListener.prototype.exitIf_stmt = function(ctx) { console.log('exitIf_stmt');
};


// Enter a parse tree produced by PythonParser#while_stmt.
PythonListener.prototype.enterWhile_stmt = function(ctx) { console.log('enterWhile_stmt');
};

// Exit a parse tree produced by PythonParser#while_stmt.
PythonListener.prototype.exitWhile_stmt = function(ctx) { console.log('exitWhile_stmt');
};


// Enter a parse tree produced by PythonParser#for_stmt.
PythonListener.prototype.enterFor_stmt = function(ctx) { console.log('enterFor_stmt');
};

// Exit a parse tree produced by PythonParser#for_stmt.
PythonListener.prototype.exitFor_stmt = function(ctx) { console.log('exitFor_stmt');
};


// Enter a parse tree produced by PythonParser#try_stmt.
PythonListener.prototype.enterTry_stmt = function(ctx) { console.log('enterTry_stmt');
};

// Exit a parse tree produced by PythonParser#try_stmt.
PythonListener.prototype.exitTry_stmt = function(ctx) { console.log('exitTry_stmt');
};


// Enter a parse tree produced by PythonParser#with_stmt.
PythonListener.prototype.enterWith_stmt = function(ctx) { console.log('enterWith_stmt');
};

// Exit a parse tree produced by PythonParser#with_stmt.
PythonListener.prototype.exitWith_stmt = function(ctx) { console.log('exitWith_stmt');
};


// Enter a parse tree produced by PythonParser#with_item.
PythonListener.prototype.enterWith_item = function(ctx) { console.log('enterWith_item');
};

// Exit a parse tree produced by PythonParser#with_item.
PythonListener.prototype.exitWith_item = function(ctx) { console.log('exitWith_item');
};


// Enter a parse tree produced by PythonParser#except_clause.
PythonListener.prototype.enterExcept_clause = function(ctx) { console.log('enterExcept_clause');
};

// Exit a parse tree produced by PythonParser#except_clause.
PythonListener.prototype.exitExcept_clause = function(ctx) { console.log('exitExcept_clause');
};


// Enter a parse tree produced by PythonParser#suite.
PythonListener.prototype.enterSuite = function(ctx) { console.log('enterSuite');
};

// Exit a parse tree produced by PythonParser#suite.
PythonListener.prototype.exitSuite = function(ctx) { console.log('exitSuite');
};


// Enter a parse tree produced by PythonParser#test.
PythonListener.prototype.enterTest = function(ctx) { console.log('enterTest');
};

// Exit a parse tree produced by PythonParser#test.
PythonListener.prototype.exitTest = function(ctx) { console.log('exitTest');
};


// Enter a parse tree produced by PythonParser#test_nocond.
PythonListener.prototype.enterTest_nocond = function(ctx) { console.log('enterTest_nocond');
};

// Exit a parse tree produced by PythonParser#test_nocond.
PythonListener.prototype.exitTest_nocond = function(ctx) { console.log('exitTest_nocond');
};


// Enter a parse tree produced by PythonParser#lambdef.
PythonListener.prototype.enterLambdef = function(ctx) { console.log('enterLambdef');
};

// Exit a parse tree produced by PythonParser#lambdef.
PythonListener.prototype.exitLambdef = function(ctx) { console.log('exitLambdef');
};


// Enter a parse tree produced by PythonParser#lambdef_nocond.
PythonListener.prototype.enterLambdef_nocond = function(ctx) { console.log('enterLambdef_nocond');
};

// Exit a parse tree produced by PythonParser#lambdef_nocond.
PythonListener.prototype.exitLambdef_nocond = function(ctx) { console.log('exitLambdef_nocond');
};


// Enter a parse tree produced by PythonParser#or_test.
PythonListener.prototype.enterOr_test = function(ctx) { console.log('enterOr_test');
};

// Exit a parse tree produced by PythonParser#or_test.
PythonListener.prototype.exitOr_test = function(ctx) { console.log('exitOr_test');
};


// Enter a parse tree produced by PythonParser#and_test.
PythonListener.prototype.enterAnd_test = function(ctx) { console.log('enterAnd_test');
};

// Exit a parse tree produced by PythonParser#and_test.
PythonListener.prototype.exitAnd_test = function(ctx) { console.log('exitAnd_test');
};


// Enter a parse tree produced by PythonParser#not_test.
PythonListener.prototype.enterNot_test = function(ctx) { console.log('enterNot_test');
};

// Exit a parse tree produced by PythonParser#not_test.
PythonListener.prototype.exitNot_test = function(ctx) { console.log('exitNot_test');
};


// Enter a parse tree produced by PythonParser#comparison.
PythonListener.prototype.enterComparison = function(ctx) { console.log('enterComparison');
};

// Exit a parse tree produced by PythonParser#comparison.
PythonListener.prototype.exitComparison = function(ctx) { console.log('exitComparison');
};


// Enter a parse tree produced by PythonParser#comp_op.
PythonListener.prototype.enterComp_op = function(ctx) { console.log('enterComp_op');
};

// Exit a parse tree produced by PythonParser#comp_op.
PythonListener.prototype.exitComp_op = function(ctx) { console.log('exitComp_op');
};


// Enter a parse tree produced by PythonParser#star_expr.
PythonListener.prototype.enterStar_expr = function(ctx) { console.log('enterStar_expr');
};

// Exit a parse tree produced by PythonParser#star_expr.
PythonListener.prototype.exitStar_expr = function(ctx) { console.log('exitStar_expr');
};


// Enter a parse tree produced by PythonParser#expr.
PythonListener.prototype.enterExpr = function(ctx) { console.log('enterExpr');
};

// Exit a parse tree produced by PythonParser#expr.
PythonListener.prototype.exitExpr = function(ctx) { console.log('exitExpr');
};


// Enter a parse tree produced by PythonParser#xor_expr.
PythonListener.prototype.enterXor_expr = function(ctx) { console.log('enterXor_expr');
};

// Exit a parse tree produced by PythonParser#xor_expr.
PythonListener.prototype.exitXor_expr = function(ctx) { console.log('exitXor_expr');
};


// Enter a parse tree produced by PythonParser#and_expr.
PythonListener.prototype.enterAnd_expr = function(ctx) { console.log('enterAnd_expr');
};

// Exit a parse tree produced by PythonParser#and_expr.
PythonListener.prototype.exitAnd_expr = function(ctx) { console.log('exitAnd_expr');
};


// Enter a parse tree produced by PythonParser#shift_expr.
PythonListener.prototype.enterShift_expr = function(ctx) { console.log('enterShift_expr');
};

// Exit a parse tree produced by PythonParser#shift_expr.
PythonListener.prototype.exitShift_expr = function(ctx) { console.log('exitShift_expr');
};


// Enter a parse tree produced by PythonParser#arith_expr.
PythonListener.prototype.enterArith_expr = function(ctx) { console.log('enterArith_expr');
};

// Exit a parse tree produced by PythonParser#arith_expr.
PythonListener.prototype.exitArith_expr = function(ctx) { console.log('exitArith_expr');
};


// Enter a parse tree produced by PythonParser#term.
PythonListener.prototype.enterTerm = function(ctx) { console.log('enterTerm');
};

// Exit a parse tree produced by PythonParser#term.
PythonListener.prototype.exitTerm = function(ctx) { console.log('exitTerm');
};


// Enter a parse tree produced by PythonParser#factor.
PythonListener.prototype.enterFactor = function(ctx) { console.log('enterFactor');
};

// Exit a parse tree produced by PythonParser#factor.
PythonListener.prototype.exitFactor = function(ctx) { console.log('exitFactor');
};


// Enter a parse tree produced by PythonParser#power.
PythonListener.prototype.enterPower = function(ctx) { console.log('enterPower');
};

// Exit a parse tree produced by PythonParser#power.
PythonListener.prototype.exitPower = function(ctx) { console.log('exitPower');
};


// Enter a parse tree produced by PythonParser#atom_expr.
PythonListener.prototype.enterAtom_expr = function(ctx) { console.log('enterAtom_expr');
};

// Exit a parse tree produced by PythonParser#atom_expr.
PythonListener.prototype.exitAtom_expr = function(ctx) { console.log('exitAtom_expr');
};


// Enter a parse tree produced by PythonParser#atom.
PythonListener.prototype.enterAtom = function(ctx) { console.log('enterAtom');
};

// Exit a parse tree produced by PythonParser#atom.
PythonListener.prototype.exitAtom = function(ctx) { console.log('exitAtom');
};


// Enter a parse tree produced by PythonParser#testlist_comp.
PythonListener.prototype.enterTestlist_comp = function(ctx) { console.log('enterTestlist_comp');
};

// Exit a parse tree produced by PythonParser#testlist_comp.
PythonListener.prototype.exitTestlist_comp = function(ctx) { console.log('exitTestlist_comp');
};


// Enter a parse tree produced by PythonParser#trailer.
PythonListener.prototype.enterTrailer = function(ctx) { console.log('enterTrailer');
};

// Exit a parse tree produced by PythonParser#trailer.
PythonListener.prototype.exitTrailer = function(ctx) { console.log('exitTrailer');
};


// Enter a parse tree produced by PythonParser#subscriptlist.
PythonListener.prototype.enterSubscriptlist = function(ctx) { console.log('enterSubscriptlist');
};

// Exit a parse tree produced by PythonParser#subscriptlist.
PythonListener.prototype.exitSubscriptlist = function(ctx) { console.log('exitSubscriptlist');
};


// Enter a parse tree produced by PythonParser#subscript.
PythonListener.prototype.enterSubscript = function(ctx) { console.log('enterSubscript');
};

// Exit a parse tree produced by PythonParser#subscript.
PythonListener.prototype.exitSubscript = function(ctx) { console.log('exitSubscript');
};


// Enter a parse tree produced by PythonParser#sliceop.
PythonListener.prototype.enterSliceop = function(ctx) { console.log('enterSliceop');
};

// Exit a parse tree produced by PythonParser#sliceop.
PythonListener.prototype.exitSliceop = function(ctx) { console.log('exitSliceop');
};


// Enter a parse tree produced by PythonParser#exprlist.
PythonListener.prototype.enterExprlist = function(ctx) { console.log('enterExprlist');
};

// Exit a parse tree produced by PythonParser#exprlist.
PythonListener.prototype.exitExprlist = function(ctx) { console.log('exitExprlist');
};


// Enter a parse tree produced by PythonParser#testlist.
PythonListener.prototype.enterTestlist = function(ctx) { console.log('enterTestlist');
};

// Exit a parse tree produced by PythonParser#testlist.
PythonListener.prototype.exitTestlist = function(ctx) { console.log('exitTestlist');
};


// Enter a parse tree produced by PythonParser#dictorsetmaker.
PythonListener.prototype.enterDictorsetmaker = function(ctx) { console.log('enterDictorsetmaker');
};

// Exit a parse tree produced by PythonParser#dictorsetmaker.
PythonListener.prototype.exitDictorsetmaker = function(ctx) { console.log('exitDictorsetmaker');
};


// Enter a parse tree produced by PythonParser#classdef.
PythonListener.prototype.enterClassdef = function(ctx) { console.log('enterClassdef');
};

// Exit a parse tree produced by PythonParser#classdef.
PythonListener.prototype.exitClassdef = function(ctx) { console.log('exitClassdef');
};


// Enter a parse tree produced by PythonParser#arglist.
PythonListener.prototype.enterArglist = function(ctx) { console.log('enterArglist');
};

// Exit a parse tree produced by PythonParser#arglist.
PythonListener.prototype.exitArglist = function(ctx) { console.log('exitArglist');
};


// Enter a parse tree produced by PythonParser#argument.
PythonListener.prototype.enterArgument = function(ctx) { console.log('enterArgument');
};

// Exit a parse tree produced by PythonParser#argument.
PythonListener.prototype.exitArgument = function(ctx) { console.log('exitArgument');
};


// Enter a parse tree produced by PythonParser#comp_iter.
PythonListener.prototype.enterComp_iter = function(ctx) { console.log('enterComp_iter');
};

// Exit a parse tree produced by PythonParser#comp_iter.
PythonListener.prototype.exitComp_iter = function(ctx) { console.log('exitComp_iter');
};


// Enter a parse tree produced by PythonParser#comp_for.
PythonListener.prototype.enterComp_for = function(ctx) { console.log('enterComp_for');
};

// Exit a parse tree produced by PythonParser#comp_for.
PythonListener.prototype.exitComp_for = function(ctx) { console.log('exitComp_for');
};


// Enter a parse tree produced by PythonParser#comp_if.
PythonListener.prototype.enterComp_if = function(ctx) { console.log('enterComp_if');
};

// Exit a parse tree produced by PythonParser#comp_if.
PythonListener.prototype.exitComp_if = function(ctx) { console.log('exitComp_if');
};


// Enter a parse tree produced by PythonParser#encoding_decl.
PythonListener.prototype.enterEncoding_decl = function(ctx) { console.log('enterEncoding_decl');
};

// Exit a parse tree produced by PythonParser#encoding_decl.
PythonListener.prototype.exitEncoding_decl = function(ctx) { console.log('exitEncoding_decl');
};


// Enter a parse tree produced by PythonParser#yield_expr.
PythonListener.prototype.enterYield_expr = function(ctx) { console.log('enterYield_expr');
};

// Exit a parse tree produced by PythonParser#yield_expr.
PythonListener.prototype.exitYield_expr = function(ctx) { console.log('exitYield_expr');
};


// Enter a parse tree produced by PythonParser#yield_arg.
PythonListener.prototype.enterYield_arg = function(ctx) { console.log('enterYield_arg');
};

// Exit a parse tree produced by PythonParser#yield_arg.
PythonListener.prototype.exitYield_arg = function(ctx) { console.log('exitYield_arg');
};



exports.PythonListener = PythonListener;