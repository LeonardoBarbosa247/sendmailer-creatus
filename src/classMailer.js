const nodemailer = require('nodemailer');
require('dotenv');

class Mailer
{
    constructor()
    {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth:
            {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });
    }

    async send()
    {
        this._transporter.sendMail(
            {
                from: "Leonardo Barbosa <leoanrdorosa247@gmail.com>",
                to: 'Leonardo Barbosa <leonardo.rosa99@edu.pucrs.br>',
                subject: "Conheça a CREATUS",
                // html: data
                text: "Olá sou a Creatus"
            }
        ).then(data => 
        {
            console.log(`enviado para leonardo`)
            //this.receive(params.id);
        }).catch(data => 
        {
            console.log('error ', data);
            //this.notReceive(params.id);
        });
    }
}

module.exports = Mailer;