import React from 'react';

class Drop extends React.Component {
    render() {
        return (
            <div class="dropdown">
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Drop;