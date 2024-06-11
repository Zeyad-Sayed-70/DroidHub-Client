import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      communities?: string[];
      bio?: string[];
    };
    accessToken?: string; // If you want to include accessToken
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    communities?: string[];
    bio?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    communities?: string[];
    bio?: string[];
    accessToken?: string; // If you want to include accessToken
  }
}
