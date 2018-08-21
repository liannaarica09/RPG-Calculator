import React from 'react';

class Checks extends React.Component {
    // componentDidMount() {
    //     console.log(this.props);
    // }

    render() {
        return (
            <input
                type="checkbox"
                name={this.props.name}
                disabled={this.props.disabled}
                parent={this.props.name}
                parent-index={this.props.index}
                onChange={this.props.handleChange}
            />)
    }
}

export default Checks;