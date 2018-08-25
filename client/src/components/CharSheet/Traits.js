import React, { Component } from 'react';

export class Traits extends Component {
    render() {
        return (
            <div className="trait">{this.props.name}</div>
        );
    }
}