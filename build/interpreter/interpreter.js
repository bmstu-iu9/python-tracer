const fs = require("fs");

const antlr4 = require("antlr4/index");
const Lexer = require("./PythonLexer");
const Parser = require("./PythonParser");
const Listener = require("./PythonListener");

const ASTBuilder = require('./ASTBuilder');
const ASTNodes = require('./ASTNodes');

const DEBUG = false;

if(process.argv.length < 3) {
    console.log("No source given.");
    process.exit(1)
}
const iName = process.argv[2];

if(DEBUG) {
    process.argv.forEach(function (val, no, array) {
        console.log(no + ': ' + val)
    });
}

var input = fs.readFileSync(iName, 'UTF-8');
var chars = new antlr4.InputStream(input);
var lexer = new Lexer.PythonLexer(chars);
var tokens  = new antlr4.CommonTokenStream(lexer);
var parser = new Parser.PythonParser(tokens);

parser.buildParseTrees = true;
var tree = parser.funcdef();

var builder = new ASTBuilder();

var rootNode = builder.getFunction(tree);

//console.log(JSON.stringify(rootNode, null, '  '));

let program = new ASTNodes.PROGRAM_NODE([
    rootNode
]);

program.execute();

//var extractor = new Listener.PythonListener();

//var treeWalker = antlr4.tree.ParseTreeWalker.DEFAULT;
//
// var mainFunction = new Nodes.FUNCTION_NODE('main', [], [], null);
//
// treeWalker.walk = function(listener, t, parentNode) {
//     if (!t.parentNode) {
//         t.parentNode = parentNode;
//     }
//
//     for (var i = 0; i < t.getChildCount(); i++) {
//         t.getChild(i).parentNode = t.parentNode;
//     }
//
//     antlr4.tree.ParseTreeWalker.prototype.walk.apply(this, arguments);
// };
//
//treeWalker.walk(extractor, tree);
//
// //console.log(tree);






















