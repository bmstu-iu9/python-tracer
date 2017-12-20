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
                        // let result = tracer(task.source, task.target).split('\n');
                        // let input = (task.input || '').split('\n');
                        task.attempts =  (task.attempts || 0) + 1;

                        if (task.attempts >= task.maxAttempts) {
                            task.status = 'error';
                            task.message = 'Превышено допустимое количество попыток!',
                            task.solution = `1. def gcd(x = -69, y = -48)
2. if True:
3. x = 69
4. if True:
5. y = 48
6. while True:
7. rem = 21
8. x = 48
9. y = 21
6. while True:
7. rem = 6
8. x = 21
9. y = 6
6. while True:
7. rem = 3
8. x = 6
9. y = 3
6. while True:
7. rem = 0
8. x = 3
9. y = 0
6. while False:
10. return 3`
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