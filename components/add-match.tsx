'use client'

import React, { useState } from 'react'
import {
    Dialog, DialogContent, DialogDescription,
    DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { supabase } from "@/utils/supabase/client"
import { z } from 'zod'

const matchSchema = z.object({
    creator: z.string().min(1, "Créateur requis"),
    opponent: z.string().min(1, "Adversaire requis"),
    date: z.string().min(1, "Date requise"),
    heure: z.string().min(1, "Heure requise"),
    number: z.string().optional(),
    agency: z.string().optional(),
    description: z.string().optional(),
    boost: z.boolean(),
})

type MatchForm = z.infer<typeof matchSchema>

const fields = [
    { id: "creator", label: "Créateur", type: "text" },
    { id: "opponent", label: "Adversaire", type: "text" },
    { id: "date", label: "Date", type: "date" },
    { id: "heure", label: "Heure", type: "time" },
    { id: "number", label: "Nombre de K", type: "text" },
    { id: "agency", label: "Agence", type: "text" }
]

export default function AddMatchModal() {
    const [form, setForm] = useState<MatchForm>({
        creator: '', opponent: '', date: '', heure: '',
        number: '', agency: '', description: '', boost: false
    })
    const [errors, setErrors] = useState<Partial<Record<keyof MatchForm, string>>>({})
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        const parsed = matchSchema.safeParse(form)

        if (!parsed.success) {
            const fieldErrors: Partial<Record<keyof MatchForm, string>> = {}
            parsed.error.errors.forEach(err => {
                const field = err.path[0] as keyof MatchForm
                fieldErrors[field] = err.message
            })
            setErrors(fieldErrors)
            toast.error("Merci de corriger les champs.")
            return
        }

        setLoading(true)
        try {
            const { error } = await supabase.from('match_officiel').insert([parsed.data])
            if (error) throw error
            toast.success("Match officiel créé avec succès")
            setOpen(false)
        } catch (err) {
            toast.error("Erreur lors de la création du match")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Ajouter un match officiel</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un Match Officiel</DialogTitle>
                    <DialogDescription>Remplis les infos ci-dessous.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    {fields.map(({ id, label, type }) => (
                        <div key={id} className="space-y-1">
                            <Label htmlFor={id}>{label}</Label>
                            <Input
                                id={id}
                                type={type}
                                value={form[id as keyof MatchForm] as string}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors[id as keyof MatchForm] && (
                                <p className="text-sm text-red-500">{errors[id as keyof MatchForm]}</p>
                            )}
                        </div>
                    ))}

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="boost"
                            checked={form.boost}
                            onCheckedChange={(checked) => setForm({ ...form, boost: !!checked })}
                        />
                        <Label htmlFor="boost">Boost</Label>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="destructive" onClick={() => setOpen(false)}>Annuler</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Enregistrement..." : "Ajouter le match"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
