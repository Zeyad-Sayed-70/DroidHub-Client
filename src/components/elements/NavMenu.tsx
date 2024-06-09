"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { CgMenuGridO } from "react-icons/cg";
import { TooltipUi } from "../ui/tooltip";
import Link from "next/link";
import { navbar_list } from "@/constants/navbar_list";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
      <div>
        <Button onClick={() => setIsOpen(true)} size={"icon"}>
          <CgMenuGridO size={22} />
        </Button>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <section>
            <ul className="grid grid-cols-3 gap-2 mt-4">
              <NavList />
            </ul>
          </section>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            onClick={() => setIsOpen(false)}
            variant="outline"
            className="w-fit mx-auto"
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const NavList = () => {
  return (
    <>
      {navbar_list.map((item, ind) => (
        <li key={ind}>
          <TooltipUi
            delayDuration={600}
            title={item.title}
            trigger={
              <Link
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-md text-slate-500 hover:bg-slate-100 transition"
                href={`${item.link}`}
              >
                <span className="text-3xl">{item.icon}</span>
              </Link>
            }
          />
        </li>
      ))}
    </>
  );
};

export default NavMenu;
