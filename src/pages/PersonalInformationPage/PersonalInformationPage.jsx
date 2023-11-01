import React from "react";
import Settings from "../../components/settings/Settings";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";

function PersonalInformationPage() {
  return (
    <div>
      <Settings>
        <PersonalInfo />
      </Settings>
    </div>
  );
}

export default PersonalInformationPage;
