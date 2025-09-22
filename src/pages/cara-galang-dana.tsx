import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const CaraGalangDana: NextPage = () => {
  const steps = [
    {
      title: 'Daftar Akun',
      description: 'Buat akun Donasiqu dengan mudah menggunakan email atau akun Google Anda.'
    },
    {
      title: 'Isi Formulir',
      description: 'Lengkapi formulir penggalangan dana dengan detail yang jelas dan lengkap.'
    },
    {
      title: 'Unggah Dokumen',
      description: 'Lampirkan dokumen pendukung seperti KTP dan surat keterangan yang diperlukan.'
    },
    {
      title: 'Verifikasi',
      description: 'Tim kami akan memverifikasi informasi yang Anda berikan dalam 1x24 jam.'
    },
    {
      title: 'Galang Dana',
      description: 'Setelah disetujui, galangan dana Anda akan aktif dan dapat menerima donasi.'
    },
    {
      title: 'Dana Cair',
      description: 'Dana akan dicairkan sesuai dengan ketentuan yang berlaku di Donasiqu.'
    }
  ];

  return (
    <Layout title="Cara Galang Dana di Donasiqu">
      {/* Hero Section */}
      <div className="bg-violet-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Cara Mudah Galang Dana di Donasiqu
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Ikuti langkah-langkah sederhana ini untuk memulai penggalangan dana Anda dan raih dukungan dari ribuan donatur.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-violet-600 font-semibold tracking-wide uppercase">Proses</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              6 Langkah Mudah Galang Dana
            </p>
          </div>

          <div className="mt-16">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={index} className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-violet-500 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="absolute -left-2 top-6 h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors duration-200">
                    <span className="text-violet-700 font-bold">{index + 1}</span>
                  </div>
                  <div className="ml-10">
                    <h3 className="text-lg font-medium text-gray-900">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Siap Mulai Menggalang Dana?</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Bergabunglah dengan ribuan penggalang dana yang telah mempercayai Donasiqu.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/galang-dana/baru" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700">
              Mulai Galang Dana
              <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-violet-600 font-semibold tracking-wide uppercase">FAQ</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Pertanyaan yang Sering Diajukan
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Berapa lama waktu yang dibutuhkan untuk verifikasi galang dana?</h3>
              <p className="mt-2 text-gray-600">Proses verifikasi biasanya memakan waktu 1x24 jam kerja setelah semua dokumen lengkap kami terima.</p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Berapa biaya yang dikenakan untuk galang dana di Donasiqu?</h3>
              <p className="mt-2 text-gray-600">Donasiqu mengenakan biaya sebesar 5% dari total dana yang terkumpul untuk biaya operasional platform.</p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Kapan dana bisa dicairkan?</h3>
              <p className="mt-2 text-gray-600">Dana dapat dicairkan setelah masa penggalangan dana berakhir atau sesuai dengan ketentuan yang telah disepakati.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaraGalangDana;
