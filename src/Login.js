import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import ActionFingerPrint from 'material-ui/svg-icons/action/fingerprint'
import { withRouter } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
    constructor(props) {
        super()

        this.state = {
            email: '',
            password: '',
            open: false
        }
    }

    _handleOpen = () => {
        this.setState({ open: true });
    };

    _handleTryAgain = () => {
        document.querySelector("form").reset()
        this.setState({ open: false });
    };

    _handleSignUp = () => {
        this.setState({ open: false });
        this._signup()
    };

    _loginUser = async (event) => {
        event.preventDefault()
        const { email, password } = this.state

        try {
            const response = await this.props.authenticateUserMutation({ variables: { email, password } })
            localStorage.setItem('graphcoolToken', response.data.authenticateUser.token)
            this.props.history.push('/')
            console.log(response.data)
        } catch (e) {
            console.error('An error occured: ', e)
            this._handleOpen()
        }

    }

    _signup = () => this.props.history.push('/signup')

    render() {

        const styles = {
            button: {
                marginLeft: 60,
                marginTop: 12,
                marginRight: 12,
                width: 240
            }
        }

        const actions = [
            <FlatButton
                label="Try Again"
                primary={true}
                onClick={this._handleTryAgain}
            />,
            <FlatButton
                label="Sign Up"
                primary={true}
                keyboardFocused={true}
                onClick={this._handleSignUp}
            />,
        ];

        if (this.props.loggedInUserQuery.loading) {

            return (
                <div className='w-100 pa4 flex justify-center'>
                    <div>Loading</div>
                </div>
            )
        }

        // redirect if user is logged in
        if (this.props.loggedInUserQuery.id) {
            console.warn('already logged in')
            window.location.reload()
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
                    <RaisedButton
                        style={styles.button}
                        label="No login?  Sign up!"
                        icon={<ActionFingerPrint />}
                        onClick={this._signup}
                    />
                </form>
                <Dialog
                    title="Login Failed"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Your login was not recognized.  Please try another login or sign up as a new user.
        </Dialog>
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
const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`
export default compose(
    graphql(AUTHENTICATE_EMAIL_USER, { name: 'authenticateUserMutation' }),
    graphql(LOGGED_IN_USER_QUERY, {
        name: 'loggedInUserQuery',
        options: { fetchPolicy: 'network-only' }
    })
)(withRouter(Login))
