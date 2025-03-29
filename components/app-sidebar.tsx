"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Cycle de vie",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Analytiques",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projets",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Équipe",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
    {
      title: "Proposition",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
    {
      title: "Prompt",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Obtenir de l'aide",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Rechercher",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Bibliothèque de données",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Rapports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Assistant de mots",
      url: "#",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <span className="text-base font-semibold">L'Agence Démon</span>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
