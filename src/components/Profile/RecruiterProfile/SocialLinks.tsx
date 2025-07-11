import { useMemo } from "react";
import { Formik, Loader } from "@/components/common";
import { RECRUITER_SOCIAL_LINKS_CONFIG } from "@/constants";
import {
  createDataForRecruiterSocialLinks,
  getErrorMessageFromAPI,
} from "@/helper";
import { useNotification } from "@/services";
import {
  CommonObjectType,
  CreateOrUpdateRecruiterSocialLinksInput,
} from "@/types";
import { socialLinksValidationSchema } from "@/validator";
import {
  useCreateOrUpdateSocialLinksRecruiter,
  useGetSocialLinksRecruiter,
} from "@/services";

function SocialLinks() {
  const { FORM_CONFIG, NOTIFICATION_CONFIG } = RECRUITER_SOCIAL_LINKS_CONFIG;
  const { SOCIAL_LINK_INPUT_FIELD, SAVE_BUTTON } = FORM_CONFIG;

  const { showNotification } = useNotification();
  const recruiterSocialLinksAPIData = useGetSocialLinksRecruiter();

  const createOrUpdateSocialLinksRecruiter =
    useCreateOrUpdateSocialLinksRecruiter({
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

  const recruiterSocialLinksData = useMemo(() => {
    return (recruiterSocialLinksAPIData?.data?.data || {}) as CommonObjectType;
  }, [recruiterSocialLinksAPIData]);

  const initialValues = useMemo(() => {
    return createDataForRecruiterSocialLinks({
      valueObj: {
        social_links: recruiterSocialLinksData || {},
      } as CommonObjectType,
      source: "apiData",
    });
  }, [recruiterSocialLinksData]);

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    createOrUpdateSocialLinksRecruiter.mutate({
      data: createDataForRecruiterSocialLinks({
        valueObj: values,
      }) as CreateOrUpdateRecruiterSocialLinksInput,
    });
  }

  if (recruiterSocialLinksAPIData?.isLoading)
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
