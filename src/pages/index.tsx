import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import SearchBar from '../components/SearchBar';

const inter = Inter({ subsets: ['latin'] });

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  amountRaised: number;
  target: number;
  daysLeft: number;
  category: string;
}

interface Category {
  name: string;
  icon: string;
  slug: string;
}

const Home: NextPage = () => {
  const campaigns: Campaign[] = [
    {
      id: 1,
      title: 'Bantu Pendidikan Anak Yatim',
      description: 'Bantu biaya pendidikan anak yatim piatu di panti asuhan X',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      progress: 65,
      amountRaised: 32000000,
      target: 50000000,
      daysLeft: 15,
      category: 'Pendidikan'
    },
    {
      id: 2,
      title: 'Bantuan Korban Bencana Alam',
      description: 'Dukungan untuk korban banjir di daerah X',
      image: 'https://images.unsplash.com/photo-1582211594533-268f4f3af794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      progress: 85,
      amountRaised: 8500000,
      target: 10000000,
      daysLeft: 5,
      category: 'Bencana'
    },
    {
      id: 3,
      title: 'Operasi Jantung untuk Anak',
      description: 'Bantu biaya operasi jantung untuk anak yang membutuhkan',
      image: 'https://images.unsplash.com/photo-1505751172876-faee0f8b1b82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      progress: 45,
      amountRaised: 22500000,
      target: 50000000,
      daysLeft: 30,
      category: 'Kesehatan'
    },
  ];

  const categories: Category[] = [
    { name: 'Kesehatan', icon: '🏥', slug: 'kesehatan' },
    { name: 'Pendidikan', icon: '📚', slug: 'pendidikan' },
    { name: 'Bencana', icon: '🌪️', slug: 'bencana' },
    { name: 'Sosial', icon: '🤝', slug: 'sosial' },
    { name: 'Zakat', icon: '🕌', slug: 'zakat' },
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={inter.className}>
      <Head>
        <title>Donasiqu - Platform Donasi Online</title>
        <meta name="description" content="Platform donasi online untuk berbagai kebutuhan sosial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="bg-violet-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Berbagi Kebaikan, Mulai dari Sini
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl">
            Bergabung bersama ribuan orang baik yang telah membantu mewujudkan harapan mereka yang membutuhkan.
          </p>
          
          {/* Search Bar */}
          <SearchBar />
          
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/cari" className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-violet-700 bg-white hover:bg-gray-100 md:py-3 md:text-base md:px-8">
              Donasi Sekarang
            </Link>
            <Link href="/galang-dana" className="px-6 py-3 border border-white text-base font-medium rounded-md text-white border-opacity-50 hover:bg-violet-600 md:py-3 md:text-base md:px-8">
              Galang Dana
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pilih Kategori</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <Link key={category.slug} href={`/kategori/${category.slug}`} className="block">
                <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-gray-900 font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Campaigns */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Galang Dana Terpopuler</h2>
            <Link href="/cari" className="text-red-600 hover:text-red-700 font-medium">
              Lihat Semua <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={campaign.image}
                    alt={campaign.title}
                  />
                  <span className="absolute top-2 right-2 bg-violet-100 text-violet-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {campaign.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Terkumpul</span>
                      <span>{formatCurrency(campaign.amountRaised)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-violet-600 h-2 rounded-full" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Target: {formatCurrency(campaign.target)}</span>
                      <span>{campaign.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{campaign.daysLeft} hari lagi</span>
                    <Link href={`/campaign/${campaign.id}`} className="text-violet-600 hover:text-violet-700 font-medium">
                      Donasi Sekarang
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Siap untuk Berbuat Baik?</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Bergabunglah dengan ribuan orang baik lainnya dan mulailah berdonasi atau galang dana sekarang juga.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/daftar" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 md:py-4 md:text-lg md:px-10">
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
