import { BrowserRouter, Route, Routes } from "react-router-dom";
import FAQPage from "../component/FAQPage";
import Header from "../component/Header";
import Footer from "../component/Footer";

const FAQRouter = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<FAQPage />} />
            <Route path="/Guide" element={<FAQPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/News" element={<FAQPage />} />
            <Route path="/Counsel" element={<FAQPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default FAQRouter;
