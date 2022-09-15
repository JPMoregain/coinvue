const express = require('express')
const PORT = 3000;
const router = require('./routes/api.js')
const path = require('path');

const app = express();

 /* handle parsing request body
 */

 app.use(express.json());

 /**
  * require routers
  */
 
 app.use('/', router);

 /**
 * handle requests for static files
 */
app.use('/assets', express.static(path.join(__dirname, 'build')));

// route handler to respond with main app

app.get('/*', (req,res) => {
    // console.log('hello')
    return res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
  });

// catch-all route handler for any requests to an unknown route

app.use('*', (req, res) => res.sendStatus(404));


// combined app.use from error handler above with our functionality that was previously under the name "errorHandler"
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

 /**
 * start server
 */
 app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;