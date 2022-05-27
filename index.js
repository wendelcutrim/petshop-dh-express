const express = require('express');
const app = express();
const petsRouter = require('./routes/pets');
const servicosRouter = require('./routes/servicos');
const homeRouter = require('./routes/home');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs'); 
app.set('views', './views'); // padrão o express já configura a pasta views
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(homeRouter);
app.use(petsRouter);
app.use(servicosRouter);


app.listen(3000, () => console.log('Rodando...'))