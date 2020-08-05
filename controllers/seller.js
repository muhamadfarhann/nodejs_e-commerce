//constata class seller
const Seller = require('../models/seller');

//fungsi menampilkan daftar seller
module.exports.getSeller = (req, res) => {
    Seller.findAll()
        .then((seller) => {
            res.json({
                "status": 200,
                "data": seller,
                "pesan": "Berhasil"
            });
        })
        .catch((error) => {
            res.json({
                "status": 500,
                "data": {},
                "pesan": error.toString()
            });
        })
}

//fungsi membuat seller
module.exports.createSeller = (req, res) => {

    // Membuat Variabel Sesuai Dengan Field dan Nama Pada Form
    let data = {
        nama_seller: req.body.nama_seller,
        nama_toko: req.body.nama_toko,
        no_telp: req.body.no_telp,
        email: req.body.email,
        alamat: req.body.alamat,
    };

    // Perintah Untuk Menyimpan Data Seller
    Seller
        .create(data)
        .then((seller) => {
            res.json({
                "status": 200,
                "data": seller,
                "pesan": "berhasil"
            });
        })
        .catch((error) => {
            res.json({
                "status": 500,
                "data": {},
                "pesan": error.toString()
            });
        })
}

//fungsi hapus seller
module.exports.deleteSeller = (req, res) => {
    Seller
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then((seller) => {
            //jika berhasil terhapus
            if (seller == 1) {
                res.json({
                    "status": 200,
                    "data": seller,
                    "pesan": "Berhasil terhapus"
                });
            } else {
                res.json({
                    "status": 200,
                    "data": seller,
                    "pesan": "data tidak ada, kemungkinan telah terhapus"
                });
            }
        })
        .catch((error) => {
            res.json({
                "status": 500,
                "data": {},
                "pesan": error.toString()
            });
        })
}

//fungsi update seller
module.exports.updateSeller = (req, res) => {

    let data = {
        nama_seller: req.body.nama_seller,
        nama_toko: req.body.nama_toko,
        no_telp: req.body.no_telp,
        email: req.body.email,
        alamat: req.body.alamat,
    };

    Seller
        .update(data, {
            where: {
                id: req.body.id
            }
        })
        .then((seller) => {
            if (seller[0] == 1) {
                res.json({
                    "status": 200,
                    "data": seller,
                    "pesan": "update berhasil"
                });
            } else {
                res.json({
                    "status": 200,
                    "data": seller,
                    "pesan": "update tidak dapat dilakukan, data yang di tuju tidak ada"
                });
            }
        })
        .catch((error) => {
            res.json({
                "status": 500,
                "data": {},
                "pesan": error.toString()
            });
        })
}

module.exports.findByid = (req, res) => {
    Seller.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((seller) => {
            res.json({
                "status": 200,
                "data": seller,
                "pesan": "Berhasil"
            });
        })
        .catch((error) => {
            res.json({
                "status": 500,
                "data": {},
                "pesan": error.toString()
            });
        })
}