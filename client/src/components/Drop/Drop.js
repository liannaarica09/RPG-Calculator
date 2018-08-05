import React from 'react';

class Drop extends React.Component {
    render() {
        return (
            <div class="dropdown">
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                    {this.props.children}
                    <div className="dropItem">New Character</div>
                </div>
            </div>
        );
    }
}

export default Drop;