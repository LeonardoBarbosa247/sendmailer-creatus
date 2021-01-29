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
        // let date= new Date();
        // let utcTime= date.getTime()+(date.getTimezoneOffset()*60000)
        // let timeOffset= -3
        // let Brazil= new Date(utcTime +(3600000 * timeOffset));

        await this._collection.updateOne({_id: id}, {receive: `${new Date()}`});;
        return {message: "receive"};
    }

    async open(id)
    {
        let result = await this._collection.findOne({_id: id});

        //console.log('diff time', result.receive - result.open);
        // let date1 =  new Date(result.receive);
        // console.log(date1.toString());
        // let date2 = new Date(result.open);
        // console.log(date2.toString());
        // let diff = date1 -  date2;
        // console.log(diff.toString());
        //

        let open = new Date();
        // let utcTime= date.getTime()+(date.getTimezoneOffset()*60000)
        // let timeOffset= -3
        // let Brazil= new Date(utcTime +(3600000 * timeOffset));
        
        // console.log('date', date.toString());
        let receive = new Date(result.receive);
        // console.log('receive', receive.toString());
        // console.log((date - receive).toString());

        // console.log('OPEN!!!');
        if((open - receive) < 5000) return {message: `not open id ${id}`};
        result = await this._collection.updateOne({_id: id}, {open: `${open}`});   
        return {message: "open"}
    }

    async list(query)
    {
        return await this._collection.find(query);
    }

    async create(item)
    {
        return this._collection.create(item);
    }
}

module.exports = MongoDB;