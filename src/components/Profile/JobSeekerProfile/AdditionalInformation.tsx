import { Formik, Loader } from "@/components/common";
import {
  STUDENT_PROFILE_ADDITIONAL_INFORMATION_CONFIG,
  STUDENT_PROFILE_HEADING_DETAILS_CONFIG,
} from "@/constants";
import {
  createDataForStudentProfileAdditionalInformationDetails,
  getErrorMessageFromAPI,
} from "@/helper";
import {
  useCreateOrUpdateStudentProfileAdditionalInfo,
  useGetStudentProfileAdditionalInfo,
  useNotification,
} from "@/services";
import {
  CommonObjectType,
  CreateOrUpdateStudentProfileAdditionalInfoInput,
} from "@/types";
import { studentProfileAdditionalInfoValidationSchema } from "@/validator";
import { useMemo } from "react";

function AdditionalInformation() {
  const { WORK_EXPERIENCE_HEADING, CERTIFICATION_HEADING, PROJECTS_HEADING } =
    STUDENT_PROFILE_HEADING_DETAILS_CONFIG;
  const {
    WORK_EXPERIENCE_FORM_CONFIG,
    CERTIFICATION_FORM_CONFIG,
    PROJECTS_FORM_CONFIG,
    NOTIFICATION_CONFIG,
    SAVE_BUTTON,
  } = STUDENT_PROFILE_ADDITIONAL_INFORMATION_CONFIG;
  const { showNotification } = useNotification();
  const jobSeekerAdditionalInfoAPIData = useGetStudentProfileAdditionalInfo();
  const jobSeekerAdditionalInfoMutate =
    useCreateOrUpdateStudentProfileAdditionalInfo({
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

  const jobSeekerAdditonalInfo = useMemo(() => {
    return (jobSeekerAdditionalInfoAPIData?.data?.data ||
      {}) as CommonObjectType;
  }, [jobSeekerAdditionalInfoAPIData]);

  const initialValues = useMemo(() => {
    return createDataForStudentProfileAdditionalInformationDetails({
      source: "apiData",
      valueObj: jobSeekerAdditonalInfo,
    });
  }, [jobSeekerAdditonalInfo]);

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    const payloadData = createDataForStudentProfileAdditionalInformationDetails(
      {
        valueObj: values,
      }
    );

    if (Object.keys(payloadData).length > 0) {
      jobSeekerAdditionalInfoMutate.mutate({
        data: payloadData as CreateOrUpdateStudentProfileAdditionalInfoInput,
      });
    }
  }

  if (jobSeekerAdditionalInfoAPIData?.isLoading)
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
        validationSchema={studentProfileAdditionalInfoValidationSchema}
        onSuccess={handleFormSuccess}
        fieldDetailsArray={[
          WORK_EXPERIENCE_HEADING,
          WORK_EXPERIENCE_FORM_CONFIG.WORK_EXPERIENCE_ARRAY_FIELD,
          CERTIFICATION_HEADING,
          CERTIFICATION_FORM_CONFIG.CERTIFICATION_ARRAY_FIELD,
          PROJECTS_HEADING,
          PROJECTS_FORM_CONFIG.PROJECTS_ARRAY_FIELD,
        ]}
        formFooterArray={[SAVE_BUTTON]}
      />
    </>
  );
}

export default AdditionalInformation;
