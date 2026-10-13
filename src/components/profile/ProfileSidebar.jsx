import { useState } from "react";
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
  { label: "My Leads", path: "/profile/my-leads" },
  { label: "My Boosts", path: "/profile/boosts" },
  { label: "My Banner", path: "/profile/my-banner" },
  { label: "Plan", path: "/profile/plan" },
  { label: "Settings", path: "/profile/settings" },
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
  { icon: <Landmark size={18} />, label: "Schemes", path: "/profile/schemes" },
];

export default function ProfileSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(["Products", "Leads", "Banners"]);

  const toggleExpand = (label) =>
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );

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
      <nav>
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
          const isExpanded = expanded.includes(item.label);
          const childActive = item.children?.some((c) => isActive(c.path));
          const active = isActive(item.path) || childActive;

          return (
            <div key={item.label}>
              <button
                className={active ? "active" : ""}
                onClick={() => {
                  if (hasChildren) toggleExpand(item.label);
                  else navigate(item.path);
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

              {hasChildren && isExpanded && (
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
    </aside>
  );
}