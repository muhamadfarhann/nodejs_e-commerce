// Mengimport Express
const express = require('express');

// Menggunakan Konfigurasi Router
const router = express.Router();

// Menggunakan Model Seller
const Seller = require('../models/seller');

//mambuat constanta controller sales
const sellerControler = require('../controllers/seller');

// Membuat URL Create
router.get('/create', (req, res) => {

    // Memanggil View Create EJS
    res.render('seller/create', {
        data: null
    });

});

// Membuat URL Update
router.get('/:id/update', async(req, res) => {

    // Menampilkan Data Seller Berdasarkan Primary Key (id)
    let seller = await Seller.findOne({
        where: {
            id: req.params.id
        }
    });

    // Memanggil View Update EJS dengan Mengirimkan Data Seller
    res.render('seller/update', {
        seller: seller
    });
});

// Membuat URL Delete
router.get('/:id/delete', (req, res) => {

    // Perintah Untuk Menghapus Data Seller Berdasarkan Primary Key (id)
    Seller
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then((seller) => {
            res.redirect('/seller/index');
        })
        .catch((error) => {
            console.log(error);
        })
});

// Menggunakan Perintah Insert
router.post('/create', (req, res) => {

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
            res.redirect('index');
        })
        .catch((error) => {
            console.log(error);
        })

});

// Menggunakan Perintah Update
router.post('/:id/update', (req, res) => {

    // Membuat Variabel Sesuai Dengan Field dan Nama Pada Form
    let data = {
        nama_seller: req.body.nama_seller,
        nama_toko: req.body.nama_toko,
        no_telp: req.body.no_telp,
        email: req.body.email,
        alamat: req.body.alamat,
    };

    // Perintah Untuk Mengubah Data Seller Berdasarkan (id)
    Seller
        .update(data, {
            where: {
                id: req.params.id
            }
        })
        .then((seller) => {
            res.redirect('/seller/index');
        })
        .catch((error) => {
            console.log(error);
        })

});

// Perintah Select
router.get('/index', (req, res) => {

    // Perintah Untuk Menampilkan Seluruh Data Seller
    Seller
        .findAll()
        .then((seller) => {
            let data = seller;
            res.render('seller/index', {
                data: data
            });
        })
        .catch((error) => {
            console.log(error);
        })

});

//update tanggal 5 agustus
router.get('/api/v1/seller', sellerControler.getSeller);
router.get('/api/v1/seller/id/:id', sellerControler.getSellerById);
router.get('/api/v1/seller/name/:name', sellerControler.getSellerByName);
router.delete('/api/v1/seller/id/:id', sellerControler.deleteSeller);
router.post('/api/v1/seller', sellerControler.createSeller)
router.patch('/api/v1/seller', sellerControler.updateSeller)

module.exports = router;
