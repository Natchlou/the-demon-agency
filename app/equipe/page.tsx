import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EquipePage() {
    const admins = [
        "Lety (La femme de l'ombre)",
        "Beetlejuice (Beetlejuice)",
        "Chris (The Demon Psycho Familly)"
    ];
    const managers = [
        "Chouchoune",
        "Olivier(oliver)",
        "Baloo",
        "Nico"
    ]
    const agents = [
        "Fafa",
        "agent hydra hikaru",
        "TaZzZdubai"
    ]
    return (
        <div className="px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Direction</h1>
            <div className="grid grid-cols-4 gap-4">
                {admins.map((admin) => (
                    <Card key={admin}>
                        <CardHeader>
                            {admin}
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <Separator className="my-4" />
            <h1 className="text-2xl font-bold mb-4">Managers</h1>
            <div className="grid grid-cols-4 gap-4">
                {managers.map((manager) => (
                    <Card key={manager}>
                        <CardHeader>
                            {manager}
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <Separator className="my-4" />
            <h1 className="text-2xl font-bold mb-4">Agents</h1>
            <div className="grid grid-cols-4 gap-4">
                {agents.map((agent) => (
                    <Card key={agent}>
                        <CardHeader>
                            {agent}
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
