import React from 'react';
import { Row, Col, Button, Alert } from 'reactstrap';

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

        let solutionLines = (this.state.selectedTask.solution || '').split('\n').map(
            (line, i) => (<div key={i}>{line}</div>)
        );

        return (
            <Row className="tracer__editor">
                <Col xs={6}>
                    <SourceCodeViewer task={this.state.selectedTask}/>
                </Col>
                <Col xs={6}>
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

                    <Alert color="success" isOpen={this.state.showSolution}>
                        {solutionLines}
                    </Alert>
                </Col>
            </Row>
        );
    }
}

export default Editor;