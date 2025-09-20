import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  amountRaised: number;
  target: number;
  daysLeft: number;
  organizer: {
    name: string;
    avatar: string;
  };
}

export default function DonationPage() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Initialize as empty string
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [suggestedAmounts] = useState([50000, 100000, 200000, 500000]);

  useEffect(() => {
    if (id) {
      // In a real app, you would fetch the campaign data from your API
      const fetchCampaign = async () => {
        try {
          // This is a mock implementation - replace with actual API call
          const mockCampaign: Campaign = {
            id: id as string,
            title: 'Bantu Pendidikan Anak Yatim Piatu',
            description: 'Mari bantu anak-anak yatim piatu mendapatkan pendidikan yang layak untuk masa depan yang lebih baik.',
            image: '/images/campaign-placeholder.jpg',
            progress: 65,
            amountRaised: 6500000,
            target: 10000000,
            daysLeft: 15,
            organizer: {
              name: 'Yayasan Peduli Anak',
              avatar: '/images/avatar-placeholder.png'
            }
          };
          setCampaign(mockCampaign);
        } catch (error) {
          console.error('Error fetching campaign:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCampaign();
    }
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationAmount) {
      alert('Mohon masukkan nominal donasi');
      return;
    }

    // In a real app, you would save the donation data to your backend first
    // Then redirect to the payment page with the donation ID
    router.push({
      pathname: `/pembayaran/${id}`,
      query: {
        amount: donationAmount,
        name: isAnonymous ? 'Anonymous' : name,
        email: isAnonymous ? '' : email,
        message: message,
        isAnonymous: isAnonymous ? 'true' : 'false'
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Kampanye tidak ditemukan</h1>
        <Link href="/" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Donasi - {campaign.title} | Donasiqu</title>
        <meta name="description" content={`Donasi untuk ${campaign.title}`} />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lanjutkan Donasi</h1>
          <p className="text-gray-600">Lengkapi form di bawah ini untuk melanjutkan donasi Anda</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Ringkasan Donasi</h2>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Campaign Info */}
              <div className="md:w-1/2">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Kampanye</h3>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-16 w-16 rounded-md object-cover" 
                        src={campaign.image} 
                        alt={campaign.title} 
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                      <p className="text-sm text-gray-500">Oleh {campaign.organizer.name}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Jumlah Donasi</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {suggestedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount)}
                        className={`px-4 py-3 border rounded-md text-sm font-medium transition-colors ${
                          donationAmount === amount
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">Rp</span>
                    </div>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Number(e.target.value) || '')}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3 border"
                      placeholder="Masukkan nominal donasi"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">,00</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <input
                      id="anonymous"
                      name="anonymous"
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                      Sembunyikan nama saya (Hamba Allah)
                    </label>
                  </div>
                </div>
              </div>

              {/* Donor Info */}
              <div className="md:w-1/2 border-l border-gray-200 pl-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Diri</h3>
                
                <form onSubmit={handleDonation} className="space-y-4">
                  {!isAnonymous && (
                    <>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Nama lengkap"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="email@contoh.com"
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Pesan (Opsional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Tulis pesan dukungan Anda..."
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!donationAmount}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        donationAmount
                          ? 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      Lanjutkan Pembayaran
                    </button>
                    
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Dengan melanjutkan, Anda menyetujui{' '}
                      <a href="#" className="text-green-600 hover:text-green-500">Syarat & Ketentuan</a>{' '}
                      dan{' '}
                      <a href="#" className="text-green-600 hover:text-green-500">Kebijakan Privasi</a> kami.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            href={`/campaign/${id}`}
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            &larr; Kembali ke halaman kampanye
          </Link>
        </div>
      </div>
    </div>
  );
}
