//YEMEK VE STOK İŞLEMLERİ İLE İLGİLİ METODLAR

let malzemeAdlari = [],
  malzemeMiktari = [];

const listStok = () => {
  //stoğu konsola listeler.
  malzemeAdlari.length = 0;
  malzemeMiktari.length = 0;
  for (let [malzemeAdi, miktar] of Object.entries(localStorage)) {
    console.log(`${malzemeAdi}: ${miktar}`);
    malzemeAdlari.push(malzemeAdi);
    malzemeMiktari.push(JSON.parse(miktar));
  }
  console.log(malzemeAdlari);
  console.log(malzemeMiktari);
};

function siparisAl() {
  //#1 step
  spinnerToggle();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
      screen.innerHTML = "sipariş alındı";
      console.log("sipariş alındı 1.");
    }, 1000);
  });
}

function stokKontrol() {
  //#2
 
  listStok();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //TODO malzeme seçimine göre özelleştir, liste içinde onları kontrol et.
      let malzemeKontrolSonucu = malzemeMiktari.some(sifirKontrol);
      console.log(malzemeKontrolSonucu);
      console.log("stok kontrol edildi 2");
      spinnerToggle();

      if (malzemeKontrolSonucu) {
        console.log("İstediğiniz malzemeler stokta yok!");
        reject("İstediğiniz malzemeler stokta yok!");
      } else {
        resolve("Malzemeler Stokta var");
        console.log("Malzemeler Stokta var");
      }
    }, 3000);
  });
}

function sifirKontrol(malzeme) {
  //biten malzeme var mı yok mu kontrol eder.
  return malzeme <= 0;
}

function tavukEtKontrol(secim) {
  //#3
  //tavuk mu et mi comboboxtan kontrol eder ve ona göre 1 sn. sonra değer döndürür.
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      console.log("Et tavuk kontrolü 3");
      if (secim === "t") {
        resolve("tavuk");
      } else {
        resolve("kofte");
      }
    }, 1000);
  });
}

const pisirmeKontrol = (etTuru) => {
  //gelen et türü (köfte/tavuk) ve pişirme seçimine göre pişirir.
  //#3.1
  return new Promise((resolve, reject) => {
    console.log("Pisecek urun ", etTuru, " 3.1");
    let pisirmeSonucu = "";
    if (etTuru === "tavuk") {

      etPisirmeTuru(etTuru,3000).then((pisirmeSonucu) => {
        console.log(pisirmeSonucu);
        resolve(true);
      });
    } else {
      let pismeSuresi = pismeKontrol();
      etPisirmeTuru(etTuru,pismeSuresi)
      .then((pisirmeSonucu) => {
        console.log(pisirmeSonucu);
        resolve(true);
      });
    }
    miktarAzalt(etTuru);
    resolve(true);
  });
};

const etPisirmeTuru = (etTuru,time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${etTuru} Burger ${time} sürede pişirildi. 3.2`);
    }, time);
  });
};

function hamburgerYapimi() {
  //#3.3
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
      console.log("Hamburger Yapıldı 3.3");
      miktarAzalt("ekmek");
    }, 2000);
  });
}
function patatesKızart() {
  //#4
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
      console.log("Patatesler kızartıldı. 4");
      miktarAzalt("patates");
    }, 5000);
  });
}

function icecegiHazirla() {
  //#5
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
      console.log("İçecekler Hazırlandı. 5");
      miktarAzalt("cola");
    }, 2000);
  });
}

function servisTepsiHazirlik() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
      console.log("Soslar ve ürünler servise hazır. 6");
      //köfte/tavuk, cola, patates dışındaki ürünleri düşer.
      // urunler = Object.keys(stok).slice(4);
      let seciliGarnitur = garniturKontrol();
      seciliGarnitur.forEach((urun) => {
        miktarAzalt(urun);
      });
    }, 1000);
  });
}

async function musteriyeServis() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Siparişiniz Hazır!");
      console.log("Müşteriye servis edildi! 7");
      siparisButonGizle();
      spinnerToggle();
      checkBoxDisabledToggle();
    }, 1000);
  });
}

function yemekHazirlik(secim) {
    spinnerToggle();
    siparisButonGizle();
  
  return new Promise((resolve, reject) => {
    //asenkron üç işlem

    let kontrolSonuc = tavukEtKontrol(secim)
      .then((etTuru) => {
        return pisirmeKontrol(etTuru);
      })
      .then((params) => {
        return hamburgerYapimi();
      })
      .then((arg) => true)
      .catch((err) => {
        console.log(err);
      });
    let icecekSonuc = icecegiHazirla();
    let patatesSonuc = patatesKızart();

    console.log(kontrolSonuc);
    //tümünün sonuçlanmasını kontrol eder.
    Promise.all([kontrolSonuc, icecekSonuc, patatesSonuc]).then((values) => {
      let hazirlikSonucu = values.every((sonuc) => {
        return sonuc === true;
      });
      if (hazirlikSonucu) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

//gönderilen ürünün miktarını bir azaltır.
function miktarAzalt(urun) {
  let urunMiktar = localStorage.getItem(urun);
  urunMiktar--;
  localStorage.setItem(urun, urunMiktar);
}
