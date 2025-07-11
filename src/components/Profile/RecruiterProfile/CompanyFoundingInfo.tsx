import { useMemo } from "react";
import { Formik, Loader } from "@/components/common";
import {
  RECRUITER_COMPANY_ID_CONFIG,
  RECRUITER_UPLOAD_DOCUMENT_CONFIG,
} from "@/constants";
import {
  createDataForRecruiterFoundingInfo,
  getErrorMessageFromAPI,
  isUploadedDocumentValidSize,
} from "@/helper";
import {
  useCreateOrUpdateRecruiterFoundingInfo,
  useCreateOrUpdateUserDocuments,
  useDeleteUserDocuments,
  useGetRecruiterFoundingInfo,
  useGetUserDocuments,
  useNotification,
} from "@/services";
import {
  CreateOrUpdateDocumentInput,
  CommonObjectType,
  CreateOrUpdateRecruiterFoundingInfoInput,
  RecruiterDocumentKeyEnum,
} from "@/types";
import { recruiterFoundingInfoValidationSchema } from "@/validator";

function RecruiterFoundingInfo() {
  const { FORM_CONFIG, NOTIFICATION_CONFIG, UPLOAD_INFO_HEADING } =
    RECRUITER_COMPANY_ID_CONFIG;
  const {
    INDUSTRY_TYPE,
    ORGANIZATION_TYPE,
    COMPANY_SIZE,
    COMPANY_WEBSITE,
    MISSION,
    VISION,
    SAVE_BUTTON,
  } = FORM_CONFIG;
  const {
    ERROR_NOTIFICATION_CONFIG,
    UPDATE_NOTIFICATION_CONFIG,
    DELETE_NOTIFICATION_CONFIG,
  } = RECRUITER_UPLOAD_DOCUMENT_CONFIG;

  const { showNotification } = useNotification();
  const recruiterFoundingInfoAPIData = useGetRecruiterFoundingInfo();
  const documentsInfoAPIData = useGetUserDocuments();

  const createOrUpdateRecruiterFoundingInfoDetails =
    useCreateOrUpdateRecruiterFoundingInfo({
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

  const createOrUpdateUserDocuments = useCreateOrUpdateUserDocuments({
    mutationConfig: {
      onSuccess: (_, { data }) => {
        showNotification(
          UPDATE_NOTIFICATION_CONFIG(
            data?.file_type as RecruiterDocumentKeyEnum
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
          DELETE_NOTIFICATION_CONFIG(file_type as RecruiterDocumentKeyEnum)
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

  const recruiterDocumentInfo = useMemo(() => {
    return (
      (documentsInfoAPIData?.data?.data || []) as CommonObjectType[]
    ).reduce((acc, curr) => {
      acc[curr?.file_type as string] = {
        ...curr,
      };
      return acc;
    }, {});
  }, [documentsInfoAPIData]);

  const recruiterFoundingInfoData = useMemo(() => {
    return (recruiterFoundingInfoAPIData?.data?.data || {}) as CommonObjectType;
  }, [recruiterFoundingInfoAPIData]);

  const initialValues = useMemo(() => {
    return createDataForRecruiterFoundingInfo({
      valueObj: (recruiterFoundingInfoData || {}) as CommonObjectType,
    });
  }, [recruiterFoundingInfoData]);

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    createOrUpdateRecruiterFoundingInfoDetails.mutate({
      data: createDataForRecruiterFoundingInfo({
        valueObj: values,
      }) as CreateOrUpdateRecruiterFoundingInfoInput,
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

  function onCreateDocument(documentKey: RecruiterDocumentKeyEnum, file: File) {
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
        file_type: documentDetails?.file_type as RecruiterDocumentKeyEnum,
      });
    }
  }

  const uploadDocumentsFields = useMemo(() => {
    return [
      RECRUITER_UPLOAD_DOCUMENT_CONFIG.REGISTRATION_NUMBER_FIELD,
      RECRUITER_UPLOAD_DOCUMENT_CONFIG.CIN_NUMBER_FIELD,
      RECRUITER_UPLOAD_DOCUMENT_CONFIG.GST_NUMBER_FIELD,
      RECRUITER_UPLOAD_DOCUMENT_CONFIG.OTHER_FIELD,
    ]?.map((fieldData) => {
      let extraData = {};
      if (recruiterDocumentInfo?.[fieldData?.documentKey]) {
        const documentDetails = recruiterDocumentInfo?.[
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
  }, [recruiterDocumentInfo]);

  if (recruiterFoundingInfoAPIData?.isLoading)
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
        validationSchema={recruiterFoundingInfoValidationSchema}
        onSuccess={handleFormSuccess}
        fieldDetailsArray={[
          ORGANIZATION_TYPE,
          INDUSTRY_TYPE,
          COMPANY_SIZE,
          COMPANY_WEBSITE,
          MISSION,
          VISION,
          UPLOAD_INFO_HEADING,
          ...uploadDocumentsFields,
        ]}
        formFooterArray={[SAVE_BUTTON]}
      />
    </>
  );
}

export default RecruiterFoundingInfo;
