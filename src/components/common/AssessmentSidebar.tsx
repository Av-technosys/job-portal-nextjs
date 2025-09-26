import { Box, Toolbar } from "@mui/material";
import { dimensionStyle, useThemeContext } from "@/styles";
import { useScreen } from "@/services";
import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";
import AssessmentSideBarDrawer from "../Assessments/AssessmentSideBarDrawer";
import Drawer from "./Drawer";

function AssessmentSidebar({
  setCurrentQIndex,
  userAssessmentDetails,
  assessmentSection,
  userAnsweredData,
  timeForSubmit,
  tabSwitchCount,
  attemptId,
  questionData,
}: any) {
  const { isExtraSmallScreen } = useScreen();
  const [isExpanded, setIsExpanded] = useState(!isExtraSmallScreen);
  const { theme } = useThemeContext();

  useEffect(() => {
    if (isExpanded && isExtraSmallScreen) {
      setIsExpanded(true);
    }
  }, [isExtraSmallScreen, isExpanded]);

  return (
    <>
      {!isExtraSmallScreen ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderLeft: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar
            sx={{
              minHeight: `${dimensionStyle.assessmentheaderHeight} !important`,
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            <AssessmentSideBarDrawer
              isExpanded={isExpanded}
              setCurrentQIndex={setCurrentQIndex}
              userAssessmentDetails={userAssessmentDetails}
              assessmentSection={assessmentSection}
              userAnsweredData={userAnsweredData}
              timeForSubmit={timeForSubmit}
              tabSwitchCount={tabSwitchCount}
              attemptId={attemptId}
              questionData={questionData}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Drawer
            anchor="right"
            variant="permanent"
            sx={{
              width:
                dimensionStyle[
                  isExpanded
                    ? "assessmentsidebarExpandedWidth"
                    : "assessmentsidebarWidth"
                ],
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width:
                  dimensionStyle[
                    isExpanded
                      ? "assessmentsidebarExpandedWidth"
                      : "assessmentsidebarWidth"
                  ],
                boxSizing: "border-box",
              },
              ["& .MuiListItemIcon-root"]: {
                minWidth: isExpanded ? undefined : "100%",
                padding: isExpanded ? undefined : "5px",
              },
            }}
          >
            <Toolbar
              sx={{
                minHeight: `${dimensionStyle.assessmentheaderHeight} !important`,
              }}
            />
            <Box
              sx={{
                height: "100%",
                width: "100%",
                overflow: "auto",
                direction: "column",
                justifyContent: "space-between",
              }}
            >
              <AssessmentSideBarDrawer
                isExpanded={isExpanded}
                setCurrentQIndex={setCurrentQIndex}
                userAssessmentDetails={userAssessmentDetails}
                assessmentSection={assessmentSection}
                userAnsweredData={userAnsweredData}
                timeForSubmit={timeForSubmit}
                tabSwitchCount={tabSwitchCount}
              />
            </Box>
          </Drawer>

          <Box
            sx={{
              position: "fixed",
              top: { xs: "50%" },
              right: `calc(${
                dimensionStyle[
                  isExpanded
                    ? "assessmentsidebarExpandedWidth"
                    : "assessmentsidebarWidth"
                ]
              } - 20px)`,
              transform: "translateY(-50%)",
              zIndex: theme.zIndex.drawer + 1,
            }}
          >
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: 1,
              }}
            >
              {isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
        </>
      )}
    </>
  );
}

export default AssessmentSidebar;
