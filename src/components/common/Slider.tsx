import { Slider as MUISlider } from "@mui/material";
import { SliderProps } from "@/types";

function Slider(props: SliderProps) {
  return <MUISlider {...props} />;
}

export default Slider;
