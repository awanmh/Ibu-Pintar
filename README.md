# Website Ibu Pintar

Selamat datang di repositori **Ibu Pintar**!  
Ini adalah aplikasi web full-stack yang dirancang untuk menjadi platform informasi dan komunitas interaktif bagi para calon ibu dan ibu muda.

---

## ✨ Fitur Utama

### 🏠 Halaman Beranda Dinamis
- Hero section yang menarik dan inspiratif.
- Carousel interaktif menampilkan artikel terbaru.
- Highlight layanan unggulan yang ditawarkan.

### 📰 Sistem Artikel Lengkap
- Tampilan daftar artikel dengan layout modern (artikel utama dan pendamping).
- Halaman detail artikel dengan layout dua kolom: konten utama & sidebar artikel terbaru.
- Sistem komentar pada setiap artikel.
- Fitur filter berdasarkan kategori artikel.

### 💬 Forum Tanya Bidan
- Melihat daftar pertanyaan dari pengguna lain.
- Membuat pertanyaan baru.
- Melihat detail pertanyaan dan semua jawaban.
- Memberikan jawaban (oleh pengguna, admin, maupun bidan).

### 🧘‍♀️ Sistem Layanan
- Galeri semua layanan yang tersedia.
- Halaman detail tiap layanan.
- Formulir reservasi layanan (booking jadwal).

### 🎨 Desain & UX
- Tampilan modern, profesional, dan responsif.
- Animasi & transisi halus untuk pengalaman pengguna yang lebih baik.

---

## 🧰 Teknologi yang Digunakan

### Frontend
- **Framework**: Vue.js 3 (Composition API)
- **Routing**: Vue Router
- **State Management**: Vuex
- **HTTP Client**: Axios

### Backend
- **Framework**: Node.js + Express.js
- **Database**: MySQL
- **ORM**: Sequelize

### Lainnya
- **Styling**: CSS3 (Flexbox & Grid)
- **Kontrol Versi**: Git + GitHub

---

## ⚙️ Prasyarat

Pastikan Anda sudah menginstal software berikut:
- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru)
- NPM (biasanya terinstal bersama Node.js)
- MySQL Server (bisa menggunakan XAMPP, WAMP, atau standalone)

---

## 🚀 Panduan Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

### 1. Clone Repositori
```bash
git clone https://github.com/NAMA_USER_ANDA/NAMA_REPO_ANDA.git
cd NAMA_REPO_ANDA
````

---

### 2. Setup Backend

#### Masuk ke folder backend

```bash
cd backend
```

#### Install dependensi

```bash
npm install
```

#### Konfigurasi Environment

Buat file `.env`:

```env
# Konfigurasi Database
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=db_kehamilan

# Port Server
APP_PORT=5000
```

#### Setup Database

* Buat database baru di MySQL sesuai nama di `.env` (contoh: `db_kehamilan`)
* Anda dapat:

  * Menjalankan server dengan opsi `{ force: true }` untuk membuat semua tabel secara otomatis, **atau**
  * Mengimpor file `.sql` jika tersedia melalui phpMyAdmin.

#### Jalankan server backend

```bash
npm run dev
```

Server akan berjalan di: [http://localhost:5000](http://localhost:5000)

---

### 3. Setup Frontend

#### Buka terminal baru

```bash
cd frontend
```

#### Install dependensi

```bash
npm install
```

#### Jalankan server frontend

```bash
npm run dev
```

Frontend akan tersedia di: [http://localhost:5173](http://localhost:5173) *(atau sesuai port yang muncul)*

---

## 🤝 Kontribusi

Kami terbuka untuk kontribusi! Jika Anda ingin membantu mengembangkan proyek ini:

1. Fork repositori ini.
2. Buat branch baru: `git checkout -b fitur-baru`
3. Commit perubahan Anda: `git commit -m "Menambahkan fitur baru"`
4. Push ke branch Anda: `git push origin fitur-baru`
5. Buat Pull Request.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
