import React from "react";
import Navbar from "./elements/Navbar";
import LeftSidebar from "@/components/elements/LeftSidebar";
import ErrorBoundary from "./ErrorBoundary";
import RightSidebar from "./elements/RightSidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen overflow-hidden">
      <article className="lg:hidden">
        <Navbar />
      </article>
      <div className="flex items-start gap-4">
        <article className="hidden lg:block w-[250px] xl:w-[300px] h-screen p-4 rounded-md shadow-md bg-secondary">
          <LeftSidebar />
        </article>
        <article
          style={{ height: "calc(100vh - 74px)" }}
          className="lg:!h-screen overflow-auto flex-1 p-4 rounded-md shadow-md bg-secondary scrollbar-hide"
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </article>
        <article className="hidden md:block w-[300px] p-3 bg-secondary">
          <RightSidebar />
        </article>
      </div>
    </main>
  );
};

export default MainLayout;
