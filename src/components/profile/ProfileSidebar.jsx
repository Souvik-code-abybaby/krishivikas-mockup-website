// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   Image,
//   CreditCard,
//   Landmark,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";
// import Icon from "../Icon";

// // Existing profile menu (Logout is rendered last)
// const menu = [
//   { label: "My Profile", path: "/profile" },
//   { label: "My Posts", path: "/profile/posts" },
//   { label: "My Leads", path: "/profile/my-leads" },
//   { label: "My Boosts", path: "/profile/boosts" },
//   { label: "My Banner", path: "/profile/my-banner" },
//   { label: "Plan", path: "/profile/plan" },
//   { label: "Settings", path: "/profile/settings" },
// ];

// // Options coming from the DealerCRM sidebar
// const crmItems = [
//   {
//     icon: <LayoutDashboard size={18} />,
//     label: "Dashboard",
//     path: "/profile/dashboard",
//   },
//   {
//     icon: <Package size={18} />,
//     label: "Products",
//     children: [
//       { label: "Product List", path: "/profile/products" },
//       { label: "Add Product", path: "/profile/add-product" },
//     ],
//   },
//   {
//     icon: <Users size={18} />,
//     label: "Leads",
//     children: [
//       { label: "New Leads", path: "/profile/leads" },
//       { label: "Follow Up", path: "/profile/leads/follow-up" },
//       { label: "Lead List", path: "/profile/leads/list" },
//     ],
//   },
//   {
//     icon: <Image size={18} />,
//     label: "Banners",
//     children: [
//       { label: "New Banner", path: "/profile/new-banner" },
//       { label: "Banner List", path: "/profile/banners" },
//     ],
//   },
//   {
//     icon: <CreditCard size={18} />,
//     label: "Subscription",
//     path: "/profile/subscriptions",
//   },
//   { icon: <Landmark size={18} />, label: "Schemes", path: "/profile/schemes" },
// ];

// export default function ProfileSidebar() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [expanded, setExpanded] = useState(["Products", "Leads", "Banners"]);

//   const toggleExpand = (label) =>
//     setExpanded((prev) =>
//       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
//     );

//   const isActive = (path) => pathname === path;

//   return (
//     <aside className="profile-sidebar">
//       <div className="mini-profile">
//         <div className="profile-photo">RS</div>
//         <div>
//           <strong>Rahul Sharma</strong>
//           <small>rahul@gmail.com</small>
//         </div>
//       </div>
//       <nav>
//         {/* Existing profile options */}
//         {menu.map((x) => (
//           <button
//             className={isActive(x.path) ? "active" : ""}
//             key={x.label}
//             onClick={() => navigate(x.path)}
//           >
//             <Icon name="user" /> {x.label}
//           </button>
//         ))}

//         {/* DealerCRM options */}
//         {crmItems.map((item) => {
//           const hasChildren = !!item.children;
//           const isExpanded = expanded.includes(item.label);
//           const childActive = item.children?.some((c) => isActive(c.path));
//           const active = isActive(item.path) || childActive;

//           return (
//             <div key={item.label}>
//               <button
//                 className={active ? "active" : ""}
//                 onClick={() => {
//                   if (hasChildren) toggleExpand(item.label);
//                   else navigate(item.path);
//                 }}
//               >
//                 {item.icon} {item.label}
//                 {hasChildren && (
//                   <span style={{ marginLeft: "auto", display: "inline-flex" }}>
//                     {isExpanded ? (
//                       <ChevronDown size={14} />
//                     ) : (
//                       <ChevronRight size={14} />
//                     )}
//                   </span>
//                 )}
//               </button>

//               {hasChildren && isExpanded && (
//                 <div style={{ marginLeft: 28 }}>
//                   {item.children.map((child) => (
//                     <button
//                       key={child.label}
//                       className={isActive(child.path) ? "active" : ""}
//                       onClick={() => navigate(child.path)}
//                     >
//                       {child.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         <button onClick={() => navigate("/login")}>
//           <Icon name="logout" /> Logout
//         </button>
//       </nav>
//     </aside>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Image,
  CreditCard,
  Landmark,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Icon from "../Icon";

// Existing profile menu (Logout is rendered last)
const menu = [
  { label: "My Profile", path: "/profile" },
  { label: "My Posts", path: "/profile/posts" },

];

// Options coming from the DealerCRM sidebar
const crmItems = [
  {
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    path: "/profile/dashboard",
  },
  {
    icon: <Package size={18} />,
    label: "Products",
    children: [
      { label: "Product List", path: "/profile/products" },
      { label: "Add Product", path: "/profile/add-product" },
    ],
  },
  {
    icon: <Users size={18} />,
    label: "Leads",
    children: [
      { label: "New Leads", path: "/profile/leads" },
      { label: "Follow Up", path: "/profile/leads/follow-up" },
      { label: "Lead List", path: "/profile/leads/list" },
    ],
  },
  {
    icon: <Image size={18} />,
    label: "Banners",
    children: [
      { label: "New Banner", path: "/profile/new-banner" },
      { label: "Banner List", path: "/profile/banners" },
    ],
  },
  {
    icon: <CreditCard size={18} />,
    label: "Subscription",
    path: "/profile/subscriptions",
  },
  { icon: <Landmark size={18} />, label: "KV News", path: "/profile/news" },
];

const MOBILE_QUERY = "(max-width: 768px)";

export default function ProfileSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Desktop: sub-options expanded inline (same as before)
  const [expanded, setExpanded] = useState(["Products", "Leads", "Banners"]);

  // Mobile: detect screen size
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches,
  );
  // Mobile: the one parent whose sub-options are floating { label, top, left, items }
  const [floating, setFloating] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close floating menu on route change or when switching screen size
  useEffect(() => {
    setFloating(null);
  }, [pathname, isMobile]);

  // Close floating menu on outside tap / Escape / scroll / resize
  useEffect(() => {
    if (!floating) return;
    const close = () => setFloating(null);
    const onDown = (e) => {
      if (e.target.closest("[data-floating]")) return;
      close();
    };
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [floating]);

  const toggleExpand = (label) =>
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );

  // Mobile: open sub-options just below the tapped parent button
  const toggleFloating = (e, item) => {
    if (floating?.label === item.label) return setFloating(null);
    const rect = e.currentTarget.getBoundingClientRect();
    const width = 200;
    setFloating({
      label: item.label,
      top: rect.bottom + 4,
      left: Math.min(Math.max(8, rect.left), window.innerWidth - width - 8),
      width,
      items: item.children,
    });
  };

  const isActive = (path) => pathname === path;

  return (
    <aside className="profile-sidebar">
      <div className="mini-profile">
        <div className="profile-photo">RS</div>
        <div>
          <strong>Rahul Sharma</strong>
          <small>rahul@gmail.com</small>
        </div>
      </div>
      <nav className="scrollbar-none">
        {/* Existing profile options */}
        {menu.map((x) => (
          <button
            className={isActive(x.path) ? "active" : ""}
            key={x.label}
            onClick={() => navigate(x.path)}
          >
            <Icon name="user" /> {x.label}
          </button>
        ))}

        {/* DealerCRM options */}
        {crmItems.map((item) => {
          const hasChildren = !!item.children;
          const isExpanded = isMobile
            ? floating?.label === item.label
            : expanded.includes(item.label);
          const childActive = item.children?.some((c) => isActive(c.path));
          const active = isActive(item.path) || childActive;

          return (
            <div key={item.label}>
              <button
                className={active ? "active" : ""}
                data-floating={hasChildren && isMobile ? "" : undefined}
                onClick={(e) => {
                  if (!hasChildren) navigate(item.path);
                  else if (isMobile) toggleFloating(e, item);
                  else toggleExpand(item.label);
                }}
              >
                {item.icon} {item.label}
                {hasChildren && (
                  <span style={{ marginLeft: "auto", display: "inline-flex" }}>
                    {isExpanded ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </span>
                )}
              </button>

              {/* Desktop only: inline sub-options */}
              {!isMobile && hasChildren && isExpanded && (
                <div style={{ marginLeft: 28 }}>
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      className={isActive(child.path) ? "active" : ""}
                      onClick={() => navigate(child.path)}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <button onClick={() => navigate("/login")}>
          <Icon name="logout" /> Logout
        </button>
      </nav>

      {/* Mobile only: floating sub-options, slightly overlapping the page */}
      {isMobile && floating && (
        <div
          data-floating
          style={{
            position: "fixed",
            top: floating.top,
            left: floating.left,
            width: floating.width,
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 6,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
          }}
        >
          {floating.items.map((child) => (
            <button
              key={child.label}
              className={isActive(child.path) ? "active" : ""}
              style={{ width: "100%", textAlign: "left", minHeight: 42 }}
              onClick={() => navigate(child.path)}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}