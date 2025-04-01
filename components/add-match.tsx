'use client'

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/utils/supabase/client"; // On suppose que le client est exporté de cette manière
import { PostgrestError } from '@supabase/supabase-js';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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
    const [open, setOpen] = useState(false)

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


            toast('Match officiel crée avec succès')
            setOpen(false)
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
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Ajouter un match officiel</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un Match Officiel</DialogTitle>
                    <DialogDescription>
                        Veuillez entrer les informations du match à ajouter.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-2 p-2">
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="creator" className='text-right'>Créateur</Label>
                        <Input
                            type="text"
                            id="creator"
                            value={formState.creator}
                            onChange={handleChange}
                            required
                            className='col-span-3'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="opponent" className='text-right'>Adversaire</Label>
                        <Input
                            type="text"
                            id="opponent"
                            value={formState.opponent}
                            onChange={handleChange}
                            required
                            className='col-span-3'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="date" className='text-right'>Date</Label>
                        <Input
                            type="date"
                            id="date"
                            value={formState.date}
                            onChange={handleChange}
                            required
                            className='col-span-3'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="heure" className='text-right'>Heure</Label>
                        <Input
                            type="time"
                            id="heure"
                            value={formState.heure}
                            onChange={handleChange}
                            required
                            className='col-span-3'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="boost" className='text-right'>Boost</Label>
                        <Checkbox
                            id="boost"
                            checked={formState.boost}
                            onCheckedChange={handleBoostChange}
                            className="h-4 w-4 text-blue-500 col-span-3"
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="number" className='text-right'>Nombre de K</Label>
                        <Input
                            type="text"
                            id="number"
                            value={formState.number}
                            onChange={handleChange}
                            className='col-span-3'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="agency" className='text-right'>Agence</Label>
                        <Input
                            type="text"
                            id="agency"
                            value={formState.agency}
                            onChange={handleChange}
                            className='col-span-3'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="description" className='text-right'>Description</Label>
                        <Textarea
                            id="description"
                            value={formState.description}
                            onChange={handleChange}
                            className="col-span-3 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>
                    <div className='flex flex-row gap-2 justify-end align-middle'>
                        <Button onClick={() => setOpen(false)} variant={'destructive'}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Enregistrement...' : 'Ajouter le match'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
