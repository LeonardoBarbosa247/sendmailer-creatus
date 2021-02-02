const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv');

class Mailer
{
    constructor(db)
    {
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
        payload = await this._db.create(payload);
        let data = fs.readFileSync(`${__dirname}/../emails/index.html`, 'utf-8');
        data = data.replace("</body>", `<img src = "${process.env.OPEN_URL}/open/${payload.id}" style = "display: none;"></img> </body>`);

        this._transporter.sendMail(
            {
                from: "Creatus Development <contato@creatus.net.br>",
                to: `${payload.name} <${payload.email}>`,
                subject: `${payload.name}, conheça as soluções para seu empreendimento!`,
                html: data
            }
        ).then(data => 
        {
            console.log(`Email enviado com sucesso para ${payload.name}`);
            this._db.receive(payload.id);
        }).catch(data => 
        {
            console.log('error ', data);
        });
    }

    open(id)
    {
        this._db.open(id);
        console.log(`Email from ${id} was open`);
    }

    async list(query)
    {
        return this._db.list(query);
    }

    async delete(query)
    {
        let result = await this._db.delete(query);
        return {message: `Deleted ${result.n} occurrences`};
    }
}

module.exports = Mailer;