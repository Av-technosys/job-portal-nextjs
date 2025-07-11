import {
  useCommonDetails,
  useGetChatMessage,
  usePagination,
  useSendMessage,
} from "@/services";
import { Formik, InfinitePagination, Stack } from "../common";
import MessageCard from "./MessageCard";
import { MESSAGING_PAGE_CONFIG } from "@/constants";
import { messageValidationSchema } from "@/validator";
import { CommonObjectType } from "@/types";

function Messaging({ applicationId }: { applicationId: number }) {
  const { userId } = useCommonDetails();
  const { MESSAGE_TEXT_INPUT_FIELD, SEND_BUTTON } = MESSAGING_PAGE_CONFIG;
  const chatMessageAPIData = useGetChatMessage({
    queryParams: {
      applicationId,
    },
  });

  const sendMessageMutation = useSendMessage();

  const { paginatedInfoData, hasMore } = usePagination({
    paginatedAPIData: chatMessageAPIData,
  });

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    const messageText = values?.message as string;
    if (!applicationId || !messageText?.length) return; // Exit if no applicationId exists

    sendMessageMutation.mutate({
      data: {
        application: applicationId,
        message: messageText,
      },
    });
  }

  return (
    <>
      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={chatMessageAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={chatMessageAPIData?.isFetchingNextPage}
        inverse={true}
        showEndMessage={false}
        showLoader={false}
      >
        <Stack>
          {paginatedInfoData?.map((item) => {
            return (
              <MessageCard
                key={`${item.id}-${item.message}-message`}
                message={item}
                userId={userId}
              />
            );
          })}
        </Stack>
      </InfinitePagination>
      <Formik
        initialValues={{ message: "" }}
        validationSchema={messageValidationSchema}
        onSuccess={handleFormSuccess}
        fieldDetailsArray={[MESSAGE_TEXT_INPUT_FIELD]}
        formFooterArray={[SEND_BUTTON]}
        key={`${paginatedInfoData?.length}-message-form`}
      />
    </>
  );
}

export default Messaging;
