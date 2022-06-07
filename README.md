# petshop-dh-express

## 06/06/2022 - Middlewares
 
Nesta aula foi realizada a explicação e configuração de middlewares global e por rota.
As atividades estão no arquivo tasks.todo

### Middlewares global:

São aqueles que aplicamos dentro do entry point através do método app.use() e que irá capturar todas as rotas ou um grupo específico de rotas.

**Exemplo:** O middleware de log que realizamos durante a aula para gerar um log de cada rota que foi acessada com algumas informações como ip do usuário, método http, url da rota, código da resposta e a data e hora do acesso.

### Middleware por rota

São aqueles que aplicamos nas rotas que queremos proteger, por exemplo o middleware de validação de registro do usuário que desenvolvemos durante a aula.

## Express Validator

Instalação:

`` npm i express-validator ``

**Link da documentação:** https://express-validator.github.io/docs/

### Configuração do middleware de validação

No arquivo do middleware requerir o express-validator desestruturando o método body.
`` const {body} = require("express-validator") `` 


Em seguida criar uma variável que será um array que receberá todas as validações que iremos fazer e exporta-la.

Este array deve receber o método body que deve ser informado como parâmetro o atributo `name`do input que queremos validar e em seguida os métodos de validações do express validator.

Os métodos de validações podem ser verificados através do seguinte link da documentação: https://github.com/validatorjs/validator.js#validators


**Exemplo do middleware realizado na aula:**

```javascript
const { body } = require('express-validator');

const validacaoRegistroUsuario = [
    body("nome")
        .notEmpty().withMessage("Deve preencher o nome").bail()
        .isLength({min: 3, max: 200}).withMessage("O nome deve ter no minimo 3 caracteres"),
]

module.exports = validacaoRegistroUsuario;
```

### Protegendo as rotas com o middleware

Agora que criamos o array com as validações que queremos realizar, devemos importar este middleware no arquivo de rotas e aplicá-lo na rota que queremos proteger.

**Exemplo realizado em aula**

```javascript
const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')

// Importação do middleware
const validacaoRegistroUsuario = require('../middlewares/validacaoRegistroUsuario'); 

router.get('/', homeController.index)
router.get('/sobre', homeController.sobre)
router.get('/servicos', homeController.servicos)
router.get('/login', homeController.login)
router.get('/contato', homeController.contato)
router.get('/registrar', homeController.create)

//Aplicando o middleware na rota que queremos proteger
router.post('/registrar', validacaoRegistroUsuario, homeController.store)

module.exports = router
```

Neste caso após as informações chegar na rota, eles irão entrar no middleware, caso passe na validação, ele será enviado para o controller e será criado o usuário, senão irá gerar um array de errors que deve ser configurado no controller para enviar estes erros para a view. Na view também deve ser configurado para exibir os erros para o client.

### Trabalhando com os erros da Validação.

No controller, devemos requerir o método validationResult do express-validator.

```javascript
const { validationResult } = require('express-validator');
```

Em seguida, no método do controller que que está tratando os dados da rota que está sendo utilizando o middleware, devemos criar uma variável de erros para receber o array de erros que não passaram na validação.

```javascript
store: (req, res) => {
    let errors = validationResult(req);
}
```

Agora, toda a lógica que estava configurada para cadastrar o usuário no banco de dados, deve ser colocada dentro de um **if** o parâmetro deste if deve ser: ***Verificar se a variável de errors está vazia*** com o método **isEmpty()** do express-validator.

Caso esteja vazia, ele deixa criar o usuário, senão, retorna para a view de registro, passando os erros que foram encontrados.

Ao mandar renderizar a view no caso de erros, devemos mandar o objeto do render com 2 propriedes: Os erros que foram gerados e o valor antigo dos dados que recebemos do req.body

```javascript
//Importando o validationResut
const { validationResult } = require('express-validator');

const homeController = {
    store: (req, res) => {
    //Gerando o array de erros da validação
    let errors = validationResult(req);

    //Caso o array de erros esteja vazio, será realizado estas isntruções;
    if(errors.isEmpty()) {

        //Criando a variável que irá armazenar os valores do banco de dados json
        let content = fs.readFileSync("./db.json", "utf8");

        //Convertendo os dados do banco de dados JSON para objetos literal JS
        const db = JSON.parse(content);

        //Capturando as informações que estão vindo pelo corpo da requisição
        const { nome, email, senha } = req.body;
    
        //Armazenando os dados que estão vindo do corpo da requisição nesta variável e utilizando o uuid para gerar o ID do usuário.
        const usuario = {id: geradorDeId(), nome, email, senha }
    
        //Inserindo a variavel usuario dentro do objeto literal JS do banco de dados
        db.usuarios.push(usuario);

        //Transformando o objeto literal com as novas infomrações em JSON
        content = JSON.stringify(db);
    
        //Passando as novas informções para o banco de dados
        fs.writeFileSync("./db.json", content);

        //Redirecionando para a rota de serviços
        return res.redirect("/adm/servicos");
    }

    //Caso o array de erros estiver com algum dado, será realizada esta instrução. Estamos enviando a lista de erros através da propriedade: listaDeErros e os dados que foram digitado através da variável old.
    return res.render("home/registro", {listaDeErros: errors.errors, old: req.body})        
    }
}

module.exports = homeController
```

### Exibindo erros de validação na view

Para exibir os erros na view é bem simples, com o EJS, devemos fazer um if perguntando se o tipo da variável de erros é diferente de **undefined**.

Caso seja, não será exibido os erros, mas caso tenha algum valor, iremos exibir uma lista com os erros percorrendo o array de erros e em cada lista, imprimir o erro.

Lembrando que para recuperar o valor do input que foi enviado anteriormente, será através da variável **old** que o controler nos enviou.
Este valor deve ser inserido dentro do input através da propriedade **value** e utilizando o EJS perguntar se existe a variável old e qual o seu valor.

```html
<body>
    <%- include('../partials/header') %>
    <main>
        <section class="servicos-lista">
        
            <div class="container">
                <h1>Cadastro de Usuário</h1>
                <div class="errors">
                    <!--Verificando se existe algum erro, caso existir, esta div entrará em ação -->
                    <% if(typeof listaDeErros !== "undefined"){ %>
                        <h3>Erros</h3>
                        <ul>
                            <!-- Percorrendo o array de erros e imprimir a propriedade msg (é o que configuramos no middleware de verificação através da propriedade .withMessage()) -->
                            <% for(let error of listaDeErros) { %>
                            <!-- Caso tiver algum erro, será gerada uma nova lista com estes erros -->
                                <li><%= error.msg %></li>
                            <% } %>
                        </ul>
                        
                   <% } %>
                </div>
                <form action="/registrar" method="POST">
                    <div class="mb-3">
                      <label for="nome" class="form-label">Nome</label>
                      <input type="text" name="nome" id="nome" class="form-control" placeholder="Insira o seu nome" value="<%= locals.old && old.nome%>"> <!-- No atributo value, estamos utilizando o locals, ele é uma variável global. Estamos perguntando se caso existir a variável old e tiver a propriedade nome, deverá ser impresso aqui senão, o valor será vazio. Assim recuperamos a informação que o usuário tinha digitado anteriormente.-->

                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" name="email" id="email" class="form-control" placeholder="seuemail@exemplo.com">
                    </div>
                    <div class="mb-3">
                      <label for="senha" class="form-label">Senha</label>
                      <input type="password" name="senha" id="senha" class="form-control"  placeholder="********">
                    </div>
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                  </form>
            </div>
        </section>
    </main>

    <%- include('../partials/footer') %>
</body>
```



