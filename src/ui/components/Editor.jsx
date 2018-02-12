import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Fade } from 'reactstrap';
import {Controlled as CodeMirror} from 'react-codemirror2'

import Task from '../tasks/Task';
import SourceCodeViewer from './SourceCodeViewer';
import UserInputViewer from './UserInputViewer';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTask: this.props.tasks[this.props.selectedIndex] || null,
            showSolution: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedTask: nextProps.tasks[nextProps.selectedIndex] || null,
            showSolution: false
        });

        if (this.state.selectedTask && this.state.selectedTask._solution) {
            this.resizeSolutionViewer();
        }
    }

    resizeSolutionViewer() {
        let elem = $(ReactDOM.findDOMNode(this)).find('.solutionViewer .CodeMirror').get(0),
            editor = elem.CodeMirror;

        if (this.state.selectedTask) {
            editor.setSize(
                $(elem.parentNode.parentNode).width(),
                this.state.selectedTask._solution.split('\n').length * editor.defaultTextHeight() + 10
            );
        }
    }

    onVerify() {
        if (this.state.selectedTask) {
            return this.props.onVerify(
                this.props.selectedIndex
            )
        }
    }

    getEnabled() {
        if (this.state.selectedTask) {
            return !~[Task.statuses.BLOCKED, Task.statuses.SUCCESS].indexOf(this.state.selectedTask.status());
        }

        return false;
    }

    toggleShowSolution() {
        this.setState({
            showSolution: !this.state.showSolution
        });
    }

    getShowSolutionButtonText() {
        return this.state.showSolution ? 'Скрыть ответ' : 'Показать ответ';
    }

    render() {
        return (
            <Row className="tracer__editor">
                <Col xs={12} sm={12} md={6} >
                    <SourceCodeViewer task={this.state.selectedTask}/>
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <UserInputViewer
                        task={this.state.selectedTask}
                        selectedIndex={this.props.selectedIndex}
                        onChange={this.props.onUpdateInput}
                        readOnly={!this.getEnabled()}
                    />

                    <div>
                        <div
                            className="content__block content__block--left content__text"
                            hidden={!(this.state.selectedTask && this.state.selectedTask._maxAttempts) || !this.getEnabled()}
                        >
                            Осталось попыток: {this.state.selectedTask ? (this.state.selectedTask._maxAttempts - this.state.selectedTask._attempts) : 0}
                        </div>

                        <div className="content__block content__block--left content__link" hidden={this.getEnabled()}>
                            <a href="javascript:;" onClick={this.toggleShowSolution.bind(this)}>{this.getShowSolutionButtonText()}</a>
                        </div>

                        <div className="content__block content__block--right">
                            <Button
                                disabled={!this.getEnabled()}
                                outline color="success"
                                onClick={this.onVerify.bind(this)}
                                className="content__button"
                            >✅ Проверить</Button>
                        </div>
                        <div className="clearfix"></div>
                    </div>


                    <Fade in={this.state.showSolution}>
                        <CodeMirror className="solutionViewer" value={this.state.selectedTask ? this.state.selectedTask._solution: ""} options={{
                            readOnly: true,
                            lineNumbers: false,
                            mode: 'text/x-python',
                            theme: 'dracula'
                        }}/>
                    </Fade>
                </Col>
            </Row>
        );
    }
}

export default Editor;