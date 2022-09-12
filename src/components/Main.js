import React, { Component } from 'react';
// import styling for this component
import './Main.css';
import { app, auth } from '/src/config/Fire.js'
import Login from './Forms/Login'
import Register from './Forms/Register'
import Tracker from './Tracker/Tracker.js'

// export this class so it can be imported in to App.js
export default class Main extends Component {
    
    state = {
        // if user is 1, that means user is not logged in
        user: 1,
        // if loading is true, that means we have not gotten a response from firebase
        loading: true,
        // formSwitcher is false by default, will be updated to true if register button has been clicked and register component is being displayed
        formSwitcher: false
    }

    // use componentDidMount to run the auth listener method whenever a component mounts
    componentDidMount() {
        this.authListener()
    }

    authListener() {
        auth.onAuthStateChanged((user) => {
            // this method will return a truthy value if user is signed in, which we will use to update state accordingly
            if (user) {
                // set user property in state to equal the current user that is signed in --> this will be an object that is returned from firebase
                this.setState({user})
            }
            else {
                this.setState({user: null})
            }
        });
    }

    // create method that will switch formSwitcher boolean state back and forth between true/false each time the button in login/register form is clicked
    formSwitcher = (action) => {
        this.setState({
            // swap the formSwitcher boolean each time the register button is clicked
            formSwitcher: action === 'register' ? true: false 
        })
    }

    render() {
        // evaluate whether register or login form should be displayed depending on formSwitcher boolean stored in state, assign the appropriate form in a constant
        const display = !this.state.formSwitcher ? <Login /> : <Register />;

        // if user state is falsy, that means user has not been authenticated, so display the sign in / register components 
        if (!this.state.user) {
            return (
                <>
                    {/* import forms into mainblock with styling*/}
                    <div className='mainBlock'>
                        {/* render either login or register form depending on formSwitcher boolean saved in state */}
                        {display}
                        {!this.state.formSwitcher ?
                            (<span className='underLine'>
                                {/* if formSwitcher is false in state, display text and button relevant to registering */}
                                Don't have an account? <button 
                                onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')}
                                className='linkBtn'>Register</button>
                            </span>)
                            :
                            (<span className='underLine'>
                                {/* if formSwitcher is true in state, show sign in text and button to redirect back to login page */}
                                Already have an account? <button 
                                onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')}
                                className='linkBtn'>Sign In</button>
                            </span>)
                        }
                    </div>
                </>
            )
        }
        // otherwise, display the tracker component when user has been authenticated
        // this will be the main application
        else {
            return (
                <>
                    <Tracker />
                </>
            );
        }
    }
}