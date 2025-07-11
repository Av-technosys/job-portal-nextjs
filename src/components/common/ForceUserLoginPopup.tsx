import { FORCE_USER_LOGIN_MODAL, LOGIN_URL } from "@/constants";
import Button from "./Button";
import Modal from "./Modal";
import Stack from "./Stack";
import Typography from "./Typography";
import { useRouter } from "next/router";
import Divider from "./Divider";

function ForceUserLoginPopup({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: VoidFunction;
}) {
  const router = useRouter();
  const { TITLE, SUBTITLE, BUTTON, MODAL_STYLES } = FORCE_USER_LOGIN_MODAL;
  return (
    <Modal open={open} onClose={handleClose}>
      <Stack stackProps={{ sx: MODAL_STYLES }}>
        <Typography {...TITLE} />
        <Divider className="my-4" />
        <Typography {...SUBTITLE} />
        <Button
          {...BUTTON}
          onClick={() => {
            router.push(LOGIN_URL);
          }}
        />
      </Stack>
    </Modal>
  );
}

export default ForceUserLoginPopup;
