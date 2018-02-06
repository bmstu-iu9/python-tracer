import React from 'react'
import { Container, Row, Col, Button, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            group: ''
        };
    }

    componentWillMount() {
        try {
            let userData = JSON.parse(window.localStorage.getItem('py-tracer') || '');

            this.props.history.replace('/');
        } catch (e) {

        }
    }

    login() {
        if (this.state.name.trim() && this.state.group.trim()) {
            window.localStorage.setItem('py-tracer', JSON.stringify({
                name: this.state.name,
                group: this.state.group,
                tasks: generateTasks(this.state.name, this.state.group)
            }));

            this.props.history.replace('/');
        } else {
            alert('Пожалуйста, укажите ФИО и группу!');
        }
    }

    render() {
        return (
           <Container className="tracer__login">
               <Row>
                   <Col md={{ size: 6, offset: 3}}>
                       <Label className="login__title">Вход в систему</Label>
                       <InputGroup>
                           <InputGroupAddon>ФИО</InputGroupAddon>
                           <Input placeholder="Иванов Иван Иванович" onChange={(event) => {
                               this.setState({ name: event.target.value })
                           }}/>
                       </InputGroup>
                       <br/>
                       <InputGroup>
                           <InputGroupAddon>Группа</InputGroupAddon>
                           <Input placeholder="ИУ9-72" onChange={(event) => {
                               this.setState({ group: event.target.value })
                           }}/>
                       </InputGroup>
                       <br/>
                       <Button className="login__button" onClick={this.login.bind(this)}>Войти</Button>
                   </Col>
               </Row>
           </Container>
        )
    }
}