import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Fade } from 'reactstrap';
import {Controlled as CodeMirror} from 'react-codemirror2'

import SourceCodeViewer from './SourceCodeViewer';
import UserInputViewer from './UserInputViewer';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTask: this.props.tasks[this.props.selectedIndex],
            showSolution: this.props.tasks[this.props.selectedIndex].showSolution || false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedTask: nextProps.tasks[nextProps.selectedIndex],
            showSolution: nextProps.tasks[nextProps.selectedIndex].showSolution || false
        });

        if (this.state.selectedTask.solution) {
            this.resizeSolutionViewer();
        }
    }

    resizeSolutionViewer() {
        let elem = $(ReactDOM.findDOMNode(this)).find('.solutionViewer .CodeMirror').get(0),
            editor = elem.CodeMirror;

        editor.setSize(
            $(elem.parentNode.parentNode).width(),
            this.state.selectedTask.solution.split('\n').length * editor.defaultTextHeight() + 10
        );
    }

    onVerify() {
        return this.props.onVerify(
            this.props.selectedIndex
        )
    }

    getEnabled() {

        let task = this.state.selectedTask;

        return ((task.maxAttempts || Infinity) - (task.attempts || 0)) > 0;
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
                            hidden={!this.state.selectedTask.maxAttempts || !this.getEnabled()}
                        >
                            Осталось попыток: {this.state.selectedTask.maxAttempts - (this.state.selectedTask.attempts || 0)}
                        </div>

                        <div className="content__block content__block--left content__link" hidden={this.getEnabled()}>
                            <a href="#" onClick={this.toggleShowSolution.bind(this)}>{this.getShowSolutionButtonText()}</a>
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
                        <CodeMirror className="solutionViewer" value={this.state.selectedTask.solution} options={{
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