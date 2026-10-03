import { useEffect, useState, useRef } from "react";

export default function ModelSelect({
  options = [],
  value,
  onChange,
  disabled,
  className = "",
  placeholder = "Select model",
  idKey,
  nameKey,
  imgKey,
  openKey, // when this changes (and options are ready), the list opens itself
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const getId = (o) => o[idKey] ?? o.id;
  const getName = (o) => o[nameKey] ?? o.name ?? o.title;
  const getImg = (o) => o[imgKey] ?? o.image ?? o.logo ?? o.icon;

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // auto-open once the models for the selected brand have loaded
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
            <img
              src={getImg(current)}
              alt=""
              className="h-6 w-6 object-contain"
            />
          )}
          {current ? getName(current) : placeholder}
        </span>
        <span>▾</span>
      </button>

      {isOpen && (
        <ul className="mt-2 flex max-h-64 w-full flex-col gap-2 overflow-y-auto py-2 text-left">
          {options.length === 0 && (
            <li className="col-span-2 px-3 py-2 text-sm text-gray-500">
              No models found
            </li>
          )}
          {options.map((o, i) => (
            <li key={getId(o) ?? i}>
              <button
                type="button"
                onClick={() => {
  onChange(getId(o), o); // id first, full object second
  setIsOpen(false);
}}
                className="flex h-full w-full flex-col items-start gap-2 rounded-md  border-gray-200 bg-white p-2 text-center  hover:bg-gray-100"
              >
               
                <span className="line-clamp-2 text-xs font-medium">
                  {getName(o)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}