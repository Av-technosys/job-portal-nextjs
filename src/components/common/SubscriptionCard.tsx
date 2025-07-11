import { colorStyles } from "@/styles";
import { Stack, Avatar, Button } from "../common";
import { CIRCULAR_AVATAR_CONFIG } from "@/types";

interface SubscriptionCardProps {
  avatarUrl: string;
  buttonConfig: {
    buttonProps: object;
  };
  onButtonClick: () => void;
}

export default function SubscriptionCard({
  avatarUrl,
  buttonConfig,
  onButtonClick,
}: SubscriptionCardProps) {
  return (
    <Stack
      stackProps={{
        direction: "column",
        alignItems: "center",
        gap: 2,
        sx: {
          background: colorStyles.lightBlue,
          padding: "30px 10px",
          width: "280px",
        },
      }}
    >
      <Avatar {...CIRCULAR_AVATAR_CONFIG(avatarUrl, "avatar")} />
      <Button {...buttonConfig} onClick={onButtonClick} />
    </Stack>
  );
}
