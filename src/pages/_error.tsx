import { Button } from "@/components";
import { PROFILE_URL } from "@/constants";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

function Error() {
  const router = useRouter();

  function onHomeClickHandler() {
    router.push(PROFILE_URL);
  }

  return (
    <Button
      buttonProps={{
        children: "Something Went wrong",
      }}
      onClick={onHomeClickHandler}
    />
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
