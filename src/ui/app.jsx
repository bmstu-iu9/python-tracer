import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import gcdTask from './tasks/gcd';
import hexTask from './tasks/hex';
import squareEqualTask from './tasks/squareEqual';
import factorizeTask from './tasks/factorize';
import removeDigitTask from './tasks/removeDigit';

const tasks = [
    gcdTask.generate(true),
    gcdTask.generate(false),
    hexTask.generate(),
    // squareEqualTask.generate([1, 2]),
    // squareEqualTask.generate([0, 1]),
    // factorizeTask.generate(),
    // removeDigitTask.generate()
];

ReactDOM.render(
    <App tasks={tasks}/>,
    document.getElementById('app')
);