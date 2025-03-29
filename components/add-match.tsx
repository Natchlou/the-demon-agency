'use client'

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/utils/supabase/client"; // On suppose que le client est exporté de cette manière

export default function AddMatchModal() {
    const supabase = createClient();
    const [creator, setCreator] = useState('');
    const [opponent, setOpponent] = useState('');
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [boost, setBoost] = useState(false);
    const [number, setNumber] = useState('');
    const [agency, setAgency] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('match_officiel')
                .insert([{
                    creator,
                    opponent,
                    date,
                    heure,
                    boost,
                    number,
                    agency,
                    description
                }]);

            if (error) throw error;

            alert('Match ajouté avec succès!');
        } catch (error: any) {
            console.error(error);
            alert(error.message || 'Erreur lors de l\'ajout du match.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Ajouter un match officiel</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un Match Officiel</DialogTitle>
                    <DialogDescription>
                        Veuillez entrer les informations du match à ajouter.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="creator">Créateur</Label>
                        <Input
                            type="text"
                            id="creator"
                            value={creator}
                            onChange={(e) => setCreator(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="opponent">Adversaire</Label>
                        <Input
                            type="text"
                            id="opponent"
                            value={opponent}
                            onChange={(e) => setOpponent(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="heure">Heure</Label>
                        <Input
                            type="time"
                            id="heure"
                            value={heure}
                            onChange={(e) => setHeure(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="boost">Boost</Label>
                        <Checkbox
                            id="boost"
                            checked={boost}
                            onCheckedChange={(checked) => setBoost(checked)}
                            className="h-4 w-4 text-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="number">Numéro</Label>
                        <Input
                            type="text"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="agency">Agence</Label>
                        <Input
                            type="text"
                            id="agency"
                            value={agency}
                            onChange={(e) => setAgency(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-500 text-white rounded-md"
                    >
                        {loading ? 'Enregistrement...' : 'Ajouter le match'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
