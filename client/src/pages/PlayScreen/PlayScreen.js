import React from "react";
import { Redirect } from 'react-router-dom';
import SystemSelector from "../../components/SystemSelector";
import Header from "../../components/header";
import systems from "../../systems.json";
import SystemItem from "../../components/SystemItem";
import DropItem from "../../components/DropItem";
import { CharSheet, Attributes, Biodata, CharHeader, Skills, Stuff, Traits } from "../../components/CharSheet";

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

    // componentDidMount() {
    //     this.setState({ chars: chars });
    // }

    handleSystemClick = system => {
        console.log(system);
        this.setState({ currentSystem: system }, function () {
            localStorage.setItem('currentSystem', system)
            console.log(this.state);
        });
    }

    handleCharChoice = (char) => {
        console.log(char);
        this.setState({ character: char }, function () {
            console.log(this.state.character);
        });
    }

    handleNew = () => {
        this.props.history.push("/create");
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
                                            onClick={this.handleCharChoice}
                                        />
                                    ))}
                                    <div className="dropItem" onClick={this.handleNew}>New Character</div>
                                </div>
                            </div>
                        </Header>
                        <div className="body">
                            {this.state.character ? (
                                <CharSheet>
                                    <CharHeader />
                                    <Attributes />
                                    <Skills />
                                    <Biodata />
                                    <Traits />
                                    <Stuff />
                                </CharSheet>
                            ) : (
                                    <div>
                                        <h1>No Characters Found</h1>
                                        <h3>Click 'Character' above and select 'New Character' to make one.</h3>
                                    </div>
                                )}
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