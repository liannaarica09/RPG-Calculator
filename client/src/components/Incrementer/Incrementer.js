import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPlusSquare } from '../../../../node_modules/@fortawesome/free-solid-svg-icons';

class Incrementer extends Component {
    render() {
        return (
            <div id="incDiv">
                <p>{this.props.name}</p>
                <FontAwesomeIcon icon={faMinusSquare} />
                <input type="text" />
                <FontAwesomeIcon icon={faPlusSquare} />
            </div>
        );
    }
}

export default Incrementer;
