import React, { useState } from "react";
import { ForceUserLoginPopup } from "../common";
import LatestJobOpenings from "./LatestJobOpening";
import { isUserAuthenticated } from "@/helper";
import TopCompanies from "./topCompanies";
import Testimonial from "./testimonial";
import AssessmentHighlight from "./AssessmentHighlight";

function HomePage() {
  const [loginPopup, setLoginPopup] = useState(false);
  const isAuthenticated = isUserAuthenticated();

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <ForceUserLoginPopup
        open={loginPopup}
        handleClose={() => setLoginPopup(false)}
      />
      <LatestJobOpenings />
      <AssessmentHighlight />

      <TopCompanies
        isAuthenticated={isAuthenticated}
        openForceLoginPopup={() => setLoginPopup(true)}
      />
      <Testimonial />
    </div>
  );
}

export default HomePage;
