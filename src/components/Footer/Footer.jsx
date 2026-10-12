import Associates from "./Associates";
import logo from "../../assets/kv-logo.png";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer({ setPage }) {
  const navigate = useNavigate();
  return (
    <footer>
      <Associates />
      <div className="footer-grid container">
        <div>
          {" "}
          <img
            src={logo}
            alt="this is brand logo"
            width={200}
            height={100}
            className="md:w-[200px] w-[150px] kv-logo cursor-pointer"
            loading="lazy"
            onClick={() => navigate("/")}
          />
          <p>
            Empowering farmers with the best agri produce, machinery and
            services for a prosperous tomorrow.
          </p>
          <p>☎ +91 1800 123 4567</p>
          <p>✉ support@krishivikas.com</p>
          <p>⌖ New Delhi, India</p>
        </div>
        <div>
          <h3>Marketplace</h3>
          {[
            "Tractors",
            "Commercial Vehicles",
            "Seeds",
            "Fertilizers",
            "Implements",
            "Tyres",
          ].map((x) => (
            <button key={x} onClick={() => navigate("/category")}>
              {x}{" "}
            </button>
          ))}
        </div>
        <div>
          <h3>Useful Links</h3>
          {[
            { label: "About Us", path: "/about" },
            { label: "Contact Us", path: "/contact" },
            { label: "Privacy Policy", path: "/privacy-policy" },
            { label: "Terms of Use", path: "/terms-of-use" },
            { label: "Refund Policy", path: "/refund-policy" },
          ].map((x) => (
            <button key={x.path} onClick={()=>navigate(x.path)}>
              {x.label}
            </button>
          ))}
        </div>
        <div className="footer_social  ">
           <h3>Follow Us</h3>
          <div className="footer__social_icons text-white flex gap-3 mt-2">
            <a href="https://www.facebook.com/joinkrishivikas">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/joinkrishivikas/">
              <RiInstagramFill />
            </a>
            <a href="https://twitter.com/JoinKrishiVikas">
              <FaXTwitter />
            </a>
            <a href="https://www.linkedin.com/company/joinkrishivikas/">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com/@JoinKrishiVikas">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">© 2025 Krishi Vikas. All rights reserved.</div>
    </footer>
  );
}
