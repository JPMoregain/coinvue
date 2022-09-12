import React from "react";
import { app, auth } from '/src/config/Fire.js'

function Tracker() {

    // method that is invoked when user clicks the logout button
    const logout = () => {
        auth.signOut();
    }

    return (
        <>
            <button onClick={logout}>Log Out</button>
        </>
    )
}

export default Tracker