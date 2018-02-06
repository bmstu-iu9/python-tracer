import React from 'react';
import ReactDOM from 'react-dom';
import {Controlled as CodeMirror} from 'react-codemirror2'
import { Alert } from 'reactstrap';
import Task from '../tasks/Task';

class UserInputViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: (props.task || {})._input || '',
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
            code: (nextProps.task || {})._input || '',
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
        if (this.props.task) {
            if (this.props.task.status() == Task.statuses.SUCCESS) {
                return "success"
            } else if (this.props.task.status() == Task.statuses.ERROR || this.props.task.status() == Task.statuses.BLOCKED) {
                return "danger";
            }
        }

        return "info"
    }

    getStatusMessage() {
        if (this.props.task) {
            if (this.props.task.status() == Task.statuses.SUCCESS) {
                return "Тесты пройдены!"
            } else if (this.props.task.status() == Task.statuses.ERROR) {
                return "Ошибка!"
            }
        }

        return ""
    }

    getVisible() {
        if (this.props.task) {
            return this.props.task.status() !== Task.statuses.INITIAL;
        }

        return false;
    }

    getEnabled() {
        if (this.props.task) {
            return this.props.task.status() !== Task.statuses.BLOCKED;
        }

        return false;
    }

    render() {
        return (
            <div>
                <div className="description">
                    <div className="description__title">Задание {this.props.selectedIndex + 1}:</div>
                    <div className="description__text">
                        <div>Выполните построчный разбор функции</div>
                        <strong><code>{(this.props.task || {})._target || ""}</code></strong>
                    </div>
                </div>
                <div className="description">
                    <div className="description__title">Решение:</div>
                </div>
                <Alert color={this.getStatus()} isOpen={this.getVisible()}>
                    <strong>{this.getStatusMessage()}</strong> {this.props.task ? this.props.task.message() : ""}
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