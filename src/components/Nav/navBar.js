import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { auth } from '/src/config/Fire.js'
import { Spin as Hamburger } from 'hamburger-react'
import { MenuItem, Select } from '@mui/material'
import Logo from '/src/assets/logo.png'
import './navBar.css';
import { cryptoState } from '../../contexts/cryptoContext';

export default function NavBar() {
  // implement useState hook to track whether navbar is expanded or not -> initial state should be false
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  // import cryptoState, which will give access to setCurrency method and ability to update symbol/currency depending on user input on select dropdown menu
  const { currency, setCurrency } = cryptoState();

  // now that this info has been imported, we can display the current symbol/currency throughout this component

  // sign user out and send back to login page when logout button is clicked
  const logout = () => {
    auth.signOut();
  }

  return (
    <nav className='navBar'>
      <a href='/' className='brand-name'><img src={Logo} /></a>
      <div className={isNavExpanded ? 'selectCurrency' : 'selectCurrency collapsed'}>
        < Select 
          variant='outlined'
          style={{
            width: 100,
            height: 40,
            marginLeft: 15,
          }}
          // display the current currency that is stored in state whenever the component renders
          value={currency}
          // whenever there is a change by the user, flip the currency and symbol to the opposite
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={'USD'}>USD</MenuItem>
          <MenuItem value={'GBP'}>GBP</MenuItem>
        </Select>
      </div>  
      <div className='hamburger' onClick={() => {
        // when hamburger icon is clicked, change state
        setIsNavExpanded(!isNavExpanded)
      }}>
        <Hamburger />
      </div>
      <div className={
        isNavExpanded ? 'nav-menu expanded' : 'nav-menu'}>
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
      <button className='logout' onClick={logout}>Log Out</button>
    </nav>
  )
}
