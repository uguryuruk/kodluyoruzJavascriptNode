//STOK VE 

let stok = {
  kofte: 5,
  tavuk: 5,
  patates: 5,
  cola: 5,
  marulTursu: 5,
  paketSos: 5,
  sogan: 5,
  domates: 5,
  ekmek: 5,
};

function clearRefreshStock() {
  localStorage.clear();
  for (const key in stok) {
    localStorage.setItem(key,5)
  }
}