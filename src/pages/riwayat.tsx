import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

interface Donation {
  id: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

export default function HistoryPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('Silakan login untuk melihat riwayat donasi');
      router.push('/login');
      return;
    }

    // In a real app, you would fetch the donation history from your API
    const fetchDonations = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockDonations: Donation[] = [
          {
            id: '1',
            campaignId: '1',
            campaignTitle: 'Bantu Pendidikan Anak Yatim Piatu',
            amount: 100000,
            date: '20 September 2025',
            status: 'success'
          },
          {
            id: '2',
            campaignId: '2',
            campaignTitle: 'Bantuan Korban Bencana Alam',
            amount: 250000,
            date: '15 September 2025',
            status: 'success'
          },
          {
            id: '3',
            campaignId: '3',
            campaignTitle: 'Pembangunan Masjid',
            amount: 500000,
            date: '10 September 2025',
            status: 'pending'
          }
        ];
        
        setDonations(mockDonations);
      } catch (error) {
        console.error('Failed to fetch donations:', error);
        toast.error('Gagal memuat riwayat donasi');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [isAuthenticated, router]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      success: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };

    const statusText = {
      success: 'Berhasil',
      pending: 'Menunggu',
      failed: 'Gagal'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Riwayat Donasi | Donasiqu</title>
        <meta name="description" content="Riwayat donasi Anda" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Donasi</h1>
          <p className="text-gray-600">Lihat riwayat donasi Anda</p>
        </div>

        {donations.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <p className="text-gray-500">Anda belum memiliki riwayat donasi</p>
            <Link 
              href="/" 
              className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Donasi Sekarang
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kampanye
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <Link href={`/campaign/${donation.campaignId}`} className="text-green-600 hover:text-green-500">
                            {donation.campaignTitle}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(donation.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {getStatusBadge(donation.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
