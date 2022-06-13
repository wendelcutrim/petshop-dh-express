const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Criar uma rota para a página "/" principal e mande uma mensagem escrito olá.
app.get("/", (req, res) => {
    res.send('Olá')
});

app.get("/contato", (req, res) => {
    res.send("Você acessou a página de contato");
})

app.get("/produto", (req, res) => {
    res.send("Você acessou a página de produto");
})

//localhost:4000/produto/1
app.get("/produto/:nome", (req, res) => {
    const { nome } = req.params;
    res.send("Você acessou o produto de nome:" + nome)
})

app.listen(4000, () => console.log("Servidor está funcionando"));