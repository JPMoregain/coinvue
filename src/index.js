import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'
import CryptoContext from './contexts/cryptoContext'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <CryptoContext>
        <App /> 
    </CryptoContext>
)