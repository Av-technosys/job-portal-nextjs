import { CommonObjectType } from "@/types";
import { Avatar, Button, Stack, TextWithIcon, Typography } from "../common";
import { FIND_RECRUITER_PAGE_CONFIG } from "@/constants";
import { getInitials } from "@/helper";
import { BookmarkBorderIcon, FmdGoodOutlinedIcon } from "@/assets";
import { useMemo } from "react";
import { colorStyles } from "@/styles";

export default function FindRecruiterCard({
  recruiter,
  openRecruiterApplicationPopup,
}: {
  recruiter: CommonObjectType;
  openRecruiterApplicationPopup: VoidFunction;
}) {
  const { RECRUITER_CARD } = FIND_RECRUITER_PAGE_CONFIG;
  const {
    RECRUITER_NAME,
    ADDRESS,
    IMAGE,
    RECRUITER_DESIGNATION,
    VIEW_PROFILE_BUTTON,
  } = RECRUITER_CARD;

  const recruiterDetails = useMemo(() => {
    return [
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: ADDRESS(recruiter),
      },
    ];
  }, [ADDRESS, recruiter]);

  return (
    <>
      <Stack
        stackProps={{
          className: "my-3 rounded-lg shadow-lg border p-4 capitalize",
          direction: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 4,
          sx: {
            borderColor: colorStyles.topRibbonColor,
            "&:hover": {
              borderColor: colorStyles.cardHoverBorderColor,
            },
          },
        }}
      >
        <Stack
          stackProps={{
            className: "border rounded-xl",
          }}
        >
          <Avatar {...IMAGE(recruiter).avatarProps}>
            {getInitials({ name: String(recruiter?.industry_type || "") })}
          </Avatar>
        </Stack>
        <Stack
          stackProps={{
            direction: "column",
            gap: 2,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack>
              <Typography {...RECRUITER_NAME(recruiter)} />
              <Typography {...RECRUITER_DESIGNATION(recruiter)} />
            </Stack>
            <Stack>
              <BookmarkBorderIcon />
            </Stack>
          </Stack>
          <Stack
            stackProps={{
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              {/* {recruiterDetails.map((detail, index) => (
                <TextWithIcon
                  key={`recruiterDetails-${index}`}
                  icon={detail.icon}
                  textProps={detail.textProps}
                />
              ))} */}
            </Stack>
            <Stack>
              <Button
                {...VIEW_PROFILE_BUTTON}
                onClick={openRecruiterApplicationPopup}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
