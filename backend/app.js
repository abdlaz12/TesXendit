// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Muat variabel environment dari file .env
dotenv.config();

// 2. Import rute setelah semua setup awal
const productRoutes = require('./routes/productRoutes');
const webhookRoutes = require('./routes/webhookRoutes'); //
const paymentRoutes = require('./routes/paymentRoutes');


// 3. Inisialisasi aplikasi Express (INI YANG HILANG/SALAH URUTAN)
const app = express();

// 4. Gunakan Middleware
app.use(cors());
app.use(express.json());

// 5. Hubungkan Rute ke Aplikasi
app.use('/api/products', productRoutes);
app.use('/api/webhooks', webhookRoutes); // <-- Tambahkan ini
app.use('/api/payments', paymentRoutes);

// 6. Hubungkan ke Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Terhubung'))
  .catch((err) => console.error('❌ MongoDB Gagal Terhubung:', err));

// 7. Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});