import { useEffect, useRef, useState } from "react";

export default function ImageSelect({
  options = [],
  value,            // selected option object or null
  onChange,
  placeholder = "Select",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative mt-1" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 h-11 text-left disabled:bg-gray-100"
      >
        {value ? (
          <span className="flex items-center gap-2 min-w-0">
            <img src={value.image} alt="" className="h-7 w-7 rounded object-cover shrink-0" />
            <span className="truncate">{value.name}</span>
          </span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
          {options.map((opt) => (
            <li key={opt.name}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#F5F5F5] ${
                  value?.name === opt.name ? "bg-[#e5f5ee]" : ""
                }`}
              >
                <img src={opt.image} alt="" className="h-9 w-9 rounded object-cover shrink-0" />
                <span>{opt.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}