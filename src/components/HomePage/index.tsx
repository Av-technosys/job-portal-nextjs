import React, { useState } from "react";
import { ForceUserLoginPopup } from "../common";
import LatestJobOpenings from "./LatestJobOpening";
import { isUserAuthenticated } from "@/helper";
import TopCompanies from "./topCompanies";
import Testimonial from "./testimonial";
import AssessmentHighlight from "./AssessmentHighlight";
import { HeroLanding } from "@/components";

function HomePage() {
  const [loginPopup, setLoginPopup] = useState(false);
  const isAuthenticated = isUserAuthenticated();

  return (
    <>
      <ForceUserLoginPopup
        open={loginPopup}
        handleClose={() => setLoginPopup(false)}
      />
      <HeroLanding />
      <LatestJobOpenings />
      <AssessmentHighlight />

      <TopCompanies
        isAuthenticated={isAuthenticated}
        openForceLoginPopup={() => setLoginPopup(true)}
      />
      <Testimonial />
    </>
  );
}

export default HomePage;
