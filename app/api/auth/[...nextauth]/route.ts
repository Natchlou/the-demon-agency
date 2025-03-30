import NextAuth, { NextAuthOptions, User, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import { JWT } from "next-auth/jwt";

// Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

// Étendre le type de session de NextAuth pour ajouter le rôle
interface CustomSession extends DefaultSession {
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
        role: string;
    };
}

// Étendre le type JWT de NextAuth pour ajouter le rôle
interface CustomJWT extends JWT {
    id: string;
    role: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Supabase",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials;

                // 🔐 Authentification avec Supabase
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                if (error || !data?.user) {
                    console.error("❌ Échec de connexion :", error?.message);
                    return null;
                }

                console.log("✅ Utilisateur connecté :", data.user.email);

                // 🎭 Récupération du rôle de l'utilisateur
                const { data: userData, error: roleError } = await supabase
                    .from("user_roles")
                    .select("role")
                    .eq("user_id", data.user.id)
                    .single();

                if (roleError || !userData?.role) {
                    console.warn("⚠️ Aucun rôle trouvé, attribution du rôle 'user' par défaut.");
                }

                return {
                    id: data.user.id,
                    name: data.user.email,
                    email: data.user.email,
                    role: userData?.role ?? "user", // Ajout du rôle par défaut si aucun rôle n'est trouvé
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: CustomJWT, user: User | undefined }) {
            if (user) {
                token.id = user.id!;
                token.role = user.role!;
            }
            return token;
        },
        async session({ session, token }: { session: CustomSession, token: CustomJWT }) {
            if (session.user) {
                session.user = {
                    id: token.id,
                    name: session.user.name!,
                    email: session.user.email!,
                    image: session.user.image,
                    role: token.role,
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
