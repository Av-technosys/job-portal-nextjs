import React, { Children, useState } from "react";
import { ADMIN_QUESTION_CARD_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import {
  AutoComplete,
  Button,
  Dropdown,
  InfinitePagination,
  Loader,
  Stack,
  Typography,
  When,
} from "../common";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  useGetSearchDetailsAsPerURLOrUserType,
  useGetQuestionBySubjectId,
  usePagination,
} from "@/services";
import {
  CommonObjectType,
  JobListSortEnum,
  TypographyVariantEnum,
} from "@/types";
import AdminQuestionCard from "./AdminQuestionCard";
import { useRouter } from "next/router";

function AdminAssessmentQuestion({ subjectId }: { subjectId: number }) {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<JobListSortEnum[]>([
    JobListSortEnum.CREATED_DATE_DESC,
  ]);
  const subjectInfoAPIData = useGetQuestionBySubjectId({
    queryParams: {
      subjectId,
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
    },
  });
  const { paginatedInfoData, hasMore } = usePagination({
    paginatedAPIData: subjectInfoAPIData,
  });

  const { ADD_QUESTION_BUTTON, BACK_BUTTON, JOB_LISTING_SORT_DROPDOWN } =
    ADMIN_QUESTION_CARD_CONFIG;
  const [searchString] = useState("");
  const { searchProps } = useGetSearchDetailsAsPerURLOrUserType({
    searchString,
  });
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

  return (
    <>
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
        <Stack stackProps={{ flex: 1, direction: "row", spacing: 1 }}>
          <Button
            onClick={() => router.push(`/admin/assessment`)}
            {...BACK_BUTTON}
          />
          <AutoComplete
            textfieldProps={{
              ...(searchProps.input as CommonObjectType),
              placeholder: "Search question by ID",
            }}
            styles={{
              autocompleteStyles: {
                width: "30%",
                minWidth: { xs: "100%", sm: 252 },
                "& .MuiOutlinedInput-root": {
                  height: 50,
                },
              },
            }}
          />
        </Stack>

        <Stack
          stackProps={{
            width: { xs: "100%", sm: "auto" },
            spacing: 2,
            justifyItems: "center",
            direction: { xs: "column", sm: "row" },
          }}
        >
          <Stack
            stackProps={{
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() =>
                router.push(`/admin/assessment/${subjectId}/create-question`)
              }
              {...ADD_QUESTION_BUTTON}
            />
          </Stack>
          <Dropdown
            {...JOB_LISTING_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        </Stack>
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
