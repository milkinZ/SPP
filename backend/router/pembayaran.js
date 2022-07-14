const express = require("express")
const app = express()
const moment = require("moment")
const siswa = require("../models/index").siswa
const pembayaran = require("../models/index").pembayaran
const petugas = require("../models/index").petugas

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", async(req,res) => {
    pembayaran.findAll({
        include: ["siswa", "petugas"]
    })
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

app.get("/:id", async(req,res) => {
    let param = {
        id_petugas: req.params.id
    }
    pembayaran.findAll({
        include: ["siswa", "petugas"],
        where: param
    })
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

app.get("/siswa/:id", async(req,res) => {
    let param = {
        nisn : req.params.id
    }
    pembayaran.findAll({
        include: ["siswa","petugas"],
        where: param
    })
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

app.post("/", async(req,res) => {
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: moment().format("YYYY-MM-DD"),
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.create(data)
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

app.put("/", async(req,res) => {
    let param = {
        id_pembayaran: req.body.id_pembayaran
    }
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: moment().format("YYYY-MM-DD"),
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.update(data, {where:param})
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

app.delete("/:id", async(req,res) => {
    let param = {
        id_pembayaran : req.params.id
    }
    pembayaran.destroy({where:param})
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
module.exports = app