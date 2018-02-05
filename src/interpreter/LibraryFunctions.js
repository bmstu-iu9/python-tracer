
const ASTNodes = require('./ASTNodes');
const Scope = require('./Scope');

function createFunction(name, argv, handler) {
    let args = {};
    argv.forEach(argName => args[argName] = new ASTNodes.UNDEFINED_NODE(argName));
    return new ASTNodes.FUNCTION_NODE(null, name, args, [], handler);
}

module.exports.len = createFunction('len', ['arr'], function(args, scope) {
    let arr = args[0],
        length = 0;

    if (arr instanceof ASTNodes.STRING_NODE) {
        length = arr.val.length;
    } else if (arr instanceof ASTNodes.ARRAY_LIST_NODE) {
        length = arr.items.length;
    }

    return new ASTNodes.INTEGER_NODE(length);
});

module.exports.sqrt = createFunction('sqrt', ['n'], function(args, scope) {
    let n = args[0];

    if (n instanceof ASTNodes.NUMERIC_NODE) {
        return new ASTNodes.FLOAT_NODE(Math.sqrt(n.val));
    }
});

module.exports.str = createFunction('str', ['elem'], function(args, scope) {
    let elem = args[0];

    return new ASTNodes.STRING_NODE(elem);
});