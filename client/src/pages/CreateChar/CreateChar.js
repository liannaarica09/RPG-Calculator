import React from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Vortex from '../../config/vortex.json'
import Incrementer from "../../components/Incrementer/Incrementer";
import Checkbox from "../../components/Checkbox"
import { FontAwesomeIcon } from "../../../../node_modules/@fortawesome/react-fontawesome";
import { faPlusCircle } from "../../../../node_modules/@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";


class CreateChar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charName: "",
            Vortex
        }
    }

    componentDidMount() {
        console.log(localStorage.getItem('currentSystem'));

        if (localStorage.getItem('currentSystem')) {
            this.setState({
                currentSystem: localStorage.getItem('currentSystem'),
            }, function () {
                console.log(this.state);
                if (this.state.currentSystem === 'Vortex') {
                    this.setState({
                        charPoints: 18,
                        skillPoints: 18,
                        storyPoints: 12
                    }, function () {
                        console.log(this.state)
                    });
                }
            });

        }
    }

    onChange(e, field) {
        this.setState({ [field]: e.target.value })
    }

    handleIncrement = (i, cat, op) => {
        console.log(i);
        console.log(cat);
        console.log(op);
        let vortex = this.state.Vortex;

        if (cat === 'Attributes') {
            switch (op) {
                case '+':
                    vortex.Attributes[i].value = vortex.Attributes[i].value + 1;
                    this.setState({ charPoints: this.state.charPoints - 1 });
                    break;
                case '-':
                    vortex.Attributes[i].value = vortex.Attributes[i].value - 1;
                    this.setState({ charPoints: this.state.charPoints + 1 });
                    break;
                default:
                    break;
            }
        }
        if (cat === 'Skills') {
            switch (op) {
                case '+':
                    console.log("case +");
                    vortex.Skills[i].value = vortex.Skills[i].value + 1;
                    this.setState({ skillPoints: this.state.skillPoints - 1 });
                    break;
                case '-':
                    console.log("case -");
                    vortex.Skills[i].value = vortex.Skills[i].value - 1;
                    this.setState({ skillPoints: this.state.skillPoints + 1 });
                    break;
                default:
                    break;
            }
        }

        this.setState({ Vortex: vortex });
    }

    handleCharCreation = (event) => {
        event.preventDefault();

        axios.post('api/auth/register', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            bio: this.state.bio,
            image: this.choseImage ? this.image : this.defaultImage
        }).then(res => {
            console.log(res.data);
        })
    }

    handleCheck = event => {

        console.log(event.target);

        const name = event.target.name;
        const value = event.target.checked;
        const parentIndex = event.target.getAttribute('parent-index');
        console.log(parentIndex);

        console.log(name);
        console.log(value);

        this.setState({
            [name]: value
        });

        if (name === "Minor Good") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints - 1
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints + 1
                })
            }
        } else if (name === "Minor Bad") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints + 1
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints - 1
                })
            }
        } else if (name === "Major Good") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints - 2
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints + 2
                })
            }
        } else if (name === "Major Good") {
            if (value === true) {
                this.setState({
                    charPoints: this.state.charPoints + 2
                });
            } else {
                this.setState({
                    charPoints: this.state.charPoints - 2
                })
            }
        } else if (name === "Special Good" || name === "Special Bad") {

            if (this.state.Vortex.Traits[parentIndex].cost) {
                const cost = this.state.Vortex.Traits[parentIndex].cost;
                console.log(Object.keys(cost));

                Object.keys(cost).forEach(pointType => {
                    console.log(parseFloat(cost[pointType]));
                    console.log(this.state[pointType]);

                    this.setState({
                        [pointType]: this.state[pointType] + cost[pointType]
                    });
                });
            } else {
                console.log("No cost available");
            }
        }
    }

    render() {
        if (!localStorage.getItem('currentSystem')) {
            return <Redirect to={'/play'} />
        }
        if (!localStorage.getItem('userName')) {
            return <Redirect to={'/'} />
        }
        const enabled = this.state.charName && this.state.charPoints < 15;
        var settings = {
            dots: true,
            arrows: true,
            accessibility: true,
            infinite: true,
            swipe: true,
            swipeToSlide: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    },
                    // eslint-disable-next-line
                    breakpoint: 850,
                    // eslint-disable-next-line
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }
            ]

        };

        return (
            <div className="pagePadding">
                <div className="thirds">
                    <div><p>Character Points</p>  {this.state.charPoints}</div>
                    <div><p>Skill Points</p> {this.state.skillPoints}</div>
                    <div><p>Story Points</p>  {this.state.storyPoints}</div>
                </div>
                <form onSubmit={this.handleCharCreation}>
                    <div className="createHeader">
                        <p>Name</p>
                        <input type="text" value={this.state.charName} onChange={(e) => this.onChange(e, 'charName')} />
                    </div>
                    <Slider {...settings}>
                        <div>
                            <div className="slide">
                                <h3>Attributes</h3>
                                {this.state.Vortex.Attributes.map((attr, index) => (
                                    <Incrementer
                                        key={index}
                                        index={index}
                                        cat={'Attributes'}
                                        name={attr.name}
                                        handleClick={this.handleIncrement}
                                        value={attr.value}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Skills</h3>
                                {this.state.Vortex.Skills.map((skill, index) => (
                                    <Incrementer
                                        key={index}
                                        index={index}
                                        cat={'Skills'}
                                        name={skill.name}
                                        handleClick={this.handleIncrement}
                                        value={skill.value}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Traits</h3>

                                {this.state.Vortex.Traits.map((trait, index) => (
                                    <div key={index.toString()}>
                                        <div className="whiteText">{trait.name}</div>
                                        <div className="thirds">
                                            <Checkbox
                                                index={index}
                                                cat={'Traits'}
                                                name={trait.name}
                                                type={trait.type}
                                                cost={trait.cost}
                                                handleChange={this.handleCheck} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Stuff</h3>
                                <input type="text" value={this.state.stuff} onChange={(e) => this.onChange(e, 'stuff')} />
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </div>
                        </div>
                        <div>
                            <div className="slide">
                                <h3>Biodata</h3>
                                <p>Personal Goal</p>
                                <textarea name="goal" id="goal" cols="30" rows="10"></textarea>
                                <p>Personality</p>
                                <textarea name="personality" id="personality" cols="30" rows="10"></textarea>
                                <p>Background</p>
                                <textarea name="background" id="background" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </Slider>
                    <div className="createSubmit">
                        <button
                            disabled={!enabled}>
                            Submit
                            </button>
                    </div>
                </form>
            </div >
        )
    }
}

export default CreateChar;