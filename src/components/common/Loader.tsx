import { LoaderProps } from "@/types";
import { Backdrop, CircularProgress } from "@mui/material";

function Loader({ loaderProps }: LoaderProps) {
  return (
    <Backdrop {...loaderProps}>
      <CircularProgress />
    </Backdrop>
  );
}

export default Loader;
