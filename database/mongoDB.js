const Mongoose = require('mongoose');
//  const Mailer = require('./../classMailer');
require('dotenv');

class MongoDB 
{
    constructor(connection, schema)
    {
        this._connection = connection;
        this._collection = schema;
        // this._mailer = new Mailer();s
    }

    static connect()
    {
        Mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }, error => {
            if(!error) return;
            console.log(`Error: ${error}`);
        });

        const connection = Mongoose.connection
        connection.once('open', ()=> console.log('Connected'));
        return connection
    }


    async receive(id)
    {
        let date= new Date();
        let utcTime= date.getTime()+(date.getTimezoneOffset()*60000)
        let timeOffset= -3
        let Brazil= new Date(utcTime +(3600000 * timeOffset));

        await this._collection.updateOne({_id: id}, {receive: `${Brazil.toString()} +0:00`});;
        return {message: "receive"};
    }

    async open(id)
    {
        let date= new Date();
        let utcTime= date.getTime()+(date.getTimezoneOffset()*60000)
        let timeOffset= -3
        let Brazil= new Date(utcTime +(3600000 * timeOffset));


        let result = await this._collection.updateOne({_id: id}, {open: `${Brazil.toString()} +00:00`});   
        return {message: "open"}
    }

    async create(item)
    {
        return this._collection.create(item);
    }
}

module.exports = MongoDB;