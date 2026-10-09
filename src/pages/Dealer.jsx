import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import DealerProfileCard from "../components/dealer/DealerProfileCard";
import DealerProductCard from "../components/dealer/DealerProductCard";
import { dealers } from "../assets/data/dealers";
import { getDealerProducts } from "../../src/assets/data/sampledealerproducts";

// "Sharma Agro Traders" -> "sharma-agro-traders"
export const dealerSlug = (d) =>
  String(d.id ?? d.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Category tabs shown on the dealer page
const CATEGORY_TABS = [
  { key: "tractors", label: "Tractors" },
  { key: "commercial", label: "Commercial Vehicle" },
  { key: "harvesters", label: "Harvesters" },
  { key: "implements", label: "Implements" },
  { key: "tyres", label: "Tyres" },
];

// Turns whatever the product stores ("Tractor", "tractors", "Commercial Vehicles",
// "Tire"...) into one of the tab keys above.
// Products with no category at all fall back to "tractors".
const getCategoryKey = (product) => {
  const raw = String(
    product.category ??
      product.categoryName ??
      product.category_name ??
      product.type ??
      "",
  ).toLowerCase();

  if (!raw) return "tractors";
  if (raw.includes("tractor")) return "tractors";
  if (raw.includes("commercial") || raw.includes("truck")) return "commercial";
  if (raw.includes("harvest")) return "harvesters";
  if (raw.includes("implement")) return "implements";
  if (raw.includes("tyre") || raw.includes("tire")) return "tyres";
  return raw;
};

export default function DealerPage({ setPage }) {
  const { dealerId } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(false);
  const [tab, setTab] = useState("tractors");
  const [sort, setSort] = useState("Popularity");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dealerId]);

  // Start from the first tab whenever a different dealer is opened
  useEffect(() => {
    setTab("tractors");
  }, [dealerId]);

  const dealer = dealers.find((d) => dealerSlug(d) === dealerId);

  // Dealer's products (own productList, or the 5 samples)
  const allProducts = useMemo(() => {
    if (!dealer) return [];
    return [...getDealerProducts(dealer)];
  }, [dealer]);

  // Filter by active category tab, then sort
  const dealerProducts = useMemo(() => {
    const list = allProducts.filter((p) => getCategoryKey(p) === tab);
    if (sort === "Price: Low to High") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    }
    return list;
  }, [allProducts, tab, sort]);

  const activeLabel = CATEGORY_TABS.find((t) => t.key === tab)?.label;

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

  return (
    <main className="container category-page">
      {/* Hero: the exact image from the dealer card the user clicked (dealer.image) */}
      <div className="relative mt-[14px] h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-[#13693a]/20 to-[#8cbf44]/30 sm:h-52">
        {dealer.image && (
          <img
            src={dealer.image}
            alt={dealer.name}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent to-60%" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
          <h1 className="text-2xl font-bold sm:text-4xl">{dealer.name}</h1>
          {(dealer.address ?? dealer.city) && (
            <p className="mt-1 text-sm text-white/80 sm:text-base">
              {dealer.address ?? dealer.city}
            </p>
          )}
        </div>
      </div>

      <div className="listing">
        <button className="mobile-filter" onClick={() => setFilters(!filters)}>
          <Icon name="filter" /> Filters
        </button>

        {/* Filter section: dealer profile */}
        <div className={filters ? "filter-wrap visible" : "filter-wrap"}>
          <DealerProfileCard dealer={dealer} className="mb-5" />
        </div>

        <div className="catalog">
          {/* Category tabs + sort (same classes as the category page) */}
          <div className="catalog-tools">
            <div className="tabs overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORY_TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={tab === t.key ? "active" : ""}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {/* <div className="sort">
              <label>
                Sort by:{" "}
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                </select>
              </label>
            </div> */}
          </div>

          {dealerProducts.length > 0 ? (
            <div className="product-grid">
              {dealerProducts.map((item, i) => (
                <DealerProductCard
                  key={item.id ?? item.name ?? i}
                  product={item}
                  onClick={() => navigate("")}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              This dealer has no {activeLabel?.toLowerCase()} listed yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}