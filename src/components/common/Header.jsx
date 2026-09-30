import { useState } from "react";
import Icon from "../Icon";
import logo from "../../assets/kv-logo.png"
import { useNavigate } from "react-router-dom";
export default function Header({ page, setPage }) {
const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const nav = [
   
    { label: "Tractors", page: "tractors" },
    { label: "Commercial Vehicle" },
    { label: "Harvesters" },
    { label: "Implements" },
    { label: "Tyres" },
    { label: "Seeds" },
    { label: "Fertilizers" },
    { label: "Pesticides" },
    { label: "More" },
  ];
  return (
    <header className="site-header">
      <div className="header-main">
        {/* <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name="menu" size={26} /></button> */}
        <img
          src={logo}
          alt="this is brand logo"
          width={200}
          height={100}
          className="md:w-[200px] w-[150px] kv-logo cursor-pointer"
          loading="lazy"
          onClick={() => navigate("/")}
        />
        <label className="search">
          
          <input
            placeholder="Search for Tractors, vehicles, seeds..."
            aria-label="Search products"
          />
          <Icon name="search" size={21} />
        </label>
        <div className="header-actions">
          <button onClick={() => navigate("/compare")}>
            <Icon name="scale" /> <span>Compare</span>
          </button>
          <button onClick={() => navigate("/emi")}>
            <Icon name="calculator" /> <span>EMI Calculator</span>
          </button>
          <button>
            <Icon name="heart" /> <span>Wishlist</span>
          </button>
          <button onClick={() => navigate("/profile")}>
            <Icon name="user" /> <span>English</span>
          </button>
        </div>
      </div>
      <nav className={`main-nav ${open ? "open" : ""}`}>
        {nav.map((item) => (
          <button
            key={item.label}
            className={
              item.page === page ||
              (page === "product" && item.page === "tractors")
                ? "active"
                : ""
            }
            onClick={() => navigate("/category")}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}