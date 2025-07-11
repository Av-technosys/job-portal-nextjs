import React, { useRef, useState } from "react";
import {
  useGetCandidateApplication,
  useUpdateCandidateStatus,
  usePagination,
  useNotification,
} from "@/services";
import { InfinitePagination, Stack, Typography, When, Menu } from "../common";
import {
  CANDIDATE_APPLICATION_PAGE_CONFIG,
  CANDIDATE_APPLICATION_MENU_ITEMS,
  SHORTLIST,
  NOT_SHORTLISTED,
  SELECT,
  INTERVIEWED,
  NOT_INTERVIEWED,
  CANDIDATE_NOTIFICATION_CONFIG,
} from "@/constants";
import CandidateApplicationCard from "./CandidateCard";
import { CommonObjectType, Job } from "@/types";
import ApplicationPopup from "./ApplicationPopup";
import { MenuItem } from "@mui/material";
import { getErrorMessageFromAPI } from "@/helper";

function CandidateDetails({ jobDetails }: { jobDetails: Job }) {
  const { TITLE_COUNT, TITLE_HEADER } = CANDIDATE_APPLICATION_PAGE_CONFIG;
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const selectedCandidate = useRef({} as CommonObjectType);

  const [isApplicationPopupOpen, setApplicationPopupStatus] = useState(false);
  const updateCandidateStatusMutate = useUpdateCandidateStatus();
  const { showNotification } = useNotification();

  function updateCandidateStatus(candidateId: number, status: number) {
    updateCandidateStatusMutate.mutate(
      { student_id: candidateId, job_id: jobDetails?.job_id as number, status: status },
      {
        onSuccess: () => {
          showNotification(CANDIDATE_NOTIFICATION_CONFIG.SUCCESS);
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      }
    );
  }

  const handleIconButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const candidateApplicationAPIData = useGetCandidateApplication({
    queryParams: {
      jobId: jobDetails?.job_id as number,
    },
  });
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: candidateApplicationAPIData,
  });

  function openApplicationPopup(candidate: CommonObjectType) {
    selectedCandidate.current = candidate;
    setApplicationPopupStatus(true);
  }

  const handleMenuItemClick = (key: string, candidateId: number) => {
    switch (key) {
      case SHORTLIST:
        updateCandidateStatus(candidateId, 3);
        break;
      case NOT_SHORTLISTED:
        updateCandidateStatus(candidateId, 5);
        break;
      case SELECT:
        updateCandidateStatus(candidateId, 6);
        break;
      case INTERVIEWED:
        updateCandidateStatus(candidateId, 4);
        break;
      case NOT_INTERVIEWED:
        updateCandidateStatus(candidateId, 2);
        break;
    }
    handleClose();
  };


  return (
    <>
      <When condition={totalLength !== 0}>
        <Stack
          stackProps={{
            direction: "row",
            className: "my-4",
            gap: 1,
            alignItems: "baseline",
          }}
        >
          <Typography {...TITLE_COUNT(totalLength)} />
          <Typography {...TITLE_HEADER(totalLength)} />
        </Stack>
      </When>
      <When condition={isApplicationPopupOpen}>
        <ApplicationPopup
          open={isApplicationPopupOpen}
          handleClose={() => setApplicationPopupStatus(false)}
          jobDetails={jobDetails}
          candidateDetails={selectedCandidate.current}
        />
      </When>
      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={candidateApplicationAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={candidateApplicationAPIData?.isFetchingNextPage}
      >
        <Stack>
          {paginatedInfoData?.map((candidate) => (
            <CandidateApplicationCard
              candidate={candidate}
              key={`candidateApplication-${candidate?.id}`}
              openApplicationPopup={() => openApplicationPopup(candidate)}
              handleIconButtonClick={handleIconButtonClick}
            />
          ))}
        </Stack>
      </InfinitePagination>
      <Menu
        handleClose={handleClose}
        anchorEl={anchorEl}
        styles={{
          paperStyles: {
            width: "250px",
          },
        }}
      >
        {CANDIDATE_APPLICATION_MENU_ITEMS.map((item) => (
          <MenuItem
            key={`CandidateApplicationMenu-${item.key}`}
            onClick={() => handleMenuItemClick(item.key, Number(selectedCandidate.current.id))}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default CandidateDetails;
