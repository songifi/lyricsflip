
export default function NotFound() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-primary-main text-white">
      {/* Left Content */}
      <div className="flex flex-col items-center justify-center px-6 text-center lg:text-left">
        <header className="mb-4">
          <a href="#" className="inline-block">
            <span className="sr-only">Lyrics Flip</span>
          </a>
        </header>
        <p className="text-base text-6xl font-semibold text-white">404</p>
        <h1 className="mt-4 text-2xl font-bold text-center tracking-tight sm:text-4xl">
        🎤 Oops: This page forgot the lyrics!
        </h1>
        <div className="mt-12">
          <a href="/" className="text-base font-medium text-white hover:underline">
            <span aria-hidden="true">&larr;</span> Back to home
          </a>
        </div>
        {/* <footer className="mt-10 w-full max-w-7xl border-t border-gray-700 py-6 text-center lg:text-left">
          <nav className="flex justify-center lg:justify-start gap-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Contact support</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">Status</a>
          </nav>
        </footer> */}
      </div>
      {/* Right Image */}
      <div className="relative hidden lg:block">
        <img
          alt="Music Background"
          src="https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
