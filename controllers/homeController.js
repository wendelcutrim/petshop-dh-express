const Servico = require('../models/servicos');

const homeController = {
    index: (req, res) => {
        const title = 'Minha primeira aplicação com ejs';
        res.render('home', { title });
    },
    sobre: (req, res) => {
        res.render('home/sobre');
    },
    servicos: (req, res) => {
        const servicos = Servico.findAll();
        res.render('home/servicos', { servicos });  
    },
    login: (req, res) => {
        res.render('home/login');
    },
    contato: (req, res) => {
        res.render('home/contato')
    }
}

module.exports = homeController;

