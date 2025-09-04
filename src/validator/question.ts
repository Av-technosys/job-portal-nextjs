import * as yup from "yup";
import { minMaxValidationSchema } from "./common";

// export const questionSchema = yup.object({
//   question_text: minMaxValidationSchema({
//     min: 1,
//     max: 200,
//     fieldName: "Enter Your Question",
//   }),
//   question_paragraph: minMaxValidationSchema({
//     min: 0,
//     max: 500,
//     fieldName: "Enter Your Paragraph",
//   }),
//   question_image: minMaxValidationSchema({
//     min: 0,
//     max: 100,
//     fieldName: "Click to upload or drag and drop",
//   }),
//   option_1: minMaxValidationSchema({
//     min: 1,
//     max: 100,
//     fieldName: "Enter First Option",
//   }),
//   option_2: minMaxValidationSchema({
//     min: 1,
//     max: 100,
//     fieldName: "Enter Second Option",
//   }),
//   option_3: minMaxValidationSchema({
//     min: 1,
//     max: 100,
//     fieldName: "Enter Third Option",
//   }),
//   option_4: minMaxValidationSchema({
//     min: 1,
//     max: 100,
//     fieldName: "Enter Fourth Option",
//   }),
//   //   correct_option: yup
//   //     .string()
//   //     .oneOf(["option_1", "option_2", "option_3", "option_4"])
//   //     .required("Please select the correct option"),
//   //   difficulty_level: yup
//   //     .number()
//   //     .min(1, "Difficulty must be at least 1")
//   //     .max(5, "Difficulty must be at most 5")
//   //     .required("Difficulty level is required"),
//   //   subject: yup.number().required("Subject is required"),
//   // system-generated fields (id, created_at, updated_at) → usually not validated on form
// });

// export const questionSchema = yup.object({
//   work_experiences: yup.array().of(
//     yup.object({
//       question_text: minMaxValidationSchema({
//         min: 1,
//         max: 300,
//         fieldName: "Enter Your Question",
//       }),
//       question_paragraph: minMaxValidationSchema({
//         min: 0,
//         max: 500,
//         fieldName: "Enter Your Paragraph must be at most 500 characters",
//         required: false,
//       }),
//       question_image: minMaxValidationSchema({
//         min: 0,
//         max: 100,
//         fieldName: "Click to upload or drag and drop",
//       }),
//       option_1: minMaxValidationSchema({
//         min: 1,
//         max: 100,
//         fieldName: "Enter First Option",
//       }),
//       option_2: minMaxValidationSchema({
//         min: 1,
//         max: 100,
//         fieldName: "Enter Second Option",
//       }),
//       option_3: minMaxValidationSchema({
//         min: 1,
//         max: 100,
//         fieldName: "Enter Third Option",
//       }),
//       option_4: minMaxValidationSchema({
//         min: 1,
//         max: 100,
//         fieldName: "Enter Fourth Option",
//       }),
//       // add correct_option & difficulty_level if needed
//     })
//   ),
// });

export const questionSchema = yup.object({
  work_experiences: yup.array().of(
    yup.object({
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
        .max(
          100,
          "Click to upload or drag and drop must be at most 100 characters"
        )
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
      // correct_option: minMaxValidationSchema({
      //   min: 1,
      //   max: 100,
      //   fieldName: "Enter Correct Option",
      // }),
    })
  ),
});
