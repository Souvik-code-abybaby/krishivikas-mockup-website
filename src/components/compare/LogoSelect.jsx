import { useEffect, useState, useRef } from "react";

export default function LogoSelect({
  options = [],
  value,
  onChange,
  disabled,
  className = "",
  placeholder = "Select",
  idKey,
  nameKey,
  imgKey,
  openKey, // when this changes (and options are ready), the list opens itself
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const getId = (o) => o[idKey] ?? o.id;
  const getName = (o) => o[nameKey] ?? o.name ?? o.title;
  const getImg = (o) => o[imgKey] ?? o.logo ?? o.image ?? o.icon;

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // auto-open once the options for the new category have loaded
  useEffect(() => {
    if (openKey && !disabled && options.length > 0) setIsOpen(true);
  }, [openKey, disabled, options.length]);

  const current = options.find((o) => String(getId(o)) === String(value));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((o) => !o)}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className="flex items-center gap-2">
          {current && getImg(current) && (
            <img src={getImg(current)} alt="" className="h-6 w-6 object-contain" />
          )}
          {current ? getName(current) : placeholder}
        </span>
        <span>▾</span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
          {options.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-500">No options found</li>
          )}
          {options.map((o, i) => (
            <li key={getId(o) ?? i}>
              <button
                type="button"
                onClick={() => {
                  onChange(getId(o));
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-gray-100"
              >
                {getImg(o) && (
                  <img src={getImg(o)} alt="" className="h-6 w-6 object-contain" />
                )}
                <span>{getName(o)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}