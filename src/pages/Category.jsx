// import { useState } from "react";
// import Breadcrumb from "../components/Breadcrumb";
// import InnerHero from "../components/InnerHero";
// import Icon from "../components/Icon";
// import Filters from "../components/Filters";
// import { products } from "../../public/products";
// import ProductCard from "../components/ProductCard";
// export default function CategoryPage({ setPage }) {
//   const [filters, setFilters] = useState(false);
//   const [tab, setTab] = useState("New");

//   return (
//     <main className="container category-page">
//       <Breadcrumb items={["Home", "Tractors"]} />
//       <InnerHero
//         title="Tractors"
//         text="Powerful, reliable and efficient tractors for every farming need."
//       />
//       <div className="listing">
//         <button className="mobile-filter" onClick={() => setFilters(!filters)}>
//           <Icon name="filter" /> Filters
//         </button>
//         <div className={filters ? "filter-wrap visible" : "filter-wrap"}>
//           <Filters />
//         </div>
//         <div className="catalog">
//           <div className="catalog-tools">
//             <div className="tabs">
//               {["New", "Rent", "Used"].map((t) => (
//                 <button
//                   className={tab === t ? "active" : ""}
//                   onClick={() => setTab(t)}
//                   key={t}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>
//             <div className="sort">
//               <label>
//                 Sort by:{" "}
//                 <select>
//                   <option>Popularity</option>
//                   <option>Price: Low to High</option>
//                 </select>
//               </label>
//               <button>
//                 <Icon name="grid" />
//               </button>
//             </div>
//           </div>
//           <div className="product-grid">
//             {products.map((p) => (
//               <ProductCard
//                 key={p.name}
//                 product={p}
//                 onOpen={() => setPage("product")}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import InnerHero from "../components/InnerHero";
import Icon from "../components/Icon";
import Filters from "../components/Filters";
import { products } from "../../public/products";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banner/banner1.jpeg";
import banner2 from "../assets/banner/banner2.jpeg";
import banner3 from "../assets/banner/banner3.jpeg";
import banner4 from "../assets/banner/banner4.jpeg";
import banner5 from "../assets/banner/banner5.jpeg";
import banner6 from "../assets/banner/banner6.jpeg";

const PRODUCTS_PER_CHUNK = 3; // products before banners appear
const BANNERS_PER_GROUP = 3; // banners inserted after each chunk

const staticBanners = [
  { id: "static-banner-1", banner_image: banner1, link: "/dealer-details/123" },
  { id: "static-banner-2", banner_image: banner2, link: "/dealer-details/456" },
  { id: "static-banner-3", banner_image: banner3, link: "/dealer-details/789" },
  { id: "static-banner-4", banner_image: banner4, link: "/dealer-details/123" },
  { id: "static-banner-5", banner_image: banner5, link: "/dealer-details/456" },
  { id: "static-banner-6", banner_image: banner6, link: "/dealer-details/789" },
];

export default function CategoryPage({ setPage }) {
  const [filterDirty, setFilterDirty] = useState(false);
  const closeFilters = () => {
    setFilters(false);
  
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Auto-scroll every banner row (only scrolls when it is a carousel, i.e. 1-column layout)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = Array.from(document.querySelectorAll(".banner-row"));
    const paused = new Set();

    const cleanups = rows.map((row) => {
      let t;
      const pause = () => {
        clearTimeout(t);
        paused.add(row);
      };
      const resume = (delay) => {
        clearTimeout(t);
        t = setTimeout(() => paused.delete(row), delay);
      };
      const onLeave = () => resume(0);
      const onTouchEnd = () => resume(2500);

      row.addEventListener("mouseenter", pause);
      row.addEventListener("mouseleave", onLeave);
      row.addEventListener("touchstart", pause, { passive: true });
      row.addEventListener("touchend", onTouchEnd);

      return () => {
        clearTimeout(t);
        row.removeEventListener("mouseenter", pause);
        row.removeEventListener("mouseleave", onLeave);
        row.removeEventListener("touchstart", pause);
        row.removeEventListener("touchend", onTouchEnd);
      };
    });

    const id = setInterval(() => {
      rows.forEach((row) => {
        if (paused.has(row)) return;
        if (row.scrollWidth <= row.clientWidth + 1) return; // desktop grid: nothing to scroll

        const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
        const step = row.firstElementChild.getBoundingClientRect().width + gap;
        const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;

        row.scrollTo({
          left: atEnd ? 0 : row.scrollLeft + step,
          behavior: "smooth",
        });
      });
    }, 3000);

    return () => {
      clearInterval(id);
      cleanups.forEach((fn) => fn());
    };
  }, []);
  const [filters, setFilters] = useState(false);
  const [tab, setTab] = useState("New");
  const navigate = useNavigate();
  // Same mechanism as CategoryWiseAllProduct: 6 products + 3 banners, repeated
  const interleavedItems = useMemo(() => {
    const result = [];
    let productIndex = 0;
    let groupNumber = 0;

    while (productIndex < products.length) {
      const chunk = products.slice(
        productIndex,
        productIndex + PRODUCTS_PER_CHUNK,
      );
      result.push(...chunk);
      productIndex += PRODUCTS_PER_CHUNK;

      // Only add banners after a full chunk of products
      if (chunk.length === PRODUCTS_PER_CHUNK) {
        const startIdx =
          (groupNumber * BANNERS_PER_GROUP) % staticBanners.length;
        const banners = Array.from({ length: BANNERS_PER_GROUP }, (_, i) => {
          const b = staticBanners[(startIdx + i) % staticBanners.length];
          return { ...b, id: `${b.id}-group-${groupNumber}` };
        });
        result.push({
          type: "banners",
          id: `banner-group-${groupNumber}`,
          banners,
        });
        groupNumber++;
      }
    }

    return result;
  }, []); // add dependencies here if `products` becomes dynamic (e.g. filtered by tab)

  return (
    <main className="container category-page mt-[14px]">
      {/* <Breadcrumb items={["Home", "Tractors"]} /> */}
      <InnerHero
        title="Tractors"
        text="Powerful, reliable and efficient tractors for every farming need."
      />
      <div className="listing">
        <button className="mobile-filter" onClick={() => setFilters(!filters)}>
          <Icon name="filter" /> Filters
        </button>
        <div
          className={filters ? "filter-wrap visible" : "filter-wrap"}
          onChange={() => setFilterDirty(true)}
          onClick={(e) => {
            if (e.target === e.currentTarget)
              closeFilters(); // tap on the dark area
            else if (e.target.closest(".filters button")) setFilterDirty(true);
          }}
        >
          <div className="filter-panel">
            <button
              type="button"
              className="filter-close"
              onClick={closeFilters}
              aria-label="Close filters"
            >
              ✕
            </button>
            <div className="filter-panel-body">
              <Filters onApply={closeFilters} />
            </div>
          </div>

          {filterDirty && (
            <div className="filter-apply">
              <button
                type="button"
                className="primary full"
                onClick={closeFilters}
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
        <div className="catalog">
          <div className="catalog-tools">
            <div className="tabs">
              {["New", "Used", "Rent"].map((t) => (
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
            </div>
          </div>

          <div className="product-grid">
            {interleavedItems.map((item) => {
              // Banner item
              if (item.type === "banners") {
                return (
                  <div className="banner-row" key={item.id}>
                    {item.banners.map((b) => (
                      <Link
                        key={b.id}
                        to={b.link || "#"}
                        className="banner-card"
                      >
                        <img src={b.banner_image} alt="Banner" loading="lazy" />
                      </Link>
                    ))}
                  </div>
                );
              }

              // Product item
              return (
                <ProductCard
                  key={item.name}
                  product={item}
                  onOpen={() => setPage("product")}
                  onClick={() => navigate("/product")}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
