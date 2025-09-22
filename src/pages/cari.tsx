import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    title: "Bantu Korban Bencana Alam",
    category: "Kemanusiaan",
    categorySlug: "kemanusiaan",
    organizer: "Yayasan Peduli Bangsa",
    location: "Jakarta",
    raised: 12500000,
    target: 50000000,
    image: "/images/disaster.jpg",
    daysLeft: 15,
    description:
      "Bantu saudara-saudara kita yang menjadi korban bencana alam untuk bangkit kembali.",
  },
  {
    id: 2,
    title: "Operasi Jantung Anak",
    category: "Kesehatan",
    categorySlug: "kesehatan",
    organizer: "Rumah Zakat",
    location: "Bandung",
    raised: 7500000,
    target: 100000000,
    image: "/images/medical.jpg",
    daysLeft: 30,
    description:
      "Bantu biaya operasi jantung untuk anak-anak yang membutuhkan.",
  },
  {
    id: 3,
    title: "Beasiswa Anak Yatim",
    category: "Pendidikan",
    categorySlug: "pendidikan",
    organizer: "Dompet Dhuafa",
    location: "Surabaya",
    raised: 12000000,
    target: 50000000,
    image: "/images/education.jpg",
    daysLeft: 45,
    description:
      "Bantu pendidikan anak yatim untuk masa depan yang lebih baik.",
  },
  {
    id: 4,
    title: "Penanaman 1000 Pohon",
    category: "Lingkungan",
    categorySlug: "lingkungan",
    organizer: "Wahana Lingkungan Hidup",
    location: "Bogor",
    raised: 15000000,
    target: 50000000,
    image: "/images/environment.jpg",
    daysLeft: 60,
    description: "Gerakan penanaman 1000 pohon untuk kelestarian lingkungan.",
  },
  {
    id: 5,
    title: "Bantuan Pengungsi Konflik",
    category: "Kemanusiaan",
    categorySlug: "kemanusiaan",
    organizer: "Aksi Cepat Tanggap",
    location: "Aceh",
    raised: 3500000,
    target: 20000000,
    image: "/images/refugee.jpg",
    daysLeft: 20,
    description: "Bantuan untuk pengungsi konflik di wilayah Aceh.",
  },
  {
    id: 6,
    title: "Renovasi Sekolah",
    category: "Pendidikan",
    categorySlug: "pendidikan",
    organizer: "Rumah Belajar",
    location: "Nusa Tenggara Timur",
    raised: 25000000,
    target: 100000000,
    image: "/images/school.jpg",
    daysLeft: 90,
    description:
      "Renovasi sekolah untuk menciptakan lingkungan belajar yang lebih baik.",
  },
];

// Available categories for filter
const categories = [
  { id: "semua", name: "Semua Kategori" },
  { id: "kemanusiaan", name: "Kemanusiaan" },
  { id: "kesehatan", name: "Kesehatan" },
  { id: "pendidikan", name: "Pendidikan" },
  { id: "lingkungan", name: "Lingkungan" },
];

// Available locations for filter
const locations = [
  { id: "semua", name: "Semua Lokasi" },
  { id: "jakarta", name: "Jakarta" },
  { id: "bandung", name: "Bandung" },
  { id: "surabaya", name: "Surabaya" },
  { id: "bogor", name: "Bogor" },
  { id: "aceh", name: "Aceh" },
  { id: "ntt", name: "Nusa Tenggara Timur" },
];

// Sort options
const sortOptions = [
  { id: "terbaru", name: "Terbaru" },
  { id: "terlama", name: "Terlama" },
  { id: "terdekat", name: "Paling Dekat" },
  { id: "harga-tertinggi", name: "Dana Terbanyak" },
  { id: "harga-terendah", name: "Dana Tersedikit" },
];

const CariPage: NextPage = () => {
  const router = useRouter();
  const { kategori, lokasi, q } = router.query;

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedLocation, setSelectedLocation] = useState("semua");
  const [selectedSort, setSelectedSort] = useState("terbaru");
  const [filteredCampaigns, setFilteredCampaigns] = useState(mockCampaigns);

  // Initialize filters from URL query params
  useEffect(() => {
    if (kategori && typeof kategori === "string") {
      setSelectedCategory(kategori);
    }
    if (lokasi && typeof lokasi === "string") {
      setSelectedLocation(lokasi);
    }
    if (q && typeof q === "string") {
      setSearchQuery(q);
    }
  }, [kategori, lokasi, q]);

  // Apply filters when they change
  useEffect(() => {
    let result = [...mockCampaigns];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(query) ||
          campaign.description.toLowerCase().includes(query) ||
          campaign.organizer.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== "semua") {
      result = result.filter(
        (campaign) => campaign.categorySlug === selectedCategory
      );
    }

    // Apply location filter
    if (selectedLocation !== "semua") {
      result = result.filter(
        (campaign) =>
          campaign.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (selectedSort) {
        case "terbaru":
          return b.id - a.id;
        case "terlama":
          return a.id - b.id;
        case "harga-tertinggi":
          return b.raised - a.raised;
        case "harga-terendah":
          return a.raised - b.raised;
        case "terdekat":
          // For demo, we'll sort by ID as a placeholder
          return a.id - b.id;
        default:
          return 0;
      }
    });

    setFilteredCampaigns(result);
  }, [searchQuery, selectedCategory, selectedLocation, selectedSort]);

  // Update URL when filters change
  const updateUrl = () => {
    const query: { kategori?: string; lokasi?: string; q?: string } = {};

    if (selectedCategory !== "semua") {
      query.kategori = selectedCategory;
    }

    if (selectedLocation !== "semua") {
      query.lokasi = selectedLocation;
    }

    if (searchQuery) {
      query.q = searchQuery;
    }

    router.push(
      {
        pathname: "/cari",
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl();
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate percentage
  const calculatePercentage = (raised: number, target: number): number => {
    return Math.min(Math.round((raised / target) * 100), 100);
  };

  return (
    <Layout>
      <Head>
        <title>Cari Donasi - Donasiqu</title>
        <meta
          name="description"
          content="Temukan dan dukung berbagai campaign donasi yang sesuai dengan keinginan Anda"
        />
      </Head>

      {/* Hero Section */}
      <div className="bg-violet-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Cari Campaign Donasi</h1>
          <p className="mt-2 text-violet-100">
            Temukan campaign yang ingin Anda dukung
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filter</h2>
              {/* Search Form */}
              <form onSubmit={handleSearch} className="mb-6 max-w-3xl">
                <div className="flex">
                  <div className="relative flex-grow">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Pencarian
                    </h3>
                    <input
                      type="search"
                      placeholder="Cari campaign, kategori, atau lokasi..."
                      className="w-full border px-2 text-xs py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        name="category"
                        type="radio"
                        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-3 text-sm text-gray-700 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Lokasi
                </h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <div key={location.id} className="flex items-center">
                      <input
                        id={`location-${location.id}`}
                        name="location"
                        type="radio"
                        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                        checked={selectedLocation === location.id}
                        onChange={() => setSelectedLocation(location.id)}
                      />
                      <label
                        htmlFor={`location-${location.id}`}
                        className="ml-3 text-sm text-gray-700 cursor-pointer"
                      >
                        {location.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory("semua");
                  setSelectedLocation("semua");
                  setSearchQuery("");
                }}
                className="w-full mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-violet-700 bg-violet-100 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Hapus Semua Filter
              </button>
            </div>
          </div>

          {/* Campaign List */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Menampilkan{" "}
                <span className="font-medium">{filteredCampaigns.length}</span>{" "}
                hasil
                {searchQuery && ` untuk "${searchQuery}"`}
              </p>

              <div className="flex items-center">
                <label
                  htmlFor="sort"
                  className="mr-2 text-sm font-medium text-gray-700"
                >
                  Urutkan:
                </label>
                <select
                  id="sort"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campaign Grid */}
            {filteredCampaigns.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-300 hover:opacity-90"
                      />
                      <div className="absolute top-2 left-2 bg-violet-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {campaign.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                          <Link
                            href={`/campaign/${campaign.id}`}
                            className="hover:text-violet-600 transition-colors"
                          >
                            {campaign.title}
                          </Link>
                        </h3>
                      </div>

                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {campaign.description}
                      </p>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-violet-700 font-medium">
                            {formatCurrency(campaign.raised)}
                          </span>
                          <span className="text-gray-500">
                            {calculatePercentage(
                              campaign.raised,
                              campaign.target
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-violet-600 h-2 rounded-full"
                            style={{
                              width: `${calculatePercentage(
                                campaign.raised,
                                campaign.target
                              )}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Terkumpul</span>
                          <span>Dari {formatCurrency(campaign.target)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>📌 {campaign.location}</span>
                        <span>⏳ {campaign.daysLeft} hari lagi</span>
                      </div>

                      <div className="mt-4">
                        <Link
                          href={`/campaign/${campaign.id}`}
                          className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                          Donasi Sekarang
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Tidak ada hasil
                </h3>
                <p className="mt-1 text-gray-500">
                  Tidak ada campaign yang sesuai dengan filter Anda. Coba ubah
                  filter atau kata kunci pencarian.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSelectedCategory("semua");
                      setSelectedLocation("semua");
                      setSearchQuery("");
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    Hapus Semua Filter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CariPage;
