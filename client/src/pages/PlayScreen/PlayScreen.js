import React from "react";
import axios from 'axios';
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
            player: localStorage.getItem('userName'),
            systems,
            chars: [],
            character: '',
            traits: []
        }
    }

    componentDidMount() {
        console.log(this.state.player);

        axios.get('/api/users', {
            params: {
                userName: this.state.player
            }
        }).then(res => {
            console.log(res.data.chars);
            let chars = [];
            for (let i = 0; i < res.data.chars.length; i++) {
                let tName = res.data.chars[i].name;
                let tId = res.data.chars[i]._id;
                let tChar = {
                    "name": tName,
                    "id": tId
                }
                chars.push(tChar);
            };
            console.log(chars);
            this.setState({ chars: chars });
        })
    };

    handleSystemClick = system => {
        console.log(system);
        this.setState({ currentSystem: system }, function () {
            localStorage.setItem('currentSystem', system)
            console.log(this.state);
        });
    };

    handleCharChoice = (id) => {
        axios.get('/api/chars/' + id)
            .then(res => {
                console.log(res.data);
                this.setState({ character: res.data }, function () {
                    console.log(this.state.character);
                    let tempChar = this.state.character;
                    let tempTrait = [];
                    for (let a = 0; a < this.state.character.traits.length; a++) {
                        if (this.state.character.traits[a].charHas) {
                            console.log(this.state.character.traits[a].name);
                            tempTrait.push(this.state.character.traits[a]);
                        }
                        tempChar.traits = tempTrait;
                        this.setState({ character: tempChar });
                    }
                });
            });
    };

    handleNew = () => {
        this.props.history.push("/create");
    };

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
                            charValue={this.state.character.name}
                            history={this.props.history}
                        >
                            <div className="dropdown">
                                <h1 className="dropbtn">{this.state.character ? (this.state.character.name) : "Character"}</h1>
                                <div className="dropdown-content">
                                    {this.state.chars.map((char, index) => (
                                        <DropItem
                                            id={char.id}
                                            key={index}
                                            name={char.name}
                                            handleClick={this.handleCharChoice}
                                        />
                                    ))}
                                    <div className="dropItem" onClick={this.handleNew}>New Character</div>
                                </div>
                            </div>
                        </Header>
                        <div className="center">
                            {this.state.character ? (
                                <CharSheet>
                                    <CharHeader
                                        char={this.state.character.name} />
                                    <Attributes
                                        awareness={this.state.character.attributes[0].value}
                                        coordination={this.state.character.attributes[1].value}
                                        ingenuity={this.state.character.attributes[2].value}
                                        presence={this.state.character.attributes[3].value}
                                        resolve={this.state.character.attributes[4].value}
                                        strength={this.state.character.attributes[5].value} />
                                    <Skills
                                        athletics={this.state.character.skills[0].value}
                                        medicine={this.state.character.skills[1].value}
                                        convince={this.state.character.skills[2].value}
                                        science={this.state.character.skills[3].value}
                                        craft={this.state.character.skills[4].value}
                                        subterfuge={this.state.character.skills[5].value}
                                        figthing={this.state.character.skills[6].value}
                                        survival={this.state.character.skills[7].value}
                                        knowledge={this.state.character.skills[8].value}
                                        technology={this.state.character.skills[9].value}
                                        marksman={this.state.character.skills[10].value}
                                        transport={this.state.character.skills[11].value} />
                                    <Biodata
                                        goal={this.state.character.goal}
                                        personality={this.state.character.personality}
                                        background={this.state.character.background}
                                    />
                                    <div id="traits">
                                        {this.state.character.traits.map((trait, index) => {
                                            return (
                                                <Traits
                                                    id={trait.name}
                                                    key={trait.name + index}
                                                    name={trait.name}
                                                />
                                            )
                                        })}
                                    </div>
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