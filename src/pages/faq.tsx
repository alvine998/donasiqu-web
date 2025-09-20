import React from 'react';
import Layout from '@/components/Layout';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'Bagaimana cara berdonasi di Donasiqu?',
    answer: 'Anda dapat berdonasi dengan memilih campaign yang ingin didukung, lalu klik tombol "Donasi Sekarang" dan ikuti langkah-langkahnya.'
  },
  {
    question: 'Apakah donasi saya aman?',
    answer: 'Ya, semua transaksi di Donasiqu dilindungi dengan enkripsi standar industri untuk keamanan data Anda.'
  },
  {
    question: 'Bagaimana cara mengetahui donasi saya sudah terkirim?',
    answer: 'Anda akan menerima email konfirmasi setelah donasi berhasil diproses. Anda juga dapat memeriksa riwayat donasi di akun Anda.'
  },
  {
    question: 'Apakah ada biaya transaksi?',
    answer: 'Donasiqu mengenakan biaya administrasi sebesar 5% dari total donasi untuk biaya operasional platform.'
  },
  {
    question: 'Bagaimana jika campaign tidak mencapai target?',
    answer: 'Dana yang terkumpul akan tetap disalurkan kepada penerima manfaat sesuai dengan persetujuan donatur.'
  },
  {
    question: 'Bagaimana cara menghubungi tim Donasiqu?',
    answer: 'Anda dapat menghubungi kami melalui halaman kontak atau email ke support@donasiqu.com.'
  }
];

export default function FAQ() {
  return (
    <Layout title="FAQ - Donasiqu">
      <div className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h1>
            <p className="text-lg text-gray-600">Temukan jawaban atas pertanyaan umum seputar Donasiqu</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer focus:outline-none">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 pt-0 -mt-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Masih ada pertanyaan lain?</p>
            <a 
              href="/kontak" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
