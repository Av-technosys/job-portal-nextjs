import React from "react";
import { LoadingButtonProps } from "@/types";
import Button from "./Button";
import { CircularProgressIcon } from "@/assets";

function LoadingButton(props: LoadingButtonProps) {
  return (
    <Button
      {...props}
      buttonProps={{
        disabled: props?.loading,
        startIcon: props?.loading ? (
          <CircularProgressIcon size={24} color="inherit" />
        ) : null,
        ...(props.buttonProps || {}),
      }}
    />
  );
}

export default LoadingButton;
