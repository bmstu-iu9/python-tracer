import React from 'react';
import { Row, Col } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <Row className="tracer__header align-items-center">
                <Col xs={12} md={6}>
                    <div className="header__logo">PyTracer</div>
                    <div className="header__user">
                        <div className="header__block">
                            <span className="block__label">ФИО:</span>
                            <span className="block__text">Головань С.М.</span>
                        </div>
                        <div className="header__block">
                            <span className="block__label">Группа:</span>
                            <span className="block__text">ИУ9-72</span>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="header__menu float-right">
                        <a className="menu__link" href="#">Выход</a>
                    </div>
                    <div className="header__summary float-right">
                        Заданий выполнено: <strong>{this.props.tasks.filter(task=>task.status == 'success').length}</strong> из <strong>{this.props.tasks.length}</strong>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Header;