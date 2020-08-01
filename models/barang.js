// Mengimport class sequelize
const Sequelize = require('sequelize');

// Menggunakan dan load konfigurasi
const sequelize = require('../configs/sequelize');

// Membuat Class Barang
class Barang extends Sequelize.Model{}

// Inisialisasi dan Pembuatan Tabel Barang
Barang.init({
    kode_barang: {
        type: Sequelize.STRING, 
        unique: true
    },
    seller_id: Sequelize.STRING,
    nama_barang: Sequelize.STRING,
    harga: Sequelize.INTEGER,
    stok: Sequelize.INTEGER,
    deskripsi: Sequelize.TEXT
}, { 
    sequelize, modelName: 'barang'
});

module.exports = Barang;