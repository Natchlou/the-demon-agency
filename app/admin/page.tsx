"use client"
import { countMatchs, fetchCancelledMatchs, fetchConfirmedMatchs, fetchMatchsByDate, updateMatchStateById } from '@/api/matchs'
import { SiteHeader } from '@/components/site-header'
import StatsCards from '@/components/StatsCards'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Match } from '@/lib/type'
import { Check, X, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Page() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [matchs, setMatchs] = useState<Match[]>([])
    const [stats, setStats] = useState<any[]>([])

    useEffect(() => {
        const fetchStats = async () => {
            const [confirmed, cancelled, total] = await Promise.all([
                fetchConfirmedMatchs(),
                fetchCancelledMatchs(),
                countMatchs()
            ])
            setStats([
                {
                    title: "Match Confirmé",
                    value: confirmed.length,
                    icon: <Check className="h-5 w-5 text-muted-foreground" />,
                    showChangeIndicator: true
                },
                {
                    title: "Match Annulé",
                    value: -cancelled.length, // Pour tester rouge
                    icon: <X className="h-5 w-5 text-muted-foreground" />,
                    showChangeIndicator: true
                },
                {
                    title: "Total Match",
                    value: total,
                    icon: <Zap className="h-5 w-5 text-muted-foreground" />,
                    showChangeIndicator: false
                }
            ])
        }
        fetchStats()
    }, [])

    useEffect(() => {
        const fetchMatchs = async () => {
            if (date) {
                const matchsData = await fetchMatchsByDate(date)
                setMatchs(matchsData)
            }
        }
        fetchMatchs()
    }, [date])

    const handleMatchStateChange = async (id: string) => {
        const newState = matchs.find(match => match.id === id)?.state === 'Confirmé' ? 'Annulé' : 'Confirmé';
        await updateMatchStateById(id, newState)
        if (date) {
            const matchsData = await fetchMatchsByDate(date)
            setMatchs(matchsData)
        }
    }

    return (
        <>
            <SiteHeader title={'Administration'} />
            <StatsCards stats={stats} />

            <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-2 m-2 w-full'>
                    {matchs.map((match) => (
                        <Card className='flex w-full' key={match.id}>
                            <CardHeader>
                                <CardTitle>{match.creator} VS {match.opponent}</CardTitle>
                                <CardDescription>
                                    {new Date(match.date).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })} à {match.heure.slice(0, 2) + "h" + match.heure.slice(3, 5)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Nombre de K: {match.number}K</p>
                                <p>Boost: {match.boost ? 'Oui' : 'Non'}</p>
                                <p>Agence: {match.agency}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button
                                    onClick={() => handleMatchStateChange(match.id)}
                                    className={`text-white font-bold py-2 px-4 rounded ${match.state === 'Confirmé'
                                        ? 'bg-red-500 hover:bg-red-700'
                                        : 'bg-green-500 hover:bg-green-700'
                                        }`}
                                >
                                    {match.state === 'Confirmé' ? 'Annuler' : 'Confirmer'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className='flex flex-row justify-end'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border shadow"
                        style={{ height: '280px' }}
                    />
                </div>
            </div>
        </>
    )
}
