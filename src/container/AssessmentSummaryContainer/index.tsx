import { AssessmentSummary } from "@/components";
import { useRouter } from "next/router";

export default function AssessmentSummaryContainer() {
  const router = useRouter();
  const { id } = router.query;
  return <AssessmentSummary attemptId={id} />;
}
