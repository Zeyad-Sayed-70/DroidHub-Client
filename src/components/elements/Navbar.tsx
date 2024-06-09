"use client";
import React, { Suspense, lazy } from "react";
import Container from "../Container";
import Link from "next/link";
import { navbar_list } from "@/constants/navbar_list";
import { TooltipUi } from "@/components/ui/tooltip";
import useMediaQuery from "@/hooks/useMediaQuery";

const NavMenu = lazy(() => import("./NavMenu"));

const Navbar = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 768px)");
  return (
    <nav className="py-4 bg-slate-50 shadow-sm hover:shadow-md transition-all mb-2">
      <Container>
        <section className="flex items-center gap-6 relative">
          <h1 className="text-lg font-bold">DroidHub</h1>
          <ul className="hidden sm:flex items-center gap-1">
            <NavList />
          </ul>
          <div className="sm:hidden ml-auto">
            <Suspense fallback={"Loading..."}>
              {isTabletOrMobile && <NavMenu />}
            </Suspense>
          </div>
        </section>
      </Container>
    </nav>
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
                className="flex items-center gap-2 py-2 px-4 rounded-md text-slate-500 hover:bg-slate-100 transition"
                href={`${item.link}`}
              >
                <span className="text-lg">{item.icon}</span>
              </Link>
            }
          />
        </li>
      ))}
    </>
  );
};

export default Navbar;
