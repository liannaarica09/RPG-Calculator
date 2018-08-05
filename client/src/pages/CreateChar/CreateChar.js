import React from "react";
import { Redirect } from 'react-router-dom';
import Vortex from '../../config/vortex.json'
import Incrementer from "../../components/Incrementer/Incrementer";
import { FontAwesomeIcon } from "../../../../node_modules/@fortawesome/react-fontawesome";
import { faPlusCircle } from "../../../../node_modules/@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";


class CreateChar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charName: "",
            Vortex,
            awareness: 1,
            ingenuity: 1,
            presence: 1,
            resolve: 1,
            strength: 1,
            athletics: 0,
            convince: 0,
            craft: 0,
            fighting: 0,
            knowledge: 0,
            marksman: 0,
            medicine: 0,
            science: 0,
            subterfuge: 0,
            survival: 0,
            technology: 0,
            transport: 0
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
                        charPoints: 24,
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


    render() {
        if (!localStorage.getItem('currentSystem')) {
            return <Redirect to={'/play'} />
        }
        if (!localStorage.getItem('userName')) {
            return <Redirect to={'/'} />
        }
        var settings = {
            dots: true,
            arrows: true,
            accessibility: true,
            swipe: true,
            swipeToSlide: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    },
                    breakpoint: 850,
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
                    <p>{`Character Points ${this.state.charPoints}`}</p>
                    <p>{`Skill Points ${this.state.skillPoints}`}</p>
                    <p>{`Story Points ${this.state.storyPoints}`}</p>
                </div>
                <form>
                    <div className="createHeader">
                        <p>Name</p>
                        <input type="text" value={this.state.charName} onChange={(e) => this.onChange(e, 'charName')} />
                    </div>
                    <Slider {...settings}>
                        <div>
                            <h3>Attributes</h3>
                            {this.state.Vortex.Attributes.map(attr => (
                                <Incrementer
                                    key={attr.id}
                                    name={attr.name}
                                />
                            ))}
                        </div>
                        <div>
                            <h3>Skills</h3>
                            {this.state.Vortex.Skills.map(attr => (
                                <Incrementer
                                    key={attr.id}
                                    name={attr.name}
                                />
                            ))}
                        </div>
                        <div>
                            <h3>Traits</h3>
                        </div>
                        <div>
                            <h3>Stuff</h3>
                            <input type="text" />
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </div>
                        <div>
                            <h3>Biodata</h3>
                            <p>Personal Goal</p>
                            <textarea name="goal" id="goal" cols="30" rows="10"></textarea>
                            <p>Personality</p>
                            <textarea name="personality" id="personality" cols="30" rows="10"></textarea>
                            <p>Background</p>
                            <textarea name="background" id="background" cols="30" rows="10"></textarea>
                        </div>
                    </Slider>
                    <div className="createSubmit">
                        <button onClick={() => this.onSubmit()}>Submit</button>
                    </div>
                </form>
            </div >
        )
    }
}

export default CreateChar;