const axios = require('axios')
const cheerio = require('cheerio')
const nodemailer = require('nodemailer')
const smtp = require('./smtp')
const URL = 'https://portal.ifsuldeminas.edu.br/index.php/cursos-superiores/aberto-cursos-superiores/5633-edital-20-2023-processo-seletivo-de-transferencia-unificado'

const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port, 
    // secure: false,
    auth: {
        user: smtp.user,
        pass: smtp.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})
const mailoptions = {
    from: smtp.user,
    to: '', //alterar
    subject: 'INSCRIÇÃO DO IF',
    text: `\n\nOla Pedro Pontes\n\nSegue o link para acessar o cadastro:\n ${URL}`
}
async function send(){
    await transporter.sendMail(mailoptions, (err, info) => {
        err 
            ? console.log(err) 
            : console.log('Email enviado: ' + info.response)
})}

function requestss(){
    axios.get(URL).then( res => {
        const HTML = res.data
        const $ = cheerio.load(HTML)

        let element = $('tr').children('td').text()

        element = element.split('\n\n')
        console.log(element)
        // text[1] === 'Embreve'
        //     ? requestss() 
        //     : send()
    })
}

requestss()
