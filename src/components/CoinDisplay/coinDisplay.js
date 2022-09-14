import React, { useEffect, useState } from 'react'
import { cryptoState } from '../../contexts/cryptoContext';
import axios from 'axios';
import './coinDisplay.css'
import { LinearProgress, TableContainer, TableHead, TableRow, TextField, Table, TableCell, TableBody } from '@mui/material';
import { Container } from '@mui/system';
import { Bookmark } from '@mui/icons-material';
import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../../config/Fire';


export const CoinDisplay = () => {
  // initialize state to store coin data in an array, and boolean that tracks whether the api call has finished or not
  const [coinData, setCoinData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [watchList, setWatchList] = useState([]);

  // destructure props from CryptoContext to access current currency to grab API data in the correct currency
  const { currency, symbol, currentUID } = cryptoState();
  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

  const currentUserDbInfo = doc(db, `userList/${currentUID}`)

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
    fetchCoins();
    updateDoc(currentUserDbInfo, { watchlist: watchList })
  }, [currency, watchList]);

  // create function that will filter the coins that are being displayed to match what the user has typed into the search field (stored in state)
  const handleSearch = () => {
    return coinData.filter(coin => coin.name.toLowerCase().includes(searchValue.toLowerCase()))
  }

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
                  }}>
                    <TableCell style={{ border: 'none', fontWeight: '700'}}>Coin</TableCell>
                    {['Ticker', 'Price', '24h Change', 'Market Cap', 'Watch'].map((head) => (
                      <TableCell
                        style={{
                          border: 'none',
                          fontWeight: '700'
                        }}
                        key={head}
                        align={'right'}>
                          {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* handleSearch will return the array of filtered coins, if nothing is typed in search box it will return all of the coins */}
                  {/* map each coin in the array onto a new row in the table */}
                  {handleSearch().map(coin => {
                    // determine what will be rendered for each coin in array that is returned from handleSearch()
                    // map is overwriting each key in the array with a row and cells that will be rendered
                    return (
                      <TableRow key={coin.name} className='row'>
                        <TableCell component='th' scope='row'>
                          <div className='coinLogoName'>
                            <img src={coin.image} alt={coin.name} height='40' style={{ marginBottom: 10 }} />
                            <div className='coinName'>{coin.name}</div>
                          </div>
                        </TableCell>
                        <TableCell align='right'>
                          <div className='coinTicker'>{coin.symbol}</div>
                        </TableCell>
                        <TableCell align='right'
                          styles={{
                            gap: 15,
                          }}>
                          {symbol}{coin.current_price.toLocaleString()}
                        </TableCell>
                        <TableCell align='right'>
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align='right'>
                          {symbol}{coin.market_cap.toLocaleString()}
                        </TableCell>
                        <TableCell align='right'>
                          {
                          watchList.includes(coin.name) ?
                            (<Bookmark className='watched'></Bookmark>) :
                            (<Bookmark className='notWatched' 
                              onClick={() => { 
                                console.log('hello')
                                setWatchList(watchList.concat(coin.name))
                            }}>
                            </Bookmark>)
                          }
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
    </Container>
  )
}
