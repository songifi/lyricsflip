import LeaderBoard from "@/components/LeaderBoard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="bg-white">
            <Header />
            <div className="p-20">
                <LeaderBoard />
            </div>
            <Footer />
        </div>
    );
}