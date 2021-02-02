const { Query } = require('mongoose');
const BaseRoutes = require('./base/baseRoutes');
const Joi = require('joi');

const failAction = (request, h, err) => {
    throw err;
};

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
            config:{
                tags: ['api'],
                description: 'Envia e-mail para um determinado endereço',
                notes: 'Cada envio é uma nova inclusão do banco de dados, para tanto, para cada requisição é feito um novo envio de e-mail e gerado um novo id',
                validate: {
                    failAction,
                    payload: {
                        name: Joi.string().max(100).required(),
                        email: Joi.string().email().required()
                    }
                }
            },
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
            config:{
                tags: ['api'],
                description: 'Informa que o e-mail foi aberto',
                validate:{
                    failAction,
                    params:{
                        id: Joi.string().required()
                    }
                }
            },
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
            config:{
                tags: ['api'],
                description: 'Lista e-mails enviados',
                notes: 'Pode buscar os e-mails através de nome, e-mail, id, ou se foi ou não aberto. Exemplo: ?open=notnull, ?open=null, ?name:Leonardo ... ',
                validate:{
                    failAction,
                    query:{
                        name: Joi.string().max(100).optional(),
                        email: Joi.string().email().optional(),
                        _id: Joi.string().optional(),
                        open: Joi.string().min(4).max(7)
                    }
                }
            },
            handler: (request, headers) =>
            {
                try
                {
                    Object.getOwnPropertyNames(request.query).filter(method => {
                        if(request.query[method] == "notnull") request.query[method] = {$ne: null};
                        else if(request.query[method] == "null") request.query[method] = null;
                    });
                    return this._mailer.list(request.query);
                }catch(err)
                {
                    return err;
                }
                
            }
        }
    }

    delete()
    {
        return{
            path: '/',
            method: 'DELETE',
            config:{
                tags: ['api'],
                description: 'Deleta e-mail(s) enviando(s) da base de dados',
                notes: 'Deleta e-mails da base de dados através do id, nome, email ou limpa a base de dados se nenhum destes for informado',
                validate:{
                    failAction,
                    payload:{
                        _id: Joi.string().optional(),
                        name: Joi.string().max(100).optional(),
                        email: Joi.string().email().optional()
                    }
                }
            },
            handler: (request, headers) =>
            {
                return this._mailer.delete(request.payload);
            }
        }
    }
}
module.exports = ClientRoutes;
