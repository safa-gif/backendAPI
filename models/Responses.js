const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let responseSchema = new Schema({

    contenu: {
        type: String,
    },
   categorie:{
      type: String,
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Response', responseSchema)
