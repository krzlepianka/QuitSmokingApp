require('dotenv').config({ path: './.env.server'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const api = express.Router();
const mongoose = require('mongoose');
const userController = require('./api/user');
const authController = require('./api/auth');

const { PORT, DB_CONNECTION_STRING } = process.env;

mongoose.connect(DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
console.log(
`Successfully connected to the MongoDB at ${process.env.DB_CONNECTION_STRING}`
);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


api.use('/user', userController);
api.use('/auth', authController);
app.use("/api", api);




app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
