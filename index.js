require('dotenv').config({ path: './.env.server'});
const express = require('express');
    bodyParser = require('body-parser');
    cors = require('cors');
    app = express();
    mongoose = require('mongoose');
    path = require('path');
    api = require('./api/index');

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


app.use("/api", api);

try {
    app.use(express.static(path.resolve('build')));
}
catch(err) {
    console.error('must generate build folder')
}

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
