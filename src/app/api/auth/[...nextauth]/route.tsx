import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

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
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        // Fetch additional user data from your server
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/users/by/google`,
            {
              email: user.email,
              username: user.name,
              avatar: user.image,
            }
          );

          if (response.status === 201 && response.statusText === "Created") {
            // Add new properties to the token
            token.role = response.data.role;
            token.communities = response.data.communities;
            token.bio = response.data.bio;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add the new properties to the session object
      session.user.role = token.role;
      session.user.communities = token.communities;
      session.user.bio = token.bio;
      session.accessToken = token.accessToken;

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to the home page after sign-in
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // You can keep this as is, ensuring user creation or validation
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };