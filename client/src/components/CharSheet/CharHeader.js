import React, { Component } from 'react';

export class CharHeader extends Component {
    render() {
        return (
            <div className="charHeader">
                <div>Doctor Who</div>
                <div>{this.props.char}</div>
                <div>Story Points 12</div>
            </div>
        );
    }
}
