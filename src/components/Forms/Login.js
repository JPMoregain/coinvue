import React, { useState } from "react";
import './Login.css'

function Login() {
  // declare state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [fireErrors, setFireErrors] = useState('')

  // within return statement below, everything will automatically render
  return (
    <>
      <form>
        {/* these inputs are for the username, password, and submit button, which are nested within this form */}
        <input type="text"
            className="regField"
            placeholder="Email"
            name="email" 
        />

        <input type="password"
            className="regField"
            placeholder="Password"
            name="password" 
        />

        <input type="submit"
            className="submitBtn"
            value="LOGIN"
        />
      </form>
    </>
  )
}

// export the component so it can be used in other components
export default Login
