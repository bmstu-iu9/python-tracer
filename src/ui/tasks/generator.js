import Task from './Task';

const tasks = {
    GCD: {
        source: require('./sources/gcd'),
        generator: require('./generators/gcd')
    },

    HEX: {
        source: require('./sources/hex'),
        generator: require('./generators/hex')
    },

    SQUARE_EQUAL: {
        source: require('./sources/square_equal'),
        generator: require('./generators/square_equal')
    },

    REMOVE_DIGIT: {
        source: require('./sources/remove_digit'),
        generator: require('./generators/remove_digit')
    }
};

function generate(taskName, ...genArgs) {

    let task = tasks[taskName];

    return new Task({
        _source: task.source.default,
        _target: task.generator.default(...genArgs)
    });
}

global.generateTasks = function (name, group) {
    return [
        generate('GCD', true),
        generate('GCD', false),
        generate('HEX', false),
        generate('SQUARE_EQUAL'),
        generate('SQUARE_EQUAL'),
        generate('REMOVE_DIGIT')
    ];
};