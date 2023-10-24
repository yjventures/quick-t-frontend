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

function MainPage() {
  return (
    <div>
      <Headers />
      <div style={{ paddingTop: "85px" }}>
        <HeroSection />
      </div>
      <GetStart />
      <ChooseUs />
      <HowTransfer />
      <SendFrom />
      <ReceiveFrom />
      <NewsLetter />
    </div>
  );
}

export default MainPage;
