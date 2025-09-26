// frontend/pages/checkout.js
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems } = useCart();

  // Menghitung subtotal dari semua item di keranjang
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Link href="/" className="text-blue-500">
        &larr; Kembali Belanja
      </Link>

      <h1 className="text-2xl font-bold my-4">Checkout</h1>
      
      {/* Jika keranjang kosong, tampilkan pesan */}
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <div>
          {/* Daftar Item */}
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Rp{item.price.toLocaleString('id-ID')} x {item.qty}</p>
                </div>
                <p className="font-bold">
                  Rp{(item.qty * item.price).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>

          {/* Rincian Total */}
          <div className="space-y-1 border-t pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <p>Subtotal</p>
              <p>Rp{subtotal.toLocaleString('id-ID')}</p>
            </div>
          </div>
          
            <Link href="/payment" className="bg-green-500 text-white w-full py-2 rounded-lg mt-6 font-bold text-center block">
            Lanjut ke Pembayaran &rarr;
            </Link>
        </div>
      )}
    </div>
  );
}