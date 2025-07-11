import { CommonObjectType, UseFormProps } from "@/types";
import { useFormik } from "formik";
import { FormEvent, useRef } from "react";

export function useForm({
  initialValues,
  validationSchema,
  onSuccess,
}: UseFormProps) {
  const isFormTriedToBeSubmitted = useRef(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await formikHelpers.validateForm();
        onSuccess({ values });
      } catch (e) {
        console.error(e, "Form Error");
      }
    },
    validateOnBlur: isFormTriedToBeSubmitted.current,
    validateOnChange: isFormTriedToBeSubmitted.current,
  });

  function resetError() {
    isFormTriedToBeSubmitted.current = false;
    formik.setErrors({});
  }

  return {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    onSubmit: (event: FormEvent<HTMLFormElement> | undefined) => {
      isFormTriedToBeSubmitted.current = true;
      formik.handleSubmit(event);
    },
    onReset: formik.handleReset,
    errorObj: formik.errors as CommonObjectType,
    formValuesObj: formik.values,
    resetError: resetError,
    setValues: formik.setValues,
  };
}
