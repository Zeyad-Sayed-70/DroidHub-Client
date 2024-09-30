"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const tabs = ["seen", "new", "archive"];

const Tabs = () => {
  const param = useSearchParams();
  const currentTab = param.get("tab") || tabs[0];
  return (
    <div className="flex items-center">
      {tabs.map((tab) => (
        <Link key={tab} href={{ query: { tab } }} className="flex-1">
          <Button
            className={`w-full rounded-r-none capitalize bg-slate-100 text-black hover:bg-slate-200 ${
              currentTab == tab && "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {tab}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
