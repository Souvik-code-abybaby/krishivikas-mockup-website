import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";

export const OptionIcon = ({ option, size = 18 }) => {
  const [failed, setFailed] = useState(false);
  const Fallback = option?.icon || Search;

  // reset the failed flag if the url changes
  useEffect(() => setFailed(false), [option?.iconUrl]);

  if (option?.iconUrl && !failed) {
    return (
      <img
        src={option.iconUrl}
        alt=""
        onError={() => setFailed(true)}
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  return <Fallback size={size} className="text-[#13693a] shrink-0" />;
};

const CategoryDropdown = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.slug === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="w-full flex items-center gap-2 rounded-lg border border-gray-300 bg-white pl-3 pr-9 py-2.5 text-left text-sm md:text-base text-gray-700 outline-none transition-colors focus:border-[#13693a] focus:ring-2 focus:ring-[#13693a]/15"
      >
        {selected && <OptionIcon option={selected} />}
        <span className={`truncate ${selected ? "" : "text-gray-400"}`}>
          {selected?.name || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute left-0 right-0 top-full z-40 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.slug);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm md:text-base hover:bg-[#13693a]/10 ${
                  opt.slug === value
                    ? "bg-[#13693a]/10 text-[#13693a] font-medium"
                    : "text-gray-700"
                }`}
              >
                <OptionIcon option={opt} />
                <span className="truncate">{opt.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;