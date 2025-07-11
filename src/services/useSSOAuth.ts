import { LOGIN_URL } from "@/constants";
import { signIn, SignInOptions, signOut } from "next-auth/react";

export function useSSOAuth() {
  const googleSignIn = (extraParams: SignInOptions) =>
    signIn("google", extraParams);
  const facebookSignIn = (extraParams: SignInOptions) =>
    signIn("facebook", extraParams);
  const instagramSignIn = (extraParams: SignInOptions) =>
    signIn("instagram", extraParams);
  const twitterSignIn = (extraParams: SignInOptions) =>
    signIn("twitter", extraParams);
  const ssoLogout = () =>
    signOut({
      callbackUrl: LOGIN_URL,
    });

  return {
    googleSignIn,
    facebookSignIn,
    instagramSignIn,
    twitterSignIn,
    ssoLogout,
  };
}
