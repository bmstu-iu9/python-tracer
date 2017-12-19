import React from 'react';

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
            tasks: this.props.tasks.slice()
        };
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
                        let m = Math.random() * 2 >> 0;
                        if (m >= 1) {
                            task.status = 'error';
                            task.message = 'Некорректные входные данные в строке 0'
                        } else {
                            task.status = 'success';
                            task.message = 'Решение успешно прошло проверку'
                        }
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