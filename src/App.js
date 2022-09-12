import React, { Component } from 'react';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Bitcoin from './components/bitcoin.js'
import Tracker from './components/Dashboard/Dashboard.js'
import './App.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/bitcoin' element={<Bitcoin />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;