import React, { Component } from 'react';
import Main from './components/main';
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Bitcoin from './components/Nav/nav components/bitcoin.js'
import Watchlist from './components/Nav/nav components/watchlist.js'
import News from './components/Nav/nav components/news';
import './app.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/bitcoin' element={<Bitcoin />} />
                    <Route path='/watchlist' element={<Watchlist />} />
                    <Route path='/news' element={<News />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;