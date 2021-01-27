const BaseRoutes = require('./base/baseRoutes');
const Mailer = require('./../src/classMailer');

class ClientRoutes extends BaseRoutes
{
    constructor()
    {
        super();
        this._mailer = new Mailer();
    }

    create()
    {
        return(
        {
            path: '/',
            method: 'GET',
            handler: (request, headers) =>
            {
                this._mailer.send();
                return {message: "Successfully"}
            }
        });
    }
    
}
module.exports = ClientRoutes;
