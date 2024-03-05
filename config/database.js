const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Database connected!')
    })
    .catch((error) => {
        console.log('database connection failed. Exiting now...');
        console.log(error);
        process.exit(1);
    });
};