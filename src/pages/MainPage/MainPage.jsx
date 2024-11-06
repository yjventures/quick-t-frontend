import React, { useEffect, useState } from "react";
import Headers from "../../components/Headers";
import NewsLetter from "../newsLetter/NewsLetter";
import HeroSection from "../HeroSection/HeroSection";
import GetStart from "../getStarted/GetStart";
import ChooseUs from "../chooseUs/ChooseUs";
import HowTransfer from "../howTransfer/HowTransfer";
import SendFrom from "../sendFrom/SendFrom";
import ReceiveFrom from "../receiveFrom/ReceiveFrom";
import Footer from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { showFailedAlert } from "../../utils/Tooast.Utils";
import Alert from "../../components/Alert/Alert";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MainPage() {
  const [user_id, setUser] = useState(localStorage.getItem("user_id"));
  const location = useLocation();
  // console.log(location)
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_id")));
  }, [user_id]);


  const { isPending: pendingKycApproved, error: kycApprovedError, data: kycApprovedData } = useQuery({
    queryKey: ['kyc-approved', user_id, location],
    queryFn: () =>
      fetch(`https://api.quickt.com.au/api/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then(res => res.json())
        .then(data => data),
  })

  console.log(kycApprovedData)
  // get general setting api using react query
  const { isPending: pendingGeneralSettings, error: generalSettingsError, data: generalSettings } = useQuery({
    queryKey: ['general-settings'],
    queryFn: () =>
      fetch('https://api.quickt.com.au/api/general-settings?populate=*')
        .then(res => res.json())
        .then(data => data?.data?.[0]?.attributes),
  })
  if (generalSettingsError) return showFailedAlert("Something went wrong")
  // console.log(pendingGeneralSettings)
  // console.log(generalSettingsError)
  // console.log(generalSettings)
  return (
    <div>
      <Headers />
      <div className="bg-gray-50 pt-10">
        {
          kycApprovedData?.kyc_approved == false && <Alert user_id={user_id} reference={kycApprovedData?.reference} verificationStatus={kycApprovedData?.kyc_approved} />
        }
        <HeroSection title={generalSettings?.main_banner_title} description={generalSettings?.main_banner_desc} />
      </div>
      <GetStart title={generalSettings?.get_started_title} second_title={generalSettings?.get_started_second_title} description={generalSettings?.get_started_description} />
      <ChooseUs
        service_box_one_icon={generalSettings?.service_box_one_icon}
        service_box_one_title={generalSettings?.service_box_one_title}
        service_box_one_desc={generalSettings?.service_box_one_desc}
        service_box_two_icon={generalSettings?.service_box_two_icon}
        service_box_two_title={generalSettings?.service_box_two_title}
        service_box_two_desc={generalSettings?.service_box_two_desc}
        service_box_three_icon={generalSettings?.service_box_three_icon}
        service_box_three_title={generalSettings?.service_box_three_title}
        service_box_three_desc={generalSettings?.service_box_three_desc}
      />
      <HowTransfer />
      <SendFrom />
      <ReceiveFrom />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default MainPage;
