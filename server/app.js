const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const http = require('http');

const mailRoute = require('./routes/mail');
const visitCounter = require('./middleware/visits');

// cors
if(process.env.NODE_ENV !== 'production') {
    const whitelist = [undefined, 'http://localhost:3000'];
    let corsOptions = {
        origin: (origin, callback) => {
            if(whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('URL not whitelisted'));
            }
        }
    };

    app.use(cors(corsOptions));
}

app.use(express.json());

const db = require('./config/keys')['mongoURI'];
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:\n' + err));

// routes
app.use(visitCounter);
app.use('/mail', mailRoute);


// serve react files in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;
app.listen(port, err => {
    if(err) {
        console.log(`Error connecting to port ${port}:\n ${err}`);
    } else {
        console.log('Connected to port ' + port);
    }
});

// pings app every 5 minutes
setInterval(() => {
    http.get('http://unichative.herokuapp.com');
}, 300000);