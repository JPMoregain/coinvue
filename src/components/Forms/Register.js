import React, { useState } from "react";
import './Login.css'
import { auth } from '/src/config/Fire.js'

function Register() {
  // declare state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [fireErrors, setFireErrors] = useState('')
  const [displayName, setDisplayName] = useState('')
  
  // create methods to handle changes in each of the input fields
  const handleDisplayNameInput = e => {
    // each time there is a change in the form input fields, this function will be invoked
    // update the state of the current input field to contain the current value -> name and value will exist on the target property of the event
    setDisplayName(e.target.value);
  }

  const handleEmailInput = e => {
    // each time there is a change in the form input fields, this function will be invoked
    // update the state of the current input field to contain the current value -> name and value will exist on the target property of the event
    setEmail(e.target.value);
  }

  const handlePasswordInput = e => {
    // each time there is a change in the form input fields, this function will be invoked
    // update the state of the current input field to contain the current value -> name and value will exist on the target property of the event
    setPassword(e.target.value);
  }

  const register = e => {
    // prevent page from being reloaded when button is clicked
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
        ({email}, {password}))
        // returns a promise with data from firebase
        .then((user) => {
            // store current user by accessing the currentUser property on the object returned by firebase
            const currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: {displayName}
            })
        }).catch(err => setFireErrors(err.message))
  }
  // if there is an error message, store it in a const to be displayed, otherwise display null\
  let errorNotification = fireErrors ? (<div className="Error">Please enter a valid username/email/password combination</div>) : null;
  // within return statement below, everything will automatically render
  return (
    <>
      {errorNotification}
      <form>
        {/* these inputs are for the username, password, and submit button, which are nested within this form */}
        <input type="text"
            className="regField"
            onChange={handleDisplayNameInput}
            value={displayName}
            placeholder="Username"
            name="name" 
        />

        <input type="text"
            className="regField"
            onChange={handleEmailInput}
            value={email}
            placeholder="Email"
            name="email" 
        />

        <input type="password"
            className="regField"
            onChange={handlePasswordInput}
            value={password}
            placeholder="Password"
            name="password" 
        />

        <input
            onClick={register} 
            type="submit"
            className="submitBtn"
            value="REGISTER"
        />
      </form>
    </>
  )
}

// export the component so it can be used in other components
export default Register