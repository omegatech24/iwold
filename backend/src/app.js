
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const clienteRouter = require('./routers/clienteRouter');
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:6666', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    maxAge: 600
}));

app.use(clienteRouter);

module.exports = app;
