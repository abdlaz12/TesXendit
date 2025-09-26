// pages/index.js
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // <-- 1. Import useCart
import Link from 'next/link'; // <-- 2. Import Link untuk navigasi

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, cartItems } = useCart(); // <-- 3. Panggil fungsi dari context

   // TAMBAHKAN BARIS INI UNTUK MEMPERBAIKI ERROR
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // ... (useEffect untuk fetchProducts tetap sama)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Toko Asik</h1>
        {/* 4. Tambahkan Link ke halaman Checkout dengan jumlah item */}
        <Link href="/checkout" className="font-bold p-2">
        🛒 Keranjang ({totalItemsInCart})
        </Link>
      </header>
      
      <main>
        {/* ... (kode mapping produk tetap sama, hanya ubah bagian button) ... */}
        {isLoading ? (
          <p>Loading produk...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 shadow-sm">
                <div className="bg-gray-200 h-32 mb-4 rounded-md"></div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold">
                    Rp{product.price.toLocaleString('id-ID')}
                  </span>
                  {/* 5. Panggil fungsi addToCart saat tombol diklik */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}