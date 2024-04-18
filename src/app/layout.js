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
3  title: {
4    default: 'https://penaguru-re.vercel.app/',
5    template: `$%s - https://penaguru-re.vercel.app/`,
6  },
7  description: 'Sebuah Website Presensi SMKN7 Untuk Guru Supaya Pendataan Lebih Mudah Dan Praktis',
8  keywords: [
9    'SMKN7 Baleendah', 'SMKN7 BE', 'SMKN7 PenaGuru', 'PenaGuru SMKN7 Baleendah', 'PenaGuru', 'PenaGuruRE', 'PEGU SMKN7', 'Presensi SMKN7 Baleendah', 'Absensi Guru SMKN7 Baleendah', 'Pena Guru', 'Guru Pena'
10  ],
11  authors: [
12    
13      {
14        name: "Rizki Rofiul Muttakin",
15        url: "https://penaguru-re.vercel.app/",
16      }
17    
18  ],
19  creator: 'Adlin Qaidul Jaisy, Nabhan Alzam Faturrohman, Muhammad Aqil Fatahillah',
20  themeColor: [
21    { media: "(prefers-color-scheme: light)", color: "white" },
22    { media: "(prefers-color-scheme: dark)", color: "black" },
23  ],
24  openGraph: {
25    type: "website",
26    locale: "en_US",
27    url: 'https://penaguru-re.vercel.app/',
28    title: 'https://penaguru-re.vercel.app/',
29    description: 'Sebuah Website Presensi SMKN7 Untuk Guru Supaya Pendataan Lebih Mudah Dan Praktis',
30    siteName: 'https://penaguru-re.vercel.app/',
31  },
32  twitter: {
33    card: "summary_large_image",
34    title: 'https://penaguru-re.vercel.app/',
35    description: 'Sebuah Website Presensi SMKN7 Untuk Guru Supaya Pendataan Lebih Mudah Dan Praktis',
36    images: '${siteUrl}/og.jpg',
37    creator: '@@nothing',
38  },
39  icons: {
40    icon: "/favicon.ico",
41  },
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
