/* 
ANA İŞLEMLER BURADAN YAPILMAKTADIR
 */

async function siparisStokKontrol() {
  await siparisAl();
  return await stokKontrol();
}

async function main(secim) {
  await yemekHazirlik(secim);
  await servisTepsiHazirlik();
  await musteriyeServis();
  screen.innerHTML = "Siparişiniz Hazır!";

}
