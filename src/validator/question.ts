import * as yup from "yup";
import { minMaxValidationSchema } from "./common";

export const questionSchema = yup.object({
  question_text: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Enter Your Question",
  }),
  question_paragraph: yup
    .string()
    .max(500, "Enter Your Paragraph must be at most 500 characters")
    .nullable()
    .notRequired(),
  question_image: yup
    .string()
    .max(100, "Click to upload or drag and drop must be at most 100 characters")
    .nullable()
    .notRequired(),
  option_1: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Enter First Option",
  }),
  option_2: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Enter Second Option",
  }),
  option_3: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Enter Third Option",
  }),
  option_4: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Enter Fourth Option",
  }),
});
