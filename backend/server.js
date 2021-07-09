require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

let index = express();
let Route = require('./api/todo/todo.router');

index.use(cors());
index.use(bodyParser.urlencoded({ extended: true }));
index.use(bodyParser.json());
index.use(express.json());
index.use('/todo', Route)


index.listen(process.env.APP_PORT, () => {
    console.log("Berjalan di server " + process.env.APP_PORT);
});

