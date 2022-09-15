import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db, app } from '../config/Fire.js'

// this file will be used to store currency value and symbol state, which will be used throughout app to display appropriate info
// creating a context mimics Redux's store

// creates a new context
export const Crypto = createContext()

// whatever cryptoContext component is wrapped around, it will render, and those children components will be able to access state from cryptoState
// I believe the Crypto context being created above is being used in the <Crypto.Provider> tags, meaning that naming matters for those components
const CryptoContext = ({ children }) => {
  // set default state to have currency of USD and symbol of $
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [currentUID, setCurrentUID] = useState('');
  const [coinData, setCoinData] = useState([]);

  auth.onAuthStateChanged(user => setCurrentUID(user.uid))

  // whenever this component is rendered, invoke useEffect hook to check state and display the appropriate currency and symbol
  useEffect(() => {
    // listen for changes to the currency which will come from the select dropdown component, update symbol accordingly
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'GBP') setSymbol('£');
    // pass in the currency as a dependency in the array below so it can be evaluated upon render
  }, [currency])
  
  return (
    // pass state variables as props to children that are rendered, so they will be able to access state globally
    // we are passing the value as an object, so it will need to be deconstructed to access each specific part in the component that is importing the cryptoState
    <Crypto.Provider value={{ currency, symbol, setCurrency, currentUID, coinData, setCoinData }}>
      {children}
    </Crypto.Provider>
  )
}

export const cryptoState = () => {
    return useContext(Crypto)
}

export default CryptoContext