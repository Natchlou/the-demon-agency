"use client"

import {
  ArrowUpCircleIcon,
  ClipboardListIcon,
  ClockIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon
} from "lucide-react";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const user = session?.user || null;
  console.log("📌 Session reçue :", session);
  const data = {
    user: user
      ? {
        name: user.name,
        email: user.email,
        avatar: user.image || "/default-avatar.png",
      }
      : null,
    navMain: [
      { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboardIcon },
      { title: "Équipe", url: "/equipe", icon: UsersIcon },
      { title: "Horaire", url: "/agence", icon: ClockIcon },
    ],
    navSecondary: [
      { title: "Paramètres", url: "#", icon: SettingsIcon },
      { title: "Obtenir de l'aide", url: "#", icon: HelpCircleIcon },
      { title: "Rechercher", url: "#", icon: SearchIcon },
    ],
    documents: [
      { name: "Planning", url: "/planning", icon: ClipboardListIcon },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">The Demon Agency</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {data.user ? (
          <NavUser user={{
            name: data.user.name || '',
            email: data.user.email || '',
            avatar: data.user.avatar
          }} />
        ) : (
          <Button onClick={() => signIn('email', { callbackUrl: "/dashboard" })} className="w-full">Se connecter</Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
