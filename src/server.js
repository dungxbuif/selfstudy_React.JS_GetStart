const express = require('express');
const viewEngine = require('./config/viewEngine');
const route = require('./route');
// const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const app = express();

//config app
// app.use(cors({ origin: true }));

// Add headers
app.use(function (req, res, next) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

   // Request methods you wish to allow
   res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
   );

   // Request headers you wish to allow
   res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
   );

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

viewEngine(app);
route(app);

connectDB;
const model = require('./models');
console.log(model);
const port = process.env.PORT || 8000;

app.listen(port, () => {
   console.log('Server running on http://dungxbuif-localhost:' + port);
});
