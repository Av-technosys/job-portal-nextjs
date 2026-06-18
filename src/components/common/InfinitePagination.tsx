import { InfinitePaginationProps } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, CircularProgress, Typography } from "@mui/material";

function InfinitePagination({
  children,
  dataLength,
  next,
  hasMore,
  isFetchingMore,
  inverse = false,
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
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  py: 2,
                  textAlign: "center",
                }}
              >
                Loading more results...
              </Typography>
            )
          ) : null
        }
        endMessage={null}
        inverse={inverse}
      >
        {children}
      </InfiniteScroll>
    </>
  );
}

export default InfinitePagination;
