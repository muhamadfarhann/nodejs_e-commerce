//membuat constanta class barang
const Barang = require('../models/barang')

//fungsi untuk menampilkan data barang
module.exports.getAllBarang = (req, res) => {
  Barang.findAll()
  .then((barang) => {
    res.json({"status":200, "data" : barang, "pesan" : "berhasil"});
  })
  .catch((error) => {
    res.json({"status": 500, "data" : {},"pesan" : error.toString()});
  })
}

//fungsi untuk menampilkan data barang berdasarkan kode barang
module.exports.getBarangByKode = (req, res) => {
  Barang.findOne({
    where : {
      kode_barang : req.params.kode_barang
    }
  })
  .then((barang) => {
    if(barang != null){
      res.json({"status":200, "data" : barang, "pesan" : "berhasil"});
    }else{
      res.json({"status":200, "data" : {}, "pesan" : "berhasil"});
    }
  })
  .catch((error) => {
    res.json({"status": 500, "data" : {},"pesan" : error.toString()});
  })
}

//fungsi untuk menambah atau update barang
module.exports.createBarang = (req,res) => {
  // Membuat Variabel Sesuai Dengan Field dan Nama Pada Form
  let data = {
      kode_barang: req.body.kode_barang,
      seller_id: req.body.seller_id,
      nama_barang: req.body.nama_barang,
      harga: req.body.harga,
      stok: req.body.stok,
      deskripsi: req.body.deskripsi,
  };

  //buat atau update
  Barang
      .findOne({
        where : {
          kode_barang: req.body.kode_barang
        }
      })
      .then((barang) => {

        if(barang == null){
          return Barang.create(data);
        }else{
          return barang.update(data);
        }
          //res.json({"status":200, "data" : barang, "pesan" : "berhasil"});
      })
      .then((data) => {
        res.json({"status":200, "data" : data, "pesan" : "berhasil"});
      })
      .catch((error) => {
          res.json({"status":500, "data" : {}, "pesan" : error.toString()});
      })
}

//fungsi hapus barang
module.exports.deleteBarang = (req,res) => {
  Barang.destroy({
    where : {
      kode_barang : req.params.kode_barang
    }
  })
  .then((hasilHapus) => {
    //jika hasil hapus 1 maka row memang terhapus, jika tidak row tidak ada
    if(hasilHapus == 1){
       res.json({"status":200, "data" : hasilHapus, "pesan" : "kode "+req.params.kode_barang+" berhasil terhapus"});
    }else{
       res.json({"status":200, "data" : hasilHapus, "pesan" : "Kode "+req.params.kode_barang+" tidak ada, telah terhapus"});
    }
  })
  .catch((error) => {
      res.json({"status":500, "data" : {}, "pesan" : error.toString()});
  })

}


//fungsi update barang
module.exports.updateBarang = (req,res) => {

  var data = {
    kode_barang: req.body.kode_barang,
    seller_id: req.body.seller_id,
    nama_barang: req.body.nama_barang,
    harga: req.body.harga,
    stok: req.body.stok,
    deskripsi: req.body.deskripsi,
  };

  Barang.update(data,{
    where : {
      kode_barang: req.body.kode_barang
    }
  })
  .then((barang) => {
    if(barang[0] == 1){
      res.json({"status":200, "data" : barang, "pesan" : "Berhasil update"});
    }else{
      res.json({"status":200, "data" : barang, "pesan" : "update tidak dapat dilakukan, Kode barang yang dituju tidak ada"});
    }
  })
  .catch((error) => {
    res.json({"status":500, "data" : barang, "pesan" : error.toString()});
  })
}
