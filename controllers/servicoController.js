const Servico = require('../models/servicos');

const servicoController = {
    index: (req,res) => {
        const servicos = Servico.findAll();
        console.log(servicos);
        return res.render('admin/servicos', {servicos});
    },
    create: (req, res) => {
        return res.render('admin/servicos/cadastro');
    },
    store: (req, res) => {},
    update: (req, res) => {},
    destroy: (req, res) => {}
};

module.exports = servicoController;