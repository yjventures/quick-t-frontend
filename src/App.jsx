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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersonalInformationPage from "./pages/PersonalInformationPage/PersonalInformationPage";

import Settings from "./components/settings/Settings";
import TransactionHistoryPage from "./pages/TransactionHistory/TransactionHistoryPage";
import PaymentCancel from "./pages/paymentCancel/PaymentCancel";
import PersonalInfoEditPage from "./pages/EditPersonalInfo/PersonalInfoEditPage";
import LiveChatPage from "./pages/LiveChatPage/LiveChatPage";
import TermsConditionPage from "./pages/TermsCondition/TermsConditionPage";
import DummyPayment from "./pages/dummyPayment/DummyPayment";

// Create a client
const queryClient = new QueryClient();
// Create a client

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sendingMoney" element={<SendingMoney />} />
          <Route path="/termsAndCondition" element={<TermsConditionPage />} />
          <Route path="/sendingMoneyInfo" element={<SendingMoneyInfo />} />
          <Route path="/sendOTP" element={<TransferOTP />} />
          <Route path="/kyc" element={<KycPage />} />
          <Route path="/securityCode" element={<SecurityCode />} />
          <Route path="/confirmSecurityCode" element={<ConfirmCode />} />
          <Route path="/paymentProcessing" element={<PaymentProcessing />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />
          <Route path="/hello" element={<HowWorks />} />
          <Route path="/pricing" element={<HowWorks />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/personalInfo" element={<PersonalInformationPage />} />
          <Route
            path="/editPersonalInfo"
            element={<PersonalInfoEditPage />}
          />
          <Route
            path="/liveChat"
            element={<LiveChatPage />}
          />
          <Route
            path="/transactionHistory"
            element={<TransactionHistoryPage />}
          />
          <Route path="/areeba-payment-gateway" element={<DummyPayment />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
