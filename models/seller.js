// Mengimport class sequelize
const Sequelize = require('sequelize');

// Menggunakan dan load konfigurasi
const sequelize = require('../configs/sequelize');

// Membuat Class Seller
class Seller extends Sequelize.Model{}

// Inisialisasi dan Pembuatan Tabel Seller
Seller.init({
    nama_seller: Sequelize.STRING,
    nama_toko: Sequelize.STRING,
    no_telp: Sequelize.STRING,
    email: Sequelize.STRING,
    alamat: Sequelize.TEXT
}, { sequelize, modelName: 'seller'});

module.exports = Seller;