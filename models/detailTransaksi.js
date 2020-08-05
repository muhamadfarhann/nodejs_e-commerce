//  Import class Sequelize
const Sequelize = require('sequelize');

// Menggunakan dan load konfigurasi
const sequelize = require('../configs/sequelize');

// Membuat Class detail transaksi
class DetailTransaksi extends Sequelize.Model{}

// Inisialisasi dan Pembuatan Tabel Seller
DetailTransaksi.init({
    id_head : Sequelize.INTEGER,
    kode_barang: Sequelize.STRING,
    quantity: Sequelize.INTEGER,
    harga: Sequelize.INTEGER,
    total_harga: Sequelize.INTEGER
}, { sequelize, modelName: 'detailTransaksi'});

sequelize.sync();

module.exports = DetailTransaksi;
