// backend/routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // <-- 1. Import Order model

router.post('/xendit', async (req, res) => { // <-- 2. Jadikan async
  try {
    const incomingToken = req.headers['x-callback-token'];
    if (incomingToken !== process.env.XENDIT_CALLBACK_TOKEN) {
      return res.status(401).send('Invalid callback token');
    }

    const event = req.body;
    console.log('Menerima webhook dari Xendit:', event.event);

    if (event.event === 'invoice.paid') {
      const externalId = event.data.external_id;

      // 3. Cari dan update order di database
      const updatedOrder = await Order.findOneAndUpdate(
        { externalId: externalId },
        { status: 'LUNAS' },
        { new: true } // Opsi untuk mengembalikan dokumen yang sudah diupdate
      );

      if (updatedOrder) {
        console.log(`✅ Pesanan ${externalId} berhasil diupdate menjadi LUNAS.`);
      } else {
        console.log(`⚠️ Pesanan ${externalId} tidak ditemukan.`);
      }
    }

    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;