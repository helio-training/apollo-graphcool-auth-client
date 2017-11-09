import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
    constructor(props) {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    _loginUser = async (event) => {
        event.preventDefault()
        const { email, password } = this.state

        try {
            const response = await this.props.authenticateUserMutation({ variables: { email, password } })
            localStorage.setItem('graphcoolToken', response.data.authenticateUser.token)
            // this.props.history.push('/')
            console.log(response.data)
        } catch (e) {
            console.error('An error occured: ', e)
            // this.props.history.push('/')
        }

    }

    render() {

        const styles = {
            button: {
                marginLeft: 60,
                marginTop: 12,
                marginRight: 12,
                width: 240
            }
        }

        return (
            <Card style={{ maxWidth: 400, margin: 100, padding: 20 }}>
                <CardHeader title="Login Form" subtitle="Email and Password, or social login." />
                <form autoComplete="on" onSubmit={this._loginUser}>
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

                    <RaisedButton label="Sign In" type="submit" primary={true} fullWidth={true} />
                    <RaisedButton
                        style={styles.button}    
                        label="Sign in with Google"
                        icon={<ActionAndroid />}
                        />
                    <RaisedButton
                        style={styles.button}    
                        label="Sign in with Github"
                        icon={<ActionAndroid />}
                    />
                </form>
            </Card>
        )
    }

}

const AUTHENTICATE_EMAIL_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

export default graphql(AUTHENTICATE_EMAIL_USER, { name: 'authenticateUserMutation' })(Login)