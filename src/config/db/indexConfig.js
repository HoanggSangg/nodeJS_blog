const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.set('strictQuery', false);
        
        await mongoose.connect('mongodb://127.0.0.1/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log(error);
        console.log('Connect failure');
    }
}

module.exports = { connect };