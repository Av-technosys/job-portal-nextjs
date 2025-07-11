import React from "react";
import Stack from "./Stack";
import Link from "./Link";
import { UPLOAD_DOC_TYPOGRAPHY_CONFIG } from "@/constants";
import Typography from "./Typography";
import Divider from "./Divider";
import {
  EditOutlinedIcon,
  HighlightOffRoundedIcon,
  PictureAsPdfIcon,
  UploadIcon,
  VideocamOutlinedIcon,
} from "@/assets";
import { FormControl } from "@mui/material";
import { DocumentTypeEnum, UploadDocumentProps } from "@/types";
import { IconButton, When } from ".";
import { getDocumentName } from "@/helper";
import { VisuallyHiddenInput } from "./UploadAvatar";
import { colorStyles } from "@/styles";

function DocumentInfo({
  accept,
  documentDetails,
  documentKey,
  onUpdate,
  onDelete,
}: {
  accept: UploadDocumentProps["accept"];
  documentDetails: UploadDocumentProps["documentDetails"];
  documentKey: UploadDocumentProps["documentKey"];
  onDelete: () => void;
  onUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { TYPO_PROPS_FILE_NAME } = UPLOAD_DOC_TYPOGRAPHY_CONFIG;

  function handleDownload() {
    const link = document.createElement("a");
    link.href = documentDetails?.file as string;
    link.download = `${getDocumentName(documentKey)}${accept}`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Stack
        stackProps={{
          direction: "row",
          spacing: 2,
          width: "100%",
          alignItems: "center",
        }}
      >
        <When condition={accept === DocumentTypeEnum.PDF}>
          <PictureAsPdfIcon color="primary" />
        </When>
        <When condition={accept === DocumentTypeEnum.MP4}>
          <VideocamOutlinedIcon color="primary" />
        </When>
        <Typography
          typographyProps={{
            ...TYPO_PROPS_FILE_NAME(documentKey).typographyProps,
            onClick: handleDownload,
          }}
        />
        <label>
          <VisuallyHiddenInput
            type="file"
            accept={accept}
            onChange={onUpdate}
          />
          <IconButton component={"span"}>
            <EditOutlinedIcon color="primary" />
          </IconButton>
        </label>
        <IconButton onClick={onDelete}>
          <HighlightOffRoundedIcon color="primary" />
        </IconButton>
      </Stack>
    </>
  );
}

function UploadComponent({
  lines = ["Other"],
  uploadText = "Click to upload",
  dragText = "or drag and drop",
  fileInfo = "PDF (max. 3MB)",
  accept = DocumentTypeEnum.PDF,
  formControlProps,
  documentDetails,
  documentKey,
  onUpload,
  onDelete,
}: UploadDocumentProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpload) {
      const file = event.target.files?.[0] || null;
      onUpload(file);
    }
  };

  function handleDeleteClick() {
    if (onDelete && documentDetails?.id) {
      onDelete();
    }
  }

  const {
    TYPO_PROPS_CONFIG_LINE,
    TYPO_PROPS_CONFIG_DRAG,
    TYPO_PROPS_CONFIG_FILE_INFO,
  } = UPLOAD_DOC_TYPOGRAPHY_CONFIG;

  return (
    <FormControl {...formControlProps}>
      <Stack
        stackProps={{
          direction: "row",
          spacing: 2,
          alignItems: "center",
          justifyContent: "space-between",
          sx: {
            border: `1px solid ${colorStyles.borderGreyColor}`,
            borderRadius: 3,
            padding: 3,
          },
        }}
      >
        <When condition={documentDetails !== undefined}>
          <DocumentInfo
            documentDetails={documentDetails}
            accept={accept}
            documentKey={documentKey}
            onUpdate={handleFileChange}
            onDelete={handleDeleteClick}
          />
        </When>
        <When condition={documentDetails === undefined}>
          <Stack
            stackProps={{
              direction: "row",
              spacing: 1,
              alignItems: "center",
            }}
          >
            <UploadIcon color="primary" />
            <Stack
              stackProps={{
                direction: "column",
              }}
            >
              {lines.map((line, index) => (
                <Typography
                  key={`uploadDocumentLines-${index}`}
                  {...TYPO_PROPS_CONFIG_LINE(line)}
                />
              ))}
            </Stack>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ height: "80px" }} />
          <Stack
            stackProps={{
              direction: "row",
              flexGrow: 1,
            }}
          >
            <Stack
              stackProps={{
                alignItems: "flex-start",
                spacing: 0.5,
              }}
            >
              <Stack
                stackProps={{
                  direction: "row",
                  spacing: 1,
                  alignItems: "center",
                }}
              >
                <label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept={accept}
                  />
                  <Link
                    linkProps={{
                      component: "span",
                      underline: "none",
                      sx: {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {uploadText}
                  </Link>
                </label>
                <Typography {...TYPO_PROPS_CONFIG_DRAG(dragText)} />
              </Stack>
              <Typography {...TYPO_PROPS_CONFIG_FILE_INFO(fileInfo)} />
            </Stack>
          </Stack>
        </When>
      </Stack>
    </FormControl>
  );
}

export default UploadComponent;
