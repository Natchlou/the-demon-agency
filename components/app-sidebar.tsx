"use client";

import {
  ArrowUpCircleIcon,
  ClipboardListIcon,
  ClockIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

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
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type SupabaseUser = {
  id: string;
  email: string;
  role: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [utilisateur, setUtilisateur] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        // Récupérer le rôle de l'utilisateur dans la db 'user_role' avec l'id de l'user
        const { data: roleData, error: roleError } = await supabase.from('user_roles').select('role').eq('user_id', data.user.id);
        if (roleError) throw new Error(roleError.message);

        setUtilisateur({
          id: data.user.id,
          email: data.user.email as string,
          role: roleData[0].role,
        });
      }
    };

    fetchUser();
  }, []);

  const data = {
    user: utilisateur
      ? {
        name: utilisateur.email,
        email: utilisateur.email,
        avatar: "/default-avatar.png",
        role: utilisateur.role,
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
    documents: [{ name: "Planning", url: "/planning", icon: ClipboardListIcon }],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">The Demon Agency</span>
              </Link>
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
          <NavUser
            user={{
              name: data.user.name,
              email: data.user.email,
              avatar: data.user.avatar,
              role: data.user.role,
            }}
          />
        ) : (
          <Link href="/login" className="w-full text-center block py-2 text-blue-500 hover:text-blue-700">
            Se connecter
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
