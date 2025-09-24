import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import SearchBar from "../components/SearchBar";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

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
      title: "Wakaf Mushaf Al-Qur`an",
      description:
        "Masih banyak saudara-saudara kita di pelosok negeri yang kesulitan mendapatkan mushaf Al-Qur'an.",
      image: "/images/campaign-1.jpeg",
      progress: Math.min(Math.round((1000000 / 50000000) * 100), 100),
      amountRaised: 1000000,
      target: 50000000,
      daysLeft: 90,
      category: "Wakaf",
    },
    {
      id: 2,
      title: "Donasi Pembangunan Rumah Allah",
      description:
        "Alhamdulillah, di tengah semangat kebersamaan warga Kampung Citajung RT 001 RW 001, Desa Mekarjaya, Kecamatan Banjaran",
      image: "/images/campaign-2.jpeg",
      progress: Math.min(Math.round((8500000 / 368339400) * 100), 100),
      amountRaised: 8500000,
      target: 368339400,
      daysLeft: 90,
      category: "Wakaf",
    },
    {
      id: 3,
      title: "Bantuan Bencana Alam",
      description:
        "Indonesia adalah negeri dengan sejuta pesona, namun juga negeri yang penuh ujian. Dari Sabang hingga Merauke, bencana alam datang silih berganti",
      image: "/images/campaign-3.jpeg",
      progress: Math.min(Math.round((2250000 / 50000000) * 100), 100),
      amountRaised: 2250000,
      target: 50000000,
      daysLeft: 90,
      category: "Bencana",
    },
  ];

  const categories: Category[] = [
    { name: "Kesehatan", icon: "🏥", slug: "kesehatan" },
    { name: "Pendidikan", icon: "📚", slug: "pendidikan" },
    { name: "Bencana", icon: "🌪️", slug: "bencana" },
    { name: "Sosial", icon: "🤝", slug: "sosial" },
    { name: "Zakat", icon: "🕌", slug: "zakat" },
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout title="Donasiqu - Platform Donasi Online">
      <Head>
        <title>Donasiqu - Platform Donasi Online</title>
        <meta
          name="description"
          content="Platform donasi online untuk berbagai kebutuhan sosial"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="bg-violet-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Berbagi Kebaikan, Mulai dari Sini
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl">
            Bergabung bersama ribuan orang baik yang telah membantu mewujudkan
            harapan mereka yang membutuhkan.
          </p>

          {/* Search Bar */}
          <SearchBar />

          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/donasi"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-violet-700 bg-white hover:bg-gray-100 md:py-3 md:text-base md:px-8"
            >
              Donasi Sekarang
            </Link>
            <Link
              href="/galang-dana"
              className="px-6 py-3 border border-white text-base font-medium rounded-md text-white border-opacity-50 hover:bg-violet-600 md:py-3 md:text-base md:px-8"
            >
              Galang Dana
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Pilih Kategori
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/kategori/${category.slug}`}
                className="block"
              >
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
            <h2 className="text-2xl font-bold text-gray-900">
              Galang Dana Terpopuler
            </h2>
            <Link
              href="/cari"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Lihat Semua <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {campaign.description}
                  </p>

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
                    <Link
                      href={`/campaign/${campaign.id}`}
                      className="text-violet-600 hover:text-violet-700 font-medium"
                    >
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
            Bergabunglah dengan ribuan orang baik lainnya dan mulailah berdonasi
            atau galang dana sekarang juga.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/daftar"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 md:py-4 md:text-lg md:px-10"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
