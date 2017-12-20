const antlr4 = require("antlr4/index");
const ASTBuilder = require('./ASTBuilder');

global.tracer = function(sourceCode, destStatement) {

    const Lexer = require("./PythonLexer");
    const Parser = require("./PythonParser");

    const chars = new antlr4.InputStream(sourceCode + '\n' + destStatement + '\n');
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

    return program.reduce();
};























