
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
//  import { useTranslation } from "react-i18next";
// import { useEffect } from "react";
// import {
//   Tractor,
//   Truck,
//   Sprout,
//   Wheat,
//   Wrench,
//   CircleDot,
//   ChevronDown,
//   Search,
// } from "lucide-react";


// const CATEGORY_OPTIONS = [
//   { id: 1, slug: "tractor", name: "Tractor", icon: Tractor },
//   { id: 2, slug: "goods-vehicle", name: "Goods Vehicle", icon: Truck },
//   { id: 3, slug: "agri-inputs", name: "Agri Inputs", icon: Sprout },
//   { id: 4, slug: "harvester", name: "Harvester", icon: Wheat },
//   { id: 5, slug: "implements", name: "Implements", icon: Wrench },
//   { id: 6, slug: "tyre", name: "Tyres", icon: CircleDot },

// ];

// const TYPE_OPTIONS = [
//   { value: "new", label: "New" },
//   { value: "old", label: "Used" },
//   { value: "rent", label: "Rent" },
// ];
// const AGRI_TYPE_OPTIONS = [
//   { value: "seeds", label: "Seeds" },
//   { value: "pesticides", label: "Pesticides" },
//   { value: "fertilizers", label: "Fertilizers" },
// ];
// const TYRE_TYPE_OPTIONS = [
//   { value: "new", label: "New" },
//   { value: "old", label: "Used" },
// ];

// const CategorySearchForm = ({
//   lockCategory = false,
//   presetCategory = "",
//   presetType = "",
//   onNavigate,
//   variant = "overlay",
// }) => {
//     const { t } = useTranslation();
//  const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("new");

//   const [selectedCategory, setSelectedCategory] = useState(presetCategory);
//   const [selectedSub, setSelectedSub] = useState("");

//   const [selectedType, setSelectedType] = useState(presetType);
//   useEffect(() => setSelectedCategory(presetCategory), [presetCategory]);
//   useEffect(() => setSelectedType(presetType), [presetType]);
//   const isAgriInputs = selectedCategory === "agri-inputs";
//   const isTyreInputs = selectedCategory === "tyre";
//   const currentTypeOptions = isAgriInputs
//     ? AGRI_TYPE_OPTIONS
//     : isTyreInputs
//       ? TYRE_TYPE_OPTIONS
//       : TYPE_OPTIONS;

//   const activeCategory = CATEGORY_OPTIONS.find(
//     (c) => c.slug === selectedCategory,
//   );
//   const CategoryIcon = activeCategory?.icon;
//   const goToRoute = (category, type) => {
//     if (onNavigate) return onNavigate(category, type);
//     if (!category || !type) return;
//     navigate(`/${category}/${type}`, { state: { subFilter: selectedSub } });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedCategory || !selectedType) return;
//     goToRoute(selectedCategory, selectedType);
//   };

//   const handleTypeChange = (e) => {
//     const value = e.target.value;
//     setSelectedType(value);
//     if (lockCategory && selectedCategory && value) {
//       goToRoute(selectedCategory, value);
//     }
//   };
//   return (
   
//     <div
//       className={
//         variant === "static"
//           ? "category-search-form-wrapper relative z-30 w-full max-w-[420px] mx-auto"
//           : "category-search-form-wrapper relative lg:absolute z-30 w-[100%] mx-auto -mt-0 lg:mt-0 lg:w-auto lg:mx-0 lg:left-14 lg:top-8 max-w-none lg:max-w-[380px]"
//       }
//     >
  
//       <div className="relative lg:bg-white  lg:shadow-2xl lg:shadow-black/20 rounded-2xl p-5 md:p-6 space-y-4 lg:border  lg:border-white/60">
//         <div className="flex items-center gap-2.5 pt-1">
//           <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#13693a]/10 text-[#13693a] shrink-0">
//             {CategoryIcon ? (
//               <CategoryIcon size={18} strokeWidth={2} />
//             ) : (
//               <Search size={16} strokeWidth={2} />
//             )}
//           </span>
//           <h3 className="text-lg md:text-xl font-semibold text-[#13693a] leading-snug">
//             {t("Find Your Right")} {t(activeCategory?.name || "Product")}
//           </h3>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           {/* Category select */}
//           {lockCategory ? (
//             <div className="w-full flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm md:text-base text-gray-600">
           
//               <span className="truncate">
//                 {t(activeCategory?.name || selectedCategory)}
//               </span>
//             </div>
//           ) : (
//             <div className="relative">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => {
//                   setSelectedCategory(e.target.value);
//                   setSelectedSub("");
//                   setSelectedType("");
//                 }}
//                 className="w-full appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-9 py-2.5 text-sm md:text-base text-gray-700 outline-none transition-colors focus:border-[#13693a] focus:ring-2 focus:ring-[#13693a]/15"
//               >
//                 <option value="">{t("Select Category")}</option>
//                 {CATEGORY_OPTIONS.map((cat) => (
//                   <option key={cat.id} value={cat.slug}>
//                     {t(cat.name)}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={16}
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//             </div>
//           )}

//           {/* Type select */}
//           <div className="relative">
//             <select
//               value={selectedType}
      
//               onChange={handleTypeChange}
//               disabled={!selectedCategory}
//               className="w-full appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-9 py-2.5 text-sm md:text-base text-gray-700 outline-none transition-colors focus:border-[#13693a] focus:ring-2 focus:ring-[#13693a]/15 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
//             >
//               <option value="" hidden disabled>
//                 {isAgriInputs
//                   ? t("Seeds/Pesticides/Fertilizers")
//                   : isTyreInputs
//                     ? t("New/Used")
//                     : t("New / Used / Rent")}
//               </option>
//               {currentTypeOptions.map((type) => (
//                 <option key={type.value} value={type.value}>
//                   {t(type.label)}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown
//               size={16}
//               className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//           </div>

//           {!lockCategory && (
//             <button
//               type="submit"
//               disabled={!selectedCategory}
//               className="mt-1 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#13693a] via-[#8cbf44] to-[#13693a] text-white font-semibold py-2.5 text-sm md:text-base shadow-md shadow-[#13693a]/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
//             >
//               {t("Search")}
//             </button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CategorySearchForm;
import React, { useState, useEffect } from "react";
import {
  Tractor,
  Truck,
  Sprout,
  Wheat,
  Wrench,
  CircleDot,
  ChevronDown,
  Search,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  { id: 1, slug: "tractor", name: "Tractor", icon: Tractor },
  { id: 2, slug: "goods-vehicle", name: "Goods Vehicle", icon: Truck },
  { id: 3, slug: "agri-inputs", name: "Agri Inputs", icon: Sprout },
  { id: 4, slug: "harvester", name: "Harvester", icon: Wheat },
  { id: 5, slug: "implements", name: "Implements", icon: Wrench },
  { id: 6, slug: "tyre", name: "Tyres", icon: CircleDot },
];

const TYPE_OPTIONS = [
  { value: "new", label: "New" },
  { value: "old", label: "Used" },
  { value: "rent", label: "Rent" },
];
const AGRI_TYPE_OPTIONS = [
  { value: "seeds", label: "Seeds" },
  { value: "pesticides", label: "Pesticides" },
  { value: "fertilizers", label: "Fertilizers" },
];
const TYRE_TYPE_OPTIONS = [
  { value: "new", label: "New" },
  { value: "old", label: "Used" },
];

const CategorySearchForm = ({
  lockCategory = false,
  presetCategory = "",
  presetType = "",
  onNavigate,
  variant = "overlay",
}) => {
  const [selectedCategory, setSelectedCategory] = useState(presetCategory);
  const [selectedType, setSelectedType] = useState(presetType);

  useEffect(() => setSelectedCategory(presetCategory), [presetCategory]);
  useEffect(() => setSelectedType(presetType), [presetType]);

  const isAgriInputs = selectedCategory === "agri-inputs";
  const isTyreInputs = selectedCategory === "tyre";
  const currentTypeOptions = isAgriInputs
    ? AGRI_TYPE_OPTIONS
    : isTyreInputs
      ? TYRE_TYPE_OPTIONS
      : TYPE_OPTIONS;

  const activeCategory = CATEGORY_OPTIONS.find((c) => c.slug === selectedCategory);
  const CategoryIcon = activeCategory?.icon;

  const goToRoute = (category, type) => {
    if (!category || !type) return;
    onNavigate?.(category, type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToRoute(selectedCategory, selectedType);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    if (lockCategory && selectedCategory && value) {
      goToRoute(selectedCategory, value);
    }
  };

  return (
    <div
      className={
        variant === "static"
          ? "category-search-form-wrapper relative z-30 w-full max-w-[420px] mx-auto"
          : "category-search-form-wrapper relative lg:absolute z-30 w-[100%] mx-auto -mt-0 lg:mt-0 lg:w-auto lg:mx-0 lg:right-14 lg:top-8 max-w-none lg:max-w-[380px]"
      }
    >
      <div className="relative lg:bg-white lg:shadow-2xl lg:shadow-black/20 rounded-2xl p-5 md:p-6 space-y-4 lg:border lg:border-white/60">
        <div className="flex items-center gap-2.5 pt-1">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#13693a]/10 text-[#13693a] shrink-0">
            {CategoryIcon ? (
              <CategoryIcon size={18} strokeWidth={2} />
            ) : (
              <Search size={16} strokeWidth={2} />
            )}
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-[#13693a] leading-snug">
            Find Your Right {activeCategory?.name || "Product"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {lockCategory ? (
            <div className="w-full flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm md:text-base text-gray-600">
              <span className="truncate">
                {activeCategory?.name || selectedCategory}
              </span>
            </div>
          ) : (
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedType("");
                }}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-9 py-2.5 text-sm md:text-base text-gray-700 outline-none transition-colors focus:border-[#13693a] focus:ring-2 focus:ring-[#13693a]/15"
              >
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          )}

          <div className="relative">
            <select
              value={selectedType}
              onChange={handleTypeChange}
              disabled={!selectedCategory}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-9 py-2.5 text-sm md:text-base text-gray-700 outline-none transition-colors focus:border-[#13693a] focus:ring-2 focus:ring-[#13693a]/15 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="" hidden disabled>
                {isAgriInputs
                  ? "Seeds/Pesticides/Fertilizers"
                  : isTyreInputs
                    ? "New/Used"
                    : "New / Used / Rent"}
              </option>
              {currentTypeOptions.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {!lockCategory && (
            <button
              type="submit"
              disabled={!selectedCategory}
              className="mt-1 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#13693a] via-[#8cbf44] to-[#13693a] text-white font-semibold py-2.5 text-sm md:text-base shadow-md shadow-[#13693a]/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              Search
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategorySearchForm;