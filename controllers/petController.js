const Pet = require('../models/pet');

const petController = {
    // Mostrar a página inicial de pets
    index: (req, res) => {
        const pets = Pet.findAll();
        res.render('adm/pets', {pets});
    },

    //Mostrar a página para cadastar um pet
    create: (req, res) => {
        res.render("adm/pets/cadastro")
    },

    //Realiza o cadastro de um novo pet no banco de dados
    store: (req, res) => {
       const { imagem, nome, especie } = req.body;
       const pet = {
           imagem,
           nome,
           especie
       };
       Pet.save(pet);
       res.redirect('/adm/pets');
    },
    
    //Exibe a página de detalhes de um pet
    show: (req, res) => {
        const {id} = req.params;
        const pet = Pet.findById(id);
        res.render("adm/pets/detalhes", {pet});
    },

    //Exibe a página para editar os dados do Pet
    edit: (req, res) => {
        const {id} = req.params;
        const pet = Pet.findById(id);
        res.render("adm/pets/editar", {pet});
    },

    //Atualiza os dados do pet no banco de dados
    update: (req, res) => {},

    //Exclui um pet do banco de dados
    destroy: (req, res) => {}
}

module.exports = petController;