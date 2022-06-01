const fs = require('fs');

module.exports = (req, res, next) => {
    let dateHourRequest = new Date().toISOString();

    let separator = '='.repeat(100);

    fs.appendFileSync("requisicoesLog.txt", `O usuário IP ${req.ip} solicitou a rota ${req.method} ${req.url} | cod status http: ${res.statusCode} as ${dateHourRequest}\n${separator}\n`);

    next();
}