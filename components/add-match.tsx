'use client'

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/utils/supabase/client"; // On suppose que le client est exporté de cette manière
import { PostgrestError } from '@supabase/supabase-js';

export default function AddMatchModal() {
    const supabase = createClient();
    const [formState, setFormState] = useState({
        creator: '',
        opponent: '',
        date: '',
        heure: '',
        boost: false,
        number: '',
        agency: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        });
    };

    const handleBoostChange = (checked: boolean) => {
        setFormState({
            ...formState,
            boost: checked
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error }: { error: PostgrestError | null } = await supabase
                .from('match_officiel')
                .insert([{
                    creator: formState.creator,
                    opponent: formState.opponent,
                    date: formState.date,
                    heure: formState.heure,
                    boost: formState.boost,
                    number: formState.number,
                    agency: formState.agency,
                    description: formState.description
                }]);

            if (error) throw error;

            alert('Match ajouté avec succès!');
        } catch (error: PostgrestError | unknown) {
            if (error instanceof PostgrestError) {
                console.error(error.message);
                alert(error.message || 'Erreur lors de l\'ajout du match.');
            } else {
                console.error(error);
                alert('Erreur inconnue lors de l\'ajout du match.');
            }
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
                            value={formState.creator}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="opponent">Adversaire</Label>
                        <Input
                            type="text"
                            id="opponent"
                            value={formState.opponent}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            type="date"
                            id="date"
                            value={formState.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="heure">Heure</Label>
                        <Input
                            type="time"
                            id="heure"
                            value={formState.heure}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="boost">Boost</Label>
                        <Checkbox
                            id="boost"
                            checked={formState.boost}
                            onCheckedChange={handleBoostChange}
                            className="h-4 w-4 text-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="number">Numéro</Label>
                        <Input
                            type="text"
                            id="number"
                            value={formState.number}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="agency">Agence</Label>
                        <Input
                            type="text"
                            id="agency"
                            value={formState.agency}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            value={formState.description}
                            onChange={handleChange}
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
