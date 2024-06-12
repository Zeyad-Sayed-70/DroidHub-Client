"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const LoginCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button onClick={() => signIn("google")}>Sign in with Google</Button>
    </div>
  );
};

export default LoginCard;
