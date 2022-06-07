module.exports = (req, res, next) => {
    console.log(`Você acessou a rota ${req.url}`);
    return next();
}