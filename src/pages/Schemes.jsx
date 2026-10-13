import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import { useEffect } from "react";
const allSchemes = [
  {
    id: 1,
    title: "PM-KISAN Samman Nidhi Yojana",
    category: "Financial Support",
    state: "All India",
    date: "15 Jul 2025",
    desc: "Financial support of ₹6,000/year to small and marginal farmer families across India, provided in three equal installments directly to bank accounts.",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Kisan Credit Card Scheme — Special Drive",
    category: "Credit",
    state: "Maharashtra",
    date: "01 Aug 2025",
    desc: "Collateral-free credit up to ₹1.6 lakh for crop cultivation, post-harvest expenses, and maintenance needs for allied activities.",
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Sub-Mission on Agricultural Mechanisation",
    category: "Mechanisation",
    state: "Punjab",
    date: "10 Aug 2025",
    desc: "Subsidy of up to 50% on purchase of farm machinery and equipment for small, marginal farmers, SCs, and STs.",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "National Food Security Mission",
    category: "Food Security",
    state: "Haryana",
    date: "05 Aug 2025",
    desc: "Enhancing production of rice, wheat, pulses, and coarse cereals through area expansion and productivity enhancement.",
    img: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Pradhan Mantri Fasal Bima Yojana",
    category: "Insurance",
    state: "All India",
    date: "20 Jul 2025",
    desc: "Comprehensive crop insurance at minimal premium for farmers against crop loss due to natural calamities, pests and diseases.",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=300&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "Soil Health Card Scheme",
    category: "Soil Health",
    state: "All India",
    date: "28 Jul 2025",
    desc: "Issue of soil health cards to farmers carrying crop-wise recommendations of nutrients and fertilizers required for individual farms.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=300&fit=crop&auto=format",
  },
];

const categories = [
  "All",
  "Financial Support",
  "Credit",
  "Mechanisation",
  "Insurance",
  "Food Security",
  "Soil Health",
];
const PER_PAGE = 4;

export default function Schemes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = allSchemes.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || s.category === category;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main className="profile-page">
      <ProfileSidebar />
      <div className="space-y-5">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
            <input
              type="text"
              placeholder="Search schemes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A]"
            />
          </div>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="text-sm border border-[#E4E7EC] rounded-xl px-3 py-2 text-[#1E293B] bg-white focus:outline-none focus:border-[#13693A]"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Scheme Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paged.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <div className="h-44 bg-[#F6F9F7] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] bg-[#e8f5ee] text-[#13693A] font-600 uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {s.category}
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <MapPin size={10} /> {s.state}
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center gap-1">
                    <Calendar size={10} /> {s.date}
                  </span>
                </div>
                <h3 className="font-heading font-600 text-[#1E293B] text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#64748B] flex-1 mb-4 line-clamp-3">
                  {s.desc}
                </p>
                <button className="self-start px-4 py-2 bg-[#13693A] text-white text-sm rounded-lg hover:bg-[#0e4f2c] font-500">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#64748B] bg-white rounded-2xl border border-[#E4E7EC]">
            <Search size={32} className="mx-auto mb-2 opacity-30" />
            <p>No schemes found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-[#E4E7EC] text-[#64748B] hover:border-[#13693A] hover:text-[#13693A] disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-500 border ${page === p ? "bg-[#13693A] text-white border-[#13693A]" : "border-[#E4E7EC] text-[#64748B] hover:border-[#13693A]"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-[#E4E7EC] text-[#64748B] hover:border-[#13693A] hover:text-[#13693A] disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
