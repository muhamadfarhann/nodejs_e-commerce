// Mengimport Express
const express = require('express');

// Load Konfigurasi Sequelize
const sequelize = require('./configs/sequelize');

// Import Body-Parser
const bodyParser = require('body-parser');

// Instansiasi Class Express menjadi Objek App
const app = express();
const Barang = require('./models/barang');
const Seller = require('./models/seller');

// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(bodyParser.json());

// Proses Routing
const barang_route = require('./routes/barang');
const seller_route = require('./routes/seller');

app.get('/', (req, res) => {
    res.json({
        "status": 200,
        "pesan": "berhasil"
    });
})

// Menggunakan Template Engine EJS
//app.set('view engine', 'ejs');

// Menggunakan Route Barang
app.use(barang_route);

// Menggunakan Route Seller
app.use(seller_route);

app.listen(3000, () => {
    sequelize.sync();
    console.log('Server berjalan pada port 3000');
});