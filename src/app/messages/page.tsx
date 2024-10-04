import Sidebar from "@/components/elements/LeftSidebar";
import Body from "@/components/elements/Messages";
import Navbar from "@/components/elements/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import React from "react";

const page = () => {
  return (
    <main className="h-screen overflow-hidden">
      <article className="lg:hidden">
        <Navbar />
      </article>
      <div className="flex items-start gap-4">
        <article className="hidden lg:block w-[250px] xl:w-[300px] h-screen p-4 rounded-md shadow-md bg-slate-50">
          <Sidebar />
        </article>
        <article
          style={{ height: "calc(100vh - 74px)" }}
          className="lg:!h-screen overflow-auto flex-1 p-4 rounded-md shadow-md bg-slate-50"
        >
          <ErrorBoundary>
            <Body />
          </ErrorBoundary>
        </article>
      </div>
    </main>
  );
};

export default page;
