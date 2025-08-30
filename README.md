# 📊 PDF Folder Analyzer - Ganesa Results

Aplikasi web modern untuk menganalisis data dari file PDF hasil quiz dan test Ganesa secara otomatis melalui upload folder.

## 🚀 Fitur Utama

### 📁 **Upload Folder PDF**
- Upload folder berisi file PDF secara batch
- Deteksi otomatis file PDF dalam folder
- Filter hanya file dengan ekstensi `.pdf`

### 🔢 **Parsing Data Otomatis**
- Parsing angka dari format `[ TOTAL = angka ]` pada nama file
- Penjumlahan otomatis total data dari semua file
- Case-insensitive parsing (mendukung `TOTAL`, `total`, `Total`)

### 📊 **Tabel Hasil Analisis**
- Tabel responsif dengan kolom:
  - **Nama Folder**: Nama folder yang diupload
  - **Jumlah File**: Total file PDF dalam folder
  - **Total Data**: Jumlah total dari semua angka dalam nama file
  - **Aksi**: Tombol Detail dan Delete

### 📈 **Dashboard Statistik**
- **Total Folders**: Jumlah folder yang telah dianalisis
- **Total Files**: Total file PDF dari semua folder
- **Total Data**: Grand total dari semua folder

### 🎯 **Fitur Tambahan**
- **Detail View**: Melihat detail lengkap folder dan semua file
- **Delete Function**: Hapus folder dari tabel analisis
- **Responsive Design**: UI yang responsive di semua device
- **Real-time Updates**: Statistik terupdate secara real-time

## 🛠️ Teknologi

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Runtime**: Node.js
- **Deployment**: Vercel/Netlify ready

## 📋 Prasyarat

- Node.js versi 18.0 atau lebih baru
- npm atau yarn
- Browser modern (Chrome, Firefox, Safari, Edge)

## ⚡ Instalasi & Menjalankan

### 1. Clone Repository
```bash
git clone <repository-url>
cd ganesa-web-app
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Jalankan Development Server
```bash
npm run dev
# atau
yarn dev
```

### 4. Buka Browser
Akses aplikasi di: `http://localhost:3000` (port default Next.js)

## 📖 Cara Penggunaan

### Step 1: Akses Aplikasi
1. Buka browser dan akses `http://localhost:3000`
2. Anda akan melihat halaman utama "PDF Folder Analyzer"

### Step 2: Upload Folder
1. Klik tombol **"Tambah Folder"** di kanan atas
2. Modal upload akan muncul
3. Klik **"Pilih Folder"**
4. Pilih folder yang berisi file PDF dari file explorer
5. Sistem akan otomatis mendeteksi dan menganalisis file PDF

### Step 3: Lihat Hasil Analisis
1. Setelah upload selesai, folder akan muncul di tabel
2. Lihat statistik di bagian atas dashboard:
   - Total Folders: Jumlah folder yang dianalisis
   - Total Files: Total file PDF dari semua folder
   - Total Data: Grand total dari semua angka

### Step 4: Kelola Data
1. **Lihat Detail**: Klik tombol "Detail" untuk melihat:
   - Statistik lengkap folder
   - Daftar semua file PDF dengan angka masing-masing
   - Total ukuran folder

2. **Hapus Folder**: Klik tombol "Delete" untuk menghapus folder dari analisis

## 📝 Format File yang Didukung

### ✅ Format Nama File yang Valid:
```
[ TOTAL = 2 ] SDN 2 MULYAJAYA.pdf      → Angka: 2
[ TOTAL = 15 ] SD NEGERI CIKENTANG.pdf → Angka: 15
[ total = 8 ] SMA 1 JAKARTA.pdf        → Angka: 8
[ TOTAL = 25 ] SMP NEGERI 1.pdf        → Angka: 25
```

### ❌ File yang Akan Diabaikan:
- File tanpa format `[ TOTAL = angka ]`
- File dengan ekstensi selain `.pdf`
- Folder kosong atau folder tanpa file PDF

## 🔍 Cara Kerja Parsing

### Contoh Analisis:
```
Folder: "Hasil_Test_Ganesa"
├── [ TOTAL = 2 ] SDN 2 MULYAJAYA.pdf     = 2
├── [ TOTAL = 15 ] SD NEGERI CIKENTANG.pdf = 15
├── [ total = 8 ] SMA 1 JAKARTA.pdf       = 8
└── [ TOTAL = 25 ] SMP NEGERI 1.pdf       = 25
```

**Hasil Analisis:**
- **Nama Folder**: Hasil_Test_Ganesa
- **Jumlah File**: 4 PDF files
- **Total Data**: 2 + 15 + 8 + 25 = **50**

## 📊 Struktur File

```
ganesa-web-app/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout
│       ├── page.tsx           # Halaman utama
│       └── api/
│           ├── files/
│           │   ├── route.ts           # API daftar file
│           │   └── [filename]/
│           │       └── route.ts       # API baca file individual
│           └── globals.css            # Global styles
├── public/                     # Static assets
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind config
├── next.config.js            # Next.js config
└── README.md                 # Dokumentasi ini
```

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Blue, Green, Purple accent colors
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing system
- **Icons**: Heroicons for consistent iconography

### Responsive Design
- **Mobile First**: Optimized untuk mobile devices
- **Tablet**: Layout yang sesuai untuk tablet
- **Desktop**: Full-width layout untuk desktop
- **Breakpoint**: Responsive di semua ukuran layar

### User Experience
- **Loading States**: Indikator loading saat proses
- **Error Handling**: Pesan error yang informatif
- **Success Feedback**: Konfirmasi berhasil upload
- **Intuitive Navigation**: Navigasi yang mudah dipahami

## 🔧 Development

### Scripts Tersedia
```bash
npm run dev          # Jalankan development server
npm run build        # Build untuk production
npm run start        # Jalankan production server
npm run lint         # Jalankan ESLint
```

### Environment Variables
Buat file `.env.local` untuk konfigurasi:
```env
NEXT_PUBLIC_APP_NAME="PDF Folder Analyzer"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini atau hubungi tim development.

---

**Dibuat dengan ❤️ untuk memudahkan analisis data hasil quiz dan test Ganesa**

---

## 🔍 Quick Start Guide

1. **Install**: `npm install`
2. **Run**: `npm run dev`
3. **Open**: `http://localhost:3000`
4. **Upload**: Klik "Tambah Folder" dan pilih folder PDF
5. **Analyze**: Lihat hasil analisis di tabel
6. **Manage**: Gunakan tombol Detail dan Delete untuk mengelola data

**Selamat menggunakan PDF Folder Analyzer! 🎉**