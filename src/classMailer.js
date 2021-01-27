const nodemailer = require('nodemailer');
require('dotenv');

class Mailer
{
    constructor(db)
    {
        // console.log('email ', process.env.EMAIL);
        // console.log('pass ', process.env.PASS);
        this._db = db;

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

    async send(payload)
    {
        // let data = {
        //     name: "Leonardo",
        //     email: "leonardo.rosa99@edu.pucrs.br"
        // }
        payload = await this._db.create(payload);
        // console.log(data);
        this._transporter.sendMail(
            {
                from: "Leonardo Barbosa <leonardorosa247@gmail.com>",
                to: `${payload.name} <${payload.email}>`,
                subject: "Conheça a CREATUS",
                text: "Olá sou a Creatus"
            }
        ).then(data => 
        {
            console.log(`Email enviado com sucesso para ${payload.name}`);
            this._db.receive(payload.id);
        }).catch(data => 
        {
            console.log('error ', data);
            //this.notReceive(params.id);
        });
    }
}

module.exports = Mailer;