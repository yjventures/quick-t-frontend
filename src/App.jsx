import { BrowserRouter, Route, Routes } from "react-router-dom";
import HowWorks from "./pages/howWorks/HowWorks";
import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/RegisterPage/Register";
import KycPage from "./pages/kycPage/KycPage";
import SecurityCode from "./pages/securityCode/SecurityCode";
import ConfirmCode from "./pages/ConfirmSecurityCode/ConfirmCode";
import LoginPage from "./pages/LoginPage/LoginPage";
import SendingMoney from "./pages/sendingMoney/SendingMoney";
import SendingMoneyInfo from "./pages/SendingMoneyInfo/SendingMoneyInfo";
import TransferOTP from "./pages/TransferOTP/TransferOTP";
import PaymentProcessing from "./pages/PaymentProcessing/PaymentProcessing";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import Settings from "./components/settings/Settings";
import PersonalInformationPage from "./pages/PersonalInformationPage/PersonalInformationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sendingMoney" element={<SendingMoney />} />
          <Route path="/sendingMoneyInfo" element={<SendingMoneyInfo />} />
          <Route path="/sendOTP" element={<TransferOTP />} />
          <Route path="/kyc" element={<KycPage />} />
          <Route path="/securityCode" element={<SecurityCode />} />
          <Route path="/confirmSecurityCode" element={<ConfirmCode />} />
          <Route path="/paymentProcessing" element={<PaymentProcessing />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/hello" element={<HowWorks />} />
          <Route path="/pricing" element={<HowWorks />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/personalInfo" element={<PersonalInformationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
