import React from "react";
import { Redirect } from 'react-router-dom';
import SystemSelector from "../../components/SystemSelector";
import Header from "../../components/header";
import systems from "../../systems.json";
import SystemItem from "../../components/SystemItem";
import DropItem from "../../components/DropItem";
import CharSheet from "../../components/CharSheet";

class PlayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSystem: localStorage.getItem('currentSystem'),
            systems,
            chars: [{ name: 'Poppy', id: 1 }, { name: 'Mickey', id: 2 }, { name: 'Rose', id: 3 }, { name: 'Osgood', id: 4 }, { name: 'Ianto', id: 5 }],
            character: ''
        }
    }

    handleSystemClick = system => {
        console.log(system);
        this.setState({ currentSystem: system }, function () {
            localStorage.setItem('currentSystem', system)
            console.log(this.state);
        });

    }

    render() {
        const currentSystem = this.state.currentSystem;

        if (!localStorage.getItem("userName")) {
            return <Redirect to={'/'} />
        }

        return (
            <div>
                {currentSystem ? (
                    <div>
                        <Header
                            sysValue={this.state.currentSystem}
                            charValue={this.state.character}
                            history={this.props.history}
                        >
                            <div className="dropdown">
                                <h1 className="dropbtn">{this.state.character ? (this.state.character) : "Character"}</h1>
                                <div className="dropdown-content">
                                    {this.state.chars.map(chars => (
                                        <DropItem
                                            id={chars.id}
                                            key={chars.id}
                                            name={chars.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Header>
                        <div className="body">
                            <CharSheet></CharSheet>
                        </div>
                    </div>
                ) : (
                        <SystemSelector>
                            {this.state.systems.map(system => (
                                <SystemItem
                                    key={system.id}
                                    value={system.name}
                                    handleClick={this.handleSystemClick}
                                />
                            ))}
                        </SystemSelector>
                    )}
            </div>
        )
    }

}

export default PlayScreen;