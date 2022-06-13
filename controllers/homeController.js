const Servico = require('../models/servicos');
const fs = require('fs');
const { v4: geradorDeId } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
        res.render("home/registro");
    },
    store: (req, res) => {
        let errors = validationResult(req);
        console.log(errors);

        if(errors.isEmpty()) {
            let content = fs.readFileSync("./db.json", "utf8");
            const db = JSON.parse(content);
    
            const { nome, email, senha } = req.body;

            const senhaCriptografada = bcrypt.hashSync(senha, 10);
    
            const usuario = {id: geradorDeId(), nome, email, senha: senhaCriptografada }
    
            db.usuarios.push(usuario);
            content = JSON.stringify(db);
    
            fs.writeFileSync("./db.json", content);
    
            return res.redirect("/adm");
        }

        return res.render("home/registro", {listaDeErros: errors.errors, old: req.body})

        
    },

    showAdm: (req,res) => {
        res.render("adm");
    },

    postLogin: (req,res) => {
        let content = fs.readFileSync("./db.json", "utf8");
        const db = JSON.parse(content);

        const { email, senha } = req.body

        const usuario = db.usuarios.find(user => user.email == email);

        if(!usuario || !bcrypt.compareSync(senha, usuario.senha) ){
            return res.render("home/login", {error: "Email ou senha estão incorretos ou não existe", old: req.body})
        }

       /*  if(!bcrypt.compareSync(senha, usuario.senha)){
            return res.render("home/login", {error: "Email ou senha estão incorretos ou não existe"})
        } */

        req.session.usuario = usuario
        console.log(req.session);

        res.redirect("/adm");
    },

    logout: (req, res) => {
        req.session.destroy((err) => console.log(err));
        res.redirect('/login')
    }
}

module.exports = homeController;

