import { useMemo } from "react";
import { Formik, Loader } from "@/components/common";
import { JOB_SEEKER_SOCIAL_LINKS_CONFIG } from "@/constants";
import {
  createDataForStudentProfileSocialLinks,
  getErrorMessageFromAPI,
} from "@/helper";
import {
  useCreateOrUpdateSocialLinksJobSeeker,
  useGetSocialLinksJobSeeker,
  useNotification,
} from "@/services";
import {
  CommonObjectType,
  CreateOrUpdateStudentProfileSocialLinksInput,
} from "@/types";
import { socialLinksValidationSchema } from "@/validator";

function SocialLinks() {
  const { FORM_CONFIG, NOTIFICATION_CONFIG } = JOB_SEEKER_SOCIAL_LINKS_CONFIG;
  const { SOCIAL_LINK_INPUT_FIELD, SAVE_BUTTON } = FORM_CONFIG;

  const { showNotification } = useNotification();
  const jobSeekerSocialLinksAPIData = useGetSocialLinksJobSeeker();

  const createOrUpdateSocialLinksJobSeeker =
    useCreateOrUpdateSocialLinksJobSeeker({
      mutationConfig: {
        onSuccess: () => {
          showNotification(NOTIFICATION_CONFIG.SUCCESS);
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      },
    });

  const jobSeekerSocialLinksData = useMemo(() => {
    return (jobSeekerSocialLinksAPIData?.data?.data || {}) as CommonObjectType;
  }, [jobSeekerSocialLinksAPIData]);

  const initialValues = useMemo(() => {
    return createDataForStudentProfileSocialLinks({
      valueObj: {
        social_links: jobSeekerSocialLinksData || {},
      } as CommonObjectType,
      source: "apiData",
    });
  }, [jobSeekerSocialLinksData]);

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    createOrUpdateSocialLinksJobSeeker.mutate({
      data: createDataForStudentProfileSocialLinks({
        valueObj: values,
      }) as CreateOrUpdateStudentProfileSocialLinksInput,
    });
  }

  if (jobSeekerSocialLinksAPIData?.isLoading)
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={socialLinksValidationSchema}
        onSuccess={handleFormSuccess}
        fieldDetailsArray={[SOCIAL_LINK_INPUT_FIELD]}
        formFooterArray={[SAVE_BUTTON]}
      />
    </>
  );
}

export default SocialLinks;
