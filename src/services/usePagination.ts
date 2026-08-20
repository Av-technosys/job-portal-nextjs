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
      hasMore: false,
      totalLength: 0,
      // message: "No Job Found",
    };
    if (!paginatedAPIData?.data?.pages) return initialPagiantionInfoData;
    const pageArr = paginatedAPIData?.data?.pages;
    return {
      paginatedInfoData: pageArr?.flatMap((page) => {
        const items = Array.isArray(page?.data?.data)
          ? page.data.data
          : Array.isArray(page?.data)
          ? page.data
          : [];
        return items.map((item: any) => ({
          ...item,
          pageIndex: page?.data?.current_page,
        }));
      }) as CommonObjectType[],
      hasMore: (pageArr?.[0]?.data?.total_pages || 0) > pageArr?.length,
      totalLength: pageArr?.[0]?.data?.total_count,
    };
  }, [paginatedAPIData]);

  return {
    paginatedInfoData,
    hasMore,
    totalLength,
  };
}
