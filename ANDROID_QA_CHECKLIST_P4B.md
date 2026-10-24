# Kedai Matematik — P4-B Physical Android QA

APK QA: `android/app/build/outputs/apk/debug/app-debug.apk`

Package QA: `com.zilelsaif.kedaimatematik.qa`

> Pasang sebagai aplikasi QA berasingan. Jangan uninstall aplikasi Production dan jangan padam data pemain Production.

## Sebelum ujian

- [ ] Pastikan aplikasi Production masih terpasang dan boleh dibuka.
- [ ] Pasang APK QA tanpa menyahpasang Production.
- [ ] Sahkan terdapat dua aplikasi berasingan dan data QA bermula secara berasingan.
- [ ] Sahkan Sokong Pembangunan/QR tidak muncul dalam Parent Dashboard Android.
- [ ] Jangan lakukan transaksi kewangan atau mengimbas QR semasa ujian ini.

## Kyocera Torque KYG03

### Pelancaran dan paparan

- [ ] Title Screen muat dalam portrait tanpa clipping atau horizontal scroll.
- [ ] Safe area tidak bertindih dengan status bar, kamera/notch atau navigation bar.
- [ ] Main Menu boleh ditatal dan semua lima modul boleh dicapai.
- [ ] Putar portrait → landscape → portrait; kandungan pulih tanpa reload atau kehilangan sesi.
- [ ] Fullscreen masuk/keluar dengan stabil dan butang sistem kekal boleh dipulihkan.

### Interaksi

- [ ] Semua touch target utama mudah ditekan dengan sarung/peranti lasak.
- [ ] Android Back menutup dialog paling atas dahulu.
- [ ] Android Back ketika gameplay memaparkan pengesahan Home dan tidak menamatkan sesi secara senyap.
- [ ] Android Back selepas dialog feedback tidak menggandakan skor atau melangkau soalan.
- [ ] Scroll Parent Dashboard, Statistik, Profil, Pencapaian dan Tetapan lancar.

### Audio dan penyimpanan

- [ ] Bunyi klik, betul, salah, pelanggan, unlock dan tamat sesi dimainkan.
- [ ] Mute/unmute serta Soft Sound kekal selepas aplikasi ditutup dan dibuka semula.
- [ ] Cipta profil QA, main beberapa soalan, tutup paksa aplikasi dan buka semula; profil dan kemajuan kekal.
- [ ] Data aplikasi Production tidak berubah.

### Lima modul

- [ ] Wang & Kedai: item, RM/RM sen, jawapan dan feedback jelas.
- [ ] Masa & Jam: satu/dua jam analog tidak terpotong.
- [ ] Ukuran: kad unit dan pilihan jawapan tidak overflow.
- [ ] Pecahan: visual bahagian/kumpulan tepat dan responsif.
- [ ] Bentuk & Ruang: objek WebP, SVG, grid, drag/touch dan pilihan jawapan berfungsi.

## Samsung Galaxy Tab Active 3

### Tablet dan orientasi

- [ ] Portrait menggunakan ruang skrin tanpa panel terlalu sempit.
- [ ] Landscape mengekalkan hierarchy dan tiada ruang kosong/overflow luar biasa.
- [ ] Putaran semasa gameplay tidak mereset soalan, timer atau skor.
- [ ] Fullscreen dan navigation bar berfungsi dalam kedua-dua orientasi.
- [ ] S Pen/touch memilih butang yang sama tanpa hover state tersekat.

### Kandungan dan dialog

- [ ] Grid 50 misi dan 50 latihan boleh ditatal serta dipilih.
- [ ] Galeri 14 lencana: grid, filter, butiran dan featured badge berfungsi.
- [ ] Statistik dan Parent Dashboard premium muat serta scroll dalaman tidak tersekat.
- [ ] Tutorial, Learning Feedback dan butang Seterusnya boleh dicapai.
- [ ] Dialog Home, parent gate, keputusan dan modal lain menutup melalui Android Back dengan urutan betul.
- [ ] Cabaran Harian dan Cabaran Kedai boleh dimulakan dan ditinggalkan dengan selamat.

### Geometri khusus

- [ ] B01–B03: bentuk dan objek WebP tajam, tidak pecah atau hilang.
- [ ] B04–B07: ciri bentuk, rak, pola dan grid simetri tepat serta boleh disentuh.
- [ ] B08: rajah keliling jelas tanpa garisan dekoratif mengelirukan.
- [ ] B09: grid luas jelas pada portrait dan landscape.
- [ ] B10: variasi campuran tidak mempunyai pilihan terpotong atau dua jawapan sah.

## Accessibility dan kestabilan

- [ ] Large Text tidak memotong soalan, pilihan, dialog atau navigasi.
- [ ] Reduce Motion mengurangkan animasi tanpa menghilangkan maklumat.
- [ ] Visual Help membantu tanpa mendedahkan jawapan.
- [ ] Tukar profil beberapa kali; data galeri/statistik tidak bocor antara profil.
- [ ] Jalankan sekurang-kurangnya satu sesi 10 soalan setiap modul.
- [ ] Biarkan aplikasi di background sekurang-kurangnya 2 minit, kemudian sambung tanpa audio/timer berganda.
- [ ] Tiada crash, skrin putih, imej hilang atau input beku.

## Catatan keputusan

| Peranti | Android | Portrait | Landscape | Back | Audio | Profil | 5 Modul | Status |
|---|---|---|---|---|---|---|---|---|
| Kyocera Torque KYG03 |  |  |  |  |  |  |  | BELUM DIUJI |
| Samsung Galaxy Tab Active 3 |  |  |  |  |  |  |  | BELUM DIUJI |

Catat langkah tepat, modul/misi, orientasi dan screenshot bagi setiap kegagalan.
