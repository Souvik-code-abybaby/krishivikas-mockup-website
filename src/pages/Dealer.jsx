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

export default function DealerPage({ setPage }) {
  const { dealerId } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(false);
  const [tab, setTab] = useState("New");
  const [sort, setSort] = useState("Popularity");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dealerId]);

  const dealer = dealers.find((d) => dealerSlug(d) === dealerId);

  // Dealer's products (own productList, or the 5 samples)
  const dealerProducts = useMemo(() => {
    if (!dealer) return [];
    const list = [...getDealerProducts(dealer)];
    if (sort === "Price: Low to High") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    }
    return list;
  }, [dealer, sort]);

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
          <div className="product-grid">
            {dealerProducts.map((item, i) => (
              <DealerProductCard
                key={item.id ?? item.name ?? i}
                product={item}
                onClick={() => navigate("")}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}