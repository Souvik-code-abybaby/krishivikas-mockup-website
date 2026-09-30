
import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import InnerHero from "../components/InnerHero";
import Icon from "../components/Icon";
import Filters from "../components/Filters";
import { products } from "../../public/products";
import ProductCard from "../components/ProductCard";
export default function CategoryPage({ setPage }) {
  const [filters, setFilters] = useState(false);
  const [tab, setTab] = useState("New");

  return (
    <main className="container category-page">
      <Breadcrumb items={["Home", "Tractors"]} />
      <InnerHero
        title="Tractors"
        text="Powerful, reliable and efficient tractors for every farming need."
      />
      <div className="listing">
        <button className="mobile-filter" onClick={() => setFilters(!filters)}>
          <Icon name="filter" /> Filters
        </button>
        <div className={filters ? "filter-wrap visible" : "filter-wrap"}>
          <Filters />
        </div>
        <div className="catalog">
          <div className="catalog-tools">
            <div className="tabs">
              {["New", "Rent", "Used"].map((t) => (
                <button
                  className={tab === t ? "active" : ""}
                  onClick={() => setTab(t)}
                  key={t}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="sort">
              <label>
                Sort by:{" "}
                <select>
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                </select>
              </label>
              <button>
                <Icon name="grid" />
              </button>
            </div>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard
                key={p.name}
                product={p}
                onOpen={() => setPage("product")}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}