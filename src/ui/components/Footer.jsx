import React from 'react';
import { Row, Col } from 'reactstrap';

class Footer extends React.Component {
    render() {
        return (
            <Row className="tracer__footer align-items-center justify-content-center">
                <Col xs={6}>
                    <div className="footer__info">
                        МГТУ им. Н.Э. Баумана. Кафедра ИУ9. {(new Date()).getFullYear()}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Footer;