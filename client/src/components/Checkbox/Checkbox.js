import React, { Component } from 'react';
// import Checks from './checks';

class Checkbox extends Component {

   
    render() {
        return (
            <div>
                {this.props.type.map((type, index) => (
                    <div key={index.toString()}>
                        <label>{type}</label>
                        <input
                            type="checkbox"
                            name={type}
                            parent={this.props.name}
                            parent-index={this.props.index}
                            onChange={this.props.handleChange}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default Checkbox;
