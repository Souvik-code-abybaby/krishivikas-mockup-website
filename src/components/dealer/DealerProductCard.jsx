import { Link } from "react-router-dom";
import { Calendar, MapPin, Tractor } from "lucide-react";

/**
 * variant="tile" (default) -> styled like the category <ProductCard>
 *                             (product-card / product-image / product-body)
 * variant="row"            -> horizontal card (unchanged)
 * `to` (optional) wraps the card in a router Link.
 * `onClick` (optional) makes the whole card clickable.
 */
export default function DealerProductCard({
  product: p,
  variant = "tile",
  to,
  onClick,
}) {
  const price = Number(p.price);
  const isTile = variant === "tile";

  /* ---------- tile: same classes/structure as ProductCard ---------- */
  if (isTile) {
    const tile = (
      <article
        className="product-card cursor-pointer hover:scale-98"
        onClick={onClick}
      >
        <div className="product-image">
          {p.image ? (
            <img src={p.image} alt={p.name} loading="lazy" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gray-100">
              <Tractor size={44} className="text-gray-300" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="product-body">
          <h3>{p.name}</h3>
          {!Number.isNaN(price) && (
            <strong className="text-[13px]">₹ {p.price}</strong>
          )}
          {p.location && (
            <span className="location">
              <MapPin size={14} /> {p.location}
            </span>
          )}
          {p.date && (
            <span className="location">
              <Calendar size={14} /> {p.date}
            </span>
          )}
        </div>
      </article>
    );

    return to ? (
      <Link to={to} className="block">
        {tile}
      </Link>
    ) : (
      tile
    );
  }

  /* ---------- row: original horizontal layout ---------- */
  const card = (
    <article
      className={`flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
        to ? "h-full" : ""
      }`}
      onClick={onClick}
    >
      <div className="grid size-28 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gray-100 sm:size-32">
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Tractor size={44} className="text-gray-300" strokeWidth={1.5} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-bold text-gray-900">{p.name}</h3>
        {!Number.isNaN(price) && (
          <p className="mt-1 text-xl font-bold text-[#13693a]">
            ₹ {price.toFixed(2)}
          </p>
        )}
        {p.location && (
          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} className="shrink-0" />
            <span className="truncate">{p.location}</span>
          </p>
        )}
        {p.date && (
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} className="shrink-0" />
            <span className="truncate">{p.date}</span>
          </p>
        )}
      </div>
    </article>
  );

  return to ? (
    <Link to={to} className="block">
      {card}
    </Link>
  ) : (
    card
  );
}