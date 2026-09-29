// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentLandingPage from "./pages/PaymentLandingPage";
import TermsPage from "./pages/terms";
import PrivacyPage from "./pages/Privacy";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PaymentLandingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
