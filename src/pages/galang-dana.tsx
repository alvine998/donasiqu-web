import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

const GalangDana = () => {
  // Sample featured campaigns data
  const featuredCampaigns = [
    {
      id: 1,
      title: 'Bantu Pendidikan Anak Yatim',
      description: 'Bantu anak-anak yatim mendapatkan akses pendidikan yang layak untuk masa depan yang lebih baik.',
      progress: 75,
      target: 50000000,
      raised: 37500000,
      image: '/images/campaign-education.jpg',
    },
    {
      id: 2,
      title: 'Bencana Alam di Jawa Barat',
      description: 'Bantu korban bencana alam di Jawa Barat untuk pemulihan dan pembangunan kembali.',
      progress: 45,
      target: 200000000,
      raised: 90000000,
      image: '/images/campaign-disaster.jpg',
    },
    {
      id: 3,
      title: 'Operasi Kesehatan Gratis',
      description: 'Bantu warga tidak mampu mendapatkan operasi kesehatan yang mereka butuhkan.',
      progress: 30,
      target: 150000000,
      raised: 45000000,
      image: '/images/campaign-health.jpg',
    },
  ];

  return (
    <Layout title="Galang Dana - Donasiqu">
      {/* Hero Section */}
      <div className="bg-violet-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Galang Dana untuk Kebaikan Bersama</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Mulai galang dana Anda dan raih dukungan dari ribuan donatur untuk mewujudkan aksi sosial Anda.
          </p>
          <Link 
            href="/galang-dana/baru"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-violet-700 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors"
          >
            Mulai Galang Dana
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cara Menggalang Dana</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hanya 3 langkah mudah untuk memulai penggalangan dana Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 text-violet-700 text-xl font-bold mb-4">1</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Buat Campaign</h3>
              <p className="text-gray-600">Ceritakan kisah Anda dan tentukan target dana yang dibutuhkan.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 text-violet-700 text-xl font-bold mb-4">2</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sebarkan</h3>
              <p className="text-gray-600">Bagikan campaign Anda melalui media sosial dan jaringan pertemanan.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 text-violet-700 text-xl font-bold mb-4">3</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Terkumpul</h3>
              <p className="text-gray-600">Dana akan langsung disalurkan setelah campaign berakhir.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Campaigns */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Campaign Terpopuler</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mari bantu wujudkan kebaikan bersama-sama
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Terkumpul</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-violet-600 h-2 rounded-full" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Rp {new Intl.NumberFormat('id-ID').format(campaign.raised)}</span>
                      <span>Rp {new Intl.NumberFormat('id-ID').format(campaign.target)}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/campaign/${campaign.id}`}
                    className="mt-4 block w-full text-center bg-violet-100 text-violet-700 hover:bg-violet-200 font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Donasi Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/campaign"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-700 hover:bg-violet-800 transition-colors"
            >
              Lihat Semua Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Siap Mulai Menggalang Dana?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Bergabunglah dengan ribuan penggalang dana yang telah mempercayai platform kami
          </p>
          <Link 
            href="/galang-dana/baru"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-700 hover:bg-violet-800 md:py-4 md:text-lg md:px-10 transition-colors"
          >
            Mulai Galang Dana Sekarang
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default GalangDana;
