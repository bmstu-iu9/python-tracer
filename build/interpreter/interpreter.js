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
var builder = new ASTBuilder();

parser.buildParseTrees = true;

var program = builder.buildProgram(
    parser.file_input()
);

//console.log(program.body[1]);

program.execute();























