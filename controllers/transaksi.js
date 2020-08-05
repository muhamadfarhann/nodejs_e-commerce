//objek class head transaksi
const HeadTransaksi = require('../models/headTransaksi');

//objek class detail transaksi
const DetailTransaksi = require('../models/detailTransaksi');

const Barang = require('../models/barang');

module.exports.transaksi = (req, res) => {

  console.log(req.body)

  //objek head
  var dataHead = {
    nama_pembeli: req.body.nama_pembeli,
    nomer_tagihan: req.body.nomer_tagihan,
    tanggal: req.body.tanggal,
    tujuan_pengiriman: req.body.tujuan_pengiriman,
    biaya_pengiriman: 0,
    total_pembayaran: 0
  };

  HeadTransaksi
      .create(dataHead)
      .then((head) => {

        //perulangan memasukan barang beli
        var daftarBeli = req.body.daftar_beli ;
        var totalBayar = 0;
        for(var x=0; x<daftarBeli.length ;x++){

          var jumlah = daftarBeli[x].quantity;

          //cari barang
          Barang.findOne({
            where : {
              kode_barang : daftarBeli[x].kode_barang
            }
          })
          .then((barang) => {

            if(barang != null){
              //variable total
              var total = barang.harga * jumlah;
              //varliable objek barang
              var dataBarang = {
                id_head : head.id,
                kode_barang: barang.kode_barang,
                quantity: jumlah,
                harga: barang.harga,
                total_harga: total
              };
              totalBayar = totalBayar + total;
              //simpan barang
              DetailTransaksi.create(dataBarang)
            }else{

            }

          })
        }

        return data = {"head" : head, "totalBayar" : totalBayar};
      })
      .then((data) => {
        res.json({
            "data": {},
            "status": 200,
            "pesan": "Berhasil"
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
            "status": 500,
            "data": {},
            "pesan": error.toString()
        });
      });


}
