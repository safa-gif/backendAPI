const mongoose = require("mongoose");


const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
 
        name: {
            type: String,
            required: [true, 'remplir ']
        },
        email: {
            type: String,
            required: true,
        },
        tel:{
          type: Number,
          required: [true, 'remplir '],
          unique:true,

        },
    
        pwd: {
            type: String,
            required: [true, 'remplir ']
        }
    }, 
    {
        timestamps: true,
    })



// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator,{ message: 'Email already in use.' });
const user = mongoose.model("User", userSchema);

module.exports = user;

