const express = require('express')
const router = express.Router()
const petController = require('../controllers/petController')

router.get('/adm/pets', petController.index);
router.get('/adm/pets/cadastro', petController.create);
router.post('/adm/pets', petController.store);
router.get('/adm/pets/:id', petController.show);
router.get('/adm/pets/:id/editar',petController.edit);
router.put('/adm/pets/:id',petController.update);
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