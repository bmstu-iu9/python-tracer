import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import SourceCodeViewer from './SourceCodeViewer';
import UserInputViewer from './UserInputViewer';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTask: this.props.tasks[this.props.selectedIndex]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedTask: nextProps.tasks[nextProps.selectedIndex]
        });
    }

    onVerify() {
        return this.props.onVerify(
            this.props.selectedIndex
        )
    }

    render() {
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
                    />
                    <div className="content__block">
                        <Button outline color="success"
                                onClick={this.onVerify.bind(this)}
                                className="content__button"
                        >✅ Проверить</Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Editor;