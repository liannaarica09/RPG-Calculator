import React from "react";
import SystemSelector from "../../components/SystemSelector";
import Header from "../../components/header";
import systems from "../../systems.json";
import SystemItem from "../../components/systemItem";

class PlayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            system: '',
            systems
        }
    }

    handleClick = system => {
        // event.preventDefault();
        console.log(this);
        this.setState({ system: system });
        console.log(this.state.system);
    }

    render() {

        return (
            <div>
                {
                    this.state.system ? (<Header />) : (<SystemSelector>
                        {systems.map(system => (
                            <SystemItem
                                key={system.id}
                                value={system.name}
                                handleClick={this.handleClick}
                            />
                        ))}
                    </SystemSelector>)
                }
            </div>
        )
    }

}

export default PlayScreen;