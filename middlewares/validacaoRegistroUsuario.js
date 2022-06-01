const { check, body } = require('express-validator');

const validacaoRegistroUsuario = [
    check('nome')
        .notEmpty().withMessage('Deve preencher o nome.').bail()
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),
    check('email')
        .notEmpty().withMessage('Deve inserir o e-mail').bail()
        .isEmail().withMessage('Insira um e-mail válido'),
    check('senha')
        .notEmpty().withMessage('Deve inserir uma senha').bail()
        .isLength({ min: 3 }).withMessage('A senha deve ter no mínimo, 3 caracteres')

]

module.exports = validacaoRegistroUsuario;