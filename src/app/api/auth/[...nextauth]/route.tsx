import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { UserType } from "@/types/user.type";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        // Fetch additional user data from your server
        try {
          const response = await axios.post<UserType>(
            `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/users/by/google`,
            {
              email: user.email,
              username: user.name,
              avatar: user.image,
            }
          );

          if (response.status === 201 && response.statusText === "Created") {
            // Add new properties to the token
            token._id = response.data._id as string;
            token.username = response.data.username;
            token.role = response.data.role;
            token.avatar = response.data.avatar;
            token.banar = response.data.banar;
            token.communities = response.data.communities;
            token.bio = response.data.bio;
            token.probability_being = response.data.probability_being;
            token.followers = response.data.followers;
            token.following = response.data.following;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      try {
        // Update user information each time session is called
        const response = await axios.get<UserType>(
          `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/users/${token._id}`
        );

        if (response.status === 200) {
          // Update session with new data from the server
          session.user._id = response.data._id as string;
          session.user.username = response.data.username;
          session.user.role = response.data.role;
          session.user.avatar = response.data.avatar;
          session.user.banar = response.data.banar;
          session.user.communities = response.data.communities;
          session.user.bio = response.data.bio;
          session.user.probability_being = response.data.probability_being;
          session.user.followers = response.data.followers;
          session.user.following = response.data.following;
        }
      } catch (error) {
        console.error("Error updating session data:", error);
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ user }) {
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
