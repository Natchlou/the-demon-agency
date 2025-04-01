"use client";

import { useEffect, useState } from "react";
import AddMatchModal from "@/components/add-match";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DataTableDemo } from "@/components/list-match";

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

export default function Dashboard() {
    const supabase = createClient();
    const [matchOfficiel, setMatchOfficiel] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
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
    }, [selectedMonth]);

    return (
        <>
            <SiteHeader title="Match officiel de l'agence" />
            <div className="flex flex-1 flex-col">
                <div className="p-4 space-y-3">
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
                    ) : error ? (
                        <div className="text-red-500">Erreur : {error}</div>
                    ) : matchOfficiel.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">Aucun match trouvé pour ce mois.</div>
                    ) : (
                        <DataTableDemo data={matchOfficiel} isAdmin={isAdmin} />
                    )}

                </div>
            </div>
        </>
    );
}