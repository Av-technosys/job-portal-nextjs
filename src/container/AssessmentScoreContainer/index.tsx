import { AssessmentScore } from "@/components";
import { useRouter } from "next/router";

export default function AssessmentScoreContainer() {
  const router = useRouter();
  const { id } = router.query;
  return <AssessmentScore id={id} />;
}
