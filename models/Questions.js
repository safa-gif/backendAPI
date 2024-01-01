const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let querySchema = new Schema({
    titre: {
        type: String
    },
    contenu: {
        type: String,
    },
   categorie:{
      type: String,
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Question', querySchema)
