import React from 'react';
import ReactDOM from 'react-dom';
import {Controlled as CodeMirror} from 'react-codemirror2'
import { Alert } from 'reactstrap';

class UserInputViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: props.task.input || '',
            options: {
                lineNumbers: true,
                mode: 'text/x-python',
                theme: 'dracula',
                readOnly: this.props.readOnly
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            code: nextProps.task.input || '',
            options: {
                lineNumbers: true,
                mode: 'text/x-python',
                theme: 'dracula',
                readOnly: nextProps.readOnly
            }
        });
    }

    componentDidMount() {
        let elem = $(ReactDOM.findDOMNode(this)).find('.CodeMirror').get(0),
            editor = elem.CodeMirror;


        editor.setSize(
            $(elem.parentNode.parentNode).width(),
            Math.max(300, editor.lineCount() * editor.defaultTextHeight() + 10)
        );
    }

    componentDidUpdate() {
        this.componentDidMount()
    }

    onChange(editor, data, value) {
        this.props.onChange(
            this.props.selectedIndex,
            value
        )
    }

    getStatus() {
        if (this.props.task.status == 'success') {
            return "success"
        } else if (this.props.task.status == 'error') {
            return "danger";
        }

        return "info"
    }

    getStatusMessage() {
        if (this.props.task.status == 'success') {
            return "Тесты пройдены!"
        } else if (this.props.task.status == 'error') {
            return "Ошибка!"
        }

        return ""
    }

    getVisible() {
        return this.props.task.status == 'success' || this.props.task.status == 'error';
    }

    getEnabled() {

        let task = this.props.task;

        return (task.maxAttempts - (task.attempts || 0)) > 0;
    }

    render() {
        return (
            <div>
                <div className="description">
                    <div className="description__title">Задание {this.props.selectedIndex + 1}:</div>
                    <div className="description__text">
                        <div>Выполните построчный разбор функции</div>
                        <strong><code>{this.props.task.target}</code></strong>
                    </div>
                </div>
                <div className="description">
                    <div className="description__title">Решение:</div>
                </div>
                <Alert color={this.getStatus()} isOpen={this.getVisible()}>
                    <strong>{this.getStatusMessage()}</strong> {this.props.task.message}
                </Alert>
                <CodeMirror
                    disabled={!this.getEnabled()}
                    value={this.state.code}
                    onBeforeChange={this.onChange.bind(this)}
                    options={this.state.options}
                />
            </div>
        );
    }
}

export default UserInputViewer;