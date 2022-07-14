const express = require("express")
const app = express()
const petugas = require("../models/index").petugas
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BAYARSPPBOSS"
const auth = require("../auth")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", auth, async(req, res) => {
    petugas.findAll()
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:id", auth, async(req,res) => {
    let param = {
        id_petugas : req.params.id
    }
    petugas.findOne({where:param})
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", auth, async(req,res) => {
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_petugas : req.body.nama_petugas,
        level : req.body.level
    }
    petugas.create(data)
    .then(result => {
        res.json({
            message: "Data Berhasil Ditambahkan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", auth, async(req,res) => {
    let param = {
        id_petugas : req.body.id_petugas
    }
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    petugas.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data Berhasil Diupdate"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id", auth, async(req,res) => {
    let param = {
        id_petugas : req.params.id
    }
    petugas.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data Berhasil Dihapus"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//LOGIN Admin
app.post("/admin", async(req,res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password),
        level: "admin"
    }
    let result = await petugas.findOne({where: param})
    if (result) {
        let payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else {
        res.json({
            logged: false,
            message: "Invalid Username or Password"
        })
    }
})

//LOGIN Petugas
app.post("/petugas", async(req,res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password),
        level: "petugas"
    }
    let result = await petugas.findOne({where: param})
    if (result) {
        let payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else {
        res.json({
            logged: false,
            message: "Invalid Username or Password"
        })
    }
})

module.exports = app