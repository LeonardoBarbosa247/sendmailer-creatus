const BaseRoutes = require('./base/baseRoutes');

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
                return this._mailer.list(request.query);
            }
        }
    }

    delete()
    {
        return{
            path: '/',
            method: 'DELETE',
            handler: (request, headers) =>
            {
                // return request.payload;
                return this._mailer.delete(request.payload);
            }
        }
    }
}
module.exports = ClientRoutes;
