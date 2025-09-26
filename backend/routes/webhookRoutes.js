// backend/routes/webhookRoutes.js
const express = require('express');
const router = express.Router();

router.post('/xendit', (req, res) => {
  // 1. Ambil token dari header request yang dikirim Xendit
  const incomingToken = req.headers['x-callback-token'];

  // 2. Bandingkan dengan token yang Anda simpan
  if (incomingToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    console.error('Callback token tidak valid!');
    return res.status(401).send('Invalid callback token');
  }

  // 3. Jika token valid, proses notifikasinya
  const event = req.body;
  console.log('Menerima webhook dari Xendit:', event);

  if (event.event === 'invoice.paid') {
    // Lakukan sesuatu jika invoice sudah dibayar
    // Contoh: Update status pesanan di database menjadi "LUNAS"
    console.log(`Invoice ${event.data.external_id} telah lunas!`);
  }

  // Kirim respon OK (200) ke Xendit untuk konfirmasi
  res.status(200).send('Webhook received');
});

module.exports = router;