// import Icon from "../Icon";
// import logo from "../../assets/kv-logo.png";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Modal from "../Modal";
// import { Calculator } from "lucide-react";
// import { useLocation } from "react-router-dom";
// export default function Header({ page, setPage }) {
//   const [showMore, setShowMore] = useState(false);
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [idx, setIdx] = useState(0);
//   const [query, setQuery] = useState("");
//   const [activeNav, setActiveNav] = useState("Home"); // nothing selected by default
//   useEffect(() => {
//     const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2500);
//     return () => clearInterval(t);
//   }, []);
//   useEffect(() => {
//   if (pathname === "/") {
//     setActiveNav("Home");
//   } else if (pathname === "/category") {
//     // keep the clicked category tab; just make sure Home isn't highlighted
//     setActiveNav((prev) => (prev && prev !== "Home" ? prev : "Tractors"));
//   } else {
//     // FAQ page and any other page: no nav tab highlighted
//     setActiveNav(null);
//   }
// }, [pathname]); 
//   const [open, setOpen] = useState(false);
//   const words = [
//     "Tractors",
//     "Commercial Vehicles",
//     "Harvesters",
//     "Implements",
//     "Tyres",
//     "Seeds",
//     "Fertilizers",
//     "Pesticides",
//   ];
//   const nav = [
//     { label: "Home", path: "/" },
//     { label: "Tractors", path: "/category", page: "tractors" },
//     { label: "Commercial Vehicle", path: "/category" },
//     { label: "Harvesters", path: "/category" },
//     { label: "Implements", path: "/category" },
//     { label: "Tyres", path: "/category" },
//     { label: "Seeds", path: "/category" },
//     { label: "Fertilizers", path: "/category" },
//     { label: "Pesticides", path: "/category" },
//     { label: "More", action: "more" },
//   ];
//   return (
//     <header className="site-header bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]">
//       <div className="header-main ">
//         {/* <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name="menu" size={26} /></button> */}
//         <img
//           src={logo}
//           alt="this is brand logo"
//           height={60}
//           className="md:w-[150px] w-[150px]  cursor-pointer bg-white rounded p-2 "
//           loading="lazy"
//           onClick={() => {
//             setActiveNav(null);
//             navigate("/");
//           }}
//         />
//         <label className="search flex w-full max-w-[390px] items-center gap-3.5 h-9 px-4 bg-[#f4f7f5] border border-[#dde7e0]  text-[#13693a] transition-[border-color,box-shadow,background-color] duration-200 focus-within:bg-white rounded-full focus-within:border-[#13693a] focus-within:ring-[3px] focus-within:ring-[#13693a]/15">
//           <div className="relative flex-1">
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full border-0 outline-none bg-transparent text-[#1f2937] text-sm"
//               aria-label="Search products"
//             />

//             {!query && (
//               <span className="pointer-events-none absolute inset-0 flex items-center gap-1 text-sm text-[#7b8a80]">
//                 <span>Search for</span>

//                 {/* small window: only one word is visible at a time */}
//                 <span className="relative inline-block h-5 overflow-hidden align-middle">
//                   <span
//                     key={idx}
//                     className="placeholder-anim block h-5 leading-5"
//                   >
//                     {words[idx]}
//                   </span>
//                 </span>
//               </span>
//             )}
//           </div>

//           <Icon name="search" size={21} />
//         </label>
//         <div className="header-actions">
//           <button onClick={() => navigate("/compare")}>
//             <Icon name="scale" /> <span>Compare</span>
//           </button>
//           {/* <button onClick={() => navigate("/emi")}>
//             <Icon name="calculator" /> <span>EMI Calculator</span>
//           </button> */}
//           <button>
//             <Icon name="heart" /> <span>Wishlist</span>
//           </button>
       
//           <span>English</span>
//              <button onClick={() => navigate("/profile")}>
//             <Icon name="user" /> 
//           </button>
//         </div>
//       </div>
//       <nav className={`main-nav ${open ? "open" : ""}`}>
//         {nav.map((item) => (
//           <button
//             key={item.label}
//             className={activeNav === item.label ? "active" : ""}
//             onClick={() => {
//               if (item.action === "more") {
//                 setShowMore(true); // open the modal, keep the current tab highlighted
//                 return;
//               }
//               setActiveNav(item.label);
//               navigate(item.path);
//             }}
//           >
//             {item.label}
//           </button>
//         ))}
//       </nav>
//       {/* <Modal open={showMore} onClose={() => setShowMore(false)} title="More">
//         <div className="flex flex-col gap-3">
//           <button
//             type="button"
//             onClick={() => {
//               setShowMore(false); // close the modal first
//               navigate("/emi"); // then go to the EMI page
//             }}
//             className="w-full flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-left text-sm md:text-base text-gray-700 transition hover:bg-[#13693a]/10 hover:border-[#13693a]"
//           >
//             <Calculator size={20} className="text-[#13693a] shrink-0" />
//             <span className="font-medium">EMI Calculator</span>
//           </button>
//         </div>
//       </Modal> */}
//     </header>
//   );
// }
import Icon from "../Icon";
import logo from "../../assets/kv-logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import AppSidebar from "../AppSidebar";
import { Calculator } from "lucide-react";
import { useLocation } from "react-router-dom";

const LANGUAGE_LABELS = { en: "English", hi: "हिन्दी", bn: "বাংলা" };

export default function Header({ page, setPage }) {
  const [showMore, setShowMore] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [idx, setIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home"); // nothing selected by default

  // Logged-in user for the sidebar profile card.
  // Adjust these field names to match what your auth slice really stores.
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

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
  if (pathname === "/") {
    setActiveNav("Home");
  } else if (pathname === "/category") {
    // keep the clicked category tab; just make sure Home isn't highlighted
    setActiveNav((prev) => (prev && prev !== "Home" ? prev : "Tractors"));
  } else {
    // FAQ page and any other page: no nav tab highlighted
    setActiveNav(null);
  }
}, [pathname]); 
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
        {/* <div className="header-actions">
          <button onClick={() => navigate("/compare")}>
            <Icon name="scale" /> <span>Compare</span>
          </button>
          <button onClick={() => navigate("/emi")}>
            <Icon name="calculator" /> <span>EMI Calculator</span>
          </button>
          <button onClick={() => navigate("/wishlist")}>
            <Icon name="heart" /> <span>Wishlist</span>
          </button>
       
          <span>{LANGUAGE_LABELS[lang]}</span>
             <button onClick={() => navigate("/profile")}>
            <Icon name="user" /> 
          </button>
        </div> */}
      </div>
      <nav className={`main-nav ${open ? "open" : ""}`}>
        {nav.map((item) => (
          <button
            key={item.label}
            className={activeNav === item.label ? "active" : ""}
            onClick={() => {
              if (item.action === "more") {
                setShowMore(true); // open the modal, keep the current tab highlighted
                return;
              }
              setActiveNav(item.label);
              navigate(item.path);
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {/* <Modal open={showMore} onClose={() => setShowMore(false)} title="More">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setShowMore(false); // close the modal first
              navigate("/emi"); // then go to the EMI page
            }}
            className="w-full flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-left text-sm md:text-base text-gray-700 transition hover:bg-[#13693a]/10 hover:border-[#13693a]"
          >
            <Calculator size={20} className="text-[#13693a] shrink-0" />
            <span className="font-medium">EMI Calculator</span>
          </button>
        </div>
      </Modal> */}
    </header>

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