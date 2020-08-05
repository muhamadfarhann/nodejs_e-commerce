// Mengimport Express
const express = require('express');

//membuat constanta dari controller barang
const barangController = require('../controllers/barang');

// Menggunakan Konfigurasi Router
const router = express.Router();

// Menggunakan Model Barang
const Barang = require('../models/barang');

// Menggunakan Model Seller
const Seller = require('../models/seller');
const Sequelize = require('sequelize');

// Membuat URL Create
router.get('/create', (req, res) => {

    Seller
    .findAll()
    .then((seller) => {

        // Memanggil View Create EJS
        res.render('barang/create', {seller: seller});

    })

});

// Membuat URL Update
router.get('/:id/update', async (req, res) => {

    // Menampilkan Data Barang Berdasarkan Primary Key (id)
    let barang = await Barang.findByPk(
        // where: {id: req.params.id}
        req.params.id
    );

    let seller = await Seller.findAll();

    // Memanggil View Update EJS dengan Mengirimkan Data Barang
    res.render('barang/update', {barang: barang, seller: seller});
});

// Membuat URL Delete
router.get('/:id/delete', (req, res) => {

    // Perintah Untuk Menghapus Data Barang Berdasarkan Primary Key (id)
    Barang
        .destroy({
          where: {id:req.params.id}
        })
        .then((barang) => {
            res.redirect('/barang/index');
        })
        .catch((error) => {
            console.log(error);
        })
});

// Menggunakan Perintah Insert
router.post('/create', (req, res) => {

    // Membuat Variabel Sesuai Dengan Field dan Nama Pada Form
    let data = {
        kode_barang: req.body.kode_barang,
        seller_id: req.body.seller_id,
        nama_barang: req.body.nama_barang,
        harga: req.body.harga,
        stok: req.body.stok,
        deskripsi: req.body.deskripsi,
    };

    // Perintah Untuk Menyimpan Data Barang
    Barang
        .findOrCreate({
            where: {kode_barang: req.body.kode_barang },
            defaults:  data
        })
        .then((barang) => {
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
        kode_barang: req.body.kode_barang,
        seller_id: req.body.seller_id,
        nama_barang: req.body.nama_barang,
        harga: req.body.harga,
        stok: req.body.stok,
        deskripsi: req.body.deskripsi,
    };

    // Perintah Untuk Mengubah Data Barang Berdasarkan (id)
    Barang
        .update(data, {
          where: {id:req.params.id}
        })
        .then((barang) => {
            res.redirect('/barang/index');
        })
        .catch((error) => {
            console.log(error);
        })

});

// Perintah Select
router.get('/index', (req, res) => {

    // Perintah Untuk Menampilkan Seluruh Data Barang
    Barang
    .findAll()
    .then((barang) => {
        let data = barang;
        res.render('barang/index', {data: data, count:null});
    })
    .catch((error) => {
        console.log(error);
    })

});

// Membuat URL Search
router.post('/search', async (req, res) => {
    const Op = Sequelize.Op;
    const { count, rows } = await Barang.findAndCountAll({
        where: {
            nama_barang: {
                        [Op.like]: "%" + req.body.cari + "%"
                      }
        }
      });
      console.log(count);
      console.log(rows);
      return res.render('barang/index', {data: rows, count: count});

});

//update 5 agustus 2020
router.get('/api/v1/barang', barangController.getAllBarang);
router.get('/api/v1/barang/kode/:kode_barang', barangController.getBarangByKode);
router.post('/api/v1/barang/create', barangController.createBarang);
router.delete('/api/v1/barang/delete/:kode_barang', barangController.deleteBarang);
router.patch('/api/v1/barang/update',barangController.updateBarang);



module.exports = router;
