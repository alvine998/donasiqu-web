import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import Layout from '../../components/Layout';
import DonationCard from '../../components/DonationCard';
import FilterSidebar from '../../components/FilterSidebar';

const inter = Inter({ subsets: ['latin'] });

interface Donation {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  amountRaised: number;
  target: number;
  daysLeft: number;
  category: string;
  organizer: string;
  location: string;
}

interface CategoryPageProps {
  category: string;
  donations: Donation[];
  total: number;
  page: number;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, donations, total, page }) => {
  const router = useRouter();
  const totalPages = Math.ceil(total / 12);

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  return (
    <Layout title={`Donasi ${category} | Donasiqu`}>
      <div className={`${inter.className} bg-gray-50 py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <FilterSidebar />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Donasi {category}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({total} hasil)
                  </span>
                </h1>
                
                <div className="relative">
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
                    defaultValue="terbaru"
                  >
                    <option value="terbaru">Terbaru</option>
                    <option value="terpopuler">Terpopuler</option>
                    <option value="harga-terendah">Dana Terkumpul Terbanyak</option>
                    <option value="harga-tertinggi">Batas Waktu Terdekat</option>
                  </select>
                </div>
              </div>
              
              {/* Donation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &larr; Sebelumnya
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show first, last, and current page with neighbors
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            page === pageNum
                              ? 'bg-violet-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Selanjutnya &rarr;
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const page = Number(context.query.page) || 1;
  
  // In a real app, you would fetch data from your API
  // This is mock data for demonstration
  const mockDonations: Donation[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Donasi ${categoryNames[slug as keyof typeof categoryNames] || 'Kemanusiaan'} ${i + 1}`,
    description: `Bantu saudara kita yang membutuhkan di ${categoryNames[slug as keyof typeof categoryNames] || 'berbagai daerah'}`,
    image: `https://source.unsplash.com/random/400x300?${slug},charity,donation&${i}`,
    progress: Math.floor(Math.random() * 100) + 1,
    amountRaised: Math.floor(Math.random() * 100000000) + 1000000,
    target: Math.floor(Math.random() * 200000000) + 10000000,
    daysLeft: Math.floor(Math.random() * 30) + 1,
    category: categoryNames[slug as keyof typeof categoryNames] || 'Kemanusiaan',
    organizer: `Organisasi ${String.fromCharCode(65 + (i % 5))}`,
    location: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar'][i % 5],
  }));

  return {
    props: {
      category: categoryNames[slug as keyof typeof categoryNames] || 'Kemanusiaan',
      donations: mockDonations,
      total: 124, // Mock total count
      page,
    },
  };
};

const categoryNames: { [key: string]: string } = {
  kesehatan: 'Kesehatan',
  pendidikan: 'Pendidikan',
  bencana: 'Bencana Alam',
  sosial: 'Sosial',
  zakat: 'Zakat',
};

export default CategoryPage;
