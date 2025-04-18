"use client"
import { SiteHeader } from '@/components/site-header'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { supabase } from "@/utils/supabase/client"
import { Info } from "lucide-react"
import { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";

type Notifications = {
    title: string,
    description: string,
    created_at: string
}
export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notifications[]>([]);
    const [notificationError, setNotificationError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data, error } = await supabase
                .from("notifications")
                .select("*")
                .order("created_at", { ascending: true });
            if (error) {
                setNotificationError(error.message);
            } else {
                setNotifications(data as Notifications[]);
            }
        };

        fetchNotifications();
    }, []);

    if (notificationError) throw new Error(notificationError);

    return (
        <>
            <SiteHeader title='Notifications' />
            <div className='p-4'>
                <div className='flex flex-col gap-2'>
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <Alert key={notif.created_at}>
                                <Info className="h-4 w-4" />
                                <AlertTitle>{notif.title}</AlertTitle>
                                <AlertDescription className="prose">
                                    <ReactMarkdown>{notif.description}</ReactMarkdown>
                                </AlertDescription>
                            </Alert>
                        ))
                    ) : (
                        <p>Aucune notifications</p>
                    )}
                </div>
            </div>
        </>
    )
}
