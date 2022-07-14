const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const kelas = require("./router/kelas")
app.use("/spp/kelas", kelas)

const spp = require("./router/spp")
app.use("/spp/spp", spp)

const petugas =require("./router/petugas")
app.use("/spp/petugas", petugas)

const siswa = require("./router/siswa")
app.use("/spp/siswa", siswa)

const pembayaran = require("./router/pembayaran")
app.use("/spp/pembayaran", pembayaran)

app.listen(4040, () => {
    console.log("Server run on port 4040")
})