// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { Xendit } = require('xendit-node');

const x = new Xendit({
  secretKey: process.env.XENDIT_API_KEY,
});

const { Invoice } = x;

router.post('/create-invoice', async (req, res) => {
  try {
    const { amount, items } = req.body;
    const externalId = `invoice-${Date.now()}`;

    // Simpan order baru ke database Anda
    const newOrder = new Order({
      items: items.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
      totalAmount: amount,
      externalId: externalId,
    });
    await newOrder.save();
    console.log('Order baru disimpan ke DB:', newOrder);

    // --- PERBAIKAN DI SINI ---
    const invoice = await Invoice.createInvoice({
      data: { // SDK mengharapkan semua parameter ada di dalam properti 'data'
        externalId: externalId, // Gunakan 'externalId' (camelCase)
        amount: amount,
        successRedirectUrl: `http://localhost:3000/success?order_id=${externalId}`, // Gunakan 'successRedirectUrl'
        items: items.map(item => ({
          name: item.name,
          quantity: item.qty,
          price: item.price,
        })),
        customer: { // Menambahkan detail customer adalah praktik yang baik
          givenNames: 'Pelanggan',
          surname: 'Prasmul',
          email: 'test@prasetiyamulya.ac.id',
        },
      }
    });

    res.json({ invoiceUrl: invoice.invoiceUrl }); // Gunakan 'invoiceUrl'

  } catch (error) {
    console.error('Error creating Xendit invoice:', error);
    res.status(500).json({ error: error.message || 'An internal error occurred' });
  }
});

module.exports = router;