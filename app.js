const express = require('express');
const mysql = require('mysql2');
const cors = require("cors")
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import the users route
const { connectToDB } = require('./db');
const router = require("./routes/index.route")

const app = express();
app.use(cors())
app.use(bodyParser.json());

(async () => {
    await connectToDB()
    app.use(express.static(path.join(__dirname, './app/public')));
    app.use('/js', express.static(path.join(__dirname, './app/js')));
    app.use('/images',express.static(path.join(__dirname, './app/images')));
    app.use('/api', router);
    

    app.use((err, req, res, next) => {
        if (err) {
            res.status(err.statusCode || 500).json({
                "message": err.message || err,
                "status": err.statusCode || 500
            })
        } else {
            next()
        }
    })
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})()
