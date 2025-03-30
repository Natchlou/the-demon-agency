import { createClient } from '@/utils/supabase/';
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                const supabase = createClient();
                const { data: userData, error: roleError } = await supabase
                    .from("user_roles")
                    .select("role")
                    .eq("user_id", token.sub)
                    .single();

                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: userData?.role || 'user'
                    }
                };
            }
            return session;
        },
    },
};
