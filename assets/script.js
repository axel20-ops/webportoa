// Efek ketik di header
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

// Fungsi Order WhatsApp
function submitOrder(e) {
  e.preventDefault();

  // Ambil nilai dari form
  const nama = document.getElementById("nama").value.trim();
  const layanan = document.getElementById("layanan").value.trim();
  const harga = document.getElementById("harga").value.trim();

  // Validasi sederhana
  if (!nama || !layanan || !harga) {
    alert("Mohon lengkapi semua data terlebih dahulu.");
    return;
  }

  // Format pesan
  const pesan = `Halo, saya ${nama} ingin order layanan ${layanan} - ${harga}. Masih tersedia?`;

  // Nomor admin WA
  const admin = "628557000608";

  // Buka WhatsApp
  const url = `https://wa.me/${admin}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}
