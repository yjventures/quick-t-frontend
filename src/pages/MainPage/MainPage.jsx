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

function MainPage() {
  return (
    <div>
      <Headers />
      <HeroSection />
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
