import { AtSign, MapPin, Share2 } from "lucide-react";
import toast from "react-hot-toast";
// import Rating from "./Rating";

// Uses the same `filters` / fieldset / legend markup as <Filters />,
// so it picks up the category page's sidebar styling.
export default function DealerProfileCard({ dealer, shareUrl, className = "" }) {
  const address = dealer.address ?? dealer.city;
  const mapsHref = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : undefined;

  const handleShare = async () => {
    const url = shareUrl ?? window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: dealer.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <aside className={`  ${className}`}>
      <div className="w-full flex justify-between items-center rounded-t-2xl bg-linear-to-bl from-[#13693a] via-[#8cbf44] to-[#13693a] p-2">
        <h2 className="text-white">Seller Profile</h2>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share dealer"
          className="rounded-full  text-white transition hover:bg-white/40 p-1 "
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center ">
        <div className="grid size-24 place-items-center overflow-hidden rounded-full border-4 border-white bg-white shadow-md ring-4 ring-[#8cbf44]/40">
          {dealer.logo ? (
            <img
              src={dealer.logo}
              alt={`${dealer.name} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-[#13693a]">
              {dealer.name[0]}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-bold text-gray-900">{dealer.name}</h3>
        {dealer.rating && (
          <div className="mt-1">
            {/* <Rating value={dealer.rating} /> */}
          </div>
        )}
        {dealer.products != null && (
          <span className="hp mt-1">{dealer.products} products</span>
        )}
      </div>

      {(dealer.email || address) && (
        <fieldset>
          
          {dealer.email && (
            <a
              href={`mailto:${dealer.email}`}
              className="mb-2 flex items-start gap-2 break-words text-sm text-gray-700 hover:text-[#13693a]"
            >
              <AtSign size={16} className="mt-0.5 shrink-0 text-[#13693a]" />
              {dealer.email}
            </a>
          )}
          {address && (
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2 break-words text-sm text-gray-700 hover:text-[#13693a]"
            >
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#13693a]" />
              {address}
            </a>
          )}
        </fieldset>
      )}

      {/* {dealer.email && (
        <a
          href={`mailto:${dealer.email}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded bg-linear-to-bl from-[#13693a] via-[#8cbf44] to-[#13693a] px-3 py-2 text-[13px] font-bold text-white hover:via-green-900"
        >
          Contact Seller
        </a>
      )} */}
    </aside>
  );
}