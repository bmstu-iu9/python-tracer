module.exports = function(externalScope) {

    var localSymbolTable = {};

    this.putSymbol = function(s) {

    };

    this.getSymbol = function() {

    };

    this.hasSymbol = function(s) {

    };

    this.print = function() {
        console.log(JSON.stringify(localSymbolTable, null, ' '))
    }
};