require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const db_url = `mongodb+srv://teddiur:${process.env.MONGODB_PASSWORD}@cluster0.lge5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  useNewUrlParser: true,
};

mongoose.connect(db_url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', err => {
  console.log(`erro na conexão com o banco de dados ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`Aplicação desconectada do banco de dados`);
});

mongoose.connection.on('connected', () => {
  console.log(`Aplicação conectada ao banco de dados`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;
