"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  console.log(session);
  if (!session)
    return (
      <div className="h-screen flex items-center justify-center">
        <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      </div>
    );
  else
    return (
      <div className="h-screen flex items-center justify-center">
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
};

export default Page;
