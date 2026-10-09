import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Cog,
  Settings2,
  Tag,
  Hash,
  Fuel,
  Check,
  Phone,
  ChevronRight,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
// Adjust this path to wherever your modal file lives
import CallNowFormModal from "../components/CallNowFormModal";
import { products } from "../../public/products";
import redTractor from "../assets/red-tractor.jpg";
import greenTractor from "../assets/green-tractor.jpg";
import tractorField from "../assets/tractor-field.jpg";

const TABS = ["Overview", "Features", "Specifications", "Seller Info", "Reviews"];

const KEY_FEATURES = [
  "High fuel efficiency",
  "Strong build quality",
  "Low maintenance",
  "Suitable for multiple implements",
];

// Same data as before, arranged as icon rows
const SPECS = [
  { icon: Zap, label: "Power", value: "40 HP" },
  { icon: Cog, label: "Engine", value: "4 Cylinder" },
  { icon: Settings2, label: "Transmission", value: "Gear Drive" },
  { icon: Tag, label: "Brand", value: "Eicher" },
  { icon: Hash, label: "Model", value: "380" },
  { icon: Fuel, label: "Fuel Type", value: "Diesel" },
];

// Category of this product + brands to suggest for it.
// Add `logo: importedImage` to any brand to show a real logo instead of the letter badge.
const CATEGORY = "Tractor";
const BRANDS_BY_CATEGORY = {
  Tractor: [
    { name: "Swaraj", color: "#1a9a4a" },
    { name: "Massey Ferguson", color: "#d11f2a" },
    { name: "Farmtrac", color: "#1f4e9c" },
    { name: "Sonalika", color: "#1b5fc4" },
    { name: "Mahindra", color: "#c8102e" },
    { name: "John Deere", color: "#2f7d32" },
  ],
};

/**
 * Google ad slot.
 * - Without `client` + `slot` it shows a neutral placeholder box.
 * - With your AdSense publisher id (ca-pub-XXXX) and ad slot id it renders a real ad
 *   (the AdSense <script> must also be added once in index.html).
 */
function AdSlot({ client, slot, className = "" }) {
  const live = Boolean(client && slot);

  useEffect(() => {
    if (!live) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      /* ad blocked or already loaded */
    }
  }, [live]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-gray-200 bg-[#f3f4f6] ${className}`}
    >
      <span className="absolute right-2 top-1 z-10 text-[10px] font-medium uppercase tracking-wide text-gray-400">
        Advertisement
      </span>
      {live ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block", minHeight: 90 }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="grid min-h-[90px] place-items-center px-4 py-6 text-sm text-gray-400 sm:min-h-[110px]">
          Google Ads
        </div>
      )}
    </div>
  );
}

export default function ProductPage({ setPage }) {
  const navigate = useNavigate();
  const [thumb, setThumb] = useState(0);
  const [tab, setTab] = useState("Overview");
  const [callOpen, setCallOpen] = useState(false); // controls the "Request a Call" modal

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imgs = [redTractor, greenTractor, redTractor, tractorField];
  const brands = BRANDS_BY_CATEGORY[CATEGORY] ?? [];

  return (
    <main className="container mt-5 pb-10">
      {/* Google ad — sits above the product card */}
      <AdSlot
        className=""
        // client="ca-pub-XXXXXXXXXXXXXXXX"
        // slot="1234567890"
      />

      {/* Sub navigation (kept commented out as in your version)
      <div className="sticky top-0 z-20 -mx-1 mb-4 overflow-x-auto rounded-xl bg-white/95 px-1 shadow-sm backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-6 px-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border-b-2 bg-transparent! py-3.5 text-[15px] font-semibold transition-colors ${
                tab === t
                  ? "border-[#13693a] text-[#13693a]!"
                  : "border-transparent text-gray-500! hover:text-[#13693a]!"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      */}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* ───────── Left column ───────── */}
        <div className="flex min-w-0 flex-col gap-5">
          {/* Hero card */}
          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Eicher 380
              </h1>
              <span className="rounded-md border border-[#13693a]/30 bg-[#13693a]/5 px-3 py-1 text-md font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]">
                Tractor
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
              Eicher 380 is a powerful and reliable tractor, ideal for small and
              medium-sized farms. It offers excellent fuel efficiency and
              durability.
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
              {/* Gallery */}
              <div>
                <div className="overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={imgs[thumb]}
                    alt="Eicher 380 tractor"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2.5">
                  {imgs.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setThumb(i)}
                      className={`overflow-hidden rounded-lg border-2 bg-white p-0! transition ${
                        i === thumb
                          ? "border-[#13693a]"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Tractor view ${i + 1}`}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights + price */}
              <div className="flex flex-col">
                <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200 pb-4">
                  {[
                    { label: "Power", value: "40 HP", icon: Zap },
                    { label: "Engine", value: "4 Cylinder", icon: Cog },
                    {
                      label: "Transmission",
                      value: "Gear Drive",
                      icon: Settings2,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="px-3 first:pl-0">
                      <p className="text-xs font-medium text-gray-500">
                        {label}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-gray-900 sm:text-xs">
                        <Icon size={16} className="shrink-0 text-[#13693a]" />
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="py-5">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
                    ₹ 5,80,000
                  </p>
                </div>

                {/* Opens the "Request a Call" form modal */}
                <button
                  type="button"
                  onClick={() => setCallOpen(true)}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a] px-6 py-3.5 text-base font-bold text-white! shadow-[0_6px_16px_rgba(19,105,58,0.3)] transition hover:bg-[#0f5a31]!"
                >
                  <Phone size={18} />
                  Price
                </button>
              </div>
            </div>
          </section>

          {/* Overview card */}
          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {tab}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]" />
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
              Eicher 380 is a powerful and reliable tractor, ideal for small and
              medium-sized farms. It offers excellent fuel efficiency and
              durability.
            </p>

            <h3 className="mt-5 text-base font-bold text-gray-900">
              Key Features
            </h3>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {KEY_FEATURES.map((x) => (
                <div
                  key={x}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#13693a]/10 text-[#13693a]">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {x}
                </div>
              ))}
            </div>
          </section>

          {/* Specifications card (icon rows, two columns) */}
          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Eicher 380 Specifications
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]" />

            <div className="mt-4 grid gap-x-10 md:grid-cols-2">
              {SPECS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-gray-100 py-3.5 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
                >
                  <span className="flex items-center gap-3 text-sm text-gray-500">
                    <Icon size={20} className="shrink-0 text-gray-400" />
                    {label}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ───────── Right sidebar ───────── */}
        <aside className="flex min-w-0 flex-col gap-5">
          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-md font-bold text-gray-900">
                  Compare with Similar Categories
                </h3>
                <div className="mt-2 h-1 w-12 rounded-full bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]" />
              </div>
              <button
                type="button"
                onClick={() => navigate("/compare")}
                className="flex shrink-0 items-center gap-0.5 bg-transparent! p-0! text-sm font-semibold text-[#13693a]! hover:underline"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-4 grid gap-4">
              <ProductCard product={products[1]} compact />
              <ProductCard product={products[2]} compact />
            </div>
          </section>

          {/* Similar brands of this category */}
          {brands.length > 0 && (
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
              <h3 className="text-md font-bold text-gray-900">
                Similar {CATEGORY} By Brands
              </h3>
              <div className="mt-2 h-1 w-12 rounded-full bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]" />

              <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200">
                {brands.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => navigate("/category")}
                    className="flex min-h-[120px] flex-col items-center justify-center gap-3 bg-white! p-4 text-center transition hover:bg-[#13693a]/5!"
                  >
                    {b.logo ? (
                      <img
                        src={b.logo}
                        alt={b.name}
                        className="h-12 w-auto max-w-[110px] object-contain"
                      />
                    ) : (
                      <span
                        className="grid size-12 place-items-center rounded-full text-lg font-extrabold text-white"
                        style={{ backgroundColor: b.color }}
                      >
                        {b.name.charAt(0)}
                      </span>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {b.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>

      {/* "Request a Call" form modal — mounted only after the Price button is clicked,
          so its category list isn't fetched on every page load */}
      {callOpen && (
        <CallNowFormModal
          open={callOpen}
          onClose={() => setCallOpen(false)}
          // Pass real ids from your product data so the lead is linked correctly:
          product={{ id: undefined, category_id: undefined, name: "Eicher 380" }}
          // onSubmitLead={async (payload) => { await yourApiCall(payload); }}
        />
      )}
    </main>
  );
} 