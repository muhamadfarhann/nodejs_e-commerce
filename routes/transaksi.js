
const express = require('express');
const router = express.Router();

//membuat constanta controller transaksi
const transaksiController = require('../controllers/transaksi');

router.post('/api/v1/transaksi', transaksiController.transaksi);

module.exports = router;
