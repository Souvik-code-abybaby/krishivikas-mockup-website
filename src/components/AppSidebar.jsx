import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Gavel,
  GitCompare,
  Globe,
  Heart,
  Info,
  LogOut,
  MoreHorizontal,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";

// Main items (always visible)
const MAIN_ITEMS = [
  { key: "language", label: "Language", icon: Globe }, // expands a language list
  { key: "compare", label: "Compare", icon: GitCompare, to: "/compare" },
  { key: "wishlist", label: "Wishlist", icon: Heart, to: "/wishlist" },
];

// Items shown after tapping "More"
const MORE_ITEMS = [
  { key: "crop", label: "Crop Calender", icon: CalendarDays, to: "/crop-calendar" },
  { key: "emi", label: "Emi Calculator", icon: Calculator, to: "/emi-calculator" },
  { key: "rating", label: "My Rating", icon: Star, to: "/my-rating" },
  { key: "about", label: "About Us", icon: Info, to: "/about-us" },
  { key: "terms", label: "Terms of Use", icon: Gavel, to: "/terms" },
  { key: "privacy", label: "Privacy Policy", icon: ShieldCheck, to: "/privacy-policy" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
];

/**
 * Props
 *  open / onClose        – control visibility
 *  user                  – { name, avatar, completion }  (completion = 0-100)
 *  language              – current language code
 *  onLanguageChange(code)
 *  onLogout()
 *  logoSrc               – brand logo for the footer
 */
export default function AppSidebar({
  open,
  onClose,
  user,
  language = "en",
  onLanguageChange,
  onLogout,
  logoSrc,
}) {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Close on Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const go = (to) => {
    onClose?.();
    navigate(to);
  };

  const completion = Math.min(100, Math.max(0, user?.completion ?? 0));

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-[100] flex w-[330px] max-w-[88vw] flex-col rounded-r-3xl bg-[#067038] text-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Profile card */}
        <div className="px-4 pb-3 pt-12">
          <button
            type="button"
            onClick={() => go("/profile")}
            className="flex w-full items-center gap-4 rounded-2xl bg-white/10 p-3.5 text-left transition hover:bg-white/15"
          >
            {/* avatar with completion ring */}
            <span
              className="grid size-[68px] shrink-0 place-items-center rounded-full p-[3px]"
              style={{
                background: `conic-gradient(#e2b93b ${completion * 3.6}deg, rgba(255,255,255,.2) 0)`,
              }}
            >
              <span className="grid size-full place-items-center overflow-hidden rounded-full bg-white">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name ?? "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-[#067038]">
                    {(user?.name ?? "G")[0].toUpperCase()}
                  </span>
                )}
              </span>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-lg font-bold">
                {user?.name ?? "Guest"}
              </span>
              <span className="block truncate text-sm text-white/70">
                {user
                  ? `View & edit details (${completion}% done)`
                  : "Login or sign up"}
              </span>
            </span>
            <ChevronRight size={20} className="shrink-0 text-white/80" />
          </button>
        </div>

        <div className="mx-4 border-t border-white/15" />

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 [scrollbar-color:#ffffff40_transparent] [scrollbar-width:thin]">
          {MAIN_ITEMS.map((item) =>
            item.key === "language" ? (
              <div key={item.key}>
                <Row
                  icon={item.icon}
                  label={item.label}
                  trailing={
                    langOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )
                  }
                  onClick={() => setLangOpen((v) => !v)}
                />
                {langOpen && (
                  <div className="mb-1 ml-12 flex flex-wrap gap-2 pb-2">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => onLanguageChange?.(l.code)}
                        className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                          language === l.code
                            ? "bg-white text-[#067038]"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Row
                key={item.key}
                icon={item.icon}
                label={item.label}
                onClick={() => go(item.to)}
              />
            ),
          )}

          {/* More */}
          <Row
            icon={MoreHorizontal}
            label="More"
            trailing={
              moreOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />
            }
            onClick={() => setMoreOpen((v) => !v)}
          />
          {moreOpen &&
            MORE_ITEMS.map((item) => (
              <Row
                key={item.key}
                icon={item.icon}
                label={item.label}
                onClick={() => go(item.to)}
              />
            ))}
        </nav>

        <div className="mx-4 border-t border-white/15" />

        {/* Logout */}
        <div className="px-4 pt-4">
          <button
            type="button"
            onClick={() => {
              onClose?.();
              onLogout?.();
            }}
            className="flex w-full items-center gap-4 rounded-2xl bg-black/15 px-5 py-4 text-lg font-bold text-[#ff6b57] transition hover:bg-black/25"
          >
            <LogOut size={22} />
            Logout
          </button>
        </div>

        {/* Brand footer */}
        <div className="flex items-center gap-3 px-5 pb-5 pt-4">
          <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-white/30">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Krishi Vikas Udyog"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-extrabold text-[#067038]">KV</span>
            )}
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">Krishi Vikas Udyog</span>
            <span className="block text-xs text-white/70">
              Digital Krishi Bazar
            </span>
          </span>
        </div>
      </aside>
    </>
  );
}

function Row({ icon: Icon, label, onClick, trailing }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl px-2 py-3.5 text-left transition hover:bg-white/10"
    >
      <Icon size={24} className="shrink-0" />
      <span className="flex-1 text-lg font-semibold tracking-wide">
        {label}
      </span>
      <span className="shrink-0 text-white/70">
        {trailing ?? <ChevronRight size={18} />}
      </span>
    </button>
  );
}