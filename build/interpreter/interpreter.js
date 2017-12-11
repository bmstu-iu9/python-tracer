const fs = require("fs");

const antlr4 = require("antlr4/index");
const Lexer = require("./PythonLexer");
const Parser = require("./PythonParser");
const ASTBuilder = require('./ASTBuilder');

if(process.argv.length < 3) {
    console.log("No source given.");
    process.exit(1)
}

const iName = process.argv[2];

const input = fs.readFileSync(iName, 'UTF-8');
const chars = new antlr4.InputStream(input);
const lexer = new Lexer.PythonLexer(chars);
const tokens  = new antlr4.CommonTokenStream(lexer);
const parser = new Parser.PythonParser(tokens);
const builder = new ASTBuilder();

parser.buildParseTrees = true;

const program = builder.buildProgram(parser.file_input());

const libraryFunctions = require('./LibraryFunctions');

Object.keys(libraryFunctions).forEach(
    name => program.include(name, libraryFunctions[name])
);

program.execute();























