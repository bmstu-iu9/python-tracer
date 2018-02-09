function isEqual(line1, line2) {
    let regExp = /\s+/g;

    line1 = line1.replace(regExp, '').replace(/"/g, `'`);
    line2 = line2.replace(regExp, '').replace(/"/g, `'`);

    return line1 === line2;
}

class Task {

    constructor(options = {}) {
        this._source = options._source;
        this._target = options._target;
        this._input = options._input || '';
        this._message = options._message ||'';
        this._attempts = options._attempts || 0;
        this._maxAttempts = options._maxAttempts || 10;
        this._status = options._status || Task.statuses.INITIAL;

        this._solution = tracer(this._source, this._target);
    }

    status(status) {
        if (status) {
            this._status = status;
            return this;
        }

        return this._status;
    }

    message(...args) {
        if (args.length == 0) {
            return this._message;
        } else if (args.length == 1) {
            this._message = args[0];
            return this;
        } else if (args.length == 2) {
            this.status(args[0]);
            this.message(args[1]);
            return this;
        }

        return this;
    }

    attempt() {

        if (this.status() == Task.statuses.INITIAL || this.status() == Task.statuses.ERROR) {

            this._attempts++;
            this.verify();

            if (this._attempts >= this._maxAttempts && this.status() !== Task.statuses.SUCCESS) {
                this.status(Task.statuses.BLOCKED);
            }
        }

        return this;
    }

    verify(input) {
        let solution = this._solution.split('\n');

        input = (input || this._input).split('\n');

        if (solution.length >= input.length) {
            let line = 0;

            while (isEqual(solution[line] || '', input[line] || '') && (solution[line] || input[line])) {
                line++;
            }

            if (line == solution.length) {
                this.message(Task.statuses.SUCCESS, `Задание успешно выполнено!`);
            } else {
                this.message(Task.statuses.ERROR, `Неверные значения в строке ${line + 1}`);
            }
        } else {
            this.message(Task.statuses.ERROR, `Неверные значения в строке ${solution.length}`);
        }

        return this;
    }
}

Task.statuses = {
    INITIAL: 0,
    SUCCESS: 1,
    ERROR: 2,
    BLOCKED: 3
};

export default Task;