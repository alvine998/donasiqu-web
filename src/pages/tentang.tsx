import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';

const TentangKami = () => {
  return (
    <Layout title="Tentang Kami - Donasiqu">

      {/* Hero Section */}
      <div className="bg-violet-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Tentang Donasiqu</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Menghubungkan para dermawan dengan mereka yang membutuhkan bantuan
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Siapa Kami?</h2>
            <p className="text-gray-600 mb-6">
              Donasiqu adalah platform donasi online yang didirikan dengan misi untuk memudahkan siapapun yang ingin berbuat baik. 
              Kami percaya bahwa setiap orang memiliki kemampuan untuk membantu sesama, dan teknologi dapat menjadi jembatan 
              yang menghubungkan niat baik dengan mereka yang membutuhkan.
            </p>
            <p className="text-gray-600 mb-6">
              Sejak didirikan pada tahun 2023, Donasiqu telah membantu ribuan penggalangan dana untuk berbagai keperluan, 
              mulai dari bantuan bencana alam, pendidikan, kesehatan, hingga pemberdayaan masyarakat.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/images/about-hero.jpg" 
              alt="Tentang Kami" 
              width={600} 
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Visi & Misi Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kemitraan</h3>
              <p className="text-gray-600">Membangun kemitraan yang kuat antara donatur dan penerima manfaat</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparansi</h3>
              <p className="text-gray-600">Menjaga transparansi dalam setiap donasi yang terkumpul</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dampak Nyata</h3>
              <p className="text-gray-600">Menciptakan dampak sosial yang berkelanjutan</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tim Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Doe', role: 'Founder & CEO', image: '/images/team-1.jpg' },
              { name: 'Jane Smith', role: 'CTO', image: '/images/team-2.jpg' },
              { name: 'Michael Johnson', role: 'Head of Operations', image: '/images/team-3.jpg' },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-200 relative">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-violet-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-violet-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Mari Berkolaborasi</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan kami dalam menciptakan perubahan positif di masyarakat
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/galang-dana" 
              className="px-8 py-3 bg-white text-violet-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Mulai Galang Dana
            </a>
            <a 
              href="/kontak" 
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TentangKami;
