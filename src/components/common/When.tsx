import { WhenProps } from "@/types";

function When({ condition, children }: WhenProps) {
  return condition ? children : null;
}

export default When;
