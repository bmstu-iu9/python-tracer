import TaskFactory from './TaskFactory';

global.generateTasks = function (name, group) {
    return [
        TaskFactory.GCD(true),
        TaskFactory.GCD(false),
        TaskFactory.HEX(),
        TaskFactory.SQUARE_EQUAL(),
        TaskFactory.SQUARE_EQUAL(),
        TaskFactory.REMOVE_DIGIT()
    ];
};