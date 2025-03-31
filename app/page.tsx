"use client";

import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader title={'Page d\'accueil'} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <h1 className="text-7xl font-extrabold text-red-700 drop-shadow-lg animate-bounce">
          The Demon Agency
        </h1>
        <p className="text-2xl mt-4 text-center max-w-lg tracking-wide">
          Du contenu <span className="text-red-700 font-semibold">enflammé</span>, une audience possédée !
        </p>
      </div>
    </>
  );
}
