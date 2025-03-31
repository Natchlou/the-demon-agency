"use client";

import { useEffect, useState } from "react";
import AddMatchModal from "@/components/add-match";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";

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

export default function Dashboard() {
    const supabase = createClient();
    const [matchOfficiel, setMatchOfficiel] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
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

                // Récupérer les matchs
                const now = new Date();
                const firstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
                const lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 1).toISOString();
                // Récupérer les matchs
                const { data: matches, error: matchError } = await supabase
                    .from("match_officiel")
                    .select("*")
                    .gte("date", firstDay)
                    .lt("date", lastDay)
                    .order("date", { ascending: true });
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
            <SiteHeader title="Match officiel de l'agence" />
            <div className="flex flex-1 flex-col">
                <div className="p-4 space-y-3">
                    <AddMatchModal />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Créateur</TableHead>
                                <TableHead>Adversaire</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Heure</TableHead>
                                <TableHead>Boost</TableHead>
                                <TableHead>Nombre</TableHead>
                                {isAdmin && <TableHead>Agence</TableHead>}
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {matchOfficiel.map((match) => (
                                <TableRow key={match.id}>
                                    <TableCell className="font-medium">{match.creator}</TableCell>
                                    <TableCell>{match.opponent}</TableCell>
                                    <TableCell>
                                        {new Date(match.date).toLocaleDateString("fr-FR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>{match.heure}</TableCell>
                                    <TableCell>
                                        <Badge>{match.boost ? "Oui" : "Non"}</Badge>
                                    </TableCell>
                                    <TableCell>{match.number} K</TableCell>
                                    {isAdmin && <TableCell>{match.agency}</TableCell>}
                                    <TableCell>{match.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
