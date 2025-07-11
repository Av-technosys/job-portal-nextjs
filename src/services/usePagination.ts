import { CommonObjectType, InfinteQueryResultType } from "@/types";
import { useMemo } from "react";

export function usePagination({
  paginatedAPIData,
}: {
  paginatedAPIData: InfinteQueryResultType;
}) {
  const { paginatedInfoData, hasMore, totalLength } = useMemo(() => {
    const initialPagiantionInfoData = {
      paginatedInfoData: [] as CommonObjectType[],
      hasMore: true,
      totalLength: 0,
    };
    if (!paginatedAPIData?.data?.pages) return initialPagiantionInfoData;
    const pageArr = paginatedAPIData?.data?.pages;
    return {
      paginatedInfoData: pageArr?.flatMap((page) =>
        (page.data.data as CommonObjectType[]).map((item) => {
          return {
            ...item,
            pageIndex: page?.data?.current_page,
          };
        })
      ) as CommonObjectType[],
      hasMore: pageArr?.[0]?.data?.total_pages !== pageArr?.length,
      totalLength: pageArr?.[0]?.data?.total_count,
    };
  }, [paginatedAPIData]);

  return {
    paginatedInfoData,
    hasMore,
    totalLength,
  };
}
