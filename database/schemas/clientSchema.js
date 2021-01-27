const Mongoose = require('mongoose');


const clientSchema = new Mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        receive:
        {
            type: Date,
            default: null,
            required: false
        },
        open:
        {
            type: Date,
            default: null,
            required: false
        }
    }
);


module.exports = Mongoose.model('clients', clientSchema);