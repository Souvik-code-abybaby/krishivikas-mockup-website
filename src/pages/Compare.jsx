// import Breadcrumb from "../components/Breadcrumb";
// import { products } from "../../public/products";
// // const A=`../src/assets/`;
// import SectionTitle from "../components/SectionTitle";
// export default function ComparePage() {
//   return (
//     <main className="compare-page">
//       <section className="compare-hero container">
//         <Breadcrumb items={["Home", "Compare Categories"]} />
//         <h1>Compare Categories</h1>
//         <p>
//           Compare specifications, features and prices
//           <br />
//           to choose the best category for your needs.
//         </p>
//       </section>
//       <section className="compare-selector container">
//         {[products[0], products[1]].map((p, i) => (
//           <article className="selector-panel" key={p.name}>
//             <header>
//               <h2>◉ Category {i + 1}</h2>
//               <button>↻ Change</button>
//             </header>
//             <div className="selector-body">
//               <div className="select-fields">
//                 <label>
//                   Select Category
//                   <select>
//                     <option>Tractor</option>
//                   </select>
//                 </label>
//                 <label>
//                   Select Brand
//                   <select>
//                     <option>{i ? "Swaraj" : "Eicher"}</option>
//                   </select>
//                 </label>
//                 <label>
//                   Select Model
//                   <select>
//                     <option>{i ? "735 FE" : "380"}</option>
//                   </select>
//                 </label>
//               </div>
//               <div className="selected-product">
//                 <img src={p.image} alt={p.name} />
//                 <h3>{p.name}</h3>
//                 <p>Tractor</p>
//               </div>
//             </div>
//           </article>
//         ))}
//         <span className="vs">VS</span>
//       </section>
//       <section className="container popular-compare">
//         <SectionTitle title="Popular Category Comparison" />
//         <div className="comparison-grid">
//           {[
//             [products[0], products[1]],
//             [products[2], products[3]],
//           ].map((pair, i) => (
//             <article className="comparison-card" key={i}>
//               <div className="">
//                 {pair.map((p) => (
//                   <div>    <div key={p.name}>
//                     {/* <span>{p.hp}</span> */}
//                     <img src={p.image} alt={p.name} />
//                     <div className="flex flex-col items-start"><small>{p.category}</small>
//                     <p className="text-xs">{p.name}</p></div>
                    
//                   </div></div>
              
//                 ))}
//                 <b className="bg-[#13693A]">VS</b>
//               </div>
//               {/* <button className="hover:bg-green-800/80 bg-green-700">View Comparison</button> */}
//             </article>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }
import { useEffect, useState,useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";
import SectionTitle from "../components/SectionTitle";
import { products } from "../../public/products";
import { useQuery } from "@tanstack/react-query";
import { getCategoryList } from "../services/api/categoryApi";
import { useSelector } from "react-redux";

// Replace with real data (API or products file): category -> brand -> models
const CATALOG = {
  Tractor: {
    Eicher: ["380", "485", "551"],
    Swaraj: ["735 FE", "744 FE", "855 FE"],
    Mahindra: ["575 DI", "475 DI"],
  },
  Harvester: {
    "Kubota": ["DC-68G", "DC-93G"],
    "Preet": ["949", "987"],
  },
};
function CategorySelect({ options, value, onChange, disabled, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // close when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const current = options.find((c) => c.category_name === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((o) => !o)}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className="flex items-center gap-2">
          {current && (
            <img src={current.category_icon} alt="" className="h-6 w-6 object-contain" />
          )}
          {current ? current.category_name : "Select category"}
        </span>
        <span>▾</span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
          {options.map((c) => (
            <li key={c.category_id}>
              <button
                type="button"
                onClick={() => {
                  onChange(c.category_id); // same string value as before
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-gray-100"
              >
                <img src={c.category_icon} alt="" className="h-6 w-6 object-contain" />
                <span>{c.category_name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default function ComparePage() {
  const DEFAULT_TOKEN = "39767|0Lh5B3iICCyTLnDHhGwFeytBbGTLfKOzU7JliXc81e43c3e1"
    const token = useSelector((state) => state.auth.token)? useSelector((state) => state.auth.token):DEFAULT_TOKEN;
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [selected, setSelected] = useState([]); // max 2 items: {category, brand, model}
    const {
    data: categoryList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category-list", 1, token], // Add the languageId to the queryKey for better cache management
    queryFn: () => getCategoryList(1, token), // Pass a function that calls getCategoryList
  });
   const { data: brandList, isLoading: brandLoading } = useQuery({
    queryKey: ["brand-list", categoryId, type, token],
    queryFn: () => getBrandList(categoryId,"", token),
    enabled: !!categoryId,
  });
  // open the modal 1 second after mount
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const brands = category ? Object.keys(CATALOG[category]) : [];
  const models = category && brand ? CATALOG[category][brand] : [];

  const resetPicker = () => {
    setBrand("");
    setModel("");
  };

  const closeModal = () => {
    setOpen(false);
    setCategory("");
    resetPicker();
  };

  const handleCategory = (value) => {
    console.log(value)
    setCategory(value);
    resetPicker(); // brand + model depend on the category
  };

  const handleBrand = (value) => {
    setBrand(value);
    setModel(""); // model depends on the brand
  };

  // second model chosen -> save both and close automatically
  const handleModel = (value) => {
    setModel(value);
    if (selected.length === 1) {
      setSelected([...selected, { category, brand, model: value }]);
      closeModal();
    }
  };

  // "Add More": save the first item and let the user pick brand + model again
  const handleAddMore = () => {
    setSelected([{ category, brand, model }]);
    resetPicker();
  };

  const handleChange = () => {
    setSelected([]);
    setCategory("");
    resetPicker();
    setOpen(true);
  };

  const isComplete =
    selected.length === 2 &&
    selected.every((s) => s.category && s.brand && s.model);

  const handleSubmit = () => {
    console.log("Compare:", selected);
    // navigate to the comparison result / call API here
  };

  const selectClass =
    "w-full border border-gray-300 rounded-md h-10 px-3 mt-1 bg-white disabled:bg-gray-100";

  return (
    <main className="compare-page">
      <section className="compare-hero container">
        <Breadcrumb items={["Home", "Compare Categories"]} />
        <h1>Compare Categories</h1>
        <p>
          Compare specifications, features and prices
          <br />
          to choose the best category for your needs.
        </p>
      </section>

      {/* Selected info (two panels) */}
      {/* <section className="compare-selector container">
        {[0, 1].map((i) => {
          const item = selected[i];
          return (
            <article className="selector-panel" key={i}>
              <header>
                <h2>◉ Category {i + 1}</h2>
                <button onClick={handleChange}>↻ Change</button>
              </header>
              <div className="select-fields">
                <label>
                  Category
                  <input
                    readOnly
                    value={item?.category || ""}
                    placeholder="Not selected"
                    className={selectClass}
                  />
                </label>
                <label>
                  Brand
                  <input
                    readOnly
                    value={item?.brand || ""}
                    placeholder="Not selected"
                    className={selectClass}
                  />
                </label>
                <label>
                  Model
                  <input
                    readOnly
                    value={item?.model || ""}
                    placeholder="Not selected"
                    className={selectClass}
                  />
                </label>
              </div>
            </article>
          );
        })}
        <span className="vs">VS</span>
      </section> */}
    <section className="compare-selector container">
        {[products[0], products[1]].map((p, i) => (
        <article className="selector-panel" key={p.name}>
          <header>
             <h2>◉ Category {i + 1}</h2>
               <button>↻ Change</button>
            </header>
            <div className="selector-body">
             <div className="select-fields">
               <label>
                 Select Category
                   <select>
                   <option>Tractor</option>
                   </select>
               </label>
                <label>
                   Select Brand
                  <select>
                    <option>{i ? "Swaraj" : "Eicher"}</option>
                  </select>
                </label>
                 <label>
                  Select Model
               <select>
                    <option>{i ? "735 FE" : "380"}</option>
                  </select>
                </label>
              </div>
              <div className="selected-product">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>Tractor</p>
              </div>
            </div>          </article>
         ))}
        <span className="vs">VS</span>
      </section>
      {/* Submit only appears when everything is filled */}
      {isComplete && (
        <div className="container flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#13693A] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90"
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 border rounded px-2 py-1"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-[#13693A] mb-1">
              Choose Category
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selected.length === 0
                ? "Select the first item to compare."
                : "Now select the second brand and model."}
            </p>

            {/* Category (locked after the first item is saved) */}
            {/* <label className="block text-sm font-semibold mb-3">
              Category
              <select
                className={selectClass}
                value={category}
                onChange={(e) => handleCategory(e.target.value)}
                disabled={selected.length === 1}
              >
                <option value="">Select category</option>
                {categoryList.slice(0,2).map((c) => (
                  <option key={c} value={c.category_name}><img src={c.category_icon} alt="" /><p>{c.category_name}</p></option>
                ))}
                   {categoryList.slice(5).map((c) => (
                  <option key={c} value={c.category_name}><img src={c.category_icon} alt="" /><p>{c.category_name}</p></option>
                ))}
              </select>
            </label> */}
            <div className="block text-sm font-semibold mb-3">
  Category
  <CategorySelect
    className={selectClass}
    value={category}
    onChange={handleCategory}
    disabled={selected.length === 1}
    options={[
      ...(categoryList ?? []).slice(0, 2),
      ...(categoryList ?? []).slice(5),
    ]}
  />
</div>

            {/* Brand appears after category */}
            {category && (
              <label className="block text-sm font-semibold mb-3">
                Brand
                <select
                  className={selectClass}
                  value={brand}
                  onChange={(e) => handleBrand(e.target.value)}
                >
                  <option value="">Select brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </label>
            )}

            {/* Model appears after brand */}
            {brand && (
              <label className="block text-sm font-semibold mb-3">
                Model
                <select
                  className={selectClass}
                  value={model}
                  onChange={(e) => handleModel(e.target.value)}
                >
                  <option value="">Select model</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </label>
            )}

            {/* Add More appears once the first model is chosen */}
            {model && selected.length === 0 && (
              <button
                type="button"
                onClick={handleAddMore}
                className="w-full mt-2 bg-[#13693A] text-white rounded-lg py-2.5 font-bold hover:opacity-90"
              >
                + Add More
              </button>
            )}
          </div>
        </div>
      )}

      <section className="container popular-compare">
        <SectionTitle title="Popular Category Comparison" />
        <div className="comparison-grid">
          {[
            [products[0], products[1]],
            [products[2], products[3]],
          ].map((pair, i) => (
            <article className="comparison-card" key={i}>
              <div>
                {pair.map((p) => (
                  <div key={p.name}>
                    <img src={p.image} alt={p.name} />
                    <div className="flex flex-col items-start">
                      <small>{p.category}</small>
                      <p className="text-xs">{p.name}</p>
                    </div>
                  </div>
                ))}
                <b className="bg-[#13693A]">VS</b>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}