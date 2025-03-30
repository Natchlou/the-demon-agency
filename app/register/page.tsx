import Image from 'next/image';
import { createClient } from '@/utils/supabase/index';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function LoginForm() {
    const signIn = async () => {
        'use server';

        // 1. Create a Supabase client
        const supabase = createClient();
        const origin = (await headers()).get('origin');
        // 2. Sign in with GitHub
        const { error, data } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            console.log(error);
        } else {
            return redirect(data.url);
        }
        // 3. Redirect to landing page
    };

    return (
        <form
            action={signIn}
            className="flex-1 flex min-h-screen justify-center items-center"
        >
            <button className="hover:bg-gray-800 p-8 rounded-xl">
                <Image
                    className="mx-auto mb-3"
                    src="/google.png"
                    width={100}
                    height={100}
                    alt="Google logo"
                />
                Se connecter avec Google
            </button>
        </form>
    );
}