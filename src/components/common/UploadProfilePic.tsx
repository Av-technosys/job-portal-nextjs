import {
  useCommonDetails,
  useCreateOrUpdateProfilePicture,
  useDeleteProfilePicture,
  useNotification,
} from "@/services";
import { ChangeEvent, useMemo, useState } from "react";
import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CreateOrUpdateProfilePicInput,
  ProfileImageEnum,
} from "@/types";
import {
  IMAGE,
  PROFILE_PICTURE_UPLOAD_CONFIG,
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

function UploadProfilePic() {
  const { showNotification } = useNotification();
  const { NOTIFICATION_CONFIG } = PROFILE_PICTURE_UPLOAD_CONFIG;
  const [isDragOver, setIsDragOver] = useState(false);
  const { name, profileImage, userType, refetchCommonDetails } =
    useCommonDetails();

  const createOrUpdateProfilePicture = useCreateOrUpdateProfilePicture({
    mutationConfig: {
      onSuccess: () => {
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

  const deleteProfilePicture = useDeleteProfilePicture({
    mutationConfig: {
      onSuccess: () => {
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

  function handleProfilePictureChange(file: File) {
    if (file) {
      createOrUpdateProfilePicture.mutate({
        data: {
          file_type: ProfileImageEnum.PROFILE_IMAGE,
          file,
        } as CreateOrUpdateProfilePicInput,
      });
    }
  }

  function handleDeleteClick() {
    if (profileImage) {
      deleteProfilePicture.mutate({});
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleProfilePictureChange(file);
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
      handleProfilePictureChange(event.target.files[0]);
    }
  }

  const isProfileImageAvailable = useMemo(() => {
    return profileImage !== undefined && profileImage !== null;
  }, [profileImage]);

  const isRecruiter = useMemo(() => {
    return userType !== -1 ? isLoggedInUserRecruiter({ userType }) : false;
  }, [userType]);

  return (
    <>
      <FormControl
        sx={{
          width: "100%",
          flexBasis: isRecruiter ? "45%" : "25%",
          height: "80px",
        }}
      >
        <InputLabel shrink className={"mb-4 label-shrink"}>
          {isRecruiter
            ? "Logo"
            : "Profile Picture (Avoid using Casual Pictures)"}
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
              <Avatar {...IMAGE((profileImage || "") as string).avatarProps}>
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

export default UploadProfilePic;
