/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseMutationOptions,
  DefaultOptions,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";
import { PaginationSuccessResponseType } from "./common";

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;

export type InfinteQueryResultType = UseInfiniteQueryResult<
  InfiniteData<
    {
      data: PaginationSuccessResponseType;
    },
    unknown
  >,
  Error
>;
