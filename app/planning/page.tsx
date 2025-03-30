"use client"
import { SiteHeader } from '@/components/site-header'
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react'

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

    useEffect(() => {
        const fetchMatchOfficiel = async () => {
            const { data, error } = await supabase
                .from('match_officiel')
                .select('*')
                .gt('date', new Date().toISOString())
                .limit(4);

            if (error) {
                setError(error.message);
            } else {
                setMatchOfficiel(data || []);
            }
        };
        fetchMatchOfficiel();
    }, []);

    return (
        <>
            <SiteHeader title="Planning des prochains mois" />
            <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-col gap-4">
                    {error && <p className="text-red-500">{error}</p>}

                    {matchOfficiel.length > 0 ? (
                        matchOfficiel.map((match) => {
                            const formattedDate = new Date(match.date).toLocaleDateString('fr-FR');
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
                                        <p><strong>Agence :</strong> {match.agency}</p>
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
