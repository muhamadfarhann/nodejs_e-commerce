//  Import class Sequelize
const Sequelize = require('sequelize');

// Menggunakan dan load konfigurasi
const sequelize = require('../configs/sequelize');

// Membuat Class Transaksi
class HeadTransaksi extends Sequelize.Model{}

// Inisialisasi dan Pembuatan Tabel Seller
HeadTransaksi.init({
    nama_pembeli: Sequelize.STRING,
    nomer_tagihan: Sequelize.STRING,
    tanggal: Sequelize.STRING,
    tujuan_pengiriman: Sequelize.STRING,
    biaya_pengiriman: Sequelize.DOUBLE,
    total_pembayaran: Sequelize.DOUBLE
}, { sequelize, modelName: 'headTransaksi'});

sequelize.sync();

module.exports = HeadTransaksi;
