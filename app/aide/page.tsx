import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircleQuestion } from "lucide-react"

export default function HelpSection() {
    return (
        <div className="max-w-8xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">📚 Obtenir de l'aide</h2>
            <Accordion type="multiple" className="w-full space-y-2">
                <AccordionItem value="form-guide">
                    <AccordionTrigger>📝 Comment remplir chaque champ du formulaire ?</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        <p><strong>Créateur</strong> : Pseudo TikTok ou Discord de l'organisateur du match. <br />Ex. : <code>@the.demon</code></p>
                        <p><strong>Adversaire</strong> : Nom du créateur opposé (ou laisser vide si inconnu).</p>
                        <p><strong>Date</strong> : Choisis une date future, format JJ/MM/AAAA.</p>
                        <p><strong>Heure</strong> : Indique l'heure prévue du match (format 24h).</p>
                        <p><strong>Boost</strong> : Coche si l'utilisation de boost est autorisée.</p>
                        <p><strong>Nombre de K</strong> : Audience attendue (ex: 150K = 150 000 vues).</p>
                        <p><strong>Agence</strong> : Nom de l'agence concernée .</p>
                        <p><strong>Description</strong> : Donne le contexte du match, les règles ou idées de contenu.</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq">
                    <AccordionTrigger>❓ Questions fréquentes (FAQ)</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        <p><strong>Qui peut créer un match ?</strong><br />Seulement la direction de The Demon Agency.</p>
                        <p><strong>Puis-je modifier un match plus tard ?</strong><br />Oui, contacte un admin via Discord.</p>
                        <p><strong>À quoi sert le bouton Boost ?</strong><br />Il signale le match officiel dispose de boost.</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contact">
                    <AccordionTrigger>📬 Contacter un membre de l'équipe</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                        <p>Une question rapide ? Viens sur notre Discord ou écris-nous :</p>
                        <div className="flex gap-3">
                            <Button variant="outline" asChild>
                                <a href="mailto:n.jullien57@gmail.com"><Mail className="mr-2 h-4 w-4" /> n.jullien57@gmail.com</a>
                            </Button>
                            <Button variant="secondary" asChild>
                                <a href="https://discord.gg/HvY9PpeGuE" target="_blank">
                                    <MessageCircleQuestion className="mr-2 h-4 w-4" /> Discord
                                </a>
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
