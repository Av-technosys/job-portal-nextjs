import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export type GetApplicantAssessmentAttemptsParams = {
  applicantId?: number | string | string[] | boolean;
};

export const getApplicantAssessmentAttempts = ({
  applicantId,
}: GetApplicantAssessmentAttemptsParams) => {
  return api.get(
    `${apiConstantsURL.assessment.getApplicantAssessmentAttempts}${applicantId}`
  );
};

export const getApplicantAssessmentAttemptsQueryOptions = ({
  applicantId,
}: GetApplicantAssessmentAttemptsParams) => {
  return queryOptions({
    queryKey: ["applicant_assessment_attempts", applicantId],
    queryFn: () => getApplicantAssessmentAttempts({ applicantId }),
    enabled: Boolean(applicantId),
  });
};

type UseApplicantAssessmentAttemptsOptions = {
  enabled?: boolean;
  queryConfig?: QueryConfig<typeof getApplicantAssessmentAttempts>;
  queryParams: GetApplicantAssessmentAttemptsParams;
};

export const useGetApplicantAssessmentAttempts = ({
  enabled,
  queryConfig,
  queryParams,
}: UseApplicantAssessmentAttemptsOptions) => {
  return useQuery({
    ...getApplicantAssessmentAttemptsQueryOptions(queryParams),
    enabled: enabled ?? Boolean(queryParams.applicantId),
    ...queryConfig,
  });
};
