import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EquipePage() {
    const admins = [
        "la femme de l&apos;ombre",
        "beetlejuice.off",
        "chris"
    ];
    return (
        <div className="px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">L&apos;administration</h1>
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
        </div>
    )
}
