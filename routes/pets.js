const express = require('express')
const router = express.Router()
const petController = require('../controllers/petController');
const verificaSeLogado = require('../middlewares/verificaSeLogado');

router.use(verificaSeLogado);

//Mostra a página inicial dos pets
router.get('/adm/pets', petController.index);
//Mostra a página para cadastrar um novo pet
router.get('/adm/pets/cadastro', petController.create);

//Envia as informações da página do pet para salvar no banco de dados
router.post('/adm/pets', petController.store);

//Mostra a página de detalhes de um pet
router.get('/adm/pets/:id', petController.show);

//Mostra a página para atualizar dados de um pet
router.get('/adm/pets/:id/editar',petController.edit);

//Atualiza os dados do pet selecionado no banco de dados
router.put('/adm/pets/:id',petController.update);

//Deleta um pet do banco de dados
router.delete('/adm/pets/:id', petController.destroy);

/* 
    URL Base: http://localhost:3000/{nome_da_rota}
    GET - /pets - Listar todos os pets
    GET - /pets/:id - Listar um pet por ID (/pets/1)
    POST - /pets - Criar um novo pet
    PUT - /pets/:id - Atualizar um pet por ID (/pets/1)
    DELETE - /pets/:id - Deletar um pet por ID (/pets/1)
    ipconfig
*/

module.exports = router;