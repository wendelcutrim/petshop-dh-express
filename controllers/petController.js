const Pet = require('../models/pet');

const petController = {
    index: (req, res) => {
        const pets = Pet.findAll();
        return res.render('adm/pets', {pets})
    },

    create: (req, res) => {
        res.render("adm/pets/cadastro");
    },

    store: (req, res) => {
        const { imagem, nome, especie} = req.body;
        const pet = {
            imagem, 
            nome, 
            especie
        };
        Pet.save(pet);
        return res.redirect("/adm/pets");
    },
    
    show: (req, res) => {
        const {id} = req.params;
        const pet = Pet.findById(id);
        if(!pet){
            return res.render('errors', {error: "Pet não encontrado ou não existe"});
        }

        return res.render("adm/pets/detalhes", {pet});

    },

    edit: (req, res) => {
        const {id} = req.params;
        const pet = Pet.findById(id);
        if(!pet){
            return res.render('errors', {error: "Pet não encontrado ou não existe"});
        }

        return res.render("adm/pets/editar", {pet});
    },

    update: (req, res) => {
        const {id} = req.params;
        const { imagem, nome, especie } = req.body;
        const pet = {
            id,
            imagem,
            nome,
            especie
        };

        Pet.update(id, pet);
        return res.redirect("/adm/pets");
    },
    destroy: (req, res) => {
        const {id} = req.params;
        Pet.delete(id);
        return res.redirect("/adm/pets");
    }
}

module.exports = petController;