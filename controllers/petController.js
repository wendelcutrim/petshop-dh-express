const Pet = require('../models/pet');
const storage = require('../config/storage');
const fs = require('fs');

const uploadPet = storage('avatarPet', '/pets');

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
       uploadPet(req, res, (err) => {
           const { nome, especie } = req.body;
           const pet = {
               imagem: '/img/pets/' + req.file.filename,
               nome,
               especie
           };
           Pet.save(pet);
           res.redirect('/adm/pets');
       })
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
    destroy: (req, res) => {
        const {id} = req.params;
        let pet = Pet.findById(id);

        if(!pet) return res.status(404).render('errors', {error: "Pet não encontrado"});

        Pet.delete(id);
        try {
            fs.unlinkSync('./public' + pet.imagem);
        }catch (error){
            console.log(error);
        }
        res.redirect('/adm/pets');
    }
}

module.exports = petController;