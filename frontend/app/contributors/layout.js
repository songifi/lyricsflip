import Sidebar from "@/components/contributors/sidenav";
import Head from "@/components/contributors/Head";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex  h-[120vh]">
      <div className="hidden md:block md:w-[384px] bg-[#490878]">
        <Sidebar />
      </div>

      <main className="flex-1 bg-gray-100 ">
        <Head />
        {children}
      </main>
    </div>
  );
}
