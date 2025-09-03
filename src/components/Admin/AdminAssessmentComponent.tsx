import { useGetSubjectList } from "@/services/useGetFindSubject";
import AssessmentContent from "../Assessments/AssessmentContent";
import { ASSESSMENT_SCORE_PAGE_CONFIG } from "@/constants";

import { Stack } from "@/components";

function AdminAssessmentComponent() {
  const { ASSESSMENT_FREE, ASSESSMENT_PAID } = ASSESSMENT_SCORE_PAGE_CONFIG;

  const allSubjectList = useGetSubjectList();
  const subdata = allSubjectList.data?.data;

  const paiddata = subdata?.filter((item: any) => {
    if (item?.is_paid == true) {
      return item;
    }
  });
  const freedata = subdata?.filter((item: any) => {
    if (item?.is_paid == false) {
      return item;
    }
  });

  return (
    <>
      {subdata ? (
        <>
          <AssessmentContent
            AssessmentContent={ASSESSMENT_PAID}
            PaidAssessment={paiddata}
            btntype={true}
          />
          <AssessmentContent
            AssessmentContent={ASSESSMENT_FREE}
            PaidAssessment={freedata}
            btntype={false}
          />
        </>
      ) : (
        <Stack>Loading...</Stack>
      )}
    </>
  );
}

export default AdminAssessmentComponent;
