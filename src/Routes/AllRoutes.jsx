import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import EMIPage from "../pages/Emi";
import ComparePage from "../pages/Compare";
import Header from "../components/common/Header";
import Footer from "../components/Footer/Footer";
import ProfilePage from "../pages/Profile";
import CategoryPage from "../pages/Category";
import ProductPage from "../pages/Product";
import AppDownloadPopup from "../components/common/AppDownloadPopup";
import FaqPage from "../pages/FaqPage";
import DealerPage from "../pages/Dealer";
import Iffcopage from "../pages/IffcoPage";
// import Iffcopage from '../pages/IffcoPage'
import RefundPolicy from "../pages/RefundPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ContactUs from "../pages/ContactUs";
import TermsOfUse from "../pages/TermsOfUse";
import AboutUs from "../pages/AboutUs";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <PrivacyPolicy />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route path="/terms-of-use" element={<><Header/><TermsOfUse/><AppDownloadPopup/><Footer/></>} />
        <Route path="/refund-policy" element={<><Header/><RefundPolicy/><AppDownloadPopup/><Footer/></>} />
        <Route path="/about" element={<><Header/><AboutUs/><AppDownloadPopup/><Footer/></>} />
        <Route path="/contact" element={<><Header/><ContactUs/><AppDownloadPopup/><Footer/></>} />
        <Route
          path="/emi"
          element={
            <>
              <Header />
              <EMIPage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/compare"
          element={
            <>
              <Header />
              <ComparePage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <Header />
              <CategoryPage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <ProfilePage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Header />
              <ProductPage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/iffco"
          element={
            <>
              <Header />
              <Iffcopage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/frequentlyaskedquestions"
          element={
            <>
              <Header />
              <FaqPage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
        <Route
          path="/dealer/:dealerId"
          element={
            <>
              <Header />
              <DealerPage />
              <AppDownloadPopup />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
