# petshop-dh-express

## Aula 30/05/2022

Nesta aula foi realizada a configuração multer e sua utilização dentro dos Controllers.

## Instalação do Multer:
```bash
npm i multer
```
## Configuração do Multer realizada na aula:
-  **Criar** uma **pasta** com o nome **config**:
-  Dentro da pasta **config** criar o arquivo: **storage.js**

Após seguir as etapas acima, dentro do arquivo **storage.js**, realizar os seguintes passos:

- Importar o multer
- Inserir o seguinte script:
```javascript
//Criando a variável storage que recebe 2 parâmetros: 
// - input: Nome do atributo name que será recebido do formulário
// - path: Caminho da pasta onde será salvo a imagem.
const storage = (input, path = '') => {
    //Variável st: Função responsável por informar o caminho de onde a imagem será salva
    const st = multer.diskStorage({
        //Caminho onde será salvo a imagem
        destination: (req, file, cb) => {
            cb(null, './public/img' + path)
        },
        //Método que realizará o nome da imagem, de acordo com a função abaixo, o nome da imagem seguirá o padrão: data e hora atual padrão utc + nome original do arquivo.
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    return multer({ storage: st }).single(input)
}

module.exports = storage
``` 

- Exportar a variável storage

Ao final, deve chegar no seguinte resuldado:
```javascript
/* Pasta: /config/storage.js */
const multer = require('multer')

const storage = (input, path = '') => {
    const st = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/img' + path)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    return multer({ storage: st }).single(input)
}
module.exports = storage
```

## Utilizando o Multer:

Para a sua utilização, será necessário importar o arquivo storage no controller.

O exemplo a seguir será como utilizar no arquivo: **servicoController.js**

- Importar o arquivo storage no controller:

```javascript
const storage = require('../config/storage');
```

- Criar uma variável para configurar os métodos do storage sobre qual o nome do input que irá capturar e o destino onde será salvo as imagens.

```javascript
const uploadAvatar = storage('avatar', '/servicos');
//Foi criado a variável uploadAvatar que está executando o método storage do multer e passando os parâmetros:
/*
avatar: Nome do input do formulário que irá enviar o arquivo
/servicos: pasta que será salvo as imagens enviadas pelo formulário.
*/
```

Após realizar o passo acima, devemos chamar a função uploadAvatar dentro do método store, para que os arquivos possam ser salvos corretamente.

```javascript
store: (req, res) => {
        //Chamando a função uploadAvatar
        uploadAvatar(req, res, (err) => {
            //Capturando os dados que estão sendo enviados pelo body da requisição
            const { nome, preco, ativo, descricao } = req.body

            //Criando a variável que irá armazenar os dados recebidos pelo body.
            const servico = {
                nome,
                //Informando onde será salvo a imagem e capturando o nome da imagem que o multer gerou.
                imagem: '/img/servicos' + req.file.filename,
                preco,
                ativo: ativo == 'on' ? true : false,
                descricao
            };
            //Salvando o novo serviço, junto com a imagem
            Servico.save(servico);
        });
        
        //Redirecionando para a página inicial de serviços, caso dê tudo certo.
        return res.redirect('/adm/servicos');
    },
```

Antes de partimos para a configuração do formulário no arquivo da view, será necessário criar uma pasta com o mesmo nome que passamos como 2º parâmetro na função **uploadAvatar** que está executando o método storage do multer.

Como o nome deste parâmetro foi: **/servicos** dentro da pasta: **public/img** devemos criar uma nova pasta com o nome **servicos**

Ao final, deve chegar no seguinte resultado:
``/public/img/servicos`` 

Agora, para que o método store possa funcionar corretamente será necessário realizar algumas alterações no formulário de envio. Precisamos informar que este formulário também será capaz de enviar arquivos. Para realizar essa configuração basta:

- Abrir a view responsável por realizar o cadastro do serviço: **/views/adm/servicos/cadastro.ejs**

- Na tag **form** do formulário devemos inserir um novo atributo além do action e method, este novo atributo será o: ``enctype="multipart/form-data"``

Feito isso o resultado final do form será:
```html
<form method="POST" enctype="multipart/form-data" action="/adm/servicos">
   <div class="mb-3">
      <label for="avatar" class="form-label">Imagem</label>
      <input type="file" name="avatar" id="avatar" class="form-control" id="">
   </div>
   <div class="mb-3">
      <label for="" class="form-label">Nome</label>
      <input type="text" name="nome" id="nome" class="form-control" id="">
   </div>
   <div class="mb-3">
      <label for="" class="form-label">Preço</label>
      <input type="number" name="preco" class="form-control" id="" >
   </div>
   <div class="mb-3 form-check">
      <input name="ativo" type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" name="ativo" for="exampleCheck1">Ativo</label>
   </div>
   <div class="mb-3">
      <textarea name="descricao" id="" class="form-control" cols="30" rows="10" placeholder="Descrição do serviço"></textarea>
   </div>
   <button type="submit" class="btn btn-primary">Salvar</button>
</form>
```

Agora o nosso formulário está preparado para enviar arquivos e o nosso controller está pronto para capturar estas informações, salvar no banco de dados e renderizar na view as informações do novo produto, junto com a imagem que foi enviada via upload.

## Excluindo uma imagem do servidor

Para excluir uma imagem que foi enviada via upload, será necessário alterar o método **destroy** do controller.

Para excluir a imagem, será necessário importar o módulo file system, que é um módulo nativo do node para trabalhar com arquivos, para isso basta fazer a requisição através do comando:

```javascript 
const fs = require('fs');
```

Após realizar a requisição do método precisamos mexer no método destroy do controller. Segue abaixo o código comentado:

```javascript
destroy: (req, res) => {
        //Reconhecendo o id do serviço que será deletado que foi enviado pelo parâmetro.
        const {id} = req.params;

        //Procurando no banco de dados o objeto do serviço que tem o id que foi enviado pelo parâmetro.
        const servico = Servico.findById(id);

        //Caso o serviço não exista no banco de dados, o cliente será redirecionado para a página de errors(caso você tenha criado como not-found, redirecione para ela) e enviado o objeto com a propriedade error para ser renderizado a mensagem na página.
        if(!servico) {
            return res.status(404).render('errors', {error: 'Servico não encontrado'});
        }
        
        //Caso encontre o serviço, ele será deletado.
        Servico.delete(id);

        //Excluíndo do servidor a imagem do serviço que foi deletado.
        try {
            fs.unlinkSync('./public' + servico.imagem);
        }catch (error){
            console.log(error);
        }

        //Redirecinando o cliente para a página inicial de serviços caso tudo ocorra com sucesso.
        return res.redirect('/adm/servicos')
    }
```