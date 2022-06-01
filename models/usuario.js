// responsavel por realizar as operações de CRUD no banco de dados
const fs = require('fs');
const { v4: geradorDeId } = require('uuid');

// geradorDeId(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function open() {
    let content = fs.readFileSync("./db.json", "utf8")
    const db = JSON.parse(content); // de texto json para js
    return db;
}

function store(db) {
    content = JSON.stringify(db, null, 4); // de js para texto json
    fs.writeFileSync("./db.json", content, "utf8")
}

const Usuario = {
    findAll: () => {
        const db = open();
        return db.usuarios;
    },
    findById: (id) => {
        const db = open();
        const servico = db.usuario.find(servico => servico.id == id);
        return servico;
    },
    save: (usuario) => {
        const db = open();
        usuario.id = geradorDeId(); // gerando um id para meu novo usuário
        db.usuarios.push(usuario);
        store(db);
    },
    update: (id, usuarioAtualizado) => {
        const db = open();
        const index = db.usuario.findIndex(servico => servico.id == id);
        db.usuarios[index] = usuarioAtualizado;
        store(db);
    },
    delete: (id) => {
        const db = open();
        const index = db.usuarios.findIndex(usuario => usuario.id == id);
        db.usuarios.splice(index, 1);
        store(db);
    }
}

module.exports = Usuario;