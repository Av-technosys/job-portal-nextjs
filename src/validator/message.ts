import * as yup from "yup";
import { minMaxValidationSchema } from "./common";

export const messageValidationSchema = yup.object({
  message: minMaxValidationSchema({
    min: 1,
    max: 320,
    fieldName: "Message",
  }),
});
