import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { auth } from '/src/config/Fire.js'
import { Spin as Hamburger } from 'hamburger-react'
import './navBar.css';

export default function NavBar() {
  // implement useState hook to track whether navbar is expanded or not -> initial state should be false
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  // sign user out and send back to login page when logout button is clicked
  const logout = () => {
    auth.signOut();
  }

  return (
    <nav className='navBar'>
      <a href='/' className='brand-name'>CoinVue</a>
      <div className='hamburger' onClick={() => {
        // when hamburger icon is clicked, change state
        setIsNavExpanded(!isNavExpanded)
      }}>
        <Hamburger />
      </div>
      <div className='nav-menu'>
        <ul>
          <li>
            <Link to='/bitcoin'>Bitcoin</Link>
          </li>
          <li>
            <Link to='/watchlist'>Watchlist</Link>
          </li>
          <li>
            <Link to='/news'>News</Link>
          </li>
        </ul>
      </div>
      <button onClick={logout}>Log Out</button>
    </nav>
  )
}
