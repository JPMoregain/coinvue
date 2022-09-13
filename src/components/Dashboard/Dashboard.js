import React from "react";
import NavBar from "../Nav/navBar";
import './dashboard.css'
import { CoinDisplay } from '../CoinDisplay/coinDisplay'

function Dashboard() {
    return (
      <>
        <NavBar />
        <CoinDisplay />
      </>
    )
}

export default Dashboard;