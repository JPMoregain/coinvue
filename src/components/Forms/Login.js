import React, { useState } from "react";
import './Login.css'
import { app, auth } from '/src/config/Fire.js'

function Login() {
  // declare state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [fireErrors, setFireErrors] = useState('')

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

  // create function that will handle login clicks and attempt to authenticate user
  const login = async (e) => {
    e.preventDefault()
    try {
      const userCredentials = await auth.signInWithEmailAndPassword(email, password);
    }
    catch (e) {
      if (e.code === 'auth/invalid-email') {
        setFireErrors('Please enter a valid email/password combination')
      }
      else setFireErrors(e.message)
    }
  }

  // if there is an error message, store it in a const to be displayed, otherwise display null
  let errorNotification = fireErrors ? (<div className="Error">{fireErrors}</div>) : null;
  // within return statement below, everything will automatically render
  return (
    <>
      {errorNotification}
      <form>
        {/* these inputs are for the username, password, and submit button, which are nested within this form */}
        <input type="text"
            className="regField"
            placeholder="Email"
            name="email"
            onChange={handleEmailInput}
            value={email}
        />

        <input type="password"
            className="regField"
            placeholder="Password"
            name="password" 
            onChange={handlePasswordInput}
            value={password}
        />

        <input type="submit"
            className="submitBtn"
            value="LOGIN"
            onClick={login}
        />
      </form>
    </>
  )
}

// export the component so it can be used in other components
export default Login
