import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import localFont from "next/font/local";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Toaster } from "react-hot-toast";

export const mayabotiFont = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Hero Kidz | Premium Educational Toys for Kids",
    template: "%s | Hero Kidz",
  },
  description:
    "Discover Hero Kidz, the ultimate destination for premium educational toys, fun learning tools, and high-quality kids' products in Bangladesh.",
  keywords: [
    "Educational toys",
    "Hero Kidz",
    "Kids shop Bangladesh",
    "Learning toys",
    "Children toys online",
  ],
  authors: [{ name: "Hero Kidz Team" }],
  openGraph: {
    title: "Hero Kidz | Premium Educational Toys",
    description:
      "Shop the best educational and fun toys for your little heroes.",
    url: "https://hero-kidz-bay.vercel.app/", // Replace with your actual domain
    siteName: "Hero Kidz",
    images: [
      {
        url: "https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80", // Put a high-quality logo/banner in your public folder
        width: 1200,
        height: 630,
        alt: "Hero Kidz Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz | Premium Educational Toys",
    description: "Empowering kids through play and education.",
    images: [
      "https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${poppins.className} antialiased`}>
        <NextAuthProvider>
          <header className="max-w-11/12 mx-auto py-2">
            <Navbar />
          </header>
          <main className="max-w-11/12 mx-auto py-2 min-h-[calc(100vh-302px)]">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        <Toaster/>
    </NextAuthProvider>
        </body>
      </html>
  );
}
