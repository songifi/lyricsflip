import Sidebar from "@/components/contributors/sidenav";
import Head from "@/components/contributors/Head";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex overflow-y-auto">
      <div className="hidden md:block md:w-[384px] bg-[#490878]">
        <Sidebar />
      </div>

      <main className="flex-1 bg-gray-100 overflow-y-auto">
        <Head />
        {children}
      </main>
    </div>
  );
}
