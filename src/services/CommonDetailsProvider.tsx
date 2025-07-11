import { apiConstantsURL, LOCAL_STORAGE_KEY } from "@/constants";
import { api, constructClassName, getItemFromCookie, setItem } from "@/helper";
import {
  AccessType,
  CommonDetailsProps,
  CommonObjectType,
  SSOSessionProps,
  UserType,
} from "@/types";
import {
  dehydrate,
  QueryClient,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { createContext, useEffect, useMemo } from "react";
import { useSSOSession } from "./useSSOSession";
import { poppinsFont } from "@/styles/fonts";
import { NAVIGATION_PATH_MAPPING_CONFIG } from "@/constants";
import Head from "next/head";
import { useRouter } from "next/router";

const initialState = {
  userType: -1,
  accessType: -1,
  name: "",
  email: "",
  phoneNumber: -1,
  userId: -1,
  profileImage: "",
  refetchCommonDetails: () => {},
} as CommonDetailsProps;

export const CommonDetailsContext = createContext(initialState);

export const getUserDetails = (
  accessToken?: string,
  isFromServer?: boolean
): Promise<{
  data: CommonObjectType;
  success: boolean;
}> => {
  return api.get(
    `${apiConstantsURL.authentication.details}`,
    isFromServer
      ? {
          headers: {
            Authorization: `Token ${accessToken}`,
          },
        }
      : {}
  );
};

export const getUserDetailsQueryOptions = (
  accessToken: string,
  isFromServer: boolean
) => {
  return queryOptions({
    queryKey: ["user_student", accessToken],
    queryFn: async () => {
      const userDetails = await getUserDetails(accessToken, isFromServer);
      return userDetails.data as CommonObjectType;
    },
    enabled: !!accessToken,
  });
};

export function useGetCommonDetails({ accessToken }: { accessToken: string }) {
  const { data, refetch } = useQuery({
    ...getUserDetailsQueryOptions(accessToken, false),
  });

  return {
    data,
    refetch,
  };
}

const CommonDetailsProvider = ({
  children,
  pageProps,
  accessTokenFromLocalStorage,
}: {
  children: React.ReactNode;
  pageProps: AppProps["pageProps"];
  accessTokenFromLocalStorage?: string;
}) => {
  const { ssoData } = useSSOSession();
  const { pathname } = useRouter();

  const accessToken = useMemo(() => {
    return (
      pageProps?.accessToken ||
      accessTokenFromLocalStorage ||
      (ssoData as SSOSessionProps)?.accessToken
    );
  }, [pageProps?.accessToken, accessTokenFromLocalStorage, ssoData]);

  const { data, refetch } = useGetCommonDetails({ accessToken });

  useEffect(() => {
    if (data) {
      setItem(LOCAL_STORAGE_KEY.CURRENT_USER_TYPE, data?.user_type as string);
      setItem(
        LOCAL_STORAGE_KEY.CURRENT_ACCESS_TYPE,
        data?.access_type as string
      );
    }
  }, [data]);

  useEffect(() => {
    if (accessToken) {
      setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    }
  }, [accessToken]);

  return (
    <CommonDetailsContext.Provider
      value={{
        userType: (data?.user_type?.toString() || -1) as UserType,
        accessType: (data?.access_type?.toString() || -1) as AccessType,
        name: (data?.first_name || "") as string,
        email: data?.email as string,
        phoneNumber: (data?.phone_number || null) as number,
        userId: (data?.id || null) as number,
        profileImage: (data?.profile_picture || null) as string,
        refetchCommonDetails: refetch,
      }}
    >
      <Head>
        <title>{NAVIGATION_PATH_MAPPING_CONFIG?.[pathname]?.title}</title>
      </Head>
      <div className={constructClassName([poppinsFont.className])}>
        {children}
      </div>
    </CommonDetailsContext.Provider>
  );
};

export default CommonDetailsProvider;

export async function getDehydratedStateForCommonDetails(
  context: GetServerSidePropsContext
) {
  const emptyResponse = {};
  try {
    if (context?.req?.headers?.cookie) {
      const accessToken = getItemFromCookie(
        context.req.headers.cookie.split(",") || [],
        LOCAL_STORAGE_KEY.ACCESS_TOKEN
      );

      if (accessToken) {
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(
          getUserDetailsQueryOptions(accessToken, true)
        );

        return {
          accessToken,
          dehydratedState: dehydrate(queryClient),
        };
      }
      return emptyResponse;
    }
  } catch (e) {
    return emptyResponse;
  }
  return emptyResponse;
}
