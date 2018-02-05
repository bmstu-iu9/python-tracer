import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'reactstrap';

import Header from './Header';
import TaskBar from './TaskBar';
import Editor from './Editor';
import Footer from './Footer';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            tasks: this.props.tasks
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
                        task.attempt();
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
                        task._input = input;
                    }
                    return task
                }
            )
        })
    }

    render() {
        return (
            <Container className="tracer">
                <Header tasks={this.state.tasks} user={{ name: 'Сергей Головань', group: 'ИУ9-82'}}/>
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