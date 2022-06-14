const Servico = require('../models/servicos');
const storage = require('../config/storage');
const fs = require('fs');
const path = require('path');

const uploadAvatar = storage('avatar', '/servicos');

const servicoController = {
    index: (req,res) => {
        const servicos = Servico.findAll();
        return res.render('adm/servicos', {servicos});
    },
    show: (req, res) => {
        const {id} = req.params;
        const servico = Servico.findById(id);
        if(!servico) {
            return res.send(`Serviço não encontrado`);
        }
        return res.render('adm/servicos/detalhes', {servico});
    },
    create: (req, res) => {
        return res.render('adm/servicos/cadastro');
    },
    store: (req, res) => {
        uploadAvatar(req, res, (err) => {
            const { nome, preco, ativo, descricao } = req.body
            const servico = {
                nome,
                imagem: '/img/servicos' + req.file.filename,
                preco,
                ativo: ativo == 'on' ? true : false,
                descricao
            };
            Servico.save(servico);
        });

        return res.redirect('/adm/servicos');
    },
    edit: (req, res) => {
        const {id} = req.params;
        const servico = Servico.findById(id);
        if(!servico) {
            return res.send(`Serviço não encontrado`);
        }
        return res.render('adm/servicos/editar', {servico});
    },
    update: (req, res) => {
        const {id} = req.params;
        const { imagem, nome, preco, ativo, descricao} = req.body;
        const servico = {
            id,
            imagem,
            nome,
            preco,
            ativo: (ativo ? true : false),
            descricao
        };
        Servico.update(id, servico);
        return res.redirect('/adm/servicos');
    },
    destroy: (req, res) => {
        const {id} = req.params;
        const servico = Servico.findById(id);
        if(!servico) {
            return res.status(404).render('errors', {error: 'Servico não encontrado'});
        }
        
        Servico.delete(id);
        try {
            fs.unlinkSync('./public' + servico.imagem);
        }catch (error){
            console.log(error);
        }
        return res.redirect('/adm/servicos')
    }
};

module.exports = servicoController;