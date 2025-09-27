// frontend/pages/success.js
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Kosongkan keranjang saat halaman ini dimuat
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-green-500 my-4">✅ Pembayaran Berhasil!</h1>
      <p>Terima kasih telah berbelanja.</p>
      <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 inline-block">
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}