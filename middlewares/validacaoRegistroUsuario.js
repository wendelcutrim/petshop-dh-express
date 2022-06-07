const { body } = require('express-validator');

const validacaoRegistroUsuario = [
    body("nome")
        .notEmpty().withMessage("Deve preencher o nome").bail()
        .isLength({min: 3, max: 200}).withMessage("O nome deve ter no minimo 3 caracteres"),
]

module.exports = validacaoRegistroUsuario;