import { Button, Divider, Modal, Stack, Typography } from "../common";
import { SUCCESS_BOX_CONFIG, MESSAGING_PAGE_CONFIG, MY_POSTED_JOBS_URL } from "@/constants";
import  { useRouter } from "next/router";

function SuccessBox({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { MODAL_STYLES } = MESSAGING_PAGE_CONFIG;
  const { HEADING_TEXT, TITLE_TEXT, VIEW_JOB_BUTTON } = SUCCESS_BOX_CONFIG;
  
  const router = useRouter();
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Stack stackProps={{ sx: MODAL_STYLES }}>
        <Typography {...HEADING_TEXT} />
        <Typography {...TITLE_TEXT} />
        <Divider />
        <Button {...VIEW_JOB_BUTTON} onClick={() => router.push(MY_POSTED_JOBS_URL)}/>
      </Stack>
    </Modal>
  );
}

export default SuccessBox;
