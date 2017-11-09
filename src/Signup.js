import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Signup extends Component {
    constructor(props) {
        super()

        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    _signUpUser = async (event) => {
        event.preventDefault()
        const { email, password } = this.state
        console.log(this.state)
        try {
            const response = await this.props.signupUserMutation({ variables: { email, password } })
            localStorage.setItem('graphcoolToken', response.data.signupUser.token)
            console.log(response.data)
            document.querySelector("form").reset()
            // this.props.history.push('/')
        } catch (e) {
            console.error('An error occured: ', e)
            // this.props.history.push('/')
        }

    }

    render() {

        return (
            <Card style={{ maxWidth: 400, margin: 100, padding: 20 }}>
                <CardHeader title="Sign Up Form" subtitle="Use this if you don't already have a login." />
                <form autoComplete="on" onSubmit={this._signUpUser}>
                    <TextField required type="text"
                        value={this.state.name}
                        floatingLabelText="Name"
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <TextField required
                        value={this.state.email}
                        type="email"
                        floatingLabelText="Email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <TextField required
                        type="password"
                        value={this.state.password}
                        floatingLabelText="Password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />

                    <RaisedButton label="Submit" type="submit" primary={true} fullWidth={true} />
                </form>
            </Card>
        )
    }

}

const SIGNUP_EMAIL_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`

export default graphql(SIGNUP_EMAIL_USER, { name: 'signupUserMutation' })(Signup)

