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
import { useEffect, useState, useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";
import SectionTitle from "../components/SectionTitle";
import { products } from "../../public/products";
import { useQuery } from "@tanstack/react-query";
import { getCategoryList } from "../services/api/categoryApi";
import { useSelector } from "react-redux";
import { getBrandList } from "../services/api/brandApi";
import LogoSelect from "../components/compare/LogoSelect";
import { getCategoryWiseProduct } from "../services/api/modelList";
import ModelSelect from "../components/compare/ModelSelect";
// Replace with real data (API or products file): category -> brand -> models
const CATALOG = {
  Tractor: {
    Eicher: ["380", "485", "551"],
    Swaraj: ["735 FE", "744 FE", "855 FE"],
    Mahindra: ["575 DI", "475 DI"],
  },
  Harvester: {
    Kubota: ["DC-68G", "DC-93G"],
    Preet: ["949", "987"],
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

  const current = options.find((c) => String(c.category_id) === String(value));

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
            <img
              src={current.category_icon}
              alt=""
              className="h-6 w-6 object-contain"
            />
          )}
          {current ? current.category_name : "Select category"}
        </span>
        <span>▾</span>
      </button>

      {isOpen && (
        <ul className="mt-2 flex w-full  gap-2 py-2 overflow-auto">
          {options.map((c) => (
            <li key={c.category_id}>
              <button
                type="button"
                onClick={() => {
                  onChange(c.category_id); // same string value as before
                  setIsOpen(false);
                }}
                className="flex rounded-md flex-col w-25  gap-2 px-3 py-2 text-left bg-gray-100 justify-center items-center hover:ring-green-700 hover:ring"
              >
                <img
                  src={c.category_icon}
                  alt=""
                  className="h-10 w-10 object-auto"
                />
                <span className="line-clamp-1 text-xs">{c.category_name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default function ComparePage() {
  const DEFAULT_TOKEN =
    "39767|0Lh5B3iICCyTLnDHhGwFeytBbGTLfKOzU7JliXc81e43c3e1";
  const token = useSelector((state) => state.auth.token)
    ? useSelector((state) => state.auth.token)
    : DEFAULT_TOKEN;
  const [editIndex, setEditIndex] = useState(null); // which panel is being changed
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [selected, setSelected] = useState([]); // max 2 items: {category, brand, model}
  const [draft, setDraft] = useState(null); // first item, before "+ Add More"
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
    queryKey: ["brand-list", category, token],
    queryFn: () => getBrandList(category, "", token),
    enabled: !!category,
  });
  console.log({ category, brandList });
  const { data: modelList, isLoading: modelLoading } = useQuery({
    queryKey: ["model-list", category, brand, token],
    queryFn: () =>
      getCategoryWiseProduct(
        category,
        "",
        0,
        "",
        brand, // request body
        token,
      ),
    enabled: !!category && !!brand,
  });

  console.log("modelList:", modelList, category, brand, token);
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // const brands = category ? Object.keys(CATALOG[category]) : [];
  // const models = category && brand ? CATALOG[category][brand] : [];

  const resetPicker = () => {
    setBrand("");
    setModel("");
  };
  const buildItem = (modelObj) => ({
    category: (categoryList ?? []).find(
      (c) => String(c.category_id) === String(category),
    ),
    brand: (brandList ?? []).find(
      (b) => String(b.brand_id ?? b.id) === String(brand),
    ),
    model: modelObj, // the clicked object, no lookup needed
  });
  const closeModal = () => {
    // keep a first item that was picked but not yet added
    if (draft && selected.length === 0) setSelected([draft]);
    setDraft(null);
    setOpen(false);
    setCategory("");
    setEditIndex(null);
    resetPicker();
  };

  const handleCategory = (value) => {
    console.log(value);
    setCategory(value);
    resetPicker(); // brand + model depend on the category
  };

  const handleBrand = (value) => {
    console.log(value);
    setBrand(value);
    setModel(""); // model depends on the brand
  };

  // second model chosen -> save both and close automatically
  const handleModel = (value, modelObj) => {
    setModel(value);
    const item = buildItem(modelObj);

    if (editIndex !== null) {
      setSelected((prev) => prev.map((s, i) => (i === editIndex ? item : s)));
      closeModal();
    } else if (selected.length === 1) {
      setSelected([...selected, item]);
      closeModal();
    } else {
      setDraft(item); // first item: panel 1 fills immediately
    }
  };
  const handleAddMore = () => {
    setSelected([draft]);
    setDraft(null);
    resetPicker();
  };

  // Change button on a panel
 const handleChange = (i) => {
  setEditIndex(selected[i] ? i : null);
  resetPicker();

  if (i === 1 && selected[0]) {
    // panel 2: reuse the category from panel 1
    setCategory(selected[0].category?.category_id);
  } else {
    setCategory("");
  }
  setOpen(true);
};

  const isComplete =
    selected.length === 2 &&
    selected.every((s) => s.category && s.brand && s.model);
  const handleSubmit = () => {
    const payload = selected.map((s) => ({
      category_id: s.category?.category_id,
      brand_id: s.brand?.brand_id ?? s.brand?.id,
      model_id: s.model?.model_id ?? s.model?.id,
    }));
    console.log("Compare:", payload);
  };
  // first item: the draft (before "+ Add More") or the saved one
  const firstItem = selected[0] ?? draft;
  const fm = firstItem?.model;
  const firstName = fm?.model_name ?? fm?.name ?? fm?.title;
  const firstImg = fm?.model_image ?? fm?.image ?? fm?.logo;

  // remove the first card and start over
  const removeFirst = () => {
    setSelected([]);
    setDraft(null);
    setCategory("");
    resetPicker();
  };

  const selectClass =
    "w-full border border-gray-300 rounded-md h-10 px-3 mt-1 bg-white disabled:bg-gray-100";
  console.log("brandList:", brandList);
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
        {[0, 1].map((i) => {
          // show the saved item, or the draft in the first empty slot
          const item = selected[i] ?? (i === selected.length ? draft : null);
          const m = item?.model;
          const modelName = m?.model_name ?? m?.name ?? m?.title;
          const img = m?.model_image ?? m?.image ?? m?.logo;

          return (
            <article className="selector-panel" key={i}>
              <header>
                <h2>◉ Category {i + 1}</h2>
                <button type="button" onClick={() => handleChange(i)}>
                  ↻ Change
                </button>
              </header>
              <div className="selector-body">
                <div className="select-fields">
                  <label>
                    Select Category
                    <select value={item ? "v" : ""} disabled>
                      <option value="">Not selected</option>
                      {item && (
                        <option value="v">
                          {item.category?.category_name}
                        </option>
                      )}
                    </select>
                  </label>
                  <label>
                    Select Brand
                    <select value={item ? "v" : ""} disabled>
                      <option value="">Not selected</option>
                      {item && (
                        <option value="v">{item.brand?.brand_name}</option>
                      )}
                    </select>
                  </label>
                  <label>
                    Select Model
                    <select value={item ? "v" : ""} disabled>
                      <option value="">Not selected</option>
                      {item && <option value="v">{modelName}</option>}
                    </select>
                  </label>
                </div>

                <div className="selected-product">
                  {img && <img src={img} alt={modelName} />}
                  <h3>{modelName ?? "No model selected"}</h3>
                  <p>{item?.category?.category_name ?? ""}</p>
                </div>
              </div>
            </article>
          );
        })}
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
              {draft
                ? "Add Another"
                : brand
                  ? "Choose Model"
                  : category
                    ? "Choose Brand"
                    : "Choose Category"}
            </h2>
            {firstItem && editIndex === null && (
        <div className="relative mb-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2 pr-8">
          {firstImg && (
            <img
              src={firstImg}
              alt={firstName}
              className="h-12 w-12 shrink-0 rounded object-contain"
            />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{firstName}</p>
            <p className="truncate text-xs text-gray-500">
              {firstItem.brand?.brand_name} •{" "}
              {firstItem.category?.category_name}
            </p>
          </div>
          <button
            type="button"
            onClick={removeFirst}
            aria-label="Remove first item"
            className="absolute right-1 top-1 rounded px-1.5 text-xs text-gray-500 hover:bg-gray-200 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}
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
            {/* Category: visible only until one is selected */}
            {!category && (
              <div className="block text-sm font-semibold mb-3">
                Category
                <CategorySelect
                  className={selectClass}
                  value={category}
                  onChange={handleCategory}
                  options={[
                    ...(categoryList ?? []).slice(0, 2),
                    ...(categoryList ?? []).slice(5),
                  ]}
                />
              </div>
            )}
{category && !brand && editIndex === 1 && (
  <p className="text-xs text-gray-500 mb-2">
    Showing brands for {selected[0]?.category?.category_name}. To use a
    different category, change Category 1.
  </p>
)}
            {/* Brand: visible only after a category is selected */}
            {/* Brand: visible after a category is selected, hidden once a brand is picked */}
            {category && !brand && (
              <div className="block text-sm font-semibold mb-3">
                Brand
                <LogoSelect
                  className={selectClass}
                  placeholder={
                    brandLoading ? "Loading brands..." : "Select brand"
                  }
                  options={brandList ?? []}
                  value={brand}
                  onChange={handleBrand}
                  disabled={brandLoading}
                  idKey="brand_id"
                  nameKey="brand_name"
                  imgKey="brand_logo"
                  openKey={category}
                />
                {!brandLoading && brandList?.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    No brands found for this category.
                  </p>
                )}
              </div>
            )}

            {/* Model appears after brand */}
            {/* Model: appears after a brand is selected, list opens automatically */}
            {brand && !draft && (
              <div className="block text-sm font-semibold mb-3">
                Model
                <ModelSelect
                  className={selectClass}
                  placeholder={
                    modelLoading ? "Loading models..." : "Select model"
                  }
                  options={modelList ?? []}
                  value={model}
                  onChange={handleModel}
                  disabled={modelLoading}
                  idKey="model_id"
                  nameKey="model_name"
                  imgKey="model_image"
                  openKey={brand}
                />
                {!modelLoading && modelList?.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    No models found for this brand.
                  </p>
                )}
              </div>
            )}
            {/* Add More appears once the first model is chosen */}
            {draft && selected.length === 0 && editIndex === null && (
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
