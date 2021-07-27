const express = require('express');
const viewEngine = require('./config/viewEngine');
const route = require('./route');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const chalk = require('chalk');
const app = express();

//config app
app.use(cors({origin: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

viewEngine(app);
route(app);

connectDB;

const port = process.env.PORT || 8000;

app.listen(port, () => {
   console.log(
      chalk.bold.magenta(
         'Server running on http://dungxbuif-localhost:' + port,
      ),
   );
});
