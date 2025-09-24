import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';

interface Campaign {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  progress: number;
  amountRaised: number;
  target: number;
  daysLeft: number;
  category: string;
  organizer: string;
  location: string;
  organizerImage: string;
  organizerDescription: string;
  gallery: string[];
}

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    title: "Wakaf Mushaf Al-Qur`an",
    description: "Masih banyak saudara-saudara kita di pelosok negeri yang kesulitan mendapatkan mushaf Al-Qur'an.",
    fullDescription: `Program wakaf mushaf Al-Qur'an ini bertujuan untuk menyediakan mushaf Al-Qur'an yang layak bagi masyarakat di pelosok negeri. Dana yang terkumpul akan digunakan untuk:
    
- Mencetak mushaf Al-Qur'an berkualitas
- Distribusi ke daerah-daerah terpencil
- Pembangunan rak atau tempat penyimpanan mushaf
- Program tahfiz dan pengajaran baca tulis Al-Qur'an

Dengan wakaf Anda, kita bisa membantu saudara-saudara kita yang membutuhkan untuk bisa membaca dan mempelajari Al-Qur'an dengan baik. Setiap rupiah yang Anda donasikan sangat berarti untuk mewujudkan program ini.`,
    image: "/images/campaign-1.jpeg",
    progress: 2,
    amountRaised: 1000000,
    target: 50000000,
    daysLeft: 90,
    category: "Wakaf",
    organizer: "Lembaga Wakaf Al-Qur'an Nusantara",
    location: "Jakarta",
    organizerImage: "/images/organizer-1.jpg",
    organizerDescription: "Lembaga Wakaf Al-Qur'an Nusantara telah berkiprah selama 5 tahun dalam mendistribusikan mushaf Al-Qur'an ke berbagai pelosok negeri. Kami berkomitmen untuk memastikan setiap muslim memiliki akses terhadap Al-Qur'an.",
    gallery: [
      "/images/campaign-1.jpeg",
      "/images/campaign-2.jpeg",
      "/images/campaign-3.jpeg"
    ]
  },
  {
    id: 2,
    title: "Donasi Pembangunan Rumah Allah",
    description: "Alhamdulillah, di tengah semangat kebersamaan warga Kampung Citajung RT 001 RW 001, Desa Mekarjaya, Kecamatan Banjaran",
    fullDescription: `Program pembangunan masjid ini merupakan inisiatif warga Kampung Citajung yang membutuhkan tempat ibadah yang layak. Dana yang terkumpul akan digunakan untuk:
    
- Pembangunan struktur utama masjid
- Pembelian material bangunan
- Perlengkapan shalat dan sound system
- Pengerjaan lantai dan atap
- Pengecatan dan dekorasi

Dengan bantuan Anda, kita bisa mewujudkan rumah Allah yang layak untuk beribadah dan kegiatan keagamaan masyarakat setempat. Setiap donasi yang Anda berikan adalah amal jariyah yang pahalanya akan terus mengalir.`,
    image: "/images/campaign-2.jpeg",
    progress: 2,
    amountRaised: 8500000,
    target: 368339400,
    daysLeft: 90,
    category: "Wakaf",
    organizer: "DKM Al-Ikhlas Kampung Citajung",
    location: "Banjaran, Jawa Barat",
    organizerImage: "/images/organizer-2.jpg",
    organizerDescription: "DKM Al-Ikhlas adalah pengurus masjid yang bertanggung jawab atas pembangunan dan pengelolaan masjid di Kampung Citajung. Kami berkomitmen untuk membangun tempat ibadah yang nyaman dan representatif.",
    gallery: [
      "/images/campaign-2.jpeg",
      "/images/campaign-1.jpeg",
      "/images/campaign-3.jpeg"
    ]
  },
  {
    id: 3,
    title: "Bantuan Bencana Alam",
    description: "Indonesia adalah negeri dengan sejuta pesona, namun juga negeri yang penuh ujian. Dari Sabang hingga Merauke, bencana alam datang silih berganti",
    fullDescription: `Program bantuan bencana alam ini bertujuan untuk memberikan dukungan kepada korban bencana di berbagai wilayah di Indonesia. Bantuan yang akan diberikan meliputi:
    
- Paket sembako dan makanan siap saji
- Pakaian layak pakai
- Obat-obatan dan perlengkapan P3K
- Tenda pengungsian dan perlengkapan darurat
- Air bersih dan sanitasi

Dengan bantuan Anda, kita bisa meringankan beban saudara-saudara kita yang menjadi korban bencana. Setiap bantuan yang Anda berikan sangat berarti untuk pemulihan mereka.`,
    image: "/images/campaign-3.jpeg",
    progress: 5,
    amountRaised: 2250000,
    target: 50000000,
    daysLeft: 90,
    category: "Bencana",
    organizer: "Dompet Dhuafa",
    location: "Seluruh Indonesia",
    organizerImage: "/images/organizer-3.jpg",
    organizerDescription: "Dompet Dhuafa adalah lembaga filantropi Islam yang berkomitmen untuk memberikan bantuan kemanusiaan, khususnya untuk korban bencana alam. Kami telah berpengalaman menangani penanggulangan bencana di berbagai wilayah di Indonesia.",
    gallery: [
      "/images/campaign-3.jpeg",
      "/images/campaign-1.jpeg",
      "/images/campaign-2.jpeg"
    ]
  }
];

const CampaignDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [activeTab, setActiveTab] = useState('deskripsi');

  useEffect(() => {
    if (id) {
      try {
        const campaignId = Number(id);
        const foundCampaign = mockCampaigns.find(camp => camp.id === campaignId);
        
        if (foundCampaign) {
          setCampaign(foundCampaign as unknown as Campaign);
        } else {
          // If campaign not found, redirect to 404 or home
          router.push('/');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setLoading(false);
        router.push('/');
      }
    }
  }, [id, router]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (donationAmount && donationAmount > 0) {
      // In a real app, handle donation submission
      alert(`Terima kasih telah berdonasi sebesar ${formatCurrency(Number(donationAmount))}`);
      setDonationAmount('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Kampanye tidak ditemukan</h1>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{campaign.title} | Donasiqu</title>
        <meta name="description" content={campaign.description} />
      </Head>

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-96 w-full">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-xl">{campaign.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Progress Bar */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(campaign.amountRaised)}</h3>
                  <span className="text-gray-500">Terkumpul dari {formatCurrency(campaign.target)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-green-600 h-3 rounded-full" 
                    style={{ width: `${Math.min(100, campaign.progress)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{campaign.progress}% tercapai</span>
                  <span>{campaign.daysLeft} hari lagi</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('deskripsi')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'deskripsi'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Deskripsi
                  </button>
                  <button
                    onClick={() => setActiveTab('galeri')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'galeri'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Galeri
                  </button>
                  <button
                    onClick={() => setActiveTab('donatur')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'donatur'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Donatur
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === 'deskripsi' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Kampanye</h2>
                    <div className="whitespace-pre-line text-gray-700">
                      {campaign.fullDescription}
                    </div>
                  </div>
                )}

                {activeTab === 'galeri' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaign.gallery.map((image, index) => (
                      <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Galeri ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'donatur' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Daftar Donatur</h2>
                    <p className="text-gray-600">Menampilkan daftar donatur yang telah berpartisipasi dalam kampanye ini.</p>
                    {/* Add donor list component here */}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Donation Form */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Bantu Kampanye Ini</h3>
                <form onSubmit={handleDonate}>
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Donasi (Rp)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rp</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                        placeholder="0"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(Number(e.target.value) || '')}
                        min="1000"
                        step="1000"
                        required
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[50000, 100000, 250000].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setDonationAmount(amount)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          {formatCurrency(amount).replace('Rp', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href={{
                      pathname: `/donasi/${campaign.id}`,
                      query: { amount: donationAmount || '' }
                    }}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Donasi Sekarang
                  </Link>
                </form>
              </div>

              {/* Organizer Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Diselenggarakan Oleh</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={campaign.organizerImage}
                      alt={campaign.organizer}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.organizer}</h4>
                    <p className="text-sm text-gray-500">{campaign.location}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{campaign.organizerDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail;
