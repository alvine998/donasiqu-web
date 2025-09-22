import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';

// Mock data for categories and campaigns
const categories = [
  {
    id: 1,
    name: 'Kemanusiaan',
    slug: 'kemanusiaan',
    description: 'Bantu sesama yang membutuhkan bantuan kemanusiaan',
    icon: '❤️',
    campaigns: [
      { id: 1, title: 'Bantu Korban Bencana Alam', raised: 12500000, target: 50000000, image: '/images/disaster.jpg' },
      { id: 2, title: 'Bantuan Pengungsi Konflik', raised: 3500000, target: 20000000, image: '/images/refugee.jpg' },
    ]
  },
  {
    id: 2,
    name: 'Kesehatan',
    slug: 'kesehatan',
    description: 'Bantu mereka yang membutuhkan perawatan kesehatan',
    icon: '🏥',
    campaigns: [
      { id: 3, title: 'Operasi Jantung Anak', raised: 7500000, target: 100000000, image: '/images/medical.jpg' },
    ]
  },
  {
    id: 3,
    name: 'Pendidikan',
    slug: 'pendidikan',
    description: 'Dukung pendidikan anak-anak Indonesia',
    icon: '📚',
    campaigns: [
      { id: 4, title: 'Beasiswa Anak Yatim', raised: 12000000, target: 50000000, image: '/images/education.jpg' },
      { id: 5, title: 'Renovasi Sekolah', raised: 25000000, target: 100000000, image: '/images/school.jpg' },
    ]
  },
  {
    id: 4,
    name: 'Lingkungan',
    slug: 'lingkungan',
    description: 'Jaga bumi kita untuk masa depan yang lebih baik',
    icon: '🌱',
    campaigns: [
      { id: 6, title: 'Penanaman 1000 Pohon', raised: 15000000, target: 50000000, image: '/images/environment.jpg' },
    ]
  },
];

const DonasiPage: NextPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (slug: string) => {
    setActiveCategory(activeCategory === slug ? null : slug);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePercentage = (raised: number, target: number): number => {
    return Math.min(Math.round((raised / target) * 100), 100);
  };

  return (
    <Layout>
      <Head>
        <title>Donasi - Donasiqu</title>
        <meta name="description" content="Temukan berbagai kategori donasi dan bantu wujudkan kebaikan bersama" />
      </Head>

      <div className="bg-violet-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Temukan Kategori Donasi
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Pilih kategori yang ingin Anda dukung dan temukan campaign yang sesuai dengan keinginan Anda.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => toggleCategory(category.slug)}
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                    <div className="mt-4 flex items-center text-sm text-violet-600">
                      <span>{category.campaigns.length} campaign tersedia</span>
                      <svg 
                        className={`ml-2 h-5 w-5 transform transition-transform ${activeCategory === category.slug ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {activeCategory === category.slug && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Campaign {category.name}:</h4>
                      <div className="space-y-4">
                        {category.campaigns.map((campaign) => (
                          <Link 
                            key={campaign.id} 
                            href={`/campaign/${campaign.id}`}
                            className="block group"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                                <Image
                                  src={campaign.image}
                                  alt={campaign.title}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-violet-600">
                                  {campaign.title}
                                </p>
                                <div className="mt-1">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-violet-600 h-2 rounded-full" 
                                      style={{ width: `${calculatePercentage(campaign.raised, campaign.target)}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Terkumpul: {formatCurrency(campaign.raised)}</span>
                                    <span>{calculatePercentage(campaign.raised, campaign.target)}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Link 
                          href={`/cari?kategori=${category.slug}`}
                          className="text-sm font-medium text-violet-600 hover:text-violet-700"
                        >
                          Lihat Semua {category.name} &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Tidak menemukan yang sesuai?</h2>
            <p className="mt-2 text-lg text-gray-600">Gunakan fitur pencarian untuk menemukan lebih banyak campaign</p>
            <div className="mt-6">
              <Link 
                href="/cari"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
              >
                Cari Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonasiPage;
