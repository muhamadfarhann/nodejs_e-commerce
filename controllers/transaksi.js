//objek class head transaksi
const HeadTransaksi = require('../models/headTransaksi');

//objek class detail transaksi
const DetailTransaksi = require('../models/detailTransaksi');

const Barang = require('../models/barang');

module.exports.transaksi = async (req, res) => {

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

  await HeadTransaksi
      .create(dataHead)
      .then((head) => {

        //perulangan memasukan barang beli
        var daftarBeli = req.body.daftar_beli ;
        var totalBayar = 0;
        var jumlahIndex =daftarBeli.length - 1;
        for(var x=0; x<daftarBeli.length ;x++){

          var jumlah = daftarBeli[x].quantity;
          console.log(x);
          var index = x;
          console.log("index : "+index);

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

                //jila perulangan terakhir
                //console.log(jumlahIndex);
                console.log("line 62 : "+index);
                if(jumlahIndex == index){
                  //console.log(index);
                  //return data = {"head" : head, "totalBayar" : totalBayar};
                }

              }else{

              }

            })

        }
        return data = {"head" : head, "totalBayar" : totalBayar};
      })
      .then((data) => {
        console.log(data);
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

module.exports.transaksiv2 = async (req, res) => {

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
        var jumlahIndex =daftarBeli.length - 1;
        for(var x=0; x<daftarBeli.length ;x++){

          var jumlah = daftarBeli[x].quantity;
          console.log(x);
          var index = x;
          console.log("index : "+index);
          var total = simpanDetailBarang(daftarBeli[x].kode_barang,jumlah);
          totalBayar = totalBayar + total;
        }
        return data = {"head" : head, "totalBayar" : totalBayar};
      })
      .then((data) => {
        console.log(data.head.id);
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

async function simpanDetailBarang(kodeBarang,jumlah){
  //cari barang
    await Barang.findOne({
      where : {
        kode_barang : kodeBarang
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

        //simpan barang
        DetailTransaksi.create(dataBarang)
        return total;
      }else{
        return 0;
      }
    })
}

module.exports.transaksiv3 = async (req, res) => {

  var date = new Date();
  var bulan = date.getMonth()+1;
  var tanggal = date.getDate();
  var tahun = date.getFullYear();
  //variable tanggal pinjam
  var tanggalPinjam = tahun+"-"+bulan+"-"+tanggal;

  //cari jumlah head
  var jumlahHeadTransaksi = await HeadTransaksi.count();
  // .then((count) => {
  //   return count;
  // });

  console.log("jumlah head"+jumlahHeadTransaksi);

  //promise untuk membuat nomer tagihan
  var promiseBuatNomerTagihan = new Promise ((resolve,reject) => {
    var nomer = jumlahHeadTransaksi +1;
    if(nomer < 10){
      var nmt = tanggal+""+bulan+""+tahun+"00"+nomer;
      console.log("nomer tagihan "+nmt);
      resolve(nmt);
    }else if(nomer < 100){
      var nmt = tanggal+""+bulan+""+tahun+"0"+nomer;
      console.log("nomer tagihan "+nmt);
      resolve(nmt);
    }else{
      var nmt = tanggal+""+bulan+""+tahun+""+nomer;
      console.log("nomer tagihan "+nmt);
      resolve(nmt);
    }
  });

  var nomertagihan = await promiseBuatNomerTagihan;

  //objek head
  var dataHead = {
    nama_pembeli: req.body.nama_pembeli,
    nomer_tagihan: nomertagihan,
    tanggal: tanggalPinjam,
    tujuan_pengiriman: req.body.tujuan_pengiriman,
    biaya_pengiriman: 0,
    total_pembayaran: 0
  };

  //buat head
  var head = await HeadTransaksi
      .create(dataHead)
      .then((head) => {
        console.log('head terbuat');
        return head;
      })
      .catch((error) => {
        res.json({"error" : error.toString()});
        console.log(error.toString());
      })

  //variable untuk menampung daftar berli, total bayar, dan jumlah beli
  var daftarBeli = req.body.daftar_beli ;
  var totalBayar = 0;
  var jumlahIndex =daftarBeli.length - 1;
  console.log('akan melooping')

  //perulangan memasukan barang beli
  for(var x=0; x<daftarBeli.length ;x++){

    var jumlah = daftarBeli[x].quantity;
    console.log(x);
    var index = x;
    console.log("index : "+index);

    //cari barang
      var barang = await Barang.findOne({
        where : {
          kode_barang : daftarBeli[x].kode_barang
        }
      })
      console.log('barang telah dicari')
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
        DetailTransaksi
        .create(dataBarang)
        .then((barang) => {
          console.log(barang+ " terbuat")
        })
        .catch((error) => {
          console.log(error.toString());
        })

        //update stok barang
        var jumlahBarangTerbaru = barang.stok - jumlah;
        barang.update({
          stok : jumlahBarangTerbaru
        });

        //jila perulangan terakhir
        //console.log(jumlahIndex);
        console.log("line 289 : "+x);

        //jila perulangan terakhir maka menampilkan response
        if(jumlahIndex == x){
          console.log(totalBayar)
          //console.log(index);
          //return data = {"head" : head, "totalBayar" : totalBayar};

          //update data head  dengan merubah total pembeyaran dan
          var updateHead = await head.update({
            biaya_pengiriman: 0,
            total_pembayaran: totalBayar
          })

          return res.json({
              "status": 200,
              "data": updateHead,
              "pesan": "Berhasil"
          });

        }

      }else{

      }
  }
}
