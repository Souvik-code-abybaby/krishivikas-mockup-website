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
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Dashboard from "../pages/profile/Dashboard";
import Products from "../components/profile/Products/Products";
import AddProduct from "../components/profile/Products/AddProduct";
import LeadList from "../pages/leads/Leadlist";
import FollowUp from "../pages/leads/Followup";
import NewLeads from "../pages/leads/NewLeads";
import BannerList from "../pages/banners/BannerList";
import NewBanner from "../pages/banners/NewBanner";
import Subscription from "../pages/Subscription";
import Schemes from "../pages/Schemes";
const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Outlet />
      {/* key changes on every navigation, so the popup remounts and shows again */}
      <AppDownloadPopup key={pathname} />
      <Footer />
    </>
  );
};
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/emi" element={<EMIPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/dashboard" element={<Dashboard />} />
          <Route path="/profile/products" element={<Products />} />
          <Route path="/profile/add-product" element={<AddProduct />} />
          <Route path="/profile/leads" element={<LeadList />} />
          <Route path="/profile/banners" element={<BannerList />} />
          <Route path="/profile/new-banner" element={<NewBanner />} />
          <Route path="/profile/subscriptions" element={<Subscription />} />
          <Route path="/profile/news" element={<Schemes />} />
          <Route path="/profile/leads/follow-up" element={<FollowUp />} />
          <Route path="/profile/leads/list" element={<NewLeads />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/iffco" element={<Iffcopage />} />
          <Route path="/frequentlyaskedquestions" element={<FaqPage />} />
          <Route path="/dealer/:dealerId" element={<DealerPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
