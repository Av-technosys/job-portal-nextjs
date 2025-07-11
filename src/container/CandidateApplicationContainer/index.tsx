import { CandidateApplication } from "@/components";
import { useRouter } from "next/router";

export default function CandidateApplicationContainer() {
  const router = useRouter();
  const { id } = router.query;

  return <CandidateApplication jobId={Number(id)} />;
}
