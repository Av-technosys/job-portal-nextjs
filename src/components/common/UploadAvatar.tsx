import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { PhotoCameraIcon } from "@/assets";
import styled from "@emotion/styled";
import { FileTypeProps, UploadAvatarProps } from "@/types";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function UploadAvatar({ onImageUpload, initialImage }: UploadAvatarProps) {
  const [image, setImage] = useState<FileTypeProps>(initialImage as string);

  useEffect(() => {
    setImage(initialImage as string);
  }, [initialImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as FileTypeProps);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <VisuallyHiddenInput
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        id="icon-button-file"
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" component="span">
          <Avatar
            src={image as string}
            alt="Profile"
            sx={{ width: 100, height: 100 }}
          >
            <PhotoCameraIcon />
          </Avatar>
        </IconButton>
      </label>
    </div>
  );
}

export default UploadAvatar;
