const Hapi = require('hapi');
const ClientRoutes = require('./routes/clientRoutes')
const MongoDB = require('./database/mongoDB');
const clientSchema = require('./database/schemas/clientSchema');
const Mailer = require('./src/classMailer');

require('dotenv').config();

const app = new Hapi.Server({
    port: process.env.PORT
});


function mapRoutes(intance, methods)
{
    return methods.map(method => intance[method]());
}

async function main()
{
    
    const connection = MongoDB.connect();
    const mongoDB = new MongoDB(connection, clientSchema);
    const mailer = new Mailer(mongoDB);

    app.route([
        ...mapRoutes(new ClientRoutes(mailer), ClientRoutes.methods())
    ])

    await app.start();
    console.log(`server running at ${app.info.port}`);
    return app;
}


main();