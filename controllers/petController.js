const Pet = require('../models/pet');

const petController = {
    // Mostrar a página inicial de pets
    index: (req, res) => {},

    //Mostrar a página para cadastar um pet
    create: (req, res) => {},

    //Realiza o cadastro de um novo pet no banco de dados
    store: (req, res) => {},
    
    //Exibe a página de detalhes de um pet
    show: (req, res) => {},

    //Exibe a página para editar os dados do Pet
    edit: (req, res) => {},

    //Atualiza os dados do pet no banco de dados
    update: (req, res) => {},

    //Exclui um pet do banco de dados
    destroy: (req, res) => {}
}

module.exports = petController;