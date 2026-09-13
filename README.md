# SKD90 Method v1.0

Upgrade penuh berdasarkan spesifikasi final: Target 90 Hari → Milestone → Fokus Mingguan → MIT → Eksekusi → Review → Adaptasi.

Dibangun dari repositori https://github.com/alkomputer90-spec/skd90-app pada commit b9c2a8439fe542205d98c74d3e062e4a46d8a505 (Improve MIT and statistics). Versi ini sudah diimplementasikan dan diuji lokal; belum dipublikasikan ke GitHub Pages.

## Coba aplikasi

Ekstrak ZIP, lalu jalankan BUKA-SKD90.cmd di Windows yang memiliki Node.js 20 atau lebih baru. Buka http://127.0.0.1:8093/. Alternatif: jalankan `npm start` dari folder ini. Tidak perlu menginstal dependensi npm.

Membuka index.html langsung juga dapat dipakai untuk mencoba, tetapi instalasi PWA dan cache offline membutuhkan localhost atau HTTPS. Data pada alamat localhost berbeda dari data di alamat GitHub Pages. Data demo pada pratinjau lokal tidak termasuk dalam paket aplikasi.

## Fitur yang terintegrasi

- Maksimal 3 target: nama, hasil yang ingin dicapai, nilai awal, hasil aktual, sasaran akhir, satuan, dan deadline dalam 90 hari.
- Milestone dapat ditambah, diedit, dihapus, dan dicentang; indikator tahap berikutnya tersedia.
- Maksimal 3 fokus mingguan, terkait target secara opsional.
- Maksimal 5 MIT per tanggal; anjuran 1–3 MIT utama. Setiap MIT memiliki ID stabil, status selesai, target, fokus mingguan, waktu, dan pemicu “setelah”.
- Timer Pomodoro 25/50 menit dan mode bebas: pilih MIT, jeda, lanjutkan, pulihkan sesi setelah muat ulang, catat durasi, dan tandai MIT setelah selesai. Waktu jeda tidak dihitung; sesi tidak dicatat dua kali. Sesi yang melintasi tengah malam membagi durasi sesuai tanggal lokal. Sesi minimal 25 menit mencentang kategori Fokus pada tanggal sesi selesai.
- Evaluasi malam: MIT selesai, MIT terkait target, waktu fokus, kemajuan terpenting, dan perbaikan besok.
- Weekly Review: Execution Score, MIT dan Result per target, tiga pertanyaan refleksi, keputusan Pertahankan/Sesuaikan/Ubah, serta penyusunan fokus minggu depan.
- Statistik 7/30/90 hari dalam siklus aktif: Execution Rate, persentase MIT menuju target, waktu fokus, streak, hari konsisten, pergerakan target, insight berbasis aturan, dan konsistensi per kategori.
- Review 90 Hari: hasil setiap target, eksekusi, MIT selesai, waktu fokus, hari konsisten, tiga refleksi akhir, dan siklus baru yang mengarsipkan siklus sebelumnya. Arsip dapat dilihat kembali.
- Splash pegunungan setiap pembukaan aplikasi, tema terang/gelap, jurnal kegagalan, reward/konsekuensi, profil, serta notifikasi selesai fokus tetap tersedia.
- Backup JSON lengkap, impor format lama dan baru, serta cadangan otomatis sebelum upgrade, impor, reset, dan siklus baru. Cadangan otomatis dapat dipulihkan dari Data & Backup.

## Arti angka

Execution = jumlah MIT selesai ÷ jumlah MIT terisi dalam periode. MIT yang belum selesai tetap masuk penyebut. Tidak ada MIT ditampilkan sebagai “—”, bukan keberhasilan 100%.

Result = (hasil aktual − nilai awal) ÷ (sasaran akhir − nilai awal), dibatasi 0–100%. Hasil aktual boleh melebihi sasaran dan nominal aslinya tetap ditampilkan. Gunakan ukuran yang meningkat; untuk penurunan berat badan, misalnya gunakan “kg turun”. Milestone, checklist MIT, dan berlalunya waktu tidak mengubah Result.

Kategori MIT mendapat 1 poin jika seluruh MIT hari itu selesai. Lima kategori harian tetap menghasilkan skor /5. Hari konsisten berarti skor minimal 4/5; hari tanpa catatan memutus streak. Statistik kategori memakai hari yang tercatat dalam periode, sedangkan Execution memakai jumlah tugas.

Insight memakai batas Execution 80% dan membandingkan Result dengan persentase waktu menuju deadline. Ini pemicu refleksi, bukan penilaian otomatis bahwa suatu strategi pasti berhasil/gagal. Target bergerak tercepat memakai kenaikan poin persentase Result selama 7 hari dan hanya ditampilkan bila tersedia riwayat awal yang cukup.

Minggu mengikuti Senin–Minggu. Hari siklus dihitung inklusif: tanggal mulai adalah hari 1; tanggal mulai +89 hari adalah hari 90. Tombol siklus baru tersedia pada hari ke-90. Review mingguan melihat pembaruan hasil sampai akhir periode tersebut. Mengubah definisi sasaran akan ikut mengubah persentase yang dihitung dari ukuran target itu.

## Memasang upgrade di GitHub Pages yang sudah dipakai

1. Pada aplikasi lama di HP/browser yang biasa digunakan, buka Data & Backup dan unduh JSON terlebih dahulu.
2. Ganti file aplikasi pada repositori `alkomputer90-spec/skd90-app` dengan isi folder paket ini. Lakukan dalam satu commit, termasuk file baru `method.js`, `method-ui.js`, dan `method.css`. `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.json`, serta aset gambar/ikon harus ikut tersedia. Jangan menempel patch di bawah app.js lama.
3. Tunggu GitHub Pages selesai menerbitkan commit. Buka kembali alamat lama https://alkomputer90-spec.github.io/skd90-app/ menggunakan browser/perangkat yang sama. Muat ulang, lalu buka kembali sekali lagi bila versi lama masih tersaji dari cache.
4. Periksa nama, MIT hari ini, panah tanggal sebelumnya, serta target. Target lama perlu dilengkapi ukuran hasilnya. Progres persen lama dipertahankan sebagai referensi; aplikasi tidak mengubahnya menjadi nominal yang belum diketahui.

Kunci penyimpanan tetap `skd90-data-v1`, sehingga data di origin/browser yang sama dimigrasikan saat aplikasi baru dibuka. Migrasi mempertahankan MIT tunggal lama, hingga 5 MIT dari versi terbaru, riwayat, target, jurnal, reward, dan review. Salinan JSON sebelum migrasi disimpan di browser. Data tidak berpindah otomatis antarperangkat atau domain: gunakan ekspor/impor backup untuk itu.

Durasi fokus sebelum upgrade tidak tersedia dalam versi lama, sehingga tidak ditebak dari checkbox Fokus. Riwayat durasi mulai dari sesi yang dicatat oleh versi Method.

## Berkas

- `method.js`: migrasi, validasi backup, model siklus, perhitungan hasil/eksekusi/streak.
- `method-ui.js`: alur target, fokus mingguan, MIT, timer, review, statistik, arsip, dan backup.
- `app.js`: komponen UI serta fitur jurnal, reward, pengaturan, dan splash dari aplikasi sebelumnya.
- `method.css` dan `styles.css`: tampilan responsif dan tema.
- `sw.js`: cache rilis untuk offline. Naikkan nama CACHE jika mengubah berkas pada rilis berikutnya.
- `method.test.cjs` dan `integration.test.cjs`: pengujian otomatis tanpa dependensi tambahan.

## Validasi

Jalankan `npm test`. Sebanyak 22 pengujian otomatis mencakup migrasi, preservasi khusus dua hari data lama, round-trip backup, hubungan MIT/target/fokus mingguan, batas MIT, pemisahan Result/Execution, nilai awal, riwayat mingguan, rollover, streak, timer jeda/muat ulang/tengah malam, pencatatan satu kali, refleksi, kegagalan penyimpanan, dan arsip siklus baru.

Pemeriksaan browser mencakup pembuatan target/milestone/fokus mingguan/MIT, penyelesaian timer dan MIT, statistik, penyimpanan review, muat ulang, tata letak ponsel, dan akses offline. Data tetap lokal; login, sinkronisasi cloud, dan reminder terjadwal tidak termasuk spesifikasi Method v1.0 ini.
