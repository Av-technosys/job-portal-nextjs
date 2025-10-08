import React, { useEffect, useState } from "react";
import { Loader, Stack, Typography, When } from "../common";
import { useGetJobseekerFullInfo } from "@/services/useGetJobseekerFullInfo";
import { useGetRecruiterFullInfo } from "@/services/useGetRecruiterFullInfo";
import {
  CloseIcon,
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/assets";
import { ADMIN_DRAWER_CONFIG } from "@/constants/adminDrawer";

const AdminSideBarDrawer = ({
  isExpanded,
  selectedUser,
  setSideBarStatus,
  UserType,
}: any) => {
  const { HEADING_TEXT, MAIN_HEADING_TEXT } = ADMIN_DRAWER_CONFIG;
  const id = selectedUser;

  const jobseekerQuery = useGetJobseekerFullInfo({
    queryParams: { id, enabled: UserType === "jobseeker" },
  });

  const recruiterQuery = useGetRecruiterFullInfo({
    queryParams: { id, enabled: UserType === "recruiter" },
  });

  const data =
    UserType === "jobseeker" ? jobseekerQuery.data : recruiterQuery.data;
  const isLoading =
    UserType === "jobseeker"
      ? jobseekerQuery.isLoading
      : recruiterQuery.isLoading;
  const user = data?.data;

  if (isLoading || !user) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  return (
    <Stack
      stackProps={{
        className:
          "p-5 h-full border-l border-gray-300 w-[390px] bg-slate-100 shadow-lg overflow-y-auto",
        direction: "column",
      }}
    >
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography {...MAIN_HEADING_TEXT("User Details")} />
        <button onClick={() => setSideBarStatus(!isExpanded)}>
          <CloseIcon />
        </button>
      </Stack>

      {/* Summary */}
      <Stack
        stackProps={{
          className: "mt-4 rounded-lg shadow-sm",
          direction: "column",
        }}
      >
        <Typography {...HEADING_TEXT("Summary")} />
        <Stack
          stackProps={{
            className: "p-2 bg-white",
            direction: "column",
          }}
        >
          <Stack
            stackProps={{
              className: "mt-2 space-y-1 text-sm",
              direction: "column",
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                spacing: 1,
              }}
            >
              <Typography {...HEADING_TEXT("Id:")} />
              <Stack> {user.id}</Stack>
            </Stack>
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                spacing: 1,
              }}
            >
              <Typography {...HEADING_TEXT("Name:")} />
              <Stack>
                {user.first_name} {user.last_name}
              </Stack>
            </Stack>

            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                spacing: 1,
              }}
            >
              <Typography {...HEADING_TEXT("Email:")} />
              <Stack>{user.email}</Stack>
            </Stack>

            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                spacing: 1,
              }}
            >
              <Typography {...HEADING_TEXT("Phone:")} />
              <Stack>
                {user.country_code} {user.phone_number}
              </Stack>
            </Stack>

            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                spacing: 1,
              }}
            >
              <Typography {...HEADING_TEXT("Status:")} />
              <Stack>{user.is_active ? "Active ✅" : "Inactive ❌"}</Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Personal Profile */}
      <Stack
        stackProps={{ className: "mt-6", direction: "column", width: "full" }}
      >
        <When condition={UserType === "jobseeker"}>
          <Typography {...HEADING_TEXT("Personal Profile")} />
          <Stack
            stackProps={{
              className: "mt-2 bg-white  p-2 space-y-1 text-sm",
              direction: "column",
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                spacing: 1,
              }}
            >
              <Typography {...HEADING_TEXT("DOB:")} />
              <Stack>{user.personal_profile?.date_of_birth}</Stack>
            </Stack>

            <Stack
              stackProps={{
                direction: "column",

                spacing: 1,
              }}
            >
              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Typography {...HEADING_TEXT("Gender:")} />
                <Stack>
                  {user.personal_profile?.gender === 0 ? "Male" : "Female"}
                </Stack>
              </Stack>
              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Typography {...HEADING_TEXT("Address:")} />
                <Stack>
                  {user?.personal_profile?.address_line_1},{" "}
                  {user?.personal_profile?.city}, {user.personal_profile?.state}
                  , {user?.personal_profile?.country}
                </Stack>
              </Stack>

              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Typography {...HEADING_TEXT("Postal Code:")} />
                <Stack>{user?.personal_profile?.postal_code}</Stack>
              </Stack>
            </Stack>
          </Stack>
        </When>
      </Stack>
      <When condition={UserType === "recruiter"}>
        <Typography {...MAIN_HEADING_TEXT("Organization Info")} />
        <Stack
          stackProps={{
            className: "mt-2 bg-white p-2 text-sm text-blue-600 space-y-1",
            direction: "column",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              spacing: 1,
            }}
          >
            <Typography {...HEADING_TEXT("Address:")} />
            <Stack>
              {user?.organization_info?.address_line_1},{" "}
              {user?.organization_info?.city}, {user?.organization_info?.state},{" "}
              {user?.organization_info?.country}
            </Stack>
          </Stack>

          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              spacing: 1,
            }}
          >
            <Typography {...HEADING_TEXT("Postal Code:")} />
            <Stack>{user?.organization_info?.postal_code}</Stack>
          </Stack>
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              spacing: 1,
            }}
          >
            <Typography {...HEADING_TEXT("About Us:")} />
            <Stack>{user?.organization_info?.company_about_us}</Stack>
          </Stack>
        </Stack>
      </When>

      {/* Social Profiles */}
      {user.social_profile.length > 0 && (
        <Stack stackProps={{ className: "mt-6", direction: "column" }}>
          <Typography {...HEADING_TEXT("Social Profiles")} />
          <Stack
            stackProps={{
              className: "mt-2 bg-white p-2 text-sm text-blue-600 space-y-1",
              direction: "column",
            }}
          >
            {user.social_profile.map((sp: any) => (
              <Stack
                key={sp.id}
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Stack>
                  {sp.platform === "facebook" ? (
                    <FacebookIcon />
                  ) : sp.platform === "instagram" ? (
                    <InstagramIcon />
                  ) : sp.platform === "google" ? (
                    <GoogleIcon />
                  ) : sp.platform === "twitter" ? (
                    <TwitterIcon />
                  ) : (
                    <Stack stackProps={{ color: "black" }}>Other Links:</Stack>
                  )}
                </Stack>

                <a
                  href={sp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {sp.url}
                </a>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}

      {/* Academic Profile */}
      <When condition={UserType === "jobseeker"}>
        {user?.academic_profile?.length > 0 && (
          <Stack stackProps={{ className: "mt-6", direction: "column" }}>
            <Typography {...HEADING_TEXT("Academic Profile")} />
            {user.academic_profile.map((ap) => (
              <Stack
                key={ap.id}
                stackProps={{
                  className: "mt-2 border p-2 rounded-md bg-gray-50 text-sm",
                  direction: "column",
                  spacing: 1,
                }}
              >
                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Qualification:")} />
                  <Stack>{ap.qualification_type}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Institution:")} />
                  <Stack>{ap.institution_name}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Score:")} />
                  <Stack>{ap.score}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Start:")} />
                  <Stack>{ap.start_date}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("End:")} />
                  <Stack>{ap.end_date}</Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </When>

      {/* Work Experience */}
      <When condition={UserType === "jobseeker"}>
        {user?.work_experiences?.length > 0 && (
          <Stack stackProps={{ className: "mt-6", direction: "column" }}>
            <Typography {...HEADING_TEXT("Work Experience")} />
            {user.work_experiences.map((we) => (
              <Stack
                key={we.id}
                stackProps={{
                  className: "mt-2 border p-2 rounded-md bg-gray-50 text-sm",
                  direction: "column",
                  spacing: 1,
                }}
              >
                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Organization:")} />
                  <Stack>{we.organization_name}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Designation:")} />
                  <Stack>{we.designation}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Experience:")} />
                  <Stack>{we.experience} years</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Salary:")} />
                  <Stack>{we.salary}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Start:")} />
                  <Stack>{we.start_date}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("End:")} />
                  <Stack>{we.end_date ?? "Present"}</Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </When>

      {/* Certifications */}
      <When condition={UserType === "jobseeker"}>
        {user?.certifications?.length > 0 && (
          <Stack stackProps={{ className: "mt-6", direction: "column" }}>
            <Typography {...HEADING_TEXT("Certifications")} />
            {user.certifications.map((cert) => (
              <Stack
                key={cert.id}
                stackProps={{
                  className: "mt-2 border p-2 rounded-md bg-gray-50 text-sm",
                  direction: "column",
                  spacing: 1,
                }}
              >
                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Name:")} />
                  <Stack>{cert.certification_name}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Institution:")} />
                  <Stack>{cert.institution_name}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Start:")} />
                  <Stack>{cert.start_date}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("End:")} />
                  <Stack>{cert.end_date}</Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </When>

      {/* Projects */}
      <When condition={UserType === "jobseeker"}>
        {user?.projects?.length > 0 && (
          <Stack stackProps={{ className: "mt-6", direction: "column" }}>
            <Typography {...HEADING_TEXT("Projects")} />
            {user.projects.map((proj) => (
              <Stack
                key={proj.id}
                stackProps={{
                  className: "mt-2 border p-2 rounded-md bg-gray-50 text-sm",
                  direction: "column",
                  spacing: 1,
                }}
              >
                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Project:")} />
                  <Stack>{proj.project_name}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Organization:")} />
                  <Stack>{proj.project_organization_name}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("Start:")} />
                  <Stack>{proj.start_date}</Stack>
                </Stack>

                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <Typography {...HEADING_TEXT("End:")} />
                  <Stack>{proj.end_date}</Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </When>

      <When condition={UserType === "recruiter"}>
        <Stack
          stackProps={{
            className: "mt-4 rounded-lg shadow-sm",
            direction: "column",
          }}
        >
          <Typography {...HEADING_TEXT("Founding Info")} />
          <Stack
            stackProps={{
              className: "p-2 bg-white",
              direction: "column",
            }}
          >
            <Stack
              stackProps={{
                className: "mt-2 space-y-1 text-sm",
                direction: "column",
              }}
            >
              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Typography {...HEADING_TEXT("Organization Type:")} />
                <Stack>{user?.founding_info?.organization_type}</Stack>
              </Stack>

              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Typography {...HEADING_TEXT("Industry Type:")} />
                <Stack>{user?.founding_info?.industry_type}</Stack>
              </Stack>

              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Typography {...HEADING_TEXT("Company Size:")} />
                <Stack>{user?.founding_info?.company_size} Employees</Stack>
              </Stack>

              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  spacing: 1,
                }}
              >
                <Typography {...HEADING_TEXT("Company Website:")} />
                <Stack>{user.founding_info?.company_website}</Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </When>
    </Stack>
  );
};

export default AdminSideBarDrawer;
