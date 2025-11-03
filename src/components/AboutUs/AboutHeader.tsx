import { Stack } from "../common";
import { AboutUs1 } from "@/assets";
import Image from "next/image";

function AboutHeader() {
  return (
    <>
      <Stack>
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between w-full px-6 md:px-12 py-12 gap-8">
          <div className="flex flex-col gap-4 text-center lg:text-left w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Who We Are
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
              Building the Future Together
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              We are a passionate team dedicated to creating innovative web
              solutions that empower businesses to grow and succeed in the
              digital world.
            </p>
          </div>

          <div className="flex justify-center w-full lg:w-1/2">
            <Image
              src={AboutUs1}
              alt="About Us"
              width={500}
              height={400}
              className="w-full max-w-md h-auto object-cover rounded-2xl shadow-md"
            />
          </div>
        </section>
      </Stack>
    </>
  );
}

export default AboutHeader;
