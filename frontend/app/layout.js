import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { StarknetProvider } from "@/components/starknet-provider";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});
const p22Mackinac = localFont({
  src: "../fonts/P22MackinacPro-MedItalic_18.otf",
  display: "swap",
  variable: "--font-p22mackinac",
});
export const metadata = {
  title: "LyricFlip",
  description:
    "Play LyricFlip, the on-chain card game powered by Starknet! Guess songs from partial lyrics, explore genres & decades, wager tokens, and relive music nostalgia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StarknetProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${p22Mackinac.variable} antialiased`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </StarknetProvider>
    </html>
  )
};
