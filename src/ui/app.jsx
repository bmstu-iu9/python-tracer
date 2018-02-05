import React from 'react';

import ReactDOM from 'react-dom';
import App from './components/App';

import taskFactory from './tasks/TaskFactory';

const tasks = [
    taskFactory.GCD(true),
    taskFactory.GCD(false),
    taskFactory.HEX(),
    taskFactory.SQUARE_EQUAL(),
    taskFactory.SQUARE_EQUAL(),
    taskFactory.REMOVE_DIGIT()
];


ReactDOM.render(
    <App tasks={tasks}/>,
    document.getElementById('app')
);