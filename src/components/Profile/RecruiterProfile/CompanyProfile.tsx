import { useMemo } from "react";
import { Formik, Loader } from "@/components/common";
import {
  RECRUITER_COMPANY_PROFILE_CONFIG,
  UPLOAD_PROFILE_CONFIG,
} from "@/constants";
import {
  createDataForRecruiterProfile,
  getErrorMessageFromAPI,
} from "@/helper";
import {
  useCommonDetails,
  useCreateOrUpdateRecruiterCompanyProfile,
  useGetRecruiterCompanyProfile,
  useNotification,
} from "@/services";
import { CommonObjectType, CreateOrUpdateRecruiterProfileInput } from "@/types";
import { recruiterProfileGeneralInformationValidationSchema } from "@/validator";

function RecruiterCompanyProfile() {
  const { FORM_CONFIG, NOTIFICATION_CONFIG } = RECRUITER_COMPANY_PROFILE_CONFIG;
  const {
    COMPANY_NAME_FIELD,
    COMPANY_ABOUT_US_FIELD,
    EMPTY_FIELD_FOR_ABOUT,
    ADDRESS_LINE_1_FIELD,
    ADDRESS_LINE_2_FIELD,
    CITY_FIELD,
    STATE_FIELD,
    POSTAL_CODE_FIELD,
    COUNTRY_FIELD,
    SAVE_BUTTON,
  } = FORM_CONFIG;

  const { showNotification } = useNotification();
  const recruiterProfileAPIData = useGetRecruiterCompanyProfile();
  const { refetchCommonDetails } = useCommonDetails();

  const createOrUpdateRecruiterCompanyProfileDetails =
    useCreateOrUpdateRecruiterCompanyProfile({
      mutationConfig: {
        onSuccess: () => {
          showNotification(NOTIFICATION_CONFIG.SUCCESS);
          refetchCommonDetails();
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      },
    });

  const recruiterProfileData = useMemo(() => {
    return (recruiterProfileAPIData?.data?.data || {}) as CommonObjectType;
  }, [recruiterProfileAPIData]);

  const initialValues = useMemo(() => {
    return createDataForRecruiterProfile({
      valueObj: (recruiterProfileData || {}) as CommonObjectType,
    });
  }, [recruiterProfileData]);

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    createOrUpdateRecruiterCompanyProfileDetails.mutate({
      data: createDataForRecruiterProfile({
        valueObj: values,
      }) as CreateOrUpdateRecruiterProfileInput,
    });
  }

  if (recruiterProfileAPIData?.isLoading)
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={recruiterProfileGeneralInformationValidationSchema}
      onSuccess={handleFormSuccess}
      fieldDetailsArray={[
        COMPANY_NAME_FIELD,
        UPLOAD_PROFILE_CONFIG,
        COMPANY_ABOUT_US_FIELD,
        EMPTY_FIELD_FOR_ABOUT,
        ADDRESS_LINE_1_FIELD,
        ADDRESS_LINE_2_FIELD,
        CITY_FIELD,
        STATE_FIELD,
        POSTAL_CODE_FIELD,
        COUNTRY_FIELD,
      ]}
      formFooterArray={[SAVE_BUTTON]}
    />
  );
}

export default RecruiterCompanyProfile;
