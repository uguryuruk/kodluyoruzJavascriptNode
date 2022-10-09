//sayfa elemanları VE DOM İLE İLGİLİ METODLAR

let screen = document.querySelector("#screen");
let stokScreen = document.querySelector("#stock");
let pismeSecimKutusu = document.querySelector("#cookingSelection");
let pismeSecimi = document.querySelectorAll(
  "#cookingSelection input[name='cook']"
);
let menu = document.querySelector("#food");
let siparisButton = document.querySelector("#checkOrder");
let sipaisButonlari=document.querySelector("#orderButtons");
let siparisTamamlaButton = document.querySelector("#sendOrder");
let iptalButton = document.querySelector("#cancel");
let listStokButton = document.querySelector("#listStok");
let refreshStokButton = document.querySelector("#refreshStok");
let secim = document.querySelector("#food").value;
let garniturSecim = document.querySelectorAll(
  "#garnitur input[type='checkbox']"
);
let yukleniyorSpinner = document.querySelector("#foodSpinner");

//functions
function kofteTavukDeğisimi(e) {
  e.preventDefault();
  //sonradan karar değiştirirse bir önceki aşamaya geçmesi için:
  //gerçi şu an gereksiz kaldı.
  pismeSecimKutusu.classList.add("d-none");
  sipaisButonlari.classList.add("d-none");
}

function siparisButonGizle() {
  sipaisButonlari.classList.add("d-none");
}

function spinnerToggle() {
  yukleniyorSpinner.classList.toggle("d-none");
}
async function siparisTamamlaButtonTikla() {
  screen.innerHTML = "Siparişiniz Hazırlanıyor...";
  main(secim);
}
async function siparisButtonTikla() {
  checkBoxDisabledToggle();
  siparisStokKontrol()
    .then((result) => {
      screen.innerHTML = result;
      if (menu.value === "k") {
        //pisme seçimini göster
        pismeSecimKutusu.classList.remove("d-none");
      } else {
        pismeSecimKutusu.classList.add("d-none");
      }
      sipaisButonlari.classList.remove("d-none"); //tamamlama butonunu göster
    })
    .catch((err) => {
      alert(err);
      screen.innerHTML = "İstediğiniz malzemeler stokta yok!";
      siparisButonGizle();
      checkBoxDisabledToggle();
    });
}

function pismeKontrol() {
  let seciliPisme;
  for (const radioButton of pismeSecimi) {
    if (radioButton.checked) {
      seciliPisme = radioButton.value;
      break;
    }
  }
  return seciliPisme;
}

function garniturKontrol() {
  let seciliGarnitur = [];
  for (const garnitur of garniturSecim) {
    if (garnitur.checked) {
      seciliGarnitur.push(garnitur.value);
      // console.log(seciliGarnitur);
    }
  }
  return seciliGarnitur;
}

function checkBoxDisabledToggle() {
  //disable checkboxes
  for (const check of garniturSecim) {
    check.disabled = !check.disabled;
  }
  //disable menu
  menu.disabled=!menu.disabled;
  return "Checkboxlara bi bak :)";
}

function cancelOrder(){
  //disable aktif et
  // pişme dereceesi ve butonları gizle
  checkBoxDisabledToggle();
  siparisButonGizle();

}

//OPERATIONS

//köfte-tavuk değişimi
menu.addEventListener("change", kofteTavukDeğisimi);

//sipariş için malzeme kontrolü:
siparisButton.addEventListener("click", siparisButtonTikla);

//siparis sonrası islemler:
siparisTamamlaButton.addEventListener("click", siparisTamamlaButtonTikla);
iptalButton.addEventListener("click",cancelOrder);

//stok listeleme
listStokButton.addEventListener("click", listStok);
refreshStokButton.addEventListener("click", clearRefreshStock);

//TODO işlem aşamalarını ekrana yaz.
