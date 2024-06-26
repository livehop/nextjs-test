import { NextAuthOptions } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIDS6Provider({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: "http://localhost:8000",
      authorization: { params: { scope: "openid profile kaizenApp" } },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile) {
        token.username = profile.username;
      }
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
};
