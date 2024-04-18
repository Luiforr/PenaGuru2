import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Metadata } from "next";
import Header from "./components/Navbar/Header";
import Footer from "./components/Navbar/Footer";
const inter = Inter({ subsets: ["latin"] });
import BottomNavigation from "./components/Mobile/BotNav";
import AuthUser from "./middleware/user"
export const metadata = {
  metadataBase: new URL('https://penaguru-re.vercel.app/'),
  title: {
    default: 'PENAGURU SMKN7 BALEENDAH',
    template: `%s - https://penaguru-re.vercel.app/`,
  },
  description: 'Sebuah Website Presensi SMKN7 Untuk Guru Supaya Pendataan Lebih Mudah Dan Praktis',
  keywords: [
    'SMKN7 Baleendah', 'SMKN7 BE', 'SMKN7 PenaGuru', 'PenaGuru SMKN7 Baleendah', 'PenaGuru', 'PenaGuruRE', 'PEGU SMKN7', 'Presensi SMKN7 Baleendah', 'Absensi Guru SMKN7 Baleendah', 'Pena Guru', 'Guru Pena'
  ],
  authors: [
    {
      name: "Rizki Rofiul Muttakin",
      url: "https://penaguru-re.vercel.app/",
    }
  ],
  creator: 'Adlin Qaidul Jaisy, Nabhan Alzam Faturrohman, Muhammad Aqil Fatahillah',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: 'https://penaguru-re.vercel.app/',
    title: 'PenaGuru - https://penaguru-re.vercel.app/',
    description: 'Sebuah Website Presensi SMKN7 Untuk Guru Supaya Pendataan Lebih Mudah Dan Praktis',
    siteName: 'https://penaguru-re.vercel.app/',
  },
  twitter: {
    card: "summary_large_image",
    title: 'PenaGuru - https://penaguru-re.vercel.app/',
    description: 'Sebuah Website Presensi SMKN7 Untuk Guru Supaya Pendataan Lebih Mudah Dan Praktis',
    images: '${siteUrl}/og.jpg',
    creator: '@@nothing',
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {/* <AuthUser> */}

          {children}
          {/* </AuthUser> */}
          <Footer/>
          {/* <BottomNavigation className="pb-16"/> */}
        </Providers>
      </body>
    </html>
  );
}
