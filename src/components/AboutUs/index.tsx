import React from "react";
import AboutHeader from "./AboutHeader";
import AboutBody from "./AboutBody";
import CompanyReview from "./CompanyReview";
import ApplyAs from "./Apply";
import Footer from "../HomePage/footer";

function AboutUs() {
  return (
    <>
      <AboutHeader />;
      <AboutBody />
      <CompanyReview />
      <ApplyAs />
      <Footer />
    </>
  );
}
export default AboutUs;
