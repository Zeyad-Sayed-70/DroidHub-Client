import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username?: string | null;
      email?: string | null;
      avatar?: string | null;
      banar?: string | null;
      role?: string;
      communities?: string[];
      bio?: string;
      probability_being?: string;
      followers?: string[];
      following?: string[];
    };
    accessToken?: string; // If you want to include accessToken
  }

  interface User {
    _id: string;
    username?: string | null;
    email?: string | null;
    avatar?: string | null;
    banar?: string | null;
    role?: string;
    communities?: string[];
    bio?: string;
    probability_being?: string;
    followers?: string[];
    following?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    username?: string | null;
    role?: string;
    avatar?: string | null;
    banar?: string | null;
    communities?: string[];
    bio?: string;
    probability_being?: string;
    accessToken?: string; // If you want to include accessToken
    followers?: string[];
    following?: string[];
  }
}
