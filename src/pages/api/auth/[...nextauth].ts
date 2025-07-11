import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { UserType } from "@/types";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent", // Forces Google to show the consent screen and asks for credentials again
          access_type: "offline", // Forces the refresh token
        },
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent", // Forces Google to show the consent screen and asks for credentials again
          access_type: "offline", // Forces the refresh token
        },
      },
    }),
    // InstagramProvider({
    //   id: "instagram",
    //   name: "Instagram",
    //   type: "oauth",
    //   version: "2.0",
    //   scope: "user_profile,user_media",
    //   params: { grant_type: "authorization_code" },
    //   authorization: "https://api.instagram.com/oauth/authorize",
    //   token: "https://api.instagram.com/oauth/access_token",
    //   clientId: process.env.INSTAGRAM_CLIENT_ID,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    //   profileUrl: "https://graph.instagram.com/me?fields=id,username",
    //   profile(profile) {
    //     return { id: profile.id, name: profile.username };
    //   },
    // }),
  ],
  // debug: true,
  secret: "jobassured",
  session: {
    strategy: "jwt", // Or "jwt" if you prefer, but this depends on your needs
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const djangoToken = await api.post(apiConstantsURL.authentication.sso, {
          name: profile.name,
          email: profile.email,
          user_type: UserType.JOB_SEEKER_TYPE,
        });

        token.accessToken = djangoToken.data.token;
      }
      return token;
    },
  },
});
