import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AtSign,
  ChevronRight,
  MapPin,
  PackageOpen,
  Phone,
  Share2,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import Rating from "../components/Rating";
import { dealers } from "../assets/data/dealers";

// "Sharma Agro Traders" -> "sharma-agro-traders"
export const dealerSlug = (d) =>
  String(d.id ?? d.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const TABS = ["Products", "Ratings & Reviews"];

export default function DealerPage() {
  const { dealerId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dealerId]);

  const dealer = dealers.find((d) => dealerSlug(d) === dealerId);

  if (!dealer) {
    return (
      <main className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-gray-600">This dealer could not be found.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full bg-[#13693a] px-6 py-2 font-semibold text-white"
        >
          Go back
        </button>
      </main>
    );
  }

  const banner = dealer.banner ?? dealer.image;
  const address = dealer.address ?? dealer.city;
  const productList = dealer.productList ?? [];
  const phoneHref = dealer.phone
    ? `tel:${String(dealer.phone).replace(/[^\d+]/g, "")}`
    : undefined;
  const mapsHref = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : undefined;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: dealer.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <div className="bg-[#f5f8f2]">
      <main className="container pb-8 pt-[14px]">
        {/* Banner */}
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#13693a]/20 to-[#8cbf44]/30 sm:aspect-[21/8]">
          {banner && (
            <img
              src={banner}
              alt={`${dealer.name} banner`}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Profile card (uses <div>, not <section>, so the global
            `section { margin-top }` rule can't cancel the negative margin) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* LEFT: dealer information */}
          <div className="relative z-10 mx-auto -mt-14 w-full max-w-2xl sm:-mt-16 lg:mx-0 lg:min-w-0 lg:max-w-none lg:flex-1 lg:basis-0">
            <div className="absolute left-1/2 top-0 z-20 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg ring-4 ring-[#8cbf44]/40 sm:size-28">
              {dealer.logo ? (
                <img
                  src={dealer.logo}
                  alt={`${dealer.name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-[#13693a]">
                  {dealer.name[0]}
                </span>
              )}
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-linear-to-br from-[#0f5a31] via-[#13693a] to-[#6fa83a] px-5 pb-6 pt-16 text-white shadow-xl shadow-[#13693a]/25 sm:px-8 sm:pt-20">
              {/* soft decorative glows */}
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-10 size-44 rounded-full bg-[#8cbf44]/30 blur-3xl" />

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share dealer"
                className="absolute right-4 top-4 rounded-full bg-white/15 p-2.5 backdrop-blur transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
              >
                <Share2 size={20} />
              </button>

              <div className="relative text-center">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {dealer.name}
                </h2>
                {dealer.rating && (
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                      {/* <Star
                        size={14}
                        className="fill-yellow-300 text-yellow-300"
                      /> */}
                      <Rating value={dealer.rating} />
                    </span>
                    {dealer.products != null && (
                      <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                        {dealer.products} products
                      </span>
                    )}
                  </div>
                )}
              </div>

              <ul className="relative mt-6 space-y-3">
                {dealer.email && (
                  <ContactRow
                    icon={<AtSign size={20} />}
                    href={`mailto:${dealer.email}`}
                    label="Email"
                    value={dealer.email}
                  />
                )}
                {address && (
                  <ContactRow
                    icon={<MapPin size={20} />}
                    href={mapsHref}
                    external
                    label="Address"
                    value={address}
                  />
                )}
              </ul>

              {/* Call button: last child of the card */}
              {/* <a
                href={phoneHref}
                aria-disabled={!dealer.phone}
                aria-label={`Call ${dealer.name}`}
                className={`relative mt-6 flex h-14 items-center justify-center gap-2 rounded-full bg-white text-lg font-bold text-[#13693a] shadow-lg transition active:scale-[0.98] ${
                  dealer.phone
                    ? "hover:bg-white/90"
                    : "pointer-events-none opacity-60"
                }`}
              >
                <Phone size={22} />
                {dealer.phone ? "Call" : "No phone"}
              </a> */}
            </div>
          </div>

          {/* RIGHT: tabs + content */}
          <div className="mx-auto w-full max-w-2xl min-w-0 lg:mx-0 lg:mt-6 lg:max-w-none lg:flex-1 lg:basis-0">
            {/* Tab switcher */}
            <div className="flex flex-col gap-3">
              <div
                role="tablist"
                className="grid grid-cols-2 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm"
              >
                {TABS.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    type="button"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`rounded-full px-2 py-3 text-sm font-bold transition sm:text-base ${
                      tab === t
                        ? "bg-linear-to-br from-[#0f5a31] to-[#13693a] via-[#6fa83a]  text-white shadow-md shadow-[#13693a]/30"
                        : "text-[#13693a] hover:bg-[#13693a]/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="py-6">
              {tab === "Products" ? (
                productList.length ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    {productList.map((p) => (
                      <article
                        key={p.name}
                        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="aspect-square overflow-hidden bg-gray-100">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="p-3 text-sm font-semibold text-gray-800">
                          {p.name}
                        </h3>
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState text="No products available from this seller" />
                )
              ) : (
                <EmptyState text="No ratings or reviews yet" />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ContactRow({ icon, href, label, value, external }) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/20">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-white/70">{label}</span>
        <span className="block break-words font-medium leading-snug sm:text-lg">
          {value}
        </span>
      </span>
      {href && <ChevronRight size={20} className="shrink-0 text-white/60" />}
    </>
  );

  const cls =
    "flex items-center gap-4 rounded-2xl bg-white/10 p-3 backdrop-blur-sm transition";

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={`${cls} hover:bg-white/20`}
        >
          {content}
        </a>
      ) : (
        <div className={cls}>{content}</div>
      )}
    </li>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-3xl border border-dashed border-[#13693a]/25 bg-white py-12 text-center text-gray-500">
      <span className="grid size-20 place-items-center rounded-full bg-[#13693a]/10">
        <PackageOpen size={40} className="text-[#13693a]/60" strokeWidth={1.5} />
      </span>
      <p className="px-6 text-base sm:text-lg">{text}</p>
    </div>
  );
}