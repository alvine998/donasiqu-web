import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Donasiqu - Platform Donasi Online' }: LayoutProps) {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Platform donasi online untuk berbagai kebutuhan sosial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-violet-700">
                Donasiqu
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link 
                  href="/" 
                  className={`${isActive('/') ? 'text-violet-700 border-b-2 border-violet-700' : 'text-gray-700 hover:text-violet-700'} px-3 py-2 text-sm font-medium`}
                >
                  Beranda
                </Link>
                <Link 
                  href="/galang-dana" 
                  className={`${isActive('/galang-dana') ? 'text-violet-700 border-b-2 border-violet-700' : 'text-gray-700 hover:text-violet-700'} px-3 py-2 text-sm font-medium`}
                >
                  Galang Dana
                </Link>
                <Link 
                  href="/tentang" 
                  className={`${isActive('/tentang') ? 'text-violet-700 border-b-2 border-violet-700' : 'text-gray-700 hover:text-violet-700'} px-3 py-2 text-sm font-medium`}
                >
                  Tentang Kami
                </Link>
                <Link 
                  href="/kontak" 
                  className={`${isActive('/kontak') ? 'text-violet-700 border-b-2 border-violet-700' : 'text-gray-700 hover:text-violet-700'} px-3 py-2 text-sm font-medium`}
                >
                  Kontak
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/masuk" className="text-gray-700 hover:text-violet-700 px-3 py-2 rounded-md text-sm font-medium">
                Masuk
              </Link>
              <Link href="/daftar" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-violet-700 hover:bg-violet-800">
                Daftar
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Donasiqu</h3>
              <p className="mt-4 text-sm text-gray-500">Platform donasi online terpercaya untuk berbagai kebutuhan sosial dan kemanusiaan.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Tentang</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/tentang" className="text-sm text-gray-600 hover:text-violet-700">Tentang Kami</Link></li>
                <li><Link href="/cara-berdonasi" className="text-sm text-gray-600 hover:text-violet-700">Cara Berdonasi</Link></li>
                <li><Link href="/cara-galang-dana" className="text-sm text-gray-600 hover:text-violet-700">Cara Galang Dana</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Bantuan</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/faq" className="text-sm text-gray-600 hover:text-violet-700">FAQ</Link></li>
                <li><Link href="/syarat-ketentuan" className="text-sm text-gray-600 hover:text-violet-700">Syarat & Ketentuan</Link></li>
                <li><Link href="/kebijakan-privasi" className="text-sm text-gray-600 hover:text-violet-700">Kebijakan Privasi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Hubungi Kami</h4>
              <ul className="mt-4 space-y-2">
                <li className="text-sm text-gray-600">Email: info@donasiqu.com</li>
                <li className="text-sm text-gray-600">WhatsApp: +62 812-3456-7890</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 text-center">&copy; {new Date().getFullYear()} Donasiqu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
