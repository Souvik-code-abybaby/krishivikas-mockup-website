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
import { useState, useMemo } from "react";
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
  const [filters, setFilters] = useState(false);
  const [tab, setTab] = useState("New");
const navigate=useNavigate();
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
        for (let i = 0; i < BANNERS_PER_GROUP; i++) {
          const banner = staticBanners[(startIdx + i) % staticBanners.length];
          result.push({
            ...banner,
            id: `${banner.id}-group-${groupNumber}`, // unique key per group
          });
        }
        groupNumber++;
      }
    }

    return result;
  }, []); // add dependencies here if `products` becomes dynamic (e.g. filtered by tab)

  return (
    <main className="container category-page">
      {/* <Breadcrumb items={["Home", "Tractors"]} /> */}
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
            </div>
          </div>

          <div className="product-grid">
            {interleavedItems.map((item) => {
              // Banner item
              if (item.banner_image) {
                return (
                  <Link
                    key={`banner-${item.id}`}
                    to={item.link || "#"}
                    className="banner-card"
                  >
                    <img
                      src={item.banner_image}
                      alt="Banner"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: 150,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  </Link>
                );
              }

              // Product item
              return (
                <ProductCard
                  key={item.name}
                  product={item}
                  onOpen={() => setPage("product")}
                  onClick={()=>navigate("/product")}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
