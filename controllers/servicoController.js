const Servico = require('../models/servicos');

const servicoController = {
    index: (req,res) => {
        const servicos = Servico.findAll();
        console.log(servicos);
        return res.render('admin/servicos', {servicos});
    },
    show: (req, res) => {
        const {id} = req.params;
        const servico = Servico.findById(id);
        if(!servico) {
            return res.send(`Serviço não encontrado`);
        }
        return res.render('admin/servicos/detalhes', {servico});
    },
    create: (req, res) => {
        return res.render('adm/servicos/cadastro');
    },
    store: (req, res) => {
        const { imagem, nome, preco, ativo, descricao } = req.body
        const servico = {
            nome,
            imagem: 'https://saude.abril.com.br/wp-content/uploads/2018/12/cachorro-livro.png',
            preco,
            ativo: ativo == 'on' ? true : false,
            descricao
        };
        Servico.save(servico);
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
        Servico.delete(id);
        return res.redirect('/adm/servicos')
    }
};

module.exports = servicoController;