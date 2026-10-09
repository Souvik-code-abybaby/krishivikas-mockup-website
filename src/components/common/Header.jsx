import Icon from "../Icon";
import logo from "../../assets/kv-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import AppSidebar from "../AppSidebar";
import { Calculator, GitCompare, BookOpen, LayoutGrid } from "lucide-react";

const LANGUAGE_LABELS = { en: "English", hi: "हिन्दी", bn: "বাংলা" };

// Items shown inside the "More" dropdown
const MORE_MENU = [
  { label: "Compare", icon: GitCompare, to: "/compare" },
  { label: "EMI Calculator", icon: Calculator, to: "/emi" },
  { label: "Blogs", icon: BookOpen, to: "/blogs" },
];

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
  { label: "Home", path: "/" },
  { label: "Tractors", path: "/category", page: "tractors" },
  { label: "Commercial Vehicle", path: "/category" },
  { label: "Harvesters", path: "/category" },
  { label: "Implements", path: "/category" },
  { label: "Tyres", path: "/category" },
  { label: "Seeds", path: "/category" },
  { label: "Fertilizers", path: "/category" },
  { label: "Pesticides", path: "/category" },
  { label: "More", action: "more" },
];

export default function Header({ page, setPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [idx, setIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [open, setOpen] = useState(false);

  // "More" dropdown state
  const [moreOpen, setMoreOpen] = useState(false);
  const [morePos, setMorePos] = useState({ top: 0, right: 0 });
  const moreBtnRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Logged-in user for the sidebar profile card.
  const authUser = useSelector((state) => state.auth.user);
  const sidebarUser = authUser
    ? {
        name: authUser.name,
        avatar: authUser.avatar,
        completion: authUser.completion ?? 0,
      }
    : null;

  const handleLogout = () => {
    // TODO: dispatch your real logout action here, then redirect
    navigate("/");
  };

  // Place the dropdown under the "More" button
  const toggleMore = () => {
    const rect = moreBtnRef.current.getBoundingClientRect();
    setMorePos({
      top: rect.bottom + 8,
      right: Math.max(8, window.innerWidth - rect.right),
    });
    setMoreOpen((v) => !v);
  };

  // Rotating placeholder words
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  // Highlight the right nav tab based on route
  useEffect(() => {
    if (pathname === "/") {
      setActiveNav("Home");
    } else if (pathname === "/category") {
      // keep the clicked category tab; just make sure Home isn't highlighted
      setActiveNav((prev) => (prev && prev !== "Home" ? prev : "Tractors"));
    } else {
      // any other page: no nav tab highlighted
      setActiveNav(null);
    }
  }, [pathname]);

  // Close "More" on outside click, Escape, resize, scroll
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e) => {
      if (
        !moreMenuRef.current?.contains(e.target) &&
        !moreBtnRef.current?.contains(e.target)
      ) {
        setMoreOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setMoreOpen(false);
    const close = () => setMoreOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [moreOpen]);

  // Close "More" when the route changes
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="site-header bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]">
        <div className="header-main ">
          {/* Opens the sidebar */}
          <button
            type="button"
            className="icon-btn text-white"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size={26} />
          </button>

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

          <label className="search flex w-full max-w-[600px] items-center gap-3.5 h-9 px-4 bg-[#f4f7f5] border border-[#dde7e0]  text-[#13693a] transition-[border-color,box-shadow,background-color] duration-200 focus-within:bg-white rounded-full focus-within:border-[#13693a] focus-within:ring-[3px] focus-within:ring-[#13693a]/15">
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
        </div>

        <nav className={`main-nav ${open ? "open" : ""}`}>
          {nav.map((item) =>
            item.action === "more" ? (
              <button
                key={item.label}
                ref={moreBtnRef}
                type="button"
                onClick={toggleMore}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                className={`flex items-center gap-1.5 ${moreOpen ? "active" : ""}`}
              >
                <LayoutGrid
                  size={14}
                  style={{
                    transform: moreOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                {item.label}
              </button>
            ) : (
              <button
                key={item.label}
                className={activeNav === item.label ? "active" : ""}
                onClick={() => {
                  setActiveNav(item.label);
                  navigate(item.path);
                }}
              >
                {item.label}
              </button>
            ),
          )}
        </nav>
      </header>

      {/* "More" dropdown — fixed so a scrollable nav can't clip it */}
      {/* Always mounted so it can animate both open AND close */}
      <div
        ref={moreMenuRef}
        role="menu"
        aria-hidden={!moreOpen}
        style={{
          top: morePos.top,
          right: morePos.right,
          transformOrigin: "top right",
          opacity: moreOpen ? 1 : 0,
          transform: moreOpen
            ? "translateY(0) scale(1)"
            : "translateY(-10px) scale(0.92)",
          visibility: moreOpen ? "visible" : "hidden",
          pointerEvents: moreOpen ? "auto" : "none",
          transition: moreOpen
            ? "opacity 260ms cubic-bezier(0.22,1,0.36,1), transform 320ms cubic-bezier(0.22,1,0.36,1), visibility 0s linear 0s"
            : "opacity 180ms ease-in, transform 200ms ease-in, visibility 0s linear 200ms",
        }}
        className="fixed z-[80] w-[210px] rounded-2xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] will-change-[transform,opacity] motion-reduce:!transition-none"
      >
        {MORE_MENU.map(({ label, icon: MenuIcon, to }, i) => (
          <button
            key={label}
            role="menuitem"
            type="button"
            tabIndex={moreOpen ? 0 : -1}
            style={{
              opacity: moreOpen ? 1 : 0,
              transform: moreOpen ? "translateX(0)" : "translateX(-8px)",
              transition: moreOpen
                ? `opacity 280ms ease-out ${80 + i * 60}ms, transform 320ms cubic-bezier(0.22,1,0.36,1) ${80 + i * 60}ms, background-color 150ms`
                : "opacity 120ms ease-in, transform 120ms ease-in, background-color 150ms",
            }}
            onClick={() => {
              setMoreOpen(false);
              setActiveNav(null);
              navigate(to);
            }}
            className="flex w-full items-center gap-3 rounded-lg bg-transparent! px-2 py-2.5 text-left text-sm font-semibold uppercase tracking-wide text-[#0f5f4a]! hover:bg-[#13693a]/10! motion-reduce:!transition-none"
          >
            <MenuIcon size={20} className="shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* Sidebar lives outside <header> so the header's styles can't affect its fixed positioning */}
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={sidebarUser}
        language={lang}
        onLanguageChange={setLang}
        onLogout={handleLogout}
        logoSrc={logo}
      />
    </>
  );
}