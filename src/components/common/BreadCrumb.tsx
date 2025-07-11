import { BreadcrumbProps } from "@/types";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";

function BreadCrumb(props: BreadcrumbProps) {
  return (
    <>
      <MuiBreadcrumbs {...props} />
    </>
  );
}

export default BreadCrumb;
