import { getSidebarDetails } from "@/helper";
import { useCommonDetails } from "@/services";
import { useMemo } from "react";
import { List, Skeleton } from "../common";
import { useRouter } from "next/router";
import {
  DASHBOARD_URL,
  MY_APPLIED_JOBS_URL,
  PROFILE_URL,
  CREATE_JOB_URL,
  MY_POSTED_JOBS_URL,
  SAVED_JOB_URL,
  SUBSCRIPTION_URL,
  ASSESSMENT_URL,
} from "@/constants";
import {
  MyJobsIcon,
  OverviewIcon,
  ProfileIcon,
  UploadFileIcon,
  SaveAltIcon,
  CardMembershipIcon,
  AssessmentIcon,
} from "@/assets";

function UserWiseSidebar({ isExpanded }: { isExpanded: boolean }) {
  const { userType } = useCommonDetails();
  const router = useRouter();

  const iconConfig = useMemo(() => {
    return {
      [DASHBOARD_URL]: <OverviewIcon />,
      [MY_APPLIED_JOBS_URL]: <MyJobsIcon />,
      [PROFILE_URL]: <ProfileIcon />,
      [CREATE_JOB_URL]: <UploadFileIcon />,
      [MY_POSTED_JOBS_URL]: <MyJobsIcon />,
      [SAVED_JOB_URL]: <SaveAltIcon />,
      [SUBSCRIPTION_URL]: <CardMembershipIcon />,
      [ASSESSMENT_URL]: <AssessmentIcon />,
    };
  }, []);

  const userWiseSidebar = useMemo(() => {
    if (userType === -1) return [];
    return getSidebarDetails({ userType }).map((item) => ({
      ...item,
      icon: { children: iconConfig[item.listValue] },
      text: isExpanded ? item.text : undefined,
      toolipText: isExpanded ? undefined : item.text,
      key: item.listValue,
    }));
  }, [userType, iconConfig, isExpanded]);

  function handleClick(url: string) {
    router.push(url);
  }

  if (userType === -1) return <Skeleton />;

  return (
    <>
      <List
        listOptions={userWiseSidebar}
        defaultListValue={router?.pathname || ""}
        onClick={handleClick}
      />
    </>
  );
}

export default UserWiseSidebar;
