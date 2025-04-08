import { supabase } from "@/utils/supabase/client";

const table = "match_officiel";

async function fetchMatchsByField(field: string, value: any): Promise<any[]> {
    const { data, error } = await supabase.from(table).select("*").eq(field, value);
    if (error) throw new Error(error.message);
    return data || [];
}

async function fetchMatchById(id: string): Promise<any | null> {
    const matchs = await fetchMatchsByField("id", id);
    return matchs[0] || null;
}

async function fetchMatchsByDate(date: Date): Promise<any[]> {
    return await fetchMatchsByField("date", date.toDateString());
}

async function fetchMatchsByCreator(creator: string): Promise<any[]> {
    return await fetchMatchsByField("creator", creator);
}

async function fetchMatchsByOpponent(opponent: string): Promise<any[]> {
    return await fetchMatchsByField("opponent", opponent);
}

async function fetchConfirmedMatchs(): Promise<any[]> {
    return await fetchMatchsByField("state", "Confirmé");
}

async function fetchCancelledMatchs(): Promise<any[]> {
    return await fetchMatchsByField("state", "Annulé");
}

async function fetchAllMatchs(): Promise<any[]> {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw new Error(error.message);
    return data || [];
}

async function updateMatchStateById(id: string, state: string): Promise<void> {
    const { error } = await supabase.from(table).update({ state }).eq("id", id);
    if (error) throw new Error(error.message);
}

async function countMatchs(): Promise<number> {
    const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    return count ?? 0;
}

export {
    fetchAllMatchs,
    fetchMatchById,
    fetchMatchsByDate,
    fetchMatchsByCreator,
    fetchMatchsByOpponent,
    fetchConfirmedMatchs,
    fetchCancelledMatchs,
    updateMatchStateById,
    countMatchs,
};
