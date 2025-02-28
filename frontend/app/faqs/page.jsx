"use client";

import { Accordion } from "@/components/faqs/Accordion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Faqs = () => {
    return (
        <div className="bg-gradient-to-t from-primary-main to-[#040311]">
            <Header />
            <div className="py-24 sm:py-32">
                <h1 className="text-white text-center text-4xl font-bold mb-8 mt-4">Frequently Asked Questions</h1>
                <Accordion />
            </div>
            <Footer />
        </div>
    )
}
export default Faqs
