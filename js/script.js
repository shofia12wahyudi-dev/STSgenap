// JAM
function Clock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');

  document.getElementById('clock').textContent = `${hh}:${mm}:${ss}`;

  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

  document.getElementById('date').textContent =
    `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

setInterval(Clock, 1000);
Clock();

// DATA MASUK 
let semua =  [];
let editIndex = -1;

function capitalizeWords(text) {
  return text.split(" ")
    .map(kata => kata.charAt(0).toUpperCase() + kata.slice(1).toLowerCase())
    .join(" ");
}

// EVENT LISTENER
document.getElementById("btnTambah")
  .addEventListener("click", tambahData);

// TAMBAH DATA
function tambahData(){

  let id = Math.floor(Math.random() * 1000);

  let nama = capitalizeWords(document.getElementById("nama").value.trim());
  let nis = document.getElementById("nis").value.trim();
  let rayon = capitalizeWords(document.getElementById("rayon").value.trim());
  let pelanggaran = capitalizeWords(document.getElementById("pelanggaran").value.trim());
    if (!nama || !nis || !rayon) {
      alert("Semua form harus diisi!");
    return;
  }

  let sekarang = new Date();
  let jam = sekarang.getHours();
  let menit = sekarang.getMinutes();

  let telat = (jam > 7 || (jam === 7 && menit >= 30));

  let data = {
    id,
    nama,
    nis,
    rayon,
    pelanggaran,
    waktu: sekarang.toLocaleString(),
    telat
  };

  if(editIndex !== -1){
    semua[editIndex] = data;
    editIndex = -1;
    alert("Data telah diubah");
  } else {
    semua.push(data);
  }

  document.getElementById("nama").value = "";
  document.getElementById("nis").value = "";
  document.getElementById("rayon").value = "";
  document.getElementById("pelanggaran").value = "";

  tampilData();
}

// TAMPIL DATA
function tampilData(){

  let tabel = document.getElementById("tabel");
  tabel.innerHTML = "";

  semua.forEach((dt, i) => {

  let text = "";

  if (dt.telat && dt.pelanggaran) {
    text = "terlambat & ".toUpperCase() + dt.pelanggaran;
  } else if (dt.telat) {
    text = "terlambat".toUpperCase();
  } else {
    text = dt.pelanggaran;
  }

    tabel.innerHTML += `
    <tr>
      <td>${dt.nama}</td>
      <td>${dt.nis}</td>
      <td>${dt.rayon}</td>
      <td>${dt.waktu}</td>
      <td style="color:${dt.telat ? "red" : "white"}">${text}</td>
      <td class="submit-btn">
        <button onclick="hapusData(${dt.id})" class="hapus"><i id="i" class='bx bxs-trash-alt' style='color:#ffffff'  ></i></button>
        <button onclick="editData(${dt.id})" class="hapus"><i id="i" class='bx bxs-edit' style='color:#ffffff'  ></i></button>
      </td>
    </tr>
    `;
  });

  document.getElementById("total").innerText = semua.length;
  document.getElementById("telat").innerText = semua.filter(dt => dt.telat).length;
  document.getElementById("atribut").innerText = semua.filter(dt => !dt.telat).length;
}


// HAPUS
function hapusData(id){
  if (confirm("Yakin ingin menghapus data ini?")) {
    semua = semua.filter(dt => dt.id !== id);
    tampilData();
  }
}

// EDIT
function editData(id){
  let edit = semua.find(dt => dt.id === id);

  document.getElementById("nama").value = edit.nama;
  document.getElementById("nis").value = edit.nis;
  document.getElementById("rayon").value = edit.rayon;
  document.getElementById("pelanggaran").value = edit.pelanggaran;

  editIndex = semua.findIndex(dt => dt.id == id);
}

// LOAD AWAL
tampilData();