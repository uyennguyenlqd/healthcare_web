import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { AuthApi } from "@/app/api/user";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const resBody = {
            email: credentials.email as string,
            password: credentials.password as string,
          };
          const res = await AuthApi.login(resBody);

          if (res.status === 200) {
            const result = res.data.data;
            const token = res.data.token;
            const role = result.role;
            console.log("Received token:", token);

            return { role, ...result, token };
          }
        } catch (error: any) {
          console.error("Error during authentication:", error.message);

          return error.message;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.role = user.role;
        token.name = user.first_name + " " + user.last_name;
        token.avatar = user.avatar;
        token.user = user.token;

        return {
          ...token,
          accessToken: account.access_token,
        };
      }

      const accessToken =
        typeof token.accessToken === "string" ? token.accessToken : "";
      //console.log("JWT Callback:", token, account, user);
      //console.log("Token", token);
      return {
        ...token,
        accessToken: accessToken,
      };
    },
    async session({ session, token }) {
      //console.log("Session Callback:", session, token);
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.avatar = token.avatar;
      session.user.token = token.user;
      //console.log("Token User", session.user.token);
      //console.log("Name ", session.user.name, session.user.avatar);
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  },
});
