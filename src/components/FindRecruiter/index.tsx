import React, { useRef, useState } from "react";
import { useGetFindRecruiterList, usePagination } from "@/services";
import {
  Dropdown,
  InfinitePagination,
  Loader,
  Stack,
  Typography,
  When,
} from "../common";
import { FIND_RECRUITER_PAGE_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import RecruiterCard from "./RecruiterCard";
import RecruiterApplicationPopup from "./RecruiterApplicationPopup";
import { CommonObjectType, RecruiterListSortEnum } from "@/types";
import { SelectChangeEvent } from "@mui/material";
import RecruiterSearchBar from "../RecruiterSearchBar";
// import RecruiterApplicationPopup from "./RecruiterApplicationPopup";

function FindRecruiter() {
  const { TITLE_COUNT, TITLE_HEADER, RECRUITER_LISTING_SORT_DROPDOWN } =
    FIND_RECRUITER_PAGE_CONFIG;
  const [isRecruiterPopupOpen, setRecruiterPopupStatus] = useState(false);
  const selectedRecruiter = useRef({} as CommonObjectType);
  const [selectedSort, setSelectedSort] = useState<RecruiterListSortEnum[]>([
    RecruiterListSortEnum.CREATED_DATE_ASC,
  ]);
  const [searchedData, setSearchedData] = useState(null);

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as RecruiterListSortEnum[]);
  };
  function openRecruiterPopup(recruiter: CommonObjectType) {
    selectedRecruiter.current = recruiter;
    setRecruiterPopupStatus(true);
  }

  function showSearchedData(data: any) {
    setSearchedData(data?.apiData?.data?.pages[0]?.data?.data);
  }

  const findRecruiterAPIData = useGetFindRecruiterList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
    },
  });

  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: findRecruiterAPIData,
  });

  if (findRecruiterAPIData?.isLoading) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  return (
    <>
      <RecruiterSearchBar />
      <div className="max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto w-full px-2 sm:px-4 mt-8 mb-12">
        <When condition={totalLength !== 0}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0"></span>
                <div className="flex items-baseline gap-1.5 font-bold text-slate-900 text-xl">
                  <Typography {...TITLE_COUNT(totalLength)} />
                  <Typography {...TITLE_HEADER(totalLength)} />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 pl-5.5">
                Connect with <span className="text-indigo-600 font-semibold">verified recruiters</span> and explore new career opportunities.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-semibold text-slate-600 shrink-0 self-center">
                Sort by:
              </span>
              <Dropdown
                {...RECRUITER_LISTING_SORT_DROPDOWN}
                onChange={handleSortChange}
                value={selectedSort?.[0]}
              />
            </div>
          </div>
        </When>

        {paginatedInfoData?.length > 0 ? (
          <InfinitePagination
            dataLength={paginatedInfoData?.length}
            next={findRecruiterAPIData?.fetchNextPage}
            hasMore={hasMore}
            isFetchingMore={findRecruiterAPIData?.isFetchingNextPage}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 w-full">
              {Array.isArray(searchedData) && searchedData.length > 0
                ? searchedData?.map((recruiter) => (
                    <RecruiterCard
                      recruiter={recruiter}
                      key={`recruiters-${recruiter?.id}`}
                      openRecruiterApplicationPopup={() =>
                        openRecruiterPopup(recruiter)
                      }
                    />
                  ))
                : paginatedInfoData?.map((recruiter) => (
                    <RecruiterCard
                      recruiter={recruiter}
                      key={`recruiters-${recruiter?.id}`}
                      openRecruiterApplicationPopup={() =>
                        openRecruiterPopup(recruiter)
                      }
                    />
                  ))}
            </div>
          </InfinitePagination>
        ) : (
          <div className="text-xl font-bold py-10">No Recruiter Found</div>
        )}
      </div>
      <RecruiterApplicationPopup
        open={isRecruiterPopupOpen}
        handleClose={() => setRecruiterPopupStatus(false)}
        jobDetails={{} as any}
        recruiterDetails={selectedRecruiter.current}
      />
    </>
  );
}

export default FindRecruiter;
