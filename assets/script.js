const teks = "Seorang Developer | Freelancer | Kreator";
let i = 0;

function ketik() {
  if (i < teks.length) {
    document.querySelector(".typing").textContent += teks.charAt(i);
    i++;
    setTimeout(ketik, 60);
  }
}
window.onload = ketik;

function submitOrder(e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const layanan = document.getElementById("layanan").value;
  const harga = document.getElementById("harga").value;

  const pesan = `Halo, saya ${nama} ingin order layanan ${layanan} - ${harga}. Masih tersedia?`;
  const url = `https://wa.me/628557000608?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}
