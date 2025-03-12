import { Calendar, Home, Inbox, PresentationIcon, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@heroui/button"
import { LogoutButton } from "./logout-button"


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: PresentationIcon,
  },
  {
    title: "Kanban",
    url: "/kanban",
    icon: Inbox,
  },
  {
    title: "Price",
    url: "/pricing",
    icon: Inbox,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-slate-950">
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div className="border-1 border-purple-800">
                <SidebarMenuItem className="text-large" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <p className="text-2xl">{item.title}</p>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-900">
        <LogoutButton/>
      </SidebarFooter>
    </Sidebar>
  )
}
