const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/form", (req, res) => {
    let {email, nome, pontos} = req.body;
    
    console.log(email, nome, pontos);
    res.send("oi");
})

module.exports = router;