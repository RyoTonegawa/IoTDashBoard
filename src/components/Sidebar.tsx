"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { MapIcon,TriangleAlert } from "lucide-react";

export default function Sidebar(){
  const pathname = usePathname();

  const links = [
    {href:'/alerts',label:"Alerts"},
    {href:'/areas',label:"Areas"}
  ]

  const Nav = ({href,children}:{href:string,children:React.ReactNode})=>{
    const active = pathname === href || pathname.startsWith(href+ "/");
    return (
      <Button 
      asChild 
      // variant={active ?"default":"ghost" }
      variant={"ghost"}
      className = "w-full justify-center border-transparent hover:border-border"
      >
        <Link href={href} className={cn("gap-2")}>{children}</Link>
      </Button>
    )
  };
  return (
    <aside className="w-56 border-r p-4 space-y-3">
      <div className="text-xl text-muted-foreground font-bold tracking-tight">LOGO</div>
      <Separator/>
      <nav className="space-y-2 text-muted-foreground">
        <Nav href="/alerts" ><TriangleAlert size={18}/> Alerts</Nav>
        <Nav href="/areas"><MapIcon size={18}/> Areas</Nav>
      </nav>
    </aside>
  )
}