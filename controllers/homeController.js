/* const Usuario = require('../models/usuario'); */
/* const Servico = require('../models/servico'); */
const fs = require('fs');
const {v4: geradorDeId} = require("uuid");

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
            let content = fs.readFileSync("./db.json", "utf8");
            const db = JSON.parse(content);

            const {nome, email, senha} = req.body;
            const usuario = { id: geradorDeId(), nome, email, senha};

            /* Usuario.save(usuario); */
            db.usuarios.push(usuario);
            content = JSON.stringify(db, null, 4);
            fs.writeFileSync("./db.json", content, "utf8");

            res.redirect("/adm");
        }

        res.render("home/registro", {listaDeErros: errors.mapped(), old: req.body});

    },

    showAdmin: (req, res) => {
        res.render("adm/")
    }

}

module.exports = homeController;

