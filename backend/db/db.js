const mongoose = require('mongoose')

function connetToDb() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('Connected to DB')
    }).catch(err => { console.log(err) })
}

module.exports = connetToDb