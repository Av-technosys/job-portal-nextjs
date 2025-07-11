export interface InfinitePaginationProps {
  children: React.ReactElement;
  dataLength: number;
  next: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
  inverse?: boolean;
  showEndMessage?: boolean;
  showLoader?: boolean;
}
