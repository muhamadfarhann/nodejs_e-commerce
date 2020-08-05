//  Import class Sequelize
const Sequelize = require('sequelize');

// Menggunakan dan load konfigurasi
const sequelize = require('../configs/sequelize');

// Membuat Class Transaksi
class HeadTransaksi extends Sequelize.Model{}

// Inisialisasi dan Pembuatan Tabel Seller
HeadTransaksi.init({
    kode_barang: Sequelize.STRING,
    nama_toko: Sequelize.STRING,
    no_telp: Sequelize.STRING,
    email: Sequelize.STRING,
    alamat: Sequelize.TEXT
}, { sequelize, modelName: 'headTransaksi'});

module.exports = HeadTransaksi;