const BaseRoutes = require('./base/baseRoutes');

class ClientRoutes extends BaseRoutes
{
    constructor()
    {
        super();
    }

    create()
    {
        return(
        {
            path: '/',
            method: 'POST',
            handler: (request, headers) =>
            {
                return {message: "Successfully"}
            }
        });
    }
    
}
module.exports = ClientRoutes;
