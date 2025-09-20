import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DonationCardProps {
  donation: {
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
  };
}

const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(donation.image);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Fallback to a placeholder image from a more reliable source
      setImageSrc(`/images/placeholder-${donation.id % 5 + 1}.jpg`);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={imageError ? `/images/placeholder-${donation.id % 5 + 1}.jpg` : imageSrc}
          alt={donation.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
          priority={false}
          unoptimized={imageError} // Only use unoptimized for fallback images
        />
        <span className="absolute top-2 right-2 bg-secondary-100 text-secondary-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {donation.category}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 h-14">
              <Link href={`/campaign/${donation.id}`} className="hover:text-primary-600">
                {donation.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-3">Oleh {donation.organizer}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {donation.location}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
          {donation.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Terkumpul</span>
            <span className="font-medium">{formatCurrency(donation.amountRaised)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${Math.min(100, donation.progress)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{donation.progress}% tercapai</span>
            <span>Target {formatCurrency(donation.target)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-500">{donation.daysLeft} hari lagi</span>
          </div>
          <Link 
            href={`/campaign/${donation.id}/donate`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Donasi Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
