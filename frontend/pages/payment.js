// frontend/pages/payment.js
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PaymentPage() {
  const { cartItems } = useCart();
  const router = useRouter();

  // Hitung total dari keranjang belanja
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = subtotal * 0.11; // Contoh pajak 11%
  const shipping = 10000; // Contoh ongkos kirim
  const total = subtotal + tax + shipping;

  // Fungsi yang akan dijalankan saat tombol "Confirm & Pay" diklik
  const handlePayment = async () => {
    // 1. Kirim data ke backend untuk membuat invoice Xendit
    try {
      const response = await fetch('http://localhost:5000/api/payments/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          items: cartItems
        })
      });
      const data = await response.json();
      
      // 2. Jika berhasil, arahkan pengguna ke URL invoice dari Xendit
      if (data.invoiceUrl) {
        router.push(data.invoiceUrl);
      } else {
        alert('Gagal membuat invoice pembayaran. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Terjadi kesalahan saat memulai pembayaran.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Link href="/checkout" className="text-blue-500">
        &larr; Kembali ke Checkout
      </Link>
      <h1 className="text-2xl font-bold my-4">Secure Payment</h1>
      
      {/* Alamat Pengiriman & Metode Pembayaran (UI Sederhana) */}
      <div className="space-y-4 mb-6">
        <div>
          <h2 className="font-semibold">Shipping Address</h2>
          <p className="text-gray-600">Jl. Prasetiya Mulya No. 1, Tangerang, Banten</p>
        </div>
        <div>
          <h2 className="font-semibold">Payment Method</h2>
          <p className="text-gray-600">Xendit Payment Gateway</p>
        </div>
      </div>
      
      {/* Ringkasan Pesanan */}
      <div className="border-t pt-4">
        <h2 className="font-bold text-lg mb-2">Order Summary</h2>
        <div className="space-y-1 text-gray-700">
          <div className="flex justify-between">
            <p>Item(s) Subtotal</p>
            <p>Rp{subtotal.toLocaleString('id-ID')}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax (11%)</p>
            <p>Rp{tax.toLocaleString('id-ID')}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Rp{shipping.toLocaleString('id-ID')}</p>
          </div>
          <div className="flex justify-between font-bold text-xl mt-2 border-t pt-2">
            <p>Total</p>
            <p>Rp{total.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      {/* Tombol Konfirmasi Pembayaran */}
      <button 
        onClick={handlePayment}
        className="bg-blue-600 text-white w-full py-3 rounded-lg mt-6 font-bold text-lg"
      >
        Confirm & Pay
      </button>
    </div>
  );
}