"use client";

import { useState } from "react";
import { supabase } from "@/lib/auth";
import { signIn } from "next-auth/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) setError("Échec de la connexion");
    };

    return (
        <div className="max-w-sm mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-lg font-bold mb-4">Connexion</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Se connecter
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
}
