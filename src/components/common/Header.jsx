import Icon from "../Icon";
import logo from "../../assets/kv-logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Header({ page, setPage }) {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home"); // nothing selected by default
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);
  const [open, setOpen] = useState(false);
  const words = [
    "Tractors",
    "Commercial Vehicles",
    "Harvesters",
    "Implements",
    "Tyres",
    "Seeds",
    "Fertilizers",
    "Pesticides",
  ];
  const nav = [
       { label: "Home"},
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
    <header className="site-header bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]">
      <div className="header-main">
        {/* <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name="menu" size={26} /></button> */}
        <img
          src={logo}
          alt="this is brand logo"
          height={60}
          className="md:w-[150px] w-[150px]  cursor-pointer bg-white rounded p-2 "
          loading="lazy"
          onClick={() => {
            setActiveNav(null);
            navigate("/");
          }}
        />
        <label className="search flex w-full max-w-[390px] items-center gap-3.5 h-9 px-4 bg-[#f4f7f5] border border-[#dde7e0]  text-[#13693a] transition-[border-color,box-shadow,background-color] duration-200 focus-within:bg-white rounded-full focus-within:border-[#13693a] focus-within:ring-[3px] focus-within:ring-[#13693a]/15">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-0 outline-none bg-transparent text-[#1f2937] text-sm"
              aria-label="Search products"
            />

            {!query && (
              <span className="pointer-events-none absolute inset-0 flex items-center gap-1 text-sm text-[#7b8a80]">
                <span>Search for</span>

                {/* small window: only one word is visible at a time */}
                <span className="relative inline-block h-5 overflow-hidden align-middle">
                  <span
                    key={idx}
                    className="placeholder-anim block h-5 leading-5"
                  >
                    {words[idx]}
                  </span>
                </span>
              </span>
            )}
          </div>

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
            className={activeNav === item.label ? "active" : ""}
            onClick={() => {
              setActiveNav(item.label);
              navigate("/category");
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
