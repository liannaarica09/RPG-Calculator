import React from "react";
import Login from "../../components/login";

class LoginPage extends React.Component {
    state = {
        email: "",
        userName: "",
        password: ""
    }

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <React.Fragment>
                <div id="loginDiv">
                    <Login />
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPage;