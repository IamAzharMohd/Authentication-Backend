const express = require ('express');
const morgan = require('morgan');
const authRoutes = require ('./routes/authRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.listen(3300, () => console.log('server started at localhost:3300'));

app.use(authRoutes);