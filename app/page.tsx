import LandingPage from "./src/LandingPageComponents/LandingPage";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen bg-cover bg-center bg-no-repeat items-center justify-center" style={{ backgroundImage: `url(/2Q.png)` }}>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-white/50 sm:items-start">

        <LandingPage />
      </main>
    </div>
  );
}
