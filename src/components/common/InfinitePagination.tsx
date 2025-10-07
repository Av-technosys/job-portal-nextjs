import { InfinitePaginationProps } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, CircularProgress } from "@mui/material";

function InfinitePagination({
  children,
  dataLength,
  next,
  hasMore,
  isFetchingMore,
  inverse = false,
  showEndMessage = true,
  showLoader = true,
  height,
}: InfinitePaginationProps) {
  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        // when height is provided, InfiniteScroll will render a scrollable div
        height={height as any}
        loader={
          showLoader ? (
            isFetchingMore ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <h4>Loading...</h4>
            )
          ) : null
        }
        endMessage={
          showEndMessage ? (
            dataLength > 10 ? (
              <h4>You have reached the end</h4>
            ) : null
          ) : null
        }
        inverse={inverse}
      >
        {children}
      </InfiniteScroll>
    </>
  );
}

export default InfinitePagination;
