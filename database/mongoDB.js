const Mongoose = require('mongoose');
require('dotenv');

class MongoDB 
{
    constructor(connection, schema)
    {
        this._connection = connection;
        this._collection = schema;
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
        await this._collection.updateOne({_id: id}, {receive: `${new Date()}`});;
        return {message: "receive"};
    }

    async open(id)
    {
        let result = await this._collection.findOne({_id: id});
        let open = new Date();
    
        let receive = new Date(result.receive);

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

    async delete(item)
    {
        return this._collection.deleteMany(item);
    }
}

module.exports = MongoDB;