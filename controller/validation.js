const express = require("express");
const router = express.Router();
const cookieParser = require("cookie");

router.get("/", (req, res) => {
    let emailErr, nomeErr, pontosErr;

    nomeErr = req.flash("nomeErr");
    emailErr = req.flash("emailErr");
    pontosErr = req.flash("pontosErr");

    nome = req.flash("nome");
    email = req.flash("email");
    pontos = req.flash("pontos");

    nomeErr = (nomeErr == undefined || nomeErr.length == 0) ? undefined : nomeErr;
    emailErr = (emailErr == undefined || emailErr.length == 0) ? undefined : emailErr;
    pontosErr = (pontosErr == undefined || pontosErr.length == 0) ? undefined : pontosErr;

    nome = (nome == undefined || nome.length == 0) ? undefined : nome;
    email = (email == undefined || email.length == 0) ? undefined : email;
    pontos = (pontos == undefined || pontos.length == 0) ? undefined : pontos;

    res.render("index", {emailErr, nomeErr, pontosErr, nome: nome, email: email, pontos: pontos});
}); 

router.post("/form", (req, res) => {
    let { email, nome, pontos } = req.body;
    let emailErr, nomeErr, pontosErr;

    if (!email) {
        emailErr = "O email não pode ser nulo!";
    };

    if (!(email.includes("@gmail.com"))) {
        emailErr = "digite um email valido";
    };

    if (!nome) {
        nomeErr = "O nome não pode ser nulo";
    };

    if (nome.length < 4) {
        nomeErr = "Digite um nome válido";
    }

    if (verification(nome)) {
        nomeErr = "O seu nome não pode conter numeros ou caracteres";
    }

    function verification(text) {
        return /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(text);
    };

    if (pontos < 0 || pontos > 100) {
        pontosErr = "os pontos devem estar entre 0 e 100";
    };

    if (emailErr != undefined || nomeErr != undefined || pontosErr != undefined) {
        req.flash("emailErr", emailErr);
        req.flash("nomeErr", nomeErr);
        req.flash("pontosErr", pontosErr);

        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("pontos", pontos);

        res.redirect("/");
    } else {
        res.send("form sent");
    };
})

module.exports = router;