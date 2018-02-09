import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import TaskIndicator from './TaskIndicator';

class TaskBar extends React.Component {
    render() {
        const tasks = (this.props.tasks || []).map(
            (task, i) => <TaskIndicator
                onClick={this.props.onSelect}
                status={task.status()}
                isActive={this.props.selectedIndex == i}
                key={i}
                index={i}
            />
        );

        return (
            <Row className="tracer__taskBar align-items-center">
                <Col xs={3}>
                    <Button disabled={this.props.selectedIndex == 0}
                            outline
                            color="secondary"
                            onClick={this.props.onPrev}
                    >
                        ❰❰ Назад
                    </Button>
                </Col>
                <Col xs={{ size: 6}}>
                    {tasks}
                </Col>
                <Col xs={3}>
                    <Button disabled={this.props.selectedIndex == this.props.tasks.length - 1}
                        outline color="secondary"
                        onClick={this.props.onNext}
                    >
                        Далее ❱❱
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default TaskBar;