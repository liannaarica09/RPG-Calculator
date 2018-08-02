import React from 'react';

class SystemItem extends React.Component {
    render() {
        return (
            <li onClick={() => this.props.handleClick(this.props.name)}> {this.props.value}</li >
        )
    }
}

export default SystemItem;