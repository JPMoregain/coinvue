import React, { useEffect, useState } from 'react'
import { cryptoState } from '../../contexts/cryptoContext';
import axios from 'axios';
import './coinDisplay.css'
import { LinearProgress, TableContainer, TableHead, TableRow, TextField, Table, TableCell } from '@mui/material';
import { Container } from '@mui/system';

export const CoinDisplay = () => {
  // initialize state to store coin data in an array, and boolean that tracks whether the api call has finished or not
  const [coinData, setCoinData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  // destructure props from CryptoContext to access current currency to grab API data in the correct currency
  const { currency } = cryptoState();
  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

  // fetch using apiEndpoint url
  const fetchCoins = async () => {
    setLoadingStatus(true);
    const { data } = await axios.get(apiEndpoint);
    // update coinData in state with data returned from API call
    setCoinData(data);
    setLoadingStatus(false); 
  }

  // useEffect hook prevents API fetchCoin function from repeatedly spamming API calls
  useEffect(() => {
    fetchCoins()
  }, [currency]);

  return (
    <Container style={{ textAlign: 'center' }}>   
      <h2>Top 100 Coins By Market Cap</h2>
      <TextField
        // custom styling for color and outline color
        sx={{
          "& .MuiInputLabel-root": {color: 'white'},//styles the label
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "white" },
          },
        }}
        label='Search By Coin Name' variant='outlined' style={{marginBottom: 20, width: '100%'}}
        // add onChange event listener to update state to hold whatever user has typed in
        onChange={(e) => setSearchValue(e.target.value)}/>

        <TableContainer>
          {
            // within here, we want to render our table ONLY if the API call has completed, otherwise we want to display a loading symbol
            // if loading status is truthy, display the loading status, otherwise, display the API data in a table
            loadingStatus ? (
              <LinearProgress />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: '#F4A423' }}>
                  <TableRow style={{
                    color: 'black',
                    fontWeight: '700',
                    border: 'none',
                    height: '20px'
                  }}>
                    <TableCell style={{ border: 'none' }}>Coin</TableCell>
                    {['Price', '24h Change', 'Market Cap'].map((head) => (
                      <TableCell
                        style={{
                          border: 'none',
                        }}
                        key={head}
                        align={'right'}>
                          {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              </Table>
            )
          }
        </TableContainer>
    </Container>
  )
}
