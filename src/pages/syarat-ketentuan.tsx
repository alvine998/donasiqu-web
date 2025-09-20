import React from 'react';
import Layout from '@/components/Layout';

export default function TermsAndConditions() {
  return (
    <Layout title="Syarat & Ketentuan - Donasiqu">
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Syarat & Ketentuan</h1>
            <p className="text-lg text-gray-600">Terakhir diperbarui: 20 September 2025</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl p-8 space-y-8">
            <div className="prose prose-violet max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Penggunaan Layanan</h2>
                <p className="text-gray-600 mb-4">
                  Dengan mengakses dan menggunakan layanan Donasiqu, Anda menyetujui untuk terikat dengan syarat dan ketentuan yang berlaku. Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap jangan menggunakan layanan kami.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Donasi</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Donasi yang sudah diberikan tidak dapat ditarik kembali.</li>
                  <li>Donasiqu berhak menolak donasi yang dianggap mencurigakan atau melanggar ketentuan yang berlaku.</li>
                  <li>Biaya transaksi sebesar 5% akan dikenakan untuk setiap donasi sebagai biaya operasional platform.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Penggalangan Dana</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Setiap penggalangan dana akan diverifikasi terlebih dahulu oleh tim Donasiqu.</li>
                  <li>Donasiqu berhak menutup atau membatalkan penggalangan dana yang melanggar syarat dan ketentuan.</li>
                  <li>Dana yang terkumpul akan disalurkan sesuai dengan tujuan yang telah ditentukan.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Privasi</h2>
                <p className="text-gray-600 mb-4">
                  Data pribadi Anda akan dilindungi sesuai dengan Kebijakan Privasi kami. Dengan menggunakan layanan ini, Anda menyetujui pengumpulan dan penggunaan informasi Anda sesuai dengan kebijakan tersebut.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Perubahan Ketentuan</h2>
                <p className="text-gray-600 mb-4">
                  Donasiqu dapat mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diberitahukan melalui email atau pemberitahuan di situs web kami. Dengan terus menggunakan layanan setelah perubahan tersebut, Anda dianggap telah menerima perubahan tersebut.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Hubungi Kami</h2>
                <p className="text-gray-600">
                  Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami di support@donasiqu.com atau melalui halaman kontak kami.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
