import UserProfilePage from "@/components/user-profile/UserProfilePage";

export default function Profile() {
  return (
    <div className="w-full min-h-screen max-w-7xl flex flex-col gap-4 md:gap-6 px-[1rem] md:px-[2rem] mx-auto xl:px-[6.3rem] py-12 lg:py-20 bg-white">
      <h1 className="text-xl font-semibold font-inter">My Profile</h1>
      <UserProfilePage />
    </div>
  );
}
