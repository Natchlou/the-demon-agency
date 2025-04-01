"use client";
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

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
    const [loading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);

    useEffect(() => {
        const fetchUserAndMatches = async () => {
            setLoading(true);
            try {
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError) throw new Error(userError.message);

                const { data: roleData, error: roleError } = await supabase
                    .from('user_roles')
                    .select('role')
                    .eq('user_id', userData.user?.id);
                if (roleError) throw new Error(roleError.message);

                let userRole = roleData.length > 0 ? roleData[0].role : "user";
                if (roleData.length === 0) {
                    await supabase.from("user_roles").insert([{ user_id: userData.user?.id, role: "user" }]);
                }

                setIsAdmin(userRole === "admin");

                const now = new Date();
                const firstDay = new Date(now.getFullYear(), months.indexOf(selectedMonth), 1).toISOString();
                const lastDay = new Date(now.getFullYear(), months.indexOf(selectedMonth) + 1, 1).toISOString();

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
    }, [selectedMonth]);

    return (
        <>
            <SiteHeader title="Planning des prochains mois" />
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-4">
                    <Select value={selectedMonth} onValueChange={(value) => setSelectedMonth(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sélectionner un mois :" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Mois</SelectLabel>
                                {months.map((month, index) => (
                                    <SelectItem key={index} value={month}>{month}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="ml-2">Chargement...</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {error && <p className="text-red-500">Erreur : {error}</p>}
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
                )}
            </div>
        </>
    );
}