import React, { useEffect, useRef, useState } from "react";
import { useGetFindRecruiterList, usePagination } from "@/services";
import {
  Dropdown,
  InfinitePagination,
  Stack,
  Typography,
  When,
} from "../common";
import { FIND_RECRUITER_PAGE_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import RecruiterCard from "./RecruiterCard";
import { CommonObjectType, RecruiterListSortEnum } from "@/types";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { SearchIcon } from "@/assets";
// import RecruiterApplicationPopup from "./RecruiterApplicationPopup";

function FindRecruiter() {
  const [searchString, setSearchString] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchString(searchValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const { TITLE_COUNT, TITLE_HEADER, RECRUITER_LISTING_SORT_DROPDOWN } =
    FIND_RECRUITER_PAGE_CONFIG;
  // const [isRecruiterPopupOpen, setRecruiterPopupStatus] = useState(false);
  const selectedRecruiter = useRef({} as CommonObjectType);
  const [selectedSort, setSelectedSort] = useState<RecruiterListSortEnum[]>([
    RecruiterListSortEnum.CREATED_DATE_ASC,
  ]);

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as RecruiterListSortEnum[]);
  };
  function openRecruiterPopup(recruiter: CommonObjectType) {
    selectedRecruiter.current = recruiter;
    // setRecruiterPopupStatus(true);
  }

  const findRecruiterAPIData = useGetFindRecruiterList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
      search: searchString,
    },
  });
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: findRecruiterAPIData,
  });

  const searchProps = {
    input: {
      placeholder: "Search recruiter name",
    },
  };

  return (
    <>
      <When condition={totalLength !== 0}>
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: "baseline",
            justifyContent: "space-between", // Ensures space between text and dropdown
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              gap: 1,
              alignItems: "baseline",
            }}
          >
            <Typography {...TITLE_COUNT(totalLength)} />
            <Typography {...TITLE_HEADER(totalLength)} />
          </Stack>

          <FormControl
            sx={{ width: { xs: "20ch", sm: "30ch" } }}
            variant="outlined"
          >
            <OutlinedInput
              id="outlined-adornment-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchProps.input.placeholder}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              aria-describedby="outlined-search-helper-text"
              inputProps={{
                "aria-label": "search",
              }}
            />
          </FormControl>

          <Dropdown
            {...RECRUITER_LISTING_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        </Stack>
      </When>

      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={findRecruiterAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={findRecruiterAPIData?.isFetchingNextPage}
      >
        <Stack>
          {paginatedInfoData?.map((recruiter) => (
            <RecruiterCard
              recruiter={recruiter}
              key={`recruiters-${recruiter?.id}`}
              openRecruiterApplicationPopup={() =>
                openRecruiterPopup(recruiter)
              }
            />
          ))}
        </Stack>
      </InfinitePagination>
    </>
  );
}

export default FindRecruiter;
