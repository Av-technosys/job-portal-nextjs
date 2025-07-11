import { useMemo, useState } from "react";
import { JOB_DETAILS_CONFIG } from "@/constants";
import { createDataForJobPosting, getErrorMessageFromAPI } from "@/helper";
import { CommonObjectType, CreateOrUpdateJobPostInput } from "@/types";
import { jobDetailsValidationSchema } from "@/validator";
import { Formik } from "../common";
import { useCreateOrUpdateJobPost, useNotification } from "@/services";
import SuccessBox from "./SuccessBox";

function JobDetails() {
  const {
    FORM_CONFIG,
    SALARY_HEADING,
    EXTRA_INFO_HEADING,
    LOCATION_HEADING,
    SKILLS_HEADING,
    DESCRIPTION_HEADING,
    JOB_HEADING,
  } = JOB_DETAILS_CONFIG;
  const {
    JOB_TITLE_FIELD,
    JOB_ROLE_FIELD,
    MIN_SALARY_FIELD,
    MAX_SALARY_FIELD,
    EDUCATION_FIELD,
    EXPERIENCE_FIELD,
    JOB_TYPE_FIELD,
    JOB_LEVEL_FIELD,
    CITY_FIELD,
    STATE_FIELD,
    COUNTRY_FIELD,
    SKILLS_FIELD,
    DESCRIPTION_FIELD,
    VACANCY_FIELD,
    POST_JOB_BUTTON,
    DATE_OF_BIRTH_FIELD,
    TIME_DURATION
  } = FORM_CONFIG;

  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialValues = useMemo(() => {
    const values = createDataForJobPosting({
      valueObj: {},
    });
    return values;
  }, []);

  const createOrUpdateJobDetails = useCreateOrUpdateJobPost({
    mutationConfig: {
      onSuccess: () => {
        setIsModalOpen(true); 
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    createOrUpdateJobDetails.mutate({
      data: createDataForJobPosting({
        valueObj: { ...values },
      }) as CreateOrUpdateJobPostInput,
    });
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={jobDetailsValidationSchema}
        onSuccess={handleFormSuccess}
        fieldDetailsArray={[
          JOB_HEADING,
          JOB_TITLE_FIELD,
          JOB_ROLE_FIELD,
          SALARY_HEADING,
          MIN_SALARY_FIELD,
          MAX_SALARY_FIELD,
          EXTRA_INFO_HEADING,
          EDUCATION_FIELD,
          EXPERIENCE_FIELD,
          JOB_TYPE_FIELD,
          VACANCY_FIELD,
          DATE_OF_BIRTH_FIELD,
          JOB_LEVEL_FIELD,
          LOCATION_HEADING,
          CITY_FIELD,
          STATE_FIELD,
          COUNTRY_FIELD,
          SKILLS_HEADING,
          SKILLS_FIELD,
          DESCRIPTION_HEADING,
          DESCRIPTION_FIELD,
          TIME_DURATION
        ]}
        formFooterArray={[POST_JOB_BUTTON]}
      />
      <SuccessBox isOpen={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
}

export default JobDetails;
