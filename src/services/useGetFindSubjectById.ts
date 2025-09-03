// import { useQuery, queryOptions } from "@tanstack/react-query";
// import { apiConstantsURL } from "@/constants";
// import { QueryConfig, SuccessResponseType } from "@/types";
// import { api } from "@/helper";

// export const getFindSubjectById = (id: number) => {
//   return api.get(`${apiConstantsURL.assessment.getSubjectById}${id}`);
// };

// export const getSubjectByIdQueryOptions = (id: number) => {
//   return queryOptions({
//     queryKey: ["get_subject", id],
//     queryFn: () => getFindSubjectById(id),
//   });
// };

// type UseSubjectByIdQueryOptions = {
//   id: number;
//   queryConfig?: QueryConfig<typeof getSubjectByIdQueryOptions>;
// };

// export const useGetSubjectById = ({
//   id,
//   queryConfig,
// }: UseSubjectByIdQueryOptions) => {
//   return useQuery({
//     ...getSubjectByIdQueryOptions(id),
//     ...queryConfig,
//   });
// };
