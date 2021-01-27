const Hapi = require('hapi');
const ClientRoutes = require('./routes/clientRoutes')
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
    
    app.route([
        ...mapRoutes(new ClientRoutes(), ClientRoutes.methods())
    ])

    await app.start();
    console.log(`server running at ${app.info.port}`);
    return app;
}


main();