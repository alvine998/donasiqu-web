import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';

interface DonationData {
  campaignId: string;
  campaignTitle: string;
  amount: number;
  name: string;
  isAnonymous: boolean;
  message?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated } = useAuth();
  const [donation, setDonation] = useState<DonationData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // Mock payment methods - in a real app, these would come from your API
  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: 'gopay',
      name: 'Gopay',
      image: '/images/payment/gopay.png',
      description: 'Bayar menggunakan saldo atau kartu Gopay'
    },
    {
      id: 'dana',
      name: 'DANA',
      image: '/images/payment/dana.png',
      description: 'Bayar menggunakan saldo DANA'
    },
    {
      id: 'bca',
      name: 'BCA Virtual Account',
      image: '/images/payment/bca.png',
      description: 'Transfer ke Virtual Account BCA'
    },
    {
      id: 'mandiri',
      name: 'Mandiri Virtual Account',
      image: '/images/payment/mandiri.png',
      description: 'Transfer ke Virtual Account Mandiri'
    },
    {
      id: 'bni',
      name: 'BNI Virtual Account',
      image: '/images/payment/bni.png',
      description: 'Transfer ke Virtual Account BNI'
    }
  ];

  useEffect(() => {
    if (id) {
      // Get donation data from URL query parameters
      const { amount, name, email, message, isAnonymous } = router.query;
      
      // In a real app, you would fetch the campaign details from your API
      const mockDonation: DonationData = {
        campaignId: id as string,
        campaignTitle: 'Bantu Pendidikan Anak Yatim Piatu', // In a real app, fetch this from API
        amount: amount ? Number(amount) : 100000, // Use amount from URL or default to 100000
        name: name as string || 'Donatur',
        isAnonymous: isAnonymous === 'true',
        message: message as string
      };
      
      setDonation(mockDonation);
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }
  }, [id, router.query]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Silakan pilih metode pembayaran');
      return;
    }

    setProcessing(true);
    
    try {
      // In a real app, you would process the payment here
      console.log('Processing payment with method:', selectedMethod);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success('Pembayaran berhasil diproses!');
      
      // Redirect based on authentication status
      if (isAuthenticated) {
        router.push('/riwayat');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Pembayaran gagal. Silakan coba lagi.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Data donasi tidak ditemukan</h1>
        <Link href="/" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const totalAmount = donation.amount;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Pembayaran Donasi | Donasiqu</title>
        <meta name="description" content="Lanjutkan pembayaran donasi Anda" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran Donasi</h1>
          <p className="text-gray-600">Pilih metode pembayaran yang Anda inginkan</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Ringkasan Donasi</h2>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Campaign Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Detail Kampanye</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Kampanye</p>
                    <p className="font-medium">{donation.campaignTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nominal Donasi</p>
                    <p className="font-medium">{formatCurrency(donation.amount)}</p>
                  </div>
                  {donation.message && (
                    <div>
                      <p className="text-sm text-gray-500">Pesan</p>
                      <p className="font-medium">{donation.message}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Rincian Pembayaran</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominal Donasi</span>
                    <span>{formatCurrency(donation.amount)}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total Bayar</span>
                    <span className="text-green-600">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Pilih Metode Pembayaran</h2>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethod === method.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-white p-1 border border-gray-200">
                    <img 
                      src={method.image} 
                      alt={method.name} 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                  <div className="ml-4">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link 
            href={`/donasi/${donation.campaignId}`}
            className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-center"
          >
            Kembali
          </Link>
          <button
            type="button"
            onClick={handlePayment}
            disabled={!selectedMethod || processing}
            className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              selectedMethod && !processing
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {processing ? 'Memproses...' : 'Bayar Sekarang'}
          </button>
        </div>

        {/* Payment Security Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">Aman & Terenkripsi</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">Bantuan 24/7</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Pembayaran Anda aman dan dilindungi dengan teknologi enkripsi terbaru
          </p>
        </div>
      </div>
    </div>
  );
}
