"use client";
import React from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/terms-of-service/Hero";
import TermsOfService from "@/components/terms-of-service/Terms";

export default function Page() {
  return (
    <div className='bg-white'>
      <Hero />
      <TermsOfService />
      <Footer />
    </div>
  );
}
