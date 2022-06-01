const Usuario = require('../models/usuario');
const { check, validationResult, body} = require('express-validator');

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
    },

    create: (req, res) => {
        res.render("home/registro")
    },

    store: (req, res) => {

        let errors = validationResult(req);
        console.log(errors);

        if(errors.isEmpty()) {
            const {nome, email, senha} = req.body;
            const usuario = {nome, email, senha};
            Usuario.save(usuario);

            res.redirect("/adm/servicos");
        }

        res.render("home/registro", {listaDeErros: errors.mapped(), old: req.body});

    }

}

module.exports = homeController;

