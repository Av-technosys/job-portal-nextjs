import { useSession } from "next-auth/react";

export function useSSOSession() {
  const { data: ssoData } = useSession();

  return {
    ssoData,
    isSSOData: !(ssoData === null || ssoData === undefined),
  };
}
