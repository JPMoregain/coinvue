import React, { useEffect, useState } from 'react';
import NavBar from '../navBar';
import { db } from '../../../config/Fire';
import { doc, updateDoc, collection, getDoc } from '@firebase/firestore';
import { cryptoState } from '../../../contexts/cryptoContext';

// WRITE CONDITIONAL TO RENDER SPECIFIC INFO IF USERDB DOES NOT HAVE A WATCHLIST PROPERTY
export default function Watchlist() {
  const [dbWatchlist, setDbWatchlist] = useState('')
  // import props from global context
  const { currentUID, coinData } = cryptoState();

  // find currentUID in database and determine whether there are any coins stored in their watchlist

  const currentUserDbInfo = doc(db, `userList/${currentUID}`)

  const getUserData = async () => {
    const result = await getDoc(currentUserDbInfo);
    const userData = result.data();
    setDbWatchlist(userData.watchlist);
  }

  useEffect(() => {
    getUserData();
  }, [])

  // PICK BACK UP HERE ***//
  const handleSearch = () => {
    return coinData.filter(coin => coin.name.toLowerCase().includes(searchValue.toLowerCase()))
  }
  //*******************************************SDFSDA:LFKJALFSKJ */
  
  return (
    <>
      <NavBar />
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
                            (<Bookmark className='watched'
                              onClick={() => {
                                removeFromWatchlist(coin.name)
                              }}>
                            </Bookmark>) :
                            (<Bookmark className='notWatched' 
                              onClick={() => { 
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
          }
        </TableContainer>
    </Container>
    </>
  )
}
