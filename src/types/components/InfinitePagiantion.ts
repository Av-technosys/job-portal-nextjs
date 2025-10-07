export interface InfinitePaginationProps {
  children?: React.ReactElement;
  dataLength?: number | null;
  next?: () => void;
  hasMore?: boolean;
  isFetchingMore?: boolean;
  inverse?: boolean;
  showEndMessage?: boolean;
  showLoader?: boolean;
  height?: number | string;
  wiodth?: number | string;
}
