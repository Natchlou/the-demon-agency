import { SiteHeader } from '@/components/site-header'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function AidePage() {
    return (
        <>
            <SiteHeader title={'Aide'} />
            <div className="flex flex-1 flex-col">
                <div className="p-4 flex flex-1 flex-col gap-2">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="how-to-add-official-match">
                            <AccordionTrigger>Comment ajouter un match officiel</AccordionTrigger>
                            <AccordionContent>
                                Pour ajouter un match officiel, il vous suffit de compléter le formulaire disponible dans <a href="/dashboard">Tableau de bord</a>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    )
}
