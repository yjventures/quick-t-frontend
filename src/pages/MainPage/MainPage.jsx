import React from "react";
import Headers from "../../components/Headers";
import NewsLetter from "../newsLetter/NewsLetter";
import HowWorks from "../howWorks/HowWorks";
import HeroSection from "../HeroSection/HeroSection";
import GetStart from "../getStarted/GetStart";
import ChooseUs from "../chooseUs/ChooseUs";
import HowTransfer from "../howTransfer/HowTransfer";
import SendFrom from "../sendFrom/SendFrom";
import ReceiveFrom from "../receiveFrom/ReceiveFrom";
import Footer from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { showFailedAlert } from "../../utils/Tooast.Utils";

function MainPage() {

  const jwt = localStorage.getItem("jwt");
  // get general setting api using react query
  const { isPending: pendingGeneralSettings, error: generalSettingsError, data: generalSettings } = useQuery({
    queryKey: ['general-settings'],
    queryFn: () =>
      fetch('http://localhost:1337/api/general-settings?populate=*')
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
      <HeroSection currency_buffer={generalSettings?.currency_buffer} gateway_fee={generalSettings?.gateway_fee} transfer_percentage={generalSettings?.transfer_percentage} title={generalSettings?.main_banner_title} description={generalSettings?.main_banner_desc} />
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
