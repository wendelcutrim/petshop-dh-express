const fs = require('fs');
const { v4: geradorDeId } = require('uuid');

function open () {
    let content = fs.readFileSync("./db.json", "utf8");
    const db = JSON.parse(content);
    return db;
}

function store (db) {
    fs.writeFileSync("./db.json", content, "uft8");
}

const Servico = {
    findAll: () => {
        const db = open();
        return db.servicos;
    },
    findById: (id) => {
        const db = open();
        const servico = db.servicos.find(servico => servico.id == id);
        return servico;
    },
    save: (servico) => {
        const db = open();
        servico.id = geradorDeId();
        db.servicos.push(servico);
    },
    update: (id, servicoAtualizado) => {
        const db = open();
        let servico = db.servicos.find(servico => servico.id == id);
        const index = servico.indexOf(servico);
        db.servicos[index] = servicoAtualizado;
        store(db);
    },
    delete: (id) => {
        const db = open();
        const index = db.servicos.findIndex(servico => servico.id == id);
        db.servicos.splice(index, 1);
        store(db);
    },
}

module.exports = Servico