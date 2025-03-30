"use client"

import AddMatchModal from "@/components/add-match";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
    const [matchOfficiel, setMatchOfficiel] = useState<Match[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);  // Pour gérer l'état de chargement
    const { data: session } = useSession();

    useEffect(() => {
        const fetchMatchOfficiel = async () => {
            const { data, error } = await supabase.from("match_officiel").select("*");

            if (error) {
                setError(error.message);
            } else {
                setMatchOfficiel(data || []);
            }
            setLoading(false); // Set loading to false after data is fetched
        };
        fetchMatchOfficiel();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;  // Message de chargement
    }

    if (error) {
        return <div>Erreur: {error}</div>;  // Affichage d'erreur si nécessaire
    }

    // Vérifie si l'utilisateur est admin, sinon false par défaut
    const isAdmin = session?.user?.role === "admin";
    return (
        <>
            <SiteHeader title={"Match officiel de l'agence"} />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
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
                                {matchOfficiel?.map((match) => (
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
            </div>
        </>
    );
}
