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

function MainPage() {

  const jwt = localStorage.getItem("jwt");
  // get general setting api using react query
  const { isPending: pendingGeneralSettings, error: generalSettingsError, data: generalSettings } = useQuery({
    queryKey: ['general-settings'],
    queryFn: () =>
      fetch('http://localhost:1337/api/general-settings')
        .then(res => res.json())
        .then(data => data?.data?.[0]?.attributes),
  })

  // console.log(pendingGeneralSettings)
  // console.log(generalSettingsError)
  // console.log(generalSettings) 
  return (
    <div>
      <Headers />
      <HeroSection transfer_percentage={generalSettings?.transfer_percentage} />
      <GetStart />
      <ChooseUs />
      <HowTransfer />
      <SendFrom />
      <ReceiveFrom />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default MainPage;
