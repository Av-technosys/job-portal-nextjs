import React, { useMemo, useState } from "react";
import { ADMIN_QUESTION_CARD_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import {
  AutoComplete,
  Button,
  Dropdown,
  InfinitePagination,
  Loader,
  Stack,
} from "../common";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  useGetSearchDetailsAsPerURLOrUserType,
  useGetQuestionBySubjectId,
  usePagination,
} from "@/services";
import { CommonObjectType, JobListSortEnum } from "@/types";
import AdminQuestionCard from "./AdminQuestionCard";

function AdminAssessmentSubject({ subjectId }: { subjectId: number }) {
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
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: subjectInfoAPIData,
  });

  //  http:  127.0.0.1:8000/assessment/get_question_by_subject_id/5/
  const { SEARCHBAR_TEXT, ADD_QUESTION_BUTTON, JOB_LISTING_SORT_DROPDOWN } =
    ADMIN_QUESTION_CARD_CONFIG;
  const [searchString, setSearchString] = useState("");
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
          px: { xs: 2, sm: 4, md: 8, lg: 12, xl: 25 },
          gap: { xs: 2, sm: 0 },
          my: { xs: 2, md: 6 },
          sx: { maxWidth: { xs: "100%", md: 1000 }, mx: "auto" },
        }}
      >
        <Stack stackProps={{ flex: 1 }}>
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
            <Button {...ADD_QUESTION_BUTTON} />
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
        {/* <Stack>
          <AdminQuestionCard />
        </Stack> */}
        <Stack>
          {paginatedInfoData.map((question, idx) => {
            // Ensure question has the required properties
            const formattedQuestion = {
              id: String(question?.id ?? idx),
              question: String(question?.question ?? ""),
              options:
                typeof question?.options === "object"
                  ? Object.fromEntries(
                      Object.entries(question?.options ?? {}).map(
                        ([key, value]) => [key, String(value)]
                      )
                    )
                  : {},
              answer:
                question?.answer !== undefined
                  ? String(question?.answer)
                  : undefined,
            };
            return (
              <AdminQuestionCard
                key={formattedQuestion.id}
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
            );
          })}
        </Stack>
      </InfinitePagination>
    </>
  );
}

export default AdminAssessmentSubject;
