"use client"

import useSWR from "swr";
import { Alert } from "./components/types";
import React from "react";
import { Separator } from "@/components/ui/separator";

const fetcher = (u:string)=>fetch(u).then(r=>r.json());

export default function Home(){
  // const {data} = useSWR<Alert[]>("/api/alerts",fetcher);
  const[selectedId,setSelectedId]= React.useState<string|null>(null);
  // const selected = data?.find(a=>a.id === selectedId)??null;
  return (
    <div className="flex h-full">
      <div className="w-80 border-r">
        this is alert list
      </div>
      <Separator orientation="vertical"/>
      <div className="flex-1 overflow-auto">
        this is detail
      </div>
    </div>
  )
}