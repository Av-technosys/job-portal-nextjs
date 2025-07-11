import { FormGroup as MUIFormGroup } from "@mui/material";
import { FormGroupProps } from "@/types";

function FormGroup(props: FormGroupProps) {
  return <MUIFormGroup {...props} />;
}

export default FormGroup;
