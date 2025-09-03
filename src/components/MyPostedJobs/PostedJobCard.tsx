import { CommonObjectType, JobStatusEnum } from "@/types";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  Stack,
  TextWithIcon,
  Typography,
} from "../common";
import {
  POSTED_JOB_PAGE_CONFIG,
  NOTIFICATION_CONFIG,
  REOPEN_JOB_POST,
  MARK_AS_EXPIRED,
  DELETE_JOB_PERMANENTLY,
  ACTIVE_MENU_ITEMS,
  EXPIRED_MENU_ITEMS,
} from "@/constants";
import {
  FmdGoodOutlinedIcon,
  PeopleIcon,
  VisibilityOutlinedIcon,
  CurrencyRupeeIcon,
  CheckCircleOutlinedIcon,
  CancelOutlinedIcon,
  DeleteIcon,
  HighlightOffRoundedIcon,
} from "@/assets";
import { colorStyles } from "@/styles";
import { useMemo, useState } from "react";
import { getErrorMessageFromAPI, getInitials, getStatusProps } from "@/helper";
import { MenuItem } from "@mui/material";
import { useNotification, useUpdateJobStatus, useDeleteJob } from "@/services";

export default function PostedJobCard({
  job,
  handleViewApplicationClick,
}: {
  job: CommonObjectType;
  handleViewApplicationClick: (job: CommonObjectType) => void;
}) {
  const { POSTED_JOB_CARD } = POSTED_JOB_PAGE_CONFIG;
  const {
    DESIGNATION,
    IMAGE,
    SALARY_RANGE,
    LOCATION,
    JOB_TYPE,
    APPLICANTS,
    STATUS,
  } = POSTED_JOB_CARD;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const updateJobToExpiredMutate = useUpdateJobStatus();
  const useDeleteJobMutate = useDeleteJob();
  const { showNotification } = useNotification();

  function updateJobToExpired(jobId: number, status: string) {
    updateJobToExpiredMutate.mutate(
      { id: jobId, status: status },
      {
        onSuccess: () => {
          showNotification(NOTIFICATION_CONFIG.SUCCESS);
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

  function deleteJob(jobId: number) {
    useDeleteJobMutate.mutate(jobId, {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.DELETE_SUCCESS);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    });
  }
  const ACTIVE_MENU_ICONS = [
    {
      icon: <DeleteIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
    {
      icon: <HighlightOffRoundedIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
  ];
  const EXPIRED_MENU_ICONS = [
    {
      icon: <DeleteIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
    {
      icon: <CheckCircleOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
  ];

  function handleMenuItemClick(key: string, jobId: number) {
    switch (key) {
      case DELETE_JOB_PERMANENTLY:
        deleteJob(jobId);
        break;
      case MARK_AS_EXPIRED:
        updateJobToExpired(jobId, JobStatusEnum.EXPIRED);
        break;
      case REOPEN_JOB_POST:
        updateJobToExpired(jobId, JobStatusEnum.ACTIVE);
        break;
    }
    handleClose();
  }

  const handleIconButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ACTIVE_MENU = ACTIVE_MENU_ITEMS.map((item, index) => ({
    ...item,
    icon: ACTIVE_MENU_ICONS[index].icon,
  }));

  const EXPIRED_MENU = EXPIRED_MENU_ITEMS.map((item, index) => ({
    ...item,
    icon: EXPIRED_MENU_ICONS[index].icon,
  }));

  const postedJobDetails = useMemo(() => {
    return [
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{
              color: colorStyles.listTitleTextColor,
              fontSize: "medium",
            }}
          />
        ),
        textProps: LOCATION(job),
      },
      {
        icon: (
          <CurrencyRupeeIcon
            sx={{
              color: colorStyles.listTitleTextColor,
              fontSize: "medium",
            }}
          />
        ),
        textProps: SALARY_RANGE(job),
      },
    ];
  }, [LOCATION, SALARY_RANGE, job]);

  const JOB_STATUS_ICONS: Record<JobStatusEnum, JSX.Element> = {
    [JobStatusEnum.ACTIVE]: (
      <CheckCircleOutlinedIcon
        sx={{
          color: colorStyles.green,
          fontSize: "medium",
        }}
      />
    ),
    [JobStatusEnum.EXPIRED]: (
      <CancelOutlinedIcon
        sx={{
          color: colorStyles.errorColor,
          fontSize: "medium",
        }}
      />
    ),
  };
  const { color, label } = getStatusProps(job.job_status as JobStatusEnum);

  return (
    <>
      <Stack
        stackProps={{
          className: "my-2 mb-2 p-1 border hover:border capitalize",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
          sx: {
            borderColor: colorStyles.cardBorderColor,
            "&:hover": {
              borderColor: colorStyles.filterTagsTextColor,
            },
          },
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            gap: 2,
            width: "45%",
          }}
        >
          <Stack
            stackProps={{
              className: "border rounded-lg",
            }}
          >
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job.company_name || "") })}
            </Avatar>
          </Stack>
          <Stack
            stackProps={{
              direction: "column",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <Typography {...DESIGNATION(job)} />
            <Stack
              stackProps={{
                direction: "row",
              }}
            >
              {postedJobDetails.map((detail, index) => (
                <TextWithIcon
                  key={`postedJobDetails-${index}`}
                  icon={detail.icon}
                  textProps={detail.textProps}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Stack stackProps={{ direction: "row", gap: 10, alignItems: "center" }}>
          <Typography {...JOB_TYPE(job)} />
          <TextWithIcon
            icon={
              <PeopleIcon
                sx={{
                  color: colorStyles.listTitleTextColor,
                  fontSize: "medium",
                }}
              />
            }
            textProps={APPLICANTS(job)}
          />
          <IconButton onClick={handleIconButtonClick}>
            {JOB_STATUS_ICONS?.[job?.job_status as JobStatusEnum] || null}
            <Typography {...STATUS(color, label)} />
          </IconButton>
          <Menu
            handleClose={handleClose}
            anchorEl={anchorEl}
            styles={{
              paperStyles: {
                width: "250px",
              },
            }}
          >
            {(job.job_status === JobStatusEnum.ACTIVE
              ? ACTIVE_MENU
              : EXPIRED_MENU
            ).map((item) => (
              <MenuItem
                key={`postedJobCardMenu-${item.key}`}
                onClick={() =>
                  handleMenuItemClick(item.key, Number(job.job_id))
                }
              >
                {item.icon}
                {item.label}
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            onClick={() => handleViewApplicationClick(job as CommonObjectType)}
          >
            <VisibilityOutlinedIcon
              sx={{
                color: colorStyles.listTitleTextColor,
                "&:hover": {
                  color: colorStyles.filterTagsTextColor,
                },
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}
