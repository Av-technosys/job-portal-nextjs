import { AvatarVariantEnum, CommonObjectType } from "@/types";
import { Avatar, Typography } from "../common";
import { Stack } from "../common";

export default function MessageCard({
  message,
  userId,
}: {
  message: CommonObjectType;
  userId: number;
}) {
  const isSentByLoggedInUser = message.sent_from === userId;

  return (
    <>
      <Stack
        stackProps={{
          className: "my-2 border border-black p-4",
          justifyContent: "space-between",
          alignItems: "center",
          width: isSentByLoggedInUser ? "100%" : "80%",
        }}
      >
        <Stack
          stackProps={{
            direction: isSentByLoggedInUser ? "row-reverse" : "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <Avatar variant={AvatarVariantEnum.CIRCULAR}>
            {(isSentByLoggedInUser ? "You" : message.sent_from) as string}
          </Avatar>
          <Typography
            typographyProps={{ children: message.message as string }}
          />
        </Stack>
      </Stack>
    </>
  );
}
