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
  CANDIDATE_NOTIFICATION_CONFIG,
  getCandidateApplicationStatusValue,
  getCandidateApplicationStatusMenuItems,
} from "@/constants";
import CandidateApplicationCard from "./CandidateCard";
import { CommonObjectType, Job } from "@/types";
import ApplicationPopup from "./ApplicationPopup";
import { MenuItem } from "@mui/material";
import { getErrorMessageFromAPI } from "@/helper";
import { useQueryClient } from "@tanstack/react-query";

function CandidateDetails({ jobDetails }: { jobDetails: Job }) {
  const { TITLE_COUNT, TITLE_HEADER } = CANDIDATE_APPLICATION_PAGE_CONFIG;
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const selectedCandidate = useRef({} as CommonObjectType);
  const queryClient = useQueryClient();

  const [isApplicationPopupOpen, setApplicationPopupStatus] = useState(false);
  const updateCandidateStatusMutate = useUpdateCandidateStatus();
  const { showNotification } = useNotification();

  function getStatusForMenuKey(key: string) {
    return (
      CANDIDATE_APPLICATION_MENU_ITEMS.find((item) => item.key === key)
        ?.status || null
    );
  }

  function isMenuItemDisabled(key: string) {
    const currentStatus = getCandidateApplicationStatusValue(
      selectedCandidate.current?.application_status
    );
    const nextStatus = getStatusForMenuKey(key);

    return (
      updateCandidateStatusMutate.isPending ||
      currentStatus === nextStatus
    );
  }

  function updateCandidateStatus(candidateId: number, status: number) {
    updateCandidateStatusMutate.mutate(
      {
        student_id: candidateId,
        job_id: jobDetails?.job_id as number,
        status: status,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["candidate_application", jobDetails?.job_id],
          });
          showNotification(CANDIDATE_NOTIFICATION_CONFIG.SUCCESS);
          selectedCandidate.current = {
            ...selectedCandidate.current,
            application_status: status,
          };
          candidateApplicationAPIData.refetch();
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

  const handleIconButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    candidate: CommonObjectType
  ) => {
    setAnchorEl(event.currentTarget);
    selectedCandidate.current = candidate;
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
    const nextStatus = getStatusForMenuKey(key);

    if (nextStatus) {
      updateCandidateStatus(candidateId, nextStatus);
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
          onStatusUpdated={(status) => {
            selectedCandidate.current = {
              ...selectedCandidate.current,
              application_status: status,
            };
          }}
        />
      </When>
      <When
        condition={candidateApplicationAPIData?.isFetched && totalLength === 0}
      >
        <Stack
          stackProps={{
            alignItems: "center",
            justifyContent: "center",
            py: 6,
          }}
        >
          <Typography
            typographyProps={{
              children: "No candidates to show yet.",
              variant: "h6",
            }}
          />
        </Stack>
      </When>
      <When condition={totalLength > 0}>
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
                handleIconButtonClick={(event) =>
                  handleIconButtonClick(event, candidate)
                }
              />
            ))}
          </Stack>
        </InfinitePagination>
      </When>
      <Menu
        handleClose={handleClose}
        anchorEl={anchorEl}
        styles={{
          paperStyles: {
            width: "250px",
          },
        }}
      >
        {getCandidateApplicationStatusMenuItems(
          selectedCandidate.current?.application_status
        ).map((item) => (
          <MenuItem
            key={`CandidateApplicationMenu-${item.key}`}
            disabled={isMenuItemDisabled(item.key)}
            onClick={() =>
              handleMenuItemClick(
                item.key,
                typeof selectedCandidate.current?.user === "object"
                  ? Number(
                      (
                        selectedCandidate.current?.user as {
                          id?: string | number;
                        }
                      )?.id
                    )
                  : Number(selectedCandidate.current?.user)
              )
            }
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default CandidateDetails;
