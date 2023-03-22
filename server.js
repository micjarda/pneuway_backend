// variables
require('dotenv').config();

// technoligies
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// routes
const pneuWayRoutes = require('./routes/pneuWay');
const authRoutes = require('./routes/auth');

// app
const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/auth', authRoutes);
app.use('/api', pneuWayRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log ('Connected to db & listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
});