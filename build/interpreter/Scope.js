module.exports = function(outerScope, owner) {

    var localSymbolTable = {};
    var ownerFunction = owner;

    this.putSymbol = function(key, value) {

        if (typeof value !== 'object') {
            throw new Error(`invalid table symbol "${key}": ${value}`);
        }

        localSymbolTable[key] = value;
    };

    this.getSymbol = function(key) {
        if (key in localSymbolTable) {
            return localSymbolTable[key]
        } else if (outerScope) {
            return outerScope.getSymbol(key);
        } else {
            throw new Error(`can't find symbol "${key}"`);
        }
    };

    this.hasSymbol = function(key) {
        return (key in localSymbolTable) || !!(outerScope && outerScope.hasSymbol(key))
    };

    this.print = function() {
        console.log(JSON.stringify(localSymbolTable, null, ' '));
    };

    this.getFunction = function () {
        return ownerFunction || outerScope.getFunction();
    };
};