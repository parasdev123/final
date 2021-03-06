const Visit = require('../models/visit');

// counting visits
const countVisits = (req, res, next) => {
    const url = req.originalUrl;

    Visit.findOne({ page: url, method: req.method }, (err, visit) => {
        if(visit === null) {
            const newPage = new Visit({
                page: url,
                method: req.method,
                count: 1
            });
        
            newPage.save()
                .then(page => console.log('Successful update'))
                .catch(err => console.log('Update error: ' + err));
        } else {
            visit.count += 1;
            visit.save()
                .then(vis => console.log('Successful update'))
                .catch(err => console.log('Update error: ' + err));
        }
    });

    next();
};

module.exports = countVisits;