const bcrypt = require('bcryptjs');

const senha = "123456";

// var hash = bcrypt.hashSync('bacon', 8);

const hash = bcrypt.hashSync(senha, 10);
//$2a$10$ImgidAKT6v1X00J8FSrQu.5Z7qPFe1jwf5g9b7ct55TDLFXpnSOyW
//$2a$10$B8vNn6ovC4OahMRuVvyNXOH4yCII6N/zxRFBsw7s3s6ce0tcySvpW
console.log(`A senha criptografada é: ${hash}`);

const checarSenha = bcrypt.compareSync("123", hash)
console.log(`Verificando a senha: ${checarSenha}`);

