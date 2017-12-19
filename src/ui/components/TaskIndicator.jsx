import React from 'react';

class TaskIndicator extends React.Component {

    getClass() {
        let classes = 'top__icon';

        switch (this.props.status) {
            case 'success':
                classes += ' top__icon--success';
                break;
            case 'error':
                classes += ' top__icon--error';
                break;
            default:
                classes += ' top__icon--normal';
        }

        if (this.props.isActive) {
            classes += ' top__icon--active';
        }

        return classes;
    }

    onSelect() {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div className={this.getClass()}>
                <div className="top__icon--inner" onClick={this.onSelect.bind(this)}>{this.props.index + 1}</div>
            </div>
        );
    }
}

export default TaskIndicator;