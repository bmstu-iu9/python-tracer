import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Button } from 'reactstrap';

import Header from './Header';
import TaskBar from './TaskBar';
import Editor from './Editor';
import Footer from './Footer';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            tasks: this.props.tasks.slice().map(
                task => {
                    task.maxAttempts = task.maxAttempts || 10;
                    task.input = '';
                    task.status = '';
                    task.message = '';
                    task.attempts = 0;
                    task.solution = '';
                    return task;
                }
            )
        };
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).find('.CodeMirror').each((index, elem) => {

            $(window).resize(() => {
                let editor = elem.CodeMirror;
                
                editor.setSize(
                    $(elem.parentNode.parentNode).width(),
                    editor.display.lastWrapHeight
                );
            });
        });
    }

    next() {
        if (this.state.selectedIndex < (this.state.tasks || []).length - 1) {
            this.select(this.state.selectedIndex + 1);
        }
    }

    select(index) {
        this.setState({
            selectedIndex: index
        })
    }

    prev() {
        if (this.state.selectedIndex > 0) {
            this.select(this.state.selectedIndex - 1);
        }
    }

    verify(selectedIndex) {
        this.setState({
            tasks: this.state.tasks.map(
                (task, i) => {
                    if (selectedIndex == i) {
                        return verifyTask(task);
                    }
                    return task
                }
            )
        })
    }

    updateTaskInput(selectedIndex, input) {
        this.setState({
            tasks: this.state.tasks.map(
                (task, i) => {
                    if (selectedIndex == i) {
                        task.input = input;
                    }
                    return task
                }
            )
        })
    }

    render() {
        return (
            <Container className="tracer">
                <Header tasks={this.state.tasks}/>
                <TaskBar
                    onNext={this.next.bind(this)}
                    onPrev={this.prev.bind(this)}
                    onSelect={this.select.bind(this)}
                    tasks={this.state.tasks}
                    selectedIndex={this.state.selectedIndex}
                />
                <Editor
                    onVerify={this.verify.bind(this)}
                    onUpdateInput={this.updateTaskInput.bind(this)}
                    tasks={this.state.tasks}
                    selectedIndex={this.state.selectedIndex}
                />
                <Footer/>
            </Container>
        );
    }
}

export default App;


function verifyTask(task) {
    let trace = tracer(task.source, task.target).split('\n'),
        input = task.input.split('\n');

    if (trace.length >= input.length) {
        let line = 0;

        while (isEqual(trace[line] || '',input[line] || '')) {
            line++;
        }

        if (line == trace.length) {
            task.status = 'success';
            task.message = 'Задание успешно выполнено!';
        } else {
            task.status = 'error';
            task.message = `Некорректная строка: ${line + 1}`;
            task.attempts++;
        }
    } else {
        task.status = 'error';
        task.message = `Некорректная строка: ${trace.length}`;
        task.attempts++;
    }

    if (task.attempts == task.maxAttempts && task.status == 'error') {

        task.message = `Превышено количество попыток!`;
        task.solution = trace.join('\n');
    }

    return task;
}

function isEqual(line1, line2) {
    let regExp = /\s+/g;

    line1 = line1.replace(regExp, '');
    line2 = line2.replace(regExp, '');

    console.log('1', line1);
    console.log('2', line2);

    return line1 === line2;
}