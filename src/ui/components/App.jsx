import React from 'react';
import ReactDOM from 'react-dom';

import {
    Container,
} from 'reactstrap';

import Header from './Header';
import Help from './Help';
import TaskBar from './TaskBar';
import Editor from './Editor';
import Footer from './Footer';

import Task from '../tasks/Task';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: -1,
            tasks: [],
            user: {
                name: '',
                group: ''
            },
            showHelp: false
        };
    }

    componentDidMount() {

        this.onEnter(this.props);

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

    componentWillReceiveProps(nextProps) {
        this.onEnter(nextProps);
    }

    onEnter(props) {
        try {
            let userData = JSON.parse(window.localStorage.getItem('py-tracer'));

            this.setState({
                user: {
                    name: userData.name,
                    group: userData.group
                },
                tasks: userData.tasks.map(task => new Task(task)),
                selectedIndex: 0
            })
        } catch (e) {
            window.localStorage.removeItem('py-tracer');
            props.history.replace('/login');
        }
    }

    onExit() {
        if (confirm('Вы действительно хотите выйти? После повторного входа прогресс выполнения будет потерян.')) {
            window.localStorage.removeItem('py-tracer');

            setTimeout(() => {
                this.props.history.replace('/login');
            }, 100);
        }
    }

    showHelp() {
        this.setState({
            showHelp: true
        });
    }

    hideHelp() {
        this.setState({
            showHelp: false
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
                        task.attempt();
                    }
                    return task
                }
            )
        });

        this.updateStorageData();
    }

    updateTaskInput(selectedIndex, input) {
        this.setState({
            tasks: this.state.tasks.map(
                (task, i) => {
                    if (selectedIndex == i) {
                        task._input = input;
                    }
                    return task
                }
            )
        });

        this.updateStorageData();
    }

    updateStorageData() {
        try {
            let userData = JSON.parse(window.localStorage.getItem('py-tracer'));

            userData.tasks = this.state.tasks;

            window.localStorage.setItem('py-tracer', JSON.stringify(userData));
        } catch (e) {
            alert('Произошла ошибка при сохранении данных. Пожалуйста, перезайдите в систему!');

            window.localStorage.removeItem('py-tracer');
            props.history.replace('/login');
        }
    }

    render() {
        return (
            <Container className="tracer">
                <Header
                    tasks={this.state.tasks}
                    user={this.state.user}
                    onExit={this.onExit.bind(this)}
                    onHelp={this.showHelp.bind(this)}
                />
                <Help
                    visible={this.state.showHelp}
                    onClose={this.hideHelp.bind(this)}
                />
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