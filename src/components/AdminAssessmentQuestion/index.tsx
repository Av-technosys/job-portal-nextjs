import React, { useEffect, useState } from "react";
import {
  ADMIN_QUESTION_CARD_CONFIG,
  LOGIN_URL,
  PAGIANTION_LIMIT,
  TOP_RIBBON_AUTH_REDIRECT_CONFIG,
} from "@/constants";
import {
  Button,
  Dropdown,
  InfinitePagination,
  Loader,
  NextImage,
  Stack,
  Typography,
  When,
} from "../common";
import { SelectChangeEvent } from "@mui/material/Select";
import { useGetQuestionBySubjectId, usePagination } from "@/services";
import { JobListSortEnum, TypographyVariantEnum } from "@/types";
import AdminQuestionCard from "./AdminQuestionCard";
import { useRouter } from "next/router";
import {
  AppBar,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { JA_LOGO, SearchIcon } from "@/assets";
import { colorStyles, useThemeContext } from "@/styles";
import AccountPopover from "../Header/AccountPopover";

function AdminAssessmentQuestion({ subjectId }: { subjectId: number }) {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const { LOGIN_BUTTON } = TOP_RIBBON_AUTH_REDIRECT_CONFIG;
  const { theme } = useThemeContext();

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchString(searchValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const searchProps = {
    input: {
      placeholder: "Search by question id",
    },
  };

  const [selectedSort, setSelectedSort] = useState<JobListSortEnum[]>([
    JobListSortEnum.CREATED_DATE_DESC,
  ]);
  const subjectInfoAPIData = useGetQuestionBySubjectId({
    queryParams: {
      subjectId,
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
      search: searchString,
    },
  });
  const { paginatedInfoData, hasMore } = usePagination({
    paginatedAPIData: subjectInfoAPIData,
  });

  const {
    ADD_QUESTION_BUTTON,
    EXCEL_FILE_UPLOAD_QUESTION_BUTTON,
    BACK_BUTTON,
    JOB_LISTING_SORT_DROPDOWN,
  } = ADMIN_QUESTION_CARD_CONFIG;

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as JobListSortEnum[]);
  };

  if (subjectInfoAPIData?.isLoading) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  function handleClick(url: string) {
    router.push(
      {
        pathname: `${url}`,
      },
      url
    );
  }

  const isAuthenticated = true;

  return (
    <>
      <Stack
        stackProps={{
          width: "100%",
          bgcolor: "skyblue",
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "130px",
        }}
      >
        <AppBar
          style={{
            backgroundColor: theme.palette.background.paper,
            zIndex: theme.zIndex.drawer + 1,
            borderBottom: `1px solid ${colorStyles.topRibbonColor}`,
          }}
          elevation={0}
        >
          <Stack
            stackProps={{
              className: "items-center w-full justify-between px-2 md:px-20",
              direction: "row",
            }}
          >
            <NextImage
              props={{
                alt: "ja_logo",
                src: JA_LOGO,
              }}
            />

            <When condition={!isAuthenticated}>
              <Button
                {...LOGIN_BUTTON}
                onClick={() => handleClick(LOGIN_URL)}
              />
            </When>
            <When condition={isAuthenticated}>
              <AccountPopover />
            </When>
          </Stack>
        </AppBar>
      </Stack>
      <Stack
        stackProps={{
          direction: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          width: "100%",
          px: { xs: 2, sm: 4, md: 8 },
          gap: { xs: 2, sm: 0 },
          my: { xs: 2, md: 6 },
          sx: { maxWidth: { xs: "100%", md: 1000 }, mx: "auto" },
        }}
      >
        <Stack
          stackProps={{
            direction: { xs: "column", md: "row" },
            spacing: 1,
          }}
        >
          <Button onClick={() => router.back()} {...BACK_BUTTON} />

          <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              // onChange={(e) => {
              //   const newValue = e.target.value;

              //   if (newValue === "" || /^[0-9\b]+$/.test(newValue)) {
              //     setSearchValue(newValue);
              //   }
              // }}
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
        </Stack>

        <Stack
          stackProps={{
            width: { xs: "100%", sm: "auto" },
            spacing: 2,
            justifyItems: "center",
            direction: { xs: "column", sm: "row" },
          }}
        >
          <Dropdown
            {...JOB_LISTING_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        </Stack>
      </Stack>
      <Stack
        stackProps={{
          width: "100%",
          mx: "auto",
          direction: "row",
          spacing: 2,
          justifyContent: "end",
          px: { xs: 2, sm: 4, md: 8 },
          sx: { maxWidth: { xs: "100%", md: 1000 }, mx: "auto" },
        }}
      >
        <Button
          onClick={() =>
            router.push(`/admin/assessment/${subjectId}/create-question`)
          }
          {...ADD_QUESTION_BUTTON}
        />
        <Button
          onClick={() =>
            router.push(`/admin/assessment/${subjectId}/excelupload`)
          }
          {...EXCEL_FILE_UPLOAD_QUESTION_BUTTON}
        />
      </Stack>
      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={subjectInfoAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={subjectInfoAPIData?.isFetchingNextPage}
      >
        <Stack>
          {paginatedInfoData.map((question, idx) => (
            <AdminQuestionCard
              key={question.id ? String(question.id) : undefined}
              index={idx}
              questionData={{
                id: question.id.toString(),
                question: String(question.question_text),
                options: {
                  "1": String(question.option_1),
                  "2": String(question.option_2),
                  "3": String(question.option_3),
                  "4": String(question.option_4),
                },
                answer:
                  question.correct_option !== undefined
                    ? String(question.correct_option)
                    : undefined,
              }}
            />
          ))}
        </Stack>
      </InfinitePagination>
      <When condition={paginatedInfoData?.length === 0}>
        <Typography
          typographyProps={{
            textAlign: "center",
            children: "No Questions Found",
            variant: TypographyVariantEnum.H6,
          }}
        />
      </When>
    </>
  );
}

export default AdminAssessmentQuestion;
