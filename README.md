# SKD90 — Desain Mobile PWA

Versi 2.0.0. Tampilan aplikasi disesuaikan dengan mockup SKD90: latar putih hangat, hijau emerald, kartu gelap untuk tugas utama, ikon garis, timer melingkar, serta splash screen pegunungan.

## Cara paling cepat mencoba

1. Ekstrak seluruh ZIP.
2. Buka `index.html` di browser.
3. Tekan **Mulai Sekarang**. Klik tugas utama atau tombol **Atur** untuk mengisi rencana harian.

Cara ini dapat dipakai untuk mencoba desain dan fitur lokal. Instalasi PWA dan cache offline memerlukan localhost atau hosting HTTPS.

## Menjalankan sebagai PWA di komputer

Jika Node.js tersedia, buka `BUKA-SKD90.cmd` di Windows. Server berjalan selama jendela terminal tetap terbuka.

Atau jalankan perintah berikut dari folder aplikasi:

```
node server.cjs
```

Lalu buka `http://127.0.0.1:8089`. Hentikan server dengan Ctrl+C.

## Layar dan fitur

- **Splash:** ilustrasi pegunungan dan tombol Mulai Sekarang.
- **Beranda:** lima checklist, tugas utama, kebiasaan, navigasi tanggal, dan progres otomatis. Perubahan langsung disimpan.
- **Fokus:** Pomodoro 25/50 menit, mode bebas, jeda, reset, dan suara hujan sintetis. Sesi minimal 25 menit menandai Deep Work selesai. Timer memakai waktu nyata agar mengejar ketertinggalan saat tab kembali aktif; sesi tidak berlanjut jika halaman dimuat ulang atau browser ditutup.
- **Target:** maksimal tiga tujuan yang dapat diedit, ditambah, atau dihapus, dengan progres manual 0–100%.
- **Statistik:** periode 7/30/90 hari, rata-rata skor pada hari tercatat, streak, hari konsisten, dan sisa hari program. Hari konsisten memiliki minimal empat checklist selesai. Tanggal yang terlewat memutus streak.
- **Review mingguan:** empat pertanyaan refleksi dan arsip per minggu.
- **Jurnal:** daftar catatan serta halaman detail dengan penyebab, perbaikan, dan tindakan berikutnya.
- **Reward & konsekuensi:** reward berdasarkan streak terbaik; konsekuensi berupa komitmen pribadi dan tidak dijalankan otomatis.
- **Profil:** nama, tanggal mulai, habit, durasi fokus, notifikasi sesi selesai, tema terang/gelap, ekspor dan impor backup JSON.
- **Lainnya:** navigasi menuju review, jurnal, reward, dan profil.

## Menggunakan di HP

Unggah seluruh aset aplikasi ke hosting statis HTTPS. Setelah membuka aplikasi, tambahkan ke layar utama dari menu browser. Aset tersimpan untuk akses offline setelah kunjungan pertama yang berhasil. Perilaku instalasi dan notifikasi bergantung pada browser.

Data tersimpan di localStorage pada browser dan alamat aplikasi yang digunakan. Membuka alamat lain, berpindah perangkat/browser, atau menghapus data browser tidak memindahkan data secara otomatis. Gunakan **Profil → Data & Backup** untuk ekspor/impor. Penyimpanan lokal menggunakan key `skd90-data-v1` agar tetap bisa membaca data MVP lama jika disajikan dari origin yang sama.

## Catatan hasil

- Paket aplikasi dimulai dengan data kosong; angka dan tulisan dalam gambar pratinjau merupakan contoh saat pengujian.
- Belum ada akun, login, atau sinkronisasi cloud. Tombol pada profil mengembalikan pengguna ke splash tanpa menghapus data.
- Tidak memerlukan dependensi frontend atau CDN. HTML, CSS, JavaScript, ikon, dan gambar berada dalam folder ini.
- Ilustrasi pegunungan dibuat khusus untuk desain ini; identitas ikon dasar dipertahankan dari paket MVP.

## Validasi

Tampilan diuji melalui browser pada ukuran ponsel. Checklist dan muat ulang, formulir tugas, timer lintas halaman, target, review mingguan, dan jurnal telah diperiksa. Pemeriksaan logika tambahan mencakup pergantian hari, streak dengan jeda tanggal, penyelesaian timer setelah tab tertunda, mode bebas, migrasi backup, escaping teks, dan kelengkapan aset.

Akses offline juga diuji: server dihentikan, halaman dimuat ulang, lalu navigasi dan halaman fokus tetap berfungsi dari cache.
