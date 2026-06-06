# 📋 AbsensiApp - React Native Mobile Attendance

AbsensiApp adalah aplikasi pencatatan kehadiran (absensi) harian berbasis _mobile_ yang dibangun menggunakan React Native dan Expo. Aplikasi ini dirancang dengan antarmuka modern dan menyimpan data secara persisten di dalam perangkat.

## 🚀 Fitur Utama

- **Pencatatan Real-time:** Menangkap input nama pengguna dan menempelkan stempel waktu (_timestamp_) secara otomatis saat kehadiran dicatat.
- **Penyimpanan Persisten (Offline):** Menggunakan `AsyncStorage` agar riwayat kehadiran tidak hilang meskipun aplikasi ditutup atau perangkat di- _restart_.
- **Navigasi Tab:** Implementasi _Bottom Tab Navigation_ menggunakan Expo Router untuk memisahkan form input dan tabel rekapitulasi riwayat.
- **Modern UI/UX:** Desain komponen _card_ modern dengan efek _shadow_, _elevation_, dan _badge_ status yang bersih dan responsif.

## 🛠️ Teknologi yang Digunakan

- **Framework:** React Native / Expo (SDK 56)
- **Bahasa:** TypeScript (`.tsx`)
- **Routing:** Expo Router
- **Penyimpanan Lokal:** `@react-native-async-storage/async-storage`
- **Ikon:** `@expo/vector-icons` (Ionicons)

## 📦 Cara Instalasi dan Menjalankan Proyek

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/23okt/AbsensiApp.git](https://github.com/23okt/AbsensiApp.git)
   cd AbsensiApp
   ```
