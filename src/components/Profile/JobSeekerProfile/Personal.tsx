import { Formik, Loader } from "@/components/common";
import {
  JOB_SEEKER_UPLOAD_PROFILE_CONFIG,
  STUDENT_PROFILE_HEADING_DETAILS_CONFIG,
  STUDENT_PROFILE_PERSONAL_CONFIG,
} from "@/constants";
import {
  createDataForStudentProfilePersonalDetails,
  getErrorMessageFromAPI,
} from "@/helper";
import {
  useCommonDetails,
  useCreateOrUpdateStudentProfilePersonalInfo,
  useGetStudentProfilePersonalInfo,
  useNotification,
} from "@/services";
import {
  CommonObjectType,
  CreateOrUpdateStudentProfilePersonalInfoInput,
} from "@/types";
import { studentProfilePersonalInformationValidationSchema } from "@/validator";
import { useMemo } from "react";

function Personal() {
  const { CORRESPONDENCE_ADDRESS_HEADING } =
    STUDENT_PROFILE_HEADING_DETAILS_CONFIG;
  const { FORM_CONFIG, NOTIFICATION_CONFIG } = STUDENT_PROFILE_PERSONAL_CONFIG;
  const {
    EMPTY_FIELD,
    NAME_FIELD,
    GENDER_FIELD,
    DATE_OF_BIRTH_FIELD,
    PHONE_NUMBER_FIELD,
    EMAIL_FIELD,
    ADDRESS_LINE_1_FIELD,
    ADDRESS_LINE_2_FIELD,
    CITY_FIELD,
    STATE_FIELD,
    COUNTRY_FIELD,
    POSTAL_CODE_FIELD,
    SAVE_BUTTON,
  } = FORM_CONFIG;
  const { refetchCommonDetails } = useCommonDetails();
  const { showNotification } = useNotification();
  const jobSeekerPersonalInfoAPIData = useGetStudentProfilePersonalInfo();
  const jobSeekerPersonalInfoMutate =
    useCreateOrUpdateStudentProfilePersonalInfo({
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

  const jobSeekerPersonalInfo = useMemo(() => {
    return (jobSeekerPersonalInfoAPIData?.data?.data || {}) as CommonObjectType;
  }, [jobSeekerPersonalInfoAPIData]);

  const initialValues = useMemo(() => {
    return createDataForStudentProfilePersonalDetails({
      source: "apiData",
      valueObj: jobSeekerPersonalInfo,
    });
  }, [jobSeekerPersonalInfo]);

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    jobSeekerPersonalInfoMutate.mutate({
      data: createDataForStudentProfilePersonalDetails({
        valueObj: values,
      }) as CreateOrUpdateStudentProfilePersonalInfoInput,
    });
  }

  if (jobSeekerPersonalInfoAPIData?.isLoading)
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
        validationSchema={studentProfilePersonalInformationValidationSchema}
        onSuccess={handleFormSuccess}
        fieldDetailsArray={[
          NAME_FIELD,
          JOB_SEEKER_UPLOAD_PROFILE_CONFIG,
          DATE_OF_BIRTH_FIELD,
          GENDER_FIELD,
          EMPTY_FIELD,
          EMAIL_FIELD,
          PHONE_NUMBER_FIELD,
          EMPTY_FIELD,
          CORRESPONDENCE_ADDRESS_HEADING,
          ADDRESS_LINE_1_FIELD,
          ADDRESS_LINE_2_FIELD,
          CITY_FIELD,
          STATE_FIELD,
          COUNTRY_FIELD,
          POSTAL_CODE_FIELD,
        ]}
        formFooterArray={[SAVE_BUTTON]}
      />
    </>
  );
}

export default Personal;
