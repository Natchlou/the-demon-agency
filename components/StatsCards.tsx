import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";

type Stat = {
    title: string;
    value: number;
    icon?: React.ReactNode;
    showChangeIndicator?: boolean;
};

type StatsCardsProps = {
    stats: Stat[];
};

export default function StatsCards({ stats }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2">
            {stats.map((stat, i) => {
                const isPositive = stat.value >= 0;
                const color = isPositive ? "text-green-600" : "text-red-600";
                const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

                return (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className={clsx("text-2xl font-bold flex items-center gap-1", color)}>
                                {stat.showChangeIndicator && <Icon className="h-5 w-5" />}
                                {stat.value.toLocaleString("fr-FR")}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
