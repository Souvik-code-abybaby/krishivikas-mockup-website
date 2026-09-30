import Associates from "./Associates";
import logo from "../../assets/kv-logo.png";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Footer({ setPage }) {
const navigate=useNavigate();
  return (
    <footer>
      <Associates/>
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
            "Used & Rental",
          ].map((x) => (
            <button key={x}>{x}</button>
          ))}
        </div>
        <div>
          <h3>Support & Legal</h3>
          {[
            "About Us",
            "Help Center",
            "Contact Us",
            "Privacy Policy",
            "Terms of Use",
            "Refund Policy",
          ].map((x) => (
            <button key={x}>{x}</button>
          ))}
        </div>
        <div>
          <h3>Follow Us</h3>
          <p className="social">f &nbsp; ◎ &nbsp; ◉ &nbsp; in &nbsp; 𝕏</p>
          
        </div>
      </div>
      <div className="copyright">© 2025 Krishi Vikas. All rights reserved.</div>
    </footer>
  );
}
