import React from "react";
import { app, auth } from '/src/config/Fire.js'
import { Link } from 'react-router-dom'

function Dashboard() {

    // method that is invoked when user clicks the logout button
    const logout = () => {
        auth.signOut();
    }

    return (
        <>
            <button onClick={logout}>Log Out</button>
            <Link to='/bitcoin'>Bitcoin</Link>
        </>
    )
}

export default Dashboard