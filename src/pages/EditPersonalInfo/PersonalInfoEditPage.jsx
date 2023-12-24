import React from "react";
import Settings from "../../components/settings/Settings";
import PersonalInfoEdit from "../../components/editPersonalInfo/PersonalInfoEdit";

function PersonalInfoEditPage() {
  return (
    <div>
      <Settings>
        <PersonalInfoEdit />
      </Settings>
    </div>
  );
}

export default PersonalInfoEditPage;
