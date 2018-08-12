import React from 'react';

const Checks = (props) => {
    return (
        <div>
            <label>{props.name}</label>
            <input
                type="checkbox"
            />
        </div>
    );
};

export default Checks;