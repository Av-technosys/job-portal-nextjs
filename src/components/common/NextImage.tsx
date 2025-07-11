import Image, { ImageProps } from "next/image";

function NextImage({ props }: { props: ImageProps }) {
  return <Image {...props} alt={props.alt} />;
}

export default NextImage;
