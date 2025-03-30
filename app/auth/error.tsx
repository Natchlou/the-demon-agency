"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const router = useRouter();

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center" >
                <h2 className="text-2xl font-bold" > Une erreur est survenue </h2>
                <p className="mt-4 text-gray-600" >
                    {error.message || "Une erreur inattendue s'est produite"}
                </p>
                < div className="mt-6 flex gap-4" >
                    <button
                        onClick={() => reset()}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Réessayer
                    </button>
                    < button
                        onClick={() => router.push("/")
                        }
                        className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </>
    );
}
