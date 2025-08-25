import * as yup from "yup";
import { examTimeValidationSchema, minMaxValidationSchema } from "./common";

// export const assessmentEditSchema = yup.object({
//   exam_name: minMaxValidationSchema({
//     min: 1,
//     max: 100,
//     fieldName: "Exam Name",
//   }),
//   section_name: minMaxValidationSchema({
//     min: 1,
//     max: 100,
//     fieldName: "Section Name",
//   }),
//   duration_minutes: yup
//     .number()
//     .min(1, "Duration must be at least 1 minute")
//     .max(600, "Duration must be at most 600 minutes")
//     .positive("Exam Time must be a positive number")
//     .required("Duration is required"),
//   easy_question_count: yup
//     .number()
//     .min(0, "Must be >= 0")
//     .max(1000, "Too many easy questions")
//     .required("Easy question count is required"),
//   medium_question_count: yup
//     .number()
//     .min(0, "Must be >= 0")
//     .max(1000, "Too many medium questions")
//     .required("Medium question count is required"),
//   difficult_question_count: yup
//     .number()
//     .min(0, "Must be >= 0")
//     .max(1000, "Too many difficult questions")
//     .required("Difficult question count is required"),
//   marks_correct: yup
//     .number()
//     .typeError("Marks for correct answer must be a number")
//     .required("Marks for correct answer is required"),
//   marks_incorrect: yup
//     .number()
//     .typeError("Marks for incorrect answer must be a number")
//     .required("Marks for incorrect answer is required"),
//   marks_unattempted: yup
//     .number()
//     .typeError("Marks for unattempted answer must be a number")
//     .required("Marks for unattempted answer is required"),
//   // system fields → optional
//   id: yup.number().optional(),
//   created_at: yup.string().optional(),
//   updated_at: yup.string().optional(),
// });

export const assessmentEditSchema = yup.object({
  work_experiences: yup.array().of(
    yup.object({
      exam_name: minMaxValidationSchema({
        min: 1,
        max: 100,
        fieldName: "Exam Name",
      }),
      section_name: minMaxValidationSchema({
        min: 1,
        max: 100,
        fieldName: "Section Name",
      }),
      duration_minutes: yup
        .number()
        .min(1, "Duration must be at least 1 minute")
        .max(600, "Duration must be at most 600 minutes")
        .positive("Exam Time must be a positive number")
        .required("Duration is required"),
      easy_question_count: yup
        .number()
        .min(0, "Must be >= 0")
        .max(1000, "Too many easy questions")
        .required("Easy question count is required"),
      medium_question_count: yup
        .number()
        .min(0, "Must be >= 0")
        .max(1000, "Too many medium questions")
        .required("Medium question count is required"),
      difficult_question_count: yup
        .number()
        .min(0, "Must be >= 0")
        .max(1000, "Too many difficult questions")
        .required("Difficult question count is required"),
      marks_correct: yup
        .number()
        .typeError("Marks for correct answer must be a number")
        .required("Marks for correct answer is required"),
      marks_incorrect: yup
        .number()
        .typeError("Marks for incorrect answer must be a number")
        .required("Marks for incorrect answer is required"),
      marks_unattempted: yup
        .number()
        .typeError("Marks for unattempted answer must be a number")
        .required("Marks for unattempted answer is required"),
      // system fields → optional
      id: yup.number().optional(),
      created_at: yup.string().optional(),
      updated_at: yup.string().optional(),
    })
  ),
});
