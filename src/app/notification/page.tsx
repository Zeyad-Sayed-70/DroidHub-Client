import Sidebar from "@/components/elements/LeftSidebar";
import Navbar from "@/components/elements/Navbar";
import Body from "@/components/elements/Notification/Body";
import Tabs from "@/components/elements/Notification/Tabs";
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
          <h3 className="text-lg">Notification</h3>
          <section className="mt-2">
            <Tabs />
          </section>

          <section className="mt-4">
            <ErrorBoundary>
              <Body />
            </ErrorBoundary>
          </section>
        </article>
        <article className="hidden md:block w-[250px] xl:w-[300px] p-3 bg-slate-50">
          Right side
        </article>
      </div>
    </main>
  );
};

export default page;
