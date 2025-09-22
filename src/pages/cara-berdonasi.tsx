import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CheckCircleIcon, ArrowRightIcon, CreditCardIcon, BanknotesIcon, QrCodeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const CaraBerdonasi: NextPage = () => {
  const paymentMethods = [
    {
      name: 'Kartu Kredit/Debit',
      icon: CreditCardIcon,
      description: 'Donasi mudah dan aman menggunakan kartu kredit atau debit Anda.'
    },
    {
      name: 'Transfer Bank',
      icon: BanknotesIcon,
      description: 'Transfer langsung ke rekening bank yang tersedia.'
    },
    {
      name: 'E-Wallet',
      icon: QrCodeIcon,
      description: 'Donasi praktis melalui berbagai dompet digital populer.'
    }
  ];

  const reasons = [
    'Proses donasi yang mudah dan cepat',
    'Transaksi aman dengan enkripsi terkini',
    'Laporan penggunaan dana yang transparan',
    'Dukungan 24/7 untuk donatur',
    'Sertifikat donasi digital'
  ];

  return (
    <Layout title="Cara Berdonasi di Donasiqu">
      {/* Hero Section */}
      <div className="bg-violet-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Cara Berdonasi di Donasiqu
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Berikan bantuan Anda dengan mudah dan aman melalui platform donasi online terpercaya.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-violet-600 font-semibold tracking-wide uppercase">Panduan</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              4 Langkah Mudah Berdonasi
            </p>
          </div>

          <div className="mt-12">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-violet-500 text-white">
                  1
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Pilih Program Donasi</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Temukan program donasi yang ingin Anda dukung di halaman beranda atau melalui fitur pencarian.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-violet-500 text-white">
                  2
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Tentukan Nominal</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Masukkan jumlah donasi yang ingin Anda berikan atau pilih nominal yang telah disediakan.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-violet-500 text-white">
                  3
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Pilih Metode Pembayaran</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Pilih metode pembayaran yang tersedia dan ikuti petunjuk untuk menyelesaikan transaksi.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-violet-500 text-white">
                  4
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Konfirmasi Donasi</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Anda akan menerima konfirmasi melalui email dan dapat melacak donasi Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-violet-600 font-semibold tracking-wide uppercase">Pembayaran</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Metode Pembayaran
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {paymentMethods.map((method) => (
                <div key={method.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-violet-100 text-violet-700">
                    <method.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{method.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Donate Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-violet-50 rounded-2xl px-6 py-16 sm:p-16">
            <div className="max-w-xl mx-auto lg:max-w-none lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block">Mengapa Berdonasi di Donasiqu?</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Donasiqu memastikan setiap donasi Anda sampai kepada yang membutuhkan dengan transparan dan akuntabel.
                </p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    href="/donasi"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
                  >
                    Donasi Sekarang
                    <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason, index) => (
                <div key={index} className="flex">
                  <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                  <p className="ml-3 text-base text-gray-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-violet-600 font-semibold tracking-wide uppercase">FAQ</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Pertanyaan yang Sering Diajukan
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Apakah donasi di Donasiqu aman?</h3>
              <p className="mt-2 text-gray-600">Ya, semua transaksi di Donasiqu dilindungi dengan enkripsi tingkat tinggi dan sistem keamanan yang ketat.</p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Bagaimana cara mendapatkan bukti donasi?</h3>
              <p className="mt-2 text-gray-600">Anda akan menerima bukti donasi melalui email setelah donasi berhasil diproses.</p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">Apakah ada biaya transaksi?</h3>
              <p className="mt-2 text-gray-600">Tidak ada biaya tambahan untuk donasi Anda. 100% donasi akan disalurkan kepada penerima manfaat.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaraBerdonasi;
