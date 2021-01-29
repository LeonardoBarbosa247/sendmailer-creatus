const nodemailer = require('nodemailer');
const fs = require('fs');
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
        let data = fs.readFileSync(`${__dirname}/../emails/index.html`, 'utf-8');
        data = data.replace("</body>", `<img src = "${process.env.OPEN_URL}/open/${payload.id}" style = "display: none;"></img> </body>`);

        this._transporter.sendMail(
            {
                from: "Leonardo Barbosa <contato@creatus.net.br>",
                to: `${payload.name} <${payload.email}>`,
                subject: "Conheça a CREATUS",
                // text: "Olá sou a Creatus"
                html: data
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

    open(id)
    {
        this._db.open(id);
        console.log(`Email from ${id} was open`);
        // return {message: 'sucessfully'};
    }

    async list()
    {
        return this._db.list();
    }
}

module.exports = Mailer;