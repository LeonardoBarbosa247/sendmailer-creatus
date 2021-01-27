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
                return {message: "Successfully"};
            }
        });
    }
    

    open()
    {
        return{
            path: '/open/{id}',
            method: 'GET',
            handler: (request, headers) =>
            {
                this._mailer.open(request.params.id);
                return {message: `Email from id ${request.params.id} was open`};
            }
        }
    }

    list()
    {
        return{
            path: '/',
            method: 'GET',
            handler: (request, headers) =>
            {
                return this._mailer.list();
            }
        }
    }
}
module.exports = ClientRoutes;
