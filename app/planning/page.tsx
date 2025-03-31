"use client"
import { SiteHeader } from '@/components/site-header'
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

type Match = {
    id: string;
    creator: string;
    opponent: string;
    date: string;
    heure: string;
    boost: boolean;
    number: string;
    agency: string;
    description: string;
};

export default function PlanningPage() {
    const supabase = createClient();
    const [matchOfficiel, setMatchOfficiel] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchMatchOfficiel = async () => {
            const { data, error } = await supabase
                .from('match_officiel')
                .select('*')
                .gt('date', new Date().toISOString())
                .order('date', { ascending: true })
                .limit(4);

            if (error) {
                setError(error.message);
            } else {
                setMatchOfficiel(data || []);
            }
        };
        fetchMatchOfficiel();
    }, [supabase]);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserAndMatches = async () => {
            try {
                // Vérifier l'utilisateur connecté
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError) throw new Error(userError.message);

                // Récupérer le rôle de l'utilisateur dans la db 'user_role' avec l'id de l'user
                const { data: roleData, error: roleError } = await supabase.from('user_roles').select('role').eq('user_id', userData.user?.id);
                if (roleError) throw new Error(roleError.message);

                // Vérifier si l'utilisateur est admin (ajuste selon ton système d'authentification)
                setIsAdmin(roleData[0].role === "admin");

                const now = new Date();
                const firstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
                const lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 1).toISOString();
                // Récupérer les matchs
                const { data: matches, error: matchError } = await supabase
                    .from("match_officiel")
                    .select("*")
                    .gte("date", firstDay)
                    .lt("date", lastDay)
                    .order("date", { ascending: true })
                    .limit(4);
                if (matchError) throw new Error(matchError.message);

                setMatchOfficiel(matches || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndMatches();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <>
            <SiteHeader title="Planning des prochains mois" />
            <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-col gap-4">
                    {error && <p className="text-red-500">{error}</p>}

                    {matchOfficiel.length > 0 ? (
                        matchOfficiel.map((match) => {
                            const formattedDate = new Date(match.date).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            });
                            const formattedTime = match.heure.slice(0, 2) + "h" + match.heure.slice(3, 5);

                            return (
                                <Card key={match.id} className="shadow-lg p-4">
                                    <CardHeader className="font-bold flex items-center gap-2">
                                        <Badge>{formattedDate} à {formattedTime}</Badge>
                                        <span>{match.creator} vs {match.opponent}</span>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Nombre :</strong> {match.number} K</p>
                                        <p><strong>Boost :</strong> {match.boost ? "Oui" : "Non"}</p>
                                        {isAdmin && (
                                            <p><strong>Agence :</strong> {match.agency}</p>
                                        )}
                                        <p><strong>Description :</strong> {match.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">Aucun match officiel trouvé.</p>
                    )}
                </div>
            </div>
        </>
    );
}
