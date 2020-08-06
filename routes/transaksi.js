
const express = require('express');
const router = express.Router();

//membuat constanta controller transaksi
const transaksiController = require('../controllers/transaksi');

router.post('/api/v1/transaksi', transaksiController.transaksi);
router.post('/api/v2/transaksi', transaksiController.transaksiv2);
router.post('/api/v3/transaksi', transaksiController.transaksiv3);

module.exports = router;
