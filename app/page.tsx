"use client"
import AddMatchModal from "@/components/add-match";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient();
  const [match_officiel, setMatchOfficiel] = useState<null | any[]>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchOfficiel = async () => {
      let { data, error } = await supabase
        .from('match_officiel')
        .select('*');
      if (error) {
        setError(error.message);
      } else {
        setMatchOfficiel(data || []);
      }
    };
    fetchMatchOfficiel();
  }, []);

  return (
    <div className="px-40 space-y-3">
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
            <TableHead>Agence</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {match_officiel && match_officiel.map((match: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{match.creator}</TableCell>
              <TableCell>{match.opponent}</TableCell>
              <TableCell>
                {new Date(match.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>
                {match.heure}
              </TableCell>
              <TableCell><Badge>{match.boost ? 'Oui' : 'Non'}</Badge></TableCell>
              <TableCell>{match.number} K</TableCell>
              <TableCell>{match.agency}</TableCell>
              <TableCell>{match.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
