import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { StarknetProvider } from "@/components/starknet-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          
          {children}
        </body>
      </StarknetProvider>
    </html>
  );
}
