import React from 'react';
import Layout from '@/components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout title="Kebijakan Privasi - Donasiqu">
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h1>
            <p className="text-lg text-gray-600">Terakhir diperbarui: 20 September 2025</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl p-8 space-y-8">
            <div className="prose prose-violet max-w-none">
              <section className="mb-8">
                <p className="text-gray-600 mb-4">
                  Donasiqu menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan kepada kami.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi yang Kami Kumpulkan</h2>
                <p className="text-gray-600 mb-4">
                  Kami dapat mengumpulkan berbagai jenis informasi, termasuk:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Informasi pribadi seperti nama, alamat email, nomor telepon, dan alamat</li>
                  <li>Informasi pembayaran dan transaksi</li>
                  <li>Informasi teknis seperti alamat IP, jenis perangkat, dan riwayat penelusuran</li>
                  <li>Data penggunaan dan interaksi dengan situs web kami</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Cara Kami Menggunakan Informasi Anda</h2>
                <p className="text-gray-600 mb-2">Kami menggunakan informasi yang kami kumpulkan untuk:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Memproses donasi dan transaksi Anda</li>
                  <li>Mengelola akun dan profil Anda</li>
                  <li>Memberikan dukungan pelanggan</li>
                  <li>Meningkatkan layanan dan pengalaman pengguna</li>
                  <li>Mengirimkan pembaruan dan informasi penting</li>
                  <li>Memenuhi kewajiban hukum dan peraturan</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Berbagi Informasi</h2>
                <p className="text-gray-600 mb-4">
                  Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Namun, kami dapat membagikan informasi dengan:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Penyedia layanan pihak ketiga yang membantu operasional kami</li>
                  <li>Penerima donasi yang sah</li>
                  <li>Pihak berwenang jika diwajibkan oleh hukum</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Keamanan Data</h2>
                <p className="text-gray-600 mb-4">
                  Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Hak Anda</h2>
                <p className="text-gray-600 mb-2">Anda memiliki hak untuk:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Mengakses informasi pribadi Anda</li>
                  <li>Memperbarui atau memperbaiki data yang tidak akurat</li>
                  <li>Menghapus data pribadi Anda</li>
                  <li>Membatasi atau menolak pemrosesan data Anda</li>
                  <li>Mencabut persetujuan kapan saja</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Perubahan pada Kebijakan Privasi</h2>
                <p className="text-gray-600 mb-4">
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diposting di halaman ini dengan tanggal pembaruan terbaru.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Hubungi Kami</h2>
                <p className="text-gray-600">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di support@donasiqu.com atau melalui halaman kontak kami.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
