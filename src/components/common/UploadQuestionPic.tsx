import { useCommonDetails, useNotification } from "@/services";
import { ChangeEvent, useMemo, useState } from "react";
import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CreateOrUpdateQuestionPicInput,
  QuestionImageEnum,
} from "@/types";
import {
  IMAGE,
  QUESTION_PICTURE_UPLOAD_CONFIG,
  TYPO_DRAG_DROP_UPLOAD_CONFIG,
  TYPO_SIZE_UPLOAD_CONFIG,
} from "@/constants";
import {
  getErrorMessageFromAPI,
  getInitials,
  isLoggedInUserRecruiter,
} from "@/helper";
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
import { useQueryClient } from "@tanstack/react-query";

function UploadQuestionPic({ questionId, questionImage }: any) {
  // const { questionId, questionImage } = questionData;
  console.log(questionId, "questionId");
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { NOTIFICATION_CONFIG } = QUESTION_PICTURE_UPLOAD_CONFIG;
  const [isDragOver, setIsDragOver] = useState(false);
  //   COMMON INTERFACE FOR QUESTION BANA HUA HAI USME OUR SHI SE DEKHO OUR QUESTION DATA LENA HAI SERVER SE...
  const { name, profileImage, userType, refetchCommonDetails } =
    useCommonDetails();

  const createOrUpdateQuestionPicture = useCreateOrUpdateQuestionPicture({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS);
        // queryClient.invalidateQueries({
        //   queryKey: ["question_details"],
        // });
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
        // refetchCommonDetails();
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
      createOrUpdateQuestionPicture.mutate({
        data: {
          file_type: QuestionImageEnum.QUESTION_IMAGE,
          question_id: questionId,
          question_image: file,
        } as CreateOrUpdateQuestionPicInput,
      });
    }
  }

  function handleDeleteClick() {
    if (profileImage) {
      deleteQuestionPicture.mutate({
        data: {
          question_id: questionId,
        },
      });
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
    return questionImage !== undefined && questionImage !== null;
  }, [questionImage]);

  const isRecruiter = useMemo(() => {
    return userType !== -1 ? isLoggedInUserRecruiter({ userType }) : false;
  }, [userType]);

  return (
    <>
      <FormControl
        sx={{
          width: "100%",
          flexBasis: isRecruiter ? "100%" : "100%",
          height: "50px",
          marginBottom: "180px",
        }}
      >
        <InputLabel shrink className={"mb-4 label-shrink"}>
          {isRecruiter
            ? "Logo"
            : "Question Picture (Avoid using Casual Pictures)"}
        </InputLabel>
        <Stack
          stackProps={{
            className: "md:absolute relative",
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
              <Avatar {...IMAGE(questionImage || ("" as string)).avatarProps}>
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
