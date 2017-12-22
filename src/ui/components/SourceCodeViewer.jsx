import React from 'react';
import ReactDOM from 'react-dom';
import {Controlled as CodeMirror} from 'react-codemirror2';
import PythonMode from 'codemirror/mode/python/python';

const title = (
    <h3>Исходный текст</h3>
);

class SourceCodeViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: props.task.source || ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            code: nextProps.task.source || ''
        });
    }

    componentDidMount() {
        let elem = $(ReactDOM.findDOMNode(this)).find('.CodeMirror').get(0),
            editor = elem.CodeMirror;

        editor.setSize(
            $(elem.parentNode.parentNode).width(),
            Math.max(500, editor.lineCount() * editor.defaultTextHeight() + 10)
        );
    }

    componentDidUpdate() {
        this.componentDidMount()
    }

    render() {
        return (
            <div>
                <div className="description">
                    <div className="description__title">Исходный текст функции:</div>
                </div>
                <CodeMirror
                    id="tracer__sourceCode"
                    value={this.state.code}
                    onRe
                    options={{
                        lineNumbers: true,
                        mode: 'text/x-python',
                        theme: 'dracula',
                        readOnly: true
                    }}
                />
            </div>
        );
    }
}

export default SourceCodeViewer;