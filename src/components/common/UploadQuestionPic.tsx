import { useCommonDetails, useNotification } from "@/services";
import { ChangeEvent, useMemo, useState } from "react";
import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  CreateOrUpdateQuestionPicInput,
  QuestionImageEnum,
} from "@/types";
import {
  IMAGE,
  QUESTION_PICTURE_UPLOAD_CONFIG,
  TYPO_DRAG_DROP_UPLOAD_CONFIG,
  TYPO_SIZE_UPLOAD_CONFIG,
} from "@/constants";
import { getErrorMessageFromAPI, getInitials } from "@/helper";
import When from "./When";
import Stack from "./Stack";
import Typography from "./Typography";
import Button from "./Button";
import { CloudUploadOutlinedIcon, DeleteIcon } from "@/assets";
import Avatar from "./Avatar";
import { FormControl, InputLabel } from "@mui/material";
import IconButton from "./IconButton";
import { colorStyles } from "@/styles";
import {
  useCreateOrUpdateQuestionPicture,
  useDeleteQuestionPicture,
} from "@/services/useUploadQuestionPic";

function UploadQuestionPic({
  field,
  setFieldValue,
}: {
  field?: CommonObjectType;
  setFieldValue?: (fieldName: string, value: unknown) => void;
}) {
  const { showNotification } = useNotification();
  const { NOTIFICATION_CONFIG } = QUESTION_PICTURE_UPLOAD_CONFIG;
  const [isDragOver, setIsDragOver] = useState(false);
  const { name, refetchCommonDetails } = useCommonDetails();
  const questionImageUrl = (field?.value as string | null | undefined) || null;

  const createOrUpdateQuestionPicture = useCreateOrUpdateQuestionPicture({
    mutationConfig: {
      onSuccess: (response) => {
        const responseData = response as CommonObjectType & {
          data?: CommonObjectType & {
            question_image?: string;
            questionImage?: string;
            image?: string;
            url?: string;
          };
        };

        const uploadedQuestionImage =
          responseData?.data?.question_image ||
          responseData?.data?.questionImage ||
          responseData?.data?.image ||
          responseData?.data?.url ||
          responseData?.data ||
          response;

        if (typeof field?.name === "string" && setFieldValue) {
          setFieldValue(field.name, uploadedQuestionImage ?? null);
        }

        refetchCommonDetails();
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

  const deleteQuestionPicture = useDeleteQuestionPicture({
    mutationConfig: {
      onSuccess: () => {
        if (typeof field?.name === "string" && setFieldValue) {
          setFieldValue(field.name, null);
        }

        refetchCommonDetails();
        showNotification(NOTIFICATION_CONFIG.DELETE_SUCCESS);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function handleQuestionPictureChange(file: File) {
    if (file) {
      try {
        const previewUrl = URL.createObjectURL(file);
        if (typeof field?.name === "string" && setFieldValue) {
          setFieldValue(field.name, previewUrl);
        }
      } catch (e) {
        // ignore preview creation errors
      }
      createOrUpdateQuestionPicture.mutate({
        data: {
          file_type: QuestionImageEnum.QUESTION_IMAGE,
          file,
        } as CreateOrUpdateQuestionPicInput,
      });
    }
  }

  function handleDeleteClick() {
    if (questionImageUrl) {
      deleteQuestionPicture.mutate({});
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleQuestionPictureChange(file);
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      handleQuestionPictureChange(event.target.files[0]);
    }
  }

  const isProfileImageAvailable = useMemo(() => {
    return Boolean(questionImageUrl);
  }, [questionImageUrl]);

  return (
    <>
      <FormControl
        sx={{
          width: "100%",
          flexBasis: "100%",
          minHeight: "280px",
          marginBottom: "24px",
        }}
      >
        <InputLabel shrink className={"mb-4 label-shrink"}>
          Question Image
        </InputLabel>
        <Stack
          stackProps={{
            className: "absolute",
            sx: {
              height: 250,
              border: isProfileImageAvailable
                ? "none"
                : isDragOver
                ? `2px dashed ${colorStyles.blue}`
                : `2px dashed ${colorStyles.borderGreyColor}`,
              borderRadius: 2,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              overflow: "hidden",
              width: "100%",
            },
            onDragOver: !isProfileImageAvailable ? handleDragOver : undefined,
            onDragLeave: !isProfileImageAvailable ? handleDragLeave : undefined,
            onDrop: !isProfileImageAvailable ? handleDrop : undefined,
          }}
        >
          <When condition={!isProfileImageAvailable}>
            <>
              <IconButton color="primary" component="label">
                <CloudUploadOutlinedIcon
                  sx={{
                    fontSize: 50,
                    color: isDragOver
                      ? `${colorStyles.blue}`
                      : `${colorStyles.borderGreyColor}`,
                  }}
                />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </IconButton>
              <Typography {...TYPO_DRAG_DROP_UPLOAD_CONFIG} />
              <Typography {...TYPO_SIZE_UPLOAD_CONFIG} />
            </>
          </When>
          <When condition={isProfileImageAvailable}>
            <Stack
              stackProps={{
                sx: {
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  alignItems: "center",
                },
              }}
            >
              <Avatar {...IMAGE((questionImageUrl || "") as string).avatarProps}>
                {getInitials({
                  name: name || "",
                })}
              </Avatar>
              <Stack
                stackProps={{
                  sx: {
                    flexDirection: "row",
                    gap: 2,
                    mt: 2,
                  },
                }}
              >
                <Button
                  buttonProps={{
                    variant: ButtonVariantEnum.OUTLINED,
                    color: ButtonColorEnum.PRIMARY,
                    size: ButtonSizeEnum.SMALL,
                    component: "label",
                    children: (
                      <>
                        Update
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </>
                    ),
                  }}
                  onClick={() => {}}
                />
                <Button
                  buttonProps={{
                    variant: ButtonVariantEnum.OUTLINED,
                    color: ButtonColorEnum.ERROR,
                    size: ButtonSizeEnum.SMALL,
                    children: "Remove",
                    startIcon: <DeleteIcon />,
                  }}
                  onClick={handleDeleteClick}
                />
              </Stack>
            </Stack>
          </When>
        </Stack>
      </FormControl>
    </>
  );
}

export default UploadQuestionPic;
