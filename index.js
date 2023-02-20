const axios = require('axios')
const cheerio = require('cheerio')
const nodemailer = require('nodemailer')
const smtp = require('./smtp')
const URL = 'https://portal.ifsuldeminas.edu.br/index.php/cursos-superiores/aberto-cursos-superiores/5633-edital-20-2023-processo-seletivo-de-transferencia-unificado'

const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port, 
    auth: {
        user: smtp.user,
        pass: smtp.pass
    },
})
const mailoptions = {
    from: smtp.user,
    to: '', //email de destino
    subject: 'INSCRIÇÃO DO IF', //assunto do email
}
async function send(element){
    await transporter.sendMail(mailoptions, (err, info) => {
        err 
            ? console.log(err) 
            : console.log('Email enviado')
})}

function requestss(){
    axios.get(URL).then( res => {
        const HTML = res.data
        const $ = cheerio.load(HTML)
        let element = $('tr').text().split('\n\n\n').join('\n')

        // console.log(element)
        mailoptions.text = element
        send()
    })
}

requestss()
