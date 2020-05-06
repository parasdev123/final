let db_username;
let db_password;

if(process.env.NODE_ENV === 'production') {
    db_username = process.env.DB_USERNAME;
    db_password = process.env.DB_PASSWORD;
} else {
    db_username = require('../../env')['DB_USERNAME'];
    db_password = require('../../env')['DB_PASSWORD']
}

module.exports = {
    mongoURI: `mongodb+srv://${db_username}:${db_password}@cluster0-hox7y.mongodb.net/uniche-site-feedback?retryWrites=true&w=majority`
}