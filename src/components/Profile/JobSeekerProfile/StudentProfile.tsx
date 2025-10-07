import { Formik, Loader } from "@/components/common";
import {
  JOB_SEEKER_UPLOAD_DOCUMENT_CONFIG,
  STUDENT_PROFILE_HEADING_DETAILS_CONFIG,
  STUDENT_PROFILE_PROFILE_CONFIG,
} from "@/constants";
import {
  createDataForStudentProfileGeneralDetails,
  getErrorMessageFromAPI,
  isUploadedDocumentValidSize,
} from "@/helper";
import {
  useCreateOrUpdateStudentProfileGeneralInfo,
  useCreateOrUpdateUserDocuments,
  useDeleteUserDocuments,
  useGetStudentProfileGeneralInfo,
  useGetUserDocuments,
  useNotification,
} from "@/services";
import {
  CommonObjectType,
  CreateOrUpdateDocumentInput,
  CreateOrUpdateStudentProfileGeneralInfoInput,
  JobSeekerDocumentKeyEnum,
} from "@/types";
import { studentProfileGeneralInformationValidationSchema } from "@/validator";
import { useMemo } from "react";

function StudentProfile() {
  const {
    FORM_CONFIG,
    ACADEMIC_QUALIFICATION_FORM_CONFIG,
    PROFESSIONAL_SKILLS_FORM_CONFIG,
    NOTIFICATION_CONFIG,
  } = STUDENT_PROFILE_PROFILE_CONFIG;
  const {
    SALARY_EXPECTATIONS_HEADING,
    UPLOAD_DOCUMENTS_HEADING,
    ACADEMIC_QUALIFICATION_HEADING,
    PROFESSIONAL_SKILLS_HEADING,
  } = STUDENT_PROFILE_HEADING_DETAILS_CONFIG;
  const {
    ERROR_NOTIFICATION_CONFIG,
    UPDATE_NOTIFICATION_CONFIG,
    DELETE_NOTIFICATION_CONFIG,
  } = JOB_SEEKER_UPLOAD_DOCUMENT_CONFIG;
  const {
    CURRENT_SALARY_FIELD,
    EXPECTING_SALARY_FIELD,
    JOB_SEARCH_STATUS_FIELD,
    NOTICE_PERIOD_FIELD,
    COVER_LATER_PARAGRAPH_FIELD,
    SAVE_BUTTON,
  } = FORM_CONFIG;

  const { showNotification } = useNotification();
  const jobSeekerGeneralInfoAPIData = useGetStudentProfileGeneralInfo();
  const documentsInfoAPIData = useGetUserDocuments();
  const jobSeekerGeneralInfoMutate = useCreateOrUpdateStudentProfileGeneralInfo(
    {
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
    }
  );

  const createOrUpdateUserDocuments = useCreateOrUpdateUserDocuments({
    mutationConfig: {
      onSuccess: (_, { data }) => {
        showNotification(
          UPDATE_NOTIFICATION_CONFIG(
            data?.file_type as JobSeekerDocumentKeyEnum
          )
        );
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  const deleteUserDocument = useDeleteUserDocuments({
    mutationConfig: {
      onSuccess: (_, { file_type }) => {
        showNotification(
          DELETE_NOTIFICATION_CONFIG(file_type as JobSeekerDocumentKeyEnum)
        );
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  const jobSeekerGeneralInfo = useMemo(() => {
    return (jobSeekerGeneralInfoAPIData?.data?.data || {}) as CommonObjectType;
  }, [jobSeekerGeneralInfoAPIData]);

  const jobSeekerDocumentInfo = useMemo(() => {
    return (
      (documentsInfoAPIData?.data?.data || []) as CommonObjectType[]
    ).reduce((acc, curr) => {
      acc[curr?.file_type as string] = {
        ...curr,
      };
      return acc;
    }, {});
  }, [documentsInfoAPIData]);

  const initialValues = useMemo(() => {
    return createDataForStudentProfileGeneralDetails({
      source: "apiData",
      valueObj: jobSeekerGeneralInfo,
    });
  }, [jobSeekerGeneralInfo]);

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    jobSeekerGeneralInfoMutate.mutate({
      data: createDataForStudentProfileGeneralDetails({
        valueObj: values,
      }) as CreateOrUpdateStudentProfileGeneralInfoInput,
    });
  }

  function isFileValid(file: File) {
    if (file && file?.size && isUploadedDocumentValidSize(file?.size)) {
      return true;
    } else {
      showNotification(ERROR_NOTIFICATION_CONFIG.FILE_SIZE_ERROR);
      return false;
    }
  }

  function onCreateDocument(documentKey: JobSeekerDocumentKeyEnum, file: File) {
    if (isFileValid(file) && documentKey !== undefined) {
      createOrUpdateUserDocuments.mutate({
        data: {
          file_type: documentKey,
          file,
        } as CreateOrUpdateDocumentInput,
      });
    }
  }

  function onUpdateDocument(documentDetails: CommonObjectType, file: File) {
    if (isFileValid(file) && documentDetails?.id !== undefined) {
      createOrUpdateUserDocuments.mutate({
        data: {
          file_type: documentDetails?.file_type,
          file,
        } as CreateOrUpdateDocumentInput,
        id: documentDetails?.id as number,
      });
    }
  }

  function onDeleteDocument(documentDetails: CommonObjectType) {
    if (documentDetails?.id) {
      deleteUserDocument.mutate({
        id: documentDetails?.id as string,
        file_type: documentDetails?.file_type as JobSeekerDocumentKeyEnum,
      });
    }
  }

  const uploadDocumentsFields = useMemo(() => {
    return [
      JOB_SEEKER_UPLOAD_DOCUMENT_CONFIG.RESUME_FIELD,
      JOB_SEEKER_UPLOAD_DOCUMENT_CONFIG.VIDEO_FIELD,
      JOB_SEEKER_UPLOAD_DOCUMENT_CONFIG.CERTIFICATE_FIELD,
      JOB_SEEKER_UPLOAD_DOCUMENT_CONFIG.OTHER_FIELD,
    ]?.map((fieldData) => {
      let extraData = {};
      if (jobSeekerDocumentInfo?.[fieldData?.documentKey]) {
        const documentDetails = jobSeekerDocumentInfo?.[
          fieldData?.documentKey
        ] as CommonObjectType;
        extraData = {
          onUpload: (file: File) => onUpdateDocument(documentDetails, file),
          onDelete: () => onDeleteDocument(documentDetails),
          documentDetails,
        };
      } else {
        extraData = {
          onUpload: (file: File) =>
            onCreateDocument(fieldData?.documentKey, file),
        };
      }
      return {
        ...fieldData,
        ...extraData,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobSeekerDocumentInfo]);

  if (jobSeekerGeneralInfoAPIData?.isLoading)
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
        validationSchema={studentProfileGeneralInformationValidationSchema}
        onSuccess={handleFormSuccess}
        fieldDetailsArray={[
          ACADEMIC_QUALIFICATION_HEADING,
          ACADEMIC_QUALIFICATION_FORM_CONFIG.HIGHEST_QUALIFICATION_FIELD,
          ACADEMIC_QUALIFICATION_FORM_CONFIG.INSTITUTION_NAME_FIELD,
          ACADEMIC_QUALIFICATION_FORM_CONFIG.QUALIFICATION_STATUS_FIELD,
          ACADEMIC_QUALIFICATION_FORM_CONFIG.SCORE_FIELD,
          ACADEMIC_QUALIFICATION_FORM_CONFIG.START_DATE_FIELD,
          ACADEMIC_QUALIFICATION_FORM_CONFIG.END_DATE_FIELD,
          PROFESSIONAL_SKILLS_HEADING,
          PROFESSIONAL_SKILLS_FORM_CONFIG.SKILL_SET_ARRAY_FIELD,
          SALARY_EXPECTATIONS_HEADING,
          CURRENT_SALARY_FIELD,
          EXPECTING_SALARY_FIELD,
          JOB_SEARCH_STATUS_FIELD,
          NOTICE_PERIOD_FIELD,
          COVER_LATER_PARAGRAPH_FIELD,
          UPLOAD_DOCUMENTS_HEADING,
          ...uploadDocumentsFields,
        ]}
        formFooterArray={[SAVE_BUTTON]}
      />
    </>
  );
}

export default StudentProfile;
