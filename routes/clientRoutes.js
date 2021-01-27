const BaseRoutes = require('./base/baseRoutes');
// const Mailer = require('./../src/classMailer');

class ClientRoutes extends BaseRoutes
{
    constructor(mailer)
    {
        super();
        this._mailer = mailer;
    }

    create()
    {
        return(
        {
            path: '/',
            method: 'POST',
            handler: (request, headers) =>
            {
                this._mailer.send(request.payload);
                return {message: "Successfully"}
            }
        });
    }
    
}
module.exports = ClientRoutes;
